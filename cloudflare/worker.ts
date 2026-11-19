import manifest from '../public/airo-media.json';
import { deliverEnquiry, enquiryError, isEnquiryForm, type EnquiryEmailEnv } from '../src/server/enquiry-email';
import { ALLOWED_IMAGE_REDIRECT_HOSTS, ALLOWED_VIDEO_REDIRECT_HOSTS } from '../export-plugins/media-redirect-policy.js';
import { parseSlotPath, resolveSlotTargetUrl } from '../export-plugins/media-slot-selection.js';

interface Env extends EnquiryEmailEnv {
  ASSETS: { fetch(request: Request): Promise<Response> };
  CONTACT_RATE_LIMIT: { limit(options: { key: string }): Promise<{ success: boolean }> };
}

const UPLOAD_PREFIX = '/airo-assets/uploads/';
const fail = (error: string, status: number, headers?: HeadersInit) =>
  Response.json({ success: false, error }, { status, headers });

async function serveMedia(request: Request, url: URL, env: Env): Promise<Response> {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return fail('Method not allowed', 405, { Allow: 'GET, HEAD' });
  }

  let target = url.pathname;
  if (!target.startsWith(UPLOAD_PREFIX)) {
    const image = parseSlotPath(target, '/airo-assets/images/');
    const slot = image ?? parseSlotPath(target, '/airo-assets/videos/');
    if (!slot || !Object.hasOwn(manifest, slot.slotPath)) return fail('Media not found', 404);
    target = resolveSlotTargetUrl(manifest[slot.slotPath as keyof typeof manifest], slot.surfaceVariant, url.searchParams.get('src'));
    if (!target.startsWith(UPLOAD_PREFIX)) {
      const hosts = image ? ALLOWED_IMAGE_REDIRECT_HOSTS : ALLOWED_VIDEO_REDIRECT_HOSTS;
      if (!URL.canParse(target)) return fail('Media not found', 404);
      const remote = new URL(target);
      if (remote.protocol !== 'https:' || remote.port || !hosts.has(remote.hostname)) return fail('Media not found', 404);
      return new Response(null, { status: 302, headers: { Location: remote.href, 'Cache-Control': 'no-cache' } });
    }
  }

  const name = target.slice(UPLOAD_PREFIX.length);
  if (!/^[a-z0-9][a-z0-9_.-]*$/i.test(name) || name.includes('..')) return fail('Media not found', 404);
  for (const dir of ['media', 'uploads']) {
    const asset = new Request(new URL(`/assets/${dir}/${name}`, url), request);
    const response = await env.ASSETS.fetch(asset);
    if (response.status !== 404) return response;
    await response.body?.cancel();
  }
  return fail('Media not found', 404);
}

const MAX_CONTACT_BYTES = 100 * 1024;

async function readContactBody(request: Request) {
  const reader = request.body?.getReader();
  const buffer = new Uint8Array(MAX_CONTACT_BYTES);
  let length = 0;
  if (reader) {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (length + value.byteLength > buffer.length) {
          await reader.cancel();
          throw new RangeError('Contact body too large');
        }
        buffer.set(value, length);
        length += value.byteLength;
      }
    } finally {
      reader.releaseLock();
    }
  }
  return JSON.parse(new TextDecoder().decode(buffer.subarray(0, length))) as unknown;
}

async function submitContact(request: Request, url: URL, env: Env, name: string): Promise<Response> {
  if (request.method !== 'POST') return enquiryError('Method not allowed', 405, { Allow: 'POST' });
  const origin = request.headers.get('Origin');
  if (origin && origin !== url.origin) return enquiryError('Invalid origin', 403);
  if (!isEnquiryForm(name)) return enquiryError('Form not found', 404);
  if (request.headers.get('Content-Type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    return enquiryError('Expected JSON', 415);
  }

  let body: unknown;
  try {
    body = await readContactBody(request);
  } catch (error) {
    return error instanceof RangeError ? enquiryError('Request too large', 413) : enquiryError('Invalid JSON', 400);
  }

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  return deliverEnquiry(name, body, request.headers.get('Idempotency-Key'), env, async () =>
    (await env.CONTACT_RATE_LIMIT.limit({ key: ip })).success,
  );
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/airo-assets/')) return serveMedia(request, url, env);
    if (url.pathname === '/api/health') {
      if (request.method !== 'GET') return fail('Method not allowed', 405, { Allow: 'GET' });
      return Response.json({ status: 'ok', timestamp: new Date().toISOString(), message: 'Hello World!' });
    }
    const match = /^\/api\/contact\/([^/]+)$/.exec(url.pathname);
    if (match) return submitContact(request, url, env, match[1]);
    if (url.pathname.startsWith('/api/')) return fail('Not found', 404);
    return env.ASSETS.fetch(request);
  },
};
