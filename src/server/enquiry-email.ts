import { validateEnquiry, type EnquiryForm } from '../lib/enquiry';

export interface EnquiryEmailEnv {
  RESEND_API_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
}

const recipient = 'aravindsafetynets@gmail.com';
const recipientFailure = 'We could not confirm your enquiry was sent. Please try again or contact us by phone or WhatsApp.';
const enquiryTitles = { 'contact-us': 'Website enquiry', 'quote-request': 'Website quote request' };
const noStore = { 'Cache-Control': 'no-store' };
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isEnquiryForm(name: string): name is EnquiryForm {
  return Object.hasOwn(enquiryTitles, name);
}

export function enquiryError(error: string, status: number, headers?: Record<string, string>) {
  return Response.json({ success: false, error }, { status, headers: { ...noStore, ...headers } });
}

const accepted = () => Response.json({ success: true }, { headers: noStore });

export async function deliverEnquiry(
  form: EnquiryForm, body: unknown, submissionId: string | null, env: EnquiryEmailEnv, allow: () => Promise<boolean>,
) {
  if (body && typeof body === 'object' && '_gotcha' in body && body._gotcha) {
    return enquiryError('Unable to submit this enquiry.', 400);
  }

  const result = validateEnquiry(body, form);
  if ('error' in result) return enquiryError(result.error, 400);
  if (!submissionId || !uuid.test(submissionId)) {
    return enquiryError('Please reload the page and submit the form again.', 400);
  }
  const { RESEND_API_KEY, CONTACT_FROM_EMAIL } = env;
  if (!RESEND_API_KEY?.trim() || !CONTACT_FROM_EMAIL?.trim()) {
    const missing = [
      ...(!RESEND_API_KEY?.trim() ? ['RESEND_API_KEY'] : []),
      ...(!CONTACT_FROM_EMAIL?.trim() ? ['CONTACT_FROM_EMAIL'] : []),
    ];
    console.error('[contact] Missing email transport configuration', { missing });
    return enquiryError('The form is temporarily unavailable. Please contact us by phone or WhatsApp.', 503);
  }
  try {
    if (!(await allow())) return enquiryError('Too many submissions. Please wait a minute and try again.', 429, { 'Retry-After': '60' });
    const { name, phone, email, message, service, location } = result.data;
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY.trim()}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `aravind/${form}/${submissionId.toLowerCase()}`,
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL.trim(),
        to: [recipient],
        reply_to: email,
        subject: `${enquiryTitles[form]} — Aravind Safety Nets`,
        text: [
          `Name: ${name}`, `Phone: ${phone}`, `Email: ${email}`,
          ...(service ? [`Service: ${service}`] : []),
          ...(location ? [`Location: ${location}`] : []),
          '', 'Message:', message || '(No additional details provided)',
        ].join('\n'),
      }),
      // Workers does not support redirect: 'error'. Don't follow redirects with credentials.
      redirect: 'manual',
      signal: AbortSignal.timeout(10_000),
    });
    if (response.ok) {
      const receipt = await response.json() as { id?: unknown } | null;
      if (typeof receipt?.id === 'string' && receipt.id.trim()) return accepted();
    } else {
      await response.body?.cancel();
    }
    // Do not log the provider response body, visitor data, or credentials.
    console.error('[contact] Email provider did not confirm acceptance', { status: response.status });
    if (response.status === 409) {
      return enquiryError('This enquiry may still be sending. Wait a moment and retry without changing the form.', 409);
    }
  } catch {
    console.error('[contact] Could not confirm email delivery');
  }
  return enquiryError(recipientFailure, 502);
}
