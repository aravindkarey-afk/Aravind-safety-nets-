export type EnquiryForm = 'contact-us' | 'quote-request';

export const enquiryLimits = { name: 100, phone: 32, email: 254, message: 4000, service: 120, location: 160 } as const;
const fields = ['name', 'phone', 'email', 'message', 'service', 'location'] as const;

type EnquiryField = (typeof fields)[number];
export type Enquiry = Record<EnquiryField, string>;

export function validateEnquiry(body: unknown, form: EnquiryForm): { data: Enquiry } | { field: EnquiryField; error: string } {
  const input = body && typeof body === 'object' ? body as Partial<Record<EnquiryField, unknown>> : {};
  const data: Enquiry = { name: '', phone: '', email: '', message: '', service: '', location: '' };
  for (const field of fields) {
    const value = input[field];
    if (value == null) continue;
    if (typeof value !== 'string') return { field, error: `Please enter a valid ${field}.` };
    data[field] = value.trim();
    if (data[field].length > enquiryLimits[field]) {
      return { field, error: `Please keep the ${field} under ${enquiryLimits[field] + 1} characters.` };
    }
  }

  if (!/\p{L}/u.test(data.name) || /[\x00-\x1f\x7f]/.test(data.name)) {
    return { field: 'name', error: 'Please enter your name.' };
  }
  const digits = data.phone.replace(/\D/g, '');
  if (!/^\+?[0-9()\s.-]+$/.test(data.phone) || digits.length < 10 || digits.length > 15) {
    return { field: 'phone', error: 'Please enter a phone number with 10 to 15 digits, including the country code if needed.' };
  }
  data.phone = (data.phone.startsWith('+') ? '+' : '') + digits;
  if (!/^[^\s@<>]+@[^\s@<>.]+(?:\.[^\s@<>.]+)+$/u.test(data.email) || /[\x00-\x1f\x7f]/.test(data.email)) {
    return { field: 'email', error: 'Please enter a valid email address.' };
  }
  if (form === 'contact-us' && !data.message) return { field: 'message', error: 'Please enter a message.' };
  if (form === 'quote-request' && !data.service) return { field: 'service', error: 'Please select a service.' };
  return { data };
}
