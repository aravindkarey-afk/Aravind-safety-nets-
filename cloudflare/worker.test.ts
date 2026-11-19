// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest';
import worker from './worker';

const origin = 'https://aravindsafetynets.in';
const key = '1f0747cb-ec11-49b7-9ac1-4e740159201d';
const validBody = { name: 'శ్రీ కుమార్', email: 'test@example.com', phone: '+91 98765 43210', message: 'Quote please', service: 'Balcony' };
const mockEnv = (success = true) => ({
  ASSETS: { fetch: vi.fn(async (_request: Request) => new Response('asset', { headers: { 'Content-Type': 'image/png' } })) },
  CONTACT_RATE_LIMIT: { limit: vi.fn(async () => ({ success })) },
  RESEND_API_KEY: 'test-key',
  CONTACT_FROM_EMAIL: 'Aravind Safety Nets <enquiries@example.com>',
});
const post = (name: string, body: unknown, headers: Record<string, string> = {}) => new Request(`${origin}/api/contact/${name}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Origin: origin, 'CF-Connecting-IP': '192.0.2.1', 'Idempotency-Key': key, ...headers },
  body: JSON.stringify(body),
});

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('Cloudflare Worker routes', () => {
  it('serves a local logo from the asset binding and redirects to the existing remote hero', async () => {
    const env = mockEnv();
    const logo = await worker.fetch(new Request(`${origin}/airo-assets/images/logo/horizontal`), env);
    expect(logo.headers.get('Content-Type')).toBe('image/png');
    expect(env.ASSETS.fetch.mock.calls[0][0].url).toBe(`${origin}/assets/media/logo-horizontal-7ab151d3.png`);
    const hero = await worker.fetch(new Request(`${origin}/airo-assets/images/pages/home/hero`), env);
    expect(hero.status).toBe(302);
    expect(hero.headers.get('location')).toBe('https://img1.wsimg.com/isteam/getty/2219892616');
  });

  it('keeps unknown API and media routes from returning an HTML page', async () => {
    const env = mockEnv();
    for (const path of ['/api/missing', '/airo-assets/images/missing']) {
      const response = await worker.fetch(new Request(`${origin}${path}`), env);
      expect(response.status).toBe(404);
      expect(await response.json()).toMatchObject({ success: false });
    }
    expect(env.ASSETS.fetch).not.toHaveBeenCalled();
  });

  it.each(['contact-us', 'quote-request'])('sends %s to the fixed Gmail recipient with a validated reply-to', async (name) => {
    const upstream = vi.fn<typeof fetch>().mockImplementation(async () => Response.json({ id: 'receipt-1' }));
    vi.stubGlobal('fetch', upstream);
    const env = mockEnv();
    const response = await worker.fetch(post(name, { ...validBody, to: 'attacker@example.com' }), env);
    expect(response.headers.get('Cache-Control')).toBe('no-store');
    expect(await response.json()).toEqual({ success: true });
    expect(env.CONTACT_RATE_LIMIT.limit).toHaveBeenCalledWith({ key: '192.0.2.1' });
    const [url, init] = upstream.mock.calls[0];
    expect(url).toBe('https://api.resend.com/emails');
    expect(init?.redirect).toBe('manual');
    expect(new Headers(init?.headers).get('Authorization')).toBe('Bearer test-key');
    expect(new Headers(init?.headers).get('Idempotency-Key')).toBe(`aravind/${name}/${key}`);
    expect(JSON.parse(String(init?.body))).toMatchObject({
      from: env.CONTACT_FROM_EMAIL,
      to: ['aravindsafetynets@gmail.com'],
      reply_to: validBody.email,
      text: 'Name: శ్రీ కుమార్\nPhone: +919876543210\nEmail: test@example.com\nService: Balcony\n\nMessage:\nQuote please',
    });
  });

  it.each([
    { name: ' 123 ' }, { phone: 'abcd123' }, { email: 'a@example.com\nBcc: example.org' }, { message: ' ' },
    { email: '' }, { name: 42 }, { phone: '123' },
  ])('rejects invalid fields (%j) before attempting delivery', async (fields) => {
    const upstream = vi.fn();
    vi.stubGlobal('fetch', upstream);
    const env = mockEnv();
    expect((await worker.fetch(post('contact-us', { ...validBody, ...fields }), env)).status).toBe(400);
    expect(upstream).not.toHaveBeenCalled();
  });

  it('rejects oversized, cross-origin, invalid-key and rate-limited requests and drops honeypots', async () => {
    const upstream = vi.fn();
    vi.stubGlobal('fetch', upstream);
    const env = mockEnv(false);
    expect((await worker.fetch(post('contact-us', { extra: 'x'.repeat(110000) }), env)).status).toBe(413);
    expect((await worker.fetch(post('contact-us', validBody, { Origin: 'https://elsewhere.example' }), env)).status).toBe(403);
    expect((await worker.fetch(post('contact-us', validBody, { 'Idempotency-Key': 'invalid' }), env)).status).toBe(400);
    expect((await worker.fetch(post('contact-us', { _gotcha: 'spam' }), env)).status).toBe(200);
    expect((await worker.fetch(post('contact-us', validBody), env)).status).toBe(429);
    expect(upstream).not.toHaveBeenCalled();
  });

  it('fails closed for missing credentials or an unconfirmed provider response and uses the same retry key', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const upstream = vi.fn<typeof fetch>()
      .mockResolvedValueOnce(Response.json({ message: 'private provider detail' }, { status: 403 }))
      .mockResolvedValueOnce(Response.json({}))
      .mockResolvedValueOnce(Response.json({ id: 'receipt-2' }));
    vi.stubGlobal('fetch', upstream);
    const env = mockEnv();
    expect((await worker.fetch(post('contact-us', validBody), { ...env, RESEND_API_KEY: undefined })).status).toBe(503);
    expect(upstream).not.toHaveBeenCalled();
    const failed = await worker.fetch(post('contact-us', validBody), env);
    expect(failed.status).toBe(502);
    expect(await failed.text()).not.toContain('private provider detail');
    expect((await worker.fetch(post('contact-us', validBody), env)).status).toBe(502);
    expect((await worker.fetch(post('contact-us', validBody), env)).status).toBe(200);
    expect(upstream.mock.calls.map(([, init]) => new Headers(init?.headers).get('Idempotency-Key'))).toEqual(
      Array(3).fill(`aravind/contact-us/${key}`),
    );
  });
});
