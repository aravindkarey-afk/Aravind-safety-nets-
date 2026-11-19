import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle, Loader2 } from 'lucide-react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const serviceOptions = [
  'Pigeon Safety Nets',
  'Children Safety Nets',
  'Invisible Grills',
  'Balcony Safety Nets',
  'Duct Area Nets',
  'Monkey Safety Nets',
  'Cloth Hangers',
  'Not sure — need advice',
];

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);
    if (formData.get('_gotcha')) return;

    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const service = String(formData.get('service') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    setStatus('sending');
    setErrorMsg('');

    try {
      // Field mapping: only the message textarea goes in messages_attributes[0].body.
      // All other fields (dropdowns, radios, checkboxes) must be added to conversation.data as { "Label": value } pairs.
      const res = await fetch('/api/contact/contact-us', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation: {
            messages_attributes: [{ body: message || 'New contact form submission' }],
            data: {
              __gd_contact_form_title: 'Contact Us',
              'Phone Number': phone,
              'Service Interested In': service,
            },
          },
          user: { email, name },
        }),
      });

      const json = await res.json();
      if (json.success) {
        setStatus('success');
        form.reset();
        navigate('/thank-you');
      } else {
        throw new Error(json.error || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-xl font-black text-foreground">Message sent!</h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          Thank you! We'll get back to you within a few hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-accent text-sm font-semibold hover:underline mt-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: 'absolute', left: '-9999px' }}
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-name" className="text-sm font-semibold text-foreground">
            Full name <span className="text-accent">*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-phone" className="text-sm font-semibold text-foreground">
            Phone number <span className="text-accent">*</span>
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            required
            placeholder="Your phone number"
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-email" className="text-sm font-semibold text-foreground">
          Email address
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          placeholder="Your email address"
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-service" className="text-sm font-semibold text-foreground">
          Service interested in
        </label>
        <select
          id="cf-service"
          name="service"
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition"
        >
          <option value="">Select a service…</option>
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-message" className="text-sm font-semibold text-foreground">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          placeholder="Tell us about your requirement (location, type of property, etc.)"
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition resize-none"
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-destructive bg-destructive/10 px-4 py-2.5 rounded-xl">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-xl font-bold text-sm hover:bg-accent/90 transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-md"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending…</span>
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}
