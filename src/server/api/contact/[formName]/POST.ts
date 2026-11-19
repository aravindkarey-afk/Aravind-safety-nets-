import type { Request, Response } from 'express';
import { deliverEnquiry, enquiryError, isEnquiryForm } from '../../../enquiry-email';

export default async function handler(req: Request, res: Response): Promise<void> {
  const name = String(req.params.formName);
  const origin = req.get('origin');
  const host = req.get('host');
  const forwardedHost = req.get('x-forwarded-host');
  const result = origin && origin !== `${req.protocol}://${forwardedHost || host}` && origin !== `${req.protocol}://${host}`
    ? enquiryError('Invalid origin', 403)
    : !isEnquiryForm(name)
      ? enquiryError('Form not found', 404)
      : !req.is('application/json')
        ? enquiryError('Expected JSON', 415)
        // Production rate limiting is enforced by the Cloudflare Worker binding.
        // The Vite development server must not send live customer email.
        : await deliverEnquiry(name, req.body, req.get('idempotency-key') ?? null, {}, async () => false);
  for (const [header, value] of result.headers) res.setHeader(header, value);
  res.status(result.status).send(await result.text());
}
