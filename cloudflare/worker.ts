import manifest from '../public/airo-media.json';
import formConfig from '../src/lib/contact-form.config.json';
import { ALLOWED_IMAGE_REDIRECT_HOSTS, ALLOWED_VIDEO_REDIRECT_HOSTS } from '../export-plugins/media-redirect-policy.js';
import { parseSlotPath, resolveSlotTargetUrl } from '../export-plugins/media-slot-selection.js';

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  CONTACT_RATE_LIMIT: { limit(options: { key: string }): Promise<{ success: boolean }> };
  GODADDY_API_BASE_URL?: string;
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
  return JSON.parse(new TextDecoder().decode(buffer.subarray(0, length))) as {
    _gotcha?: unknown;
    user?: { email?: string; mobile?: string; name?: string };
    conversation?: { messages_attributes?: { body?: string }[]; data?: Record<string, unknown> };
  } | null;
}

async function submitContact(request: Request, url: URL, env: Env, name: string): Promise<Response> {
  if (request.method !== 'POST') return fail('Method not allowed', 405, { Allow: 'POST' });
  const origin = request.headers.get('Origin');
  if (origin && origin !== url.origin) return fail('Invalid origin', 403);
  if (!Object.hasOwn(formConfig.forms, name)) return fail('Form not configured', 404);
  if (request.headers.get('Content-Type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    return fail('Expected JSON', 415);
  }

  let body;
  try {
    body = await readContactBody(request);
  } catch (error) {
    return error instanceof RangeError ? fail('Request too large', 413) : fail('Invalid JSON', 400);
  }
  if (body?._gotcha) return Response.json({ success: true });
  const user = body?.user;
  if (!(typeof user?.email === 'string' && user.email.trim()) && !(typeof user?.mobile === 'string' && user.mobile.trim())) {
    return fail('user.email or user.mobile is required', 400);
  }
  const message = body?.conversation?.messages_attributes?.[0]?.body;
  if (typeof message !== 'string' || !message.trim()) return fail('conversation message body is required', 400);

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (!(await env.CONTACT_RATE_LIMIT.limit({ key: ip })).success) return fail('Too many requests', 429);

  const config = formConfig.forms[name as keyof typeof formConfig.forms] as {
    brandId: string; categoryId: number | string; overrideEmail?: string;
  };
  const base = env.GODADDY_API_BASE_URL ?? '';
  const inboxHost = base.includes('dev-godaddy.com') ? 'reamaze.dev-godaddy.com'
    : base.includes('test-godaddy.com') ? 'reamaze.test-godaddy.com' : 'reamaze.godaddy.com';
  const payload = {
    conversation: {
      message: { body: message },
      category_id: config.categoryId,
      user,
      data: {
        ...body?.conversation?.data,
        __gd_contact_form_title: body?.conversation?.data?.__gd_contact_form_title ?? name,
        __gd_type: 'contact',
        // Never let a visitor select an arbitrary delivery address.
        __gd_override_email: config.overrideEmail,
      },
    },
  };
  try {
    const response = await fetch(`https://${config.brandId}.${inboxHost}/api/v2/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Airo-Contact-Form': 'true', 'X-Forwarded-For': ip },
      body: JSON.stringify(payload),
      redirect: 'error',
      signal: AbortSignal.timeout(10000),
    });
    await response.body?.cancel();
    if (response.ok) return Response.json({ success: true });
    console.error('[contact] Inbox returned status', response.status);
  } catch {
    console.error('[contact] Unable to reach Inbox');
  }
  return fail('Failed to submit contact form', 502);
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
