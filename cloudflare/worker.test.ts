// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest';
import worker from './worker';

const origin = 'https://aravindsafetynets.in';
const validBody = {
  user: { email: 'test@example.com', name: 'Test' },
  conversation: { messages_attributes: [{ body: 'Quote please' }], data: { Service: 'Balcony' } },
};
const mockEnv = (success = true) => ({
  ASSETS: { fetch: vi.fn(async (_request: Request) => new Response('asset', { headers: { 'Content-Type': 'image/png' } })) },
  CONTACT_RATE_LIMIT: { limit: vi.fn(async () => ({ success })) },
});
const post = (name: string, body: unknown) => new Request(`${origin}/api/contact/${name}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Origin: origin, 'CF-Connecting-IP': '192.0.2.1' },
  body: JSON.stringify(body),
});

afterEach(() => vi.unstubAllGlobals());

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

  it.each(['contact-us', 'quote-request'])('forwards %s to the existing GoDaddy Inbox', async (name) => {
    const upstream = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal('fetch', upstream);
    const env = mockEnv();
    const response = await worker.fetch(post(name, validBody), env);
    expect(await response.json()).toEqual({ success: true });
    expect(env.CONTACT_RATE_LIMIT.limit).toHaveBeenCalledWith({ key: '192.0.2.1' });
    const [url, init] = upstream.mock.calls[0];
    expect(url).toBe('https://b7898c0f-8f9a-4a24-aa9d-8981ee46daae.reamaze.godaddy.com/api/v2/contact');
    expect(JSON.parse(String(init?.body))).toEqual({ conversation: {
      message: { body: 'Quote please' }, category_id: 89632489, user: validBody.user,
      data: { Service: 'Balcony', __gd_contact_form_title: name, __gd_type: 'contact' },
    } });
  });

  it('rejects invalid, oversized and rate-limited requests and silently drops honeypots', async () => {
    const upstream = vi.fn();
    vi.stubGlobal('fetch', upstream);
    const env = mockEnv(false);
    expect((await worker.fetch(post('contact-us', {}), env)).status).toBe(400);
    expect((await worker.fetch(post('contact-us', { extra: 'x'.repeat(110000) }), env)).status).toBe(413);
    expect((await worker.fetch(post('contact-us', { _gotcha: 'spam' }), env)).status).toBe(200);
    expect((await worker.fetch(post('contact-us', validBody), env)).status).toBe(429);
    expect(upstream).not.toHaveBeenCalled();
  });
});
