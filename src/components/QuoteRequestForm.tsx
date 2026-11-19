import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const SERVICE_OPTIONS = [
  'Pigeon Safety Nets',
  'Children Safety Nets',
  'Invisible Grills',
  'Balcony Safety Nets',
  'Duct Area Nets',
  'Monkey Safety Nets',
  'Cloth Hangers',
  'Other / Not Sure',
];

export default function QuoteRequestForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot check
    if (formData.get('_gotcha')) return;

    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const service = String(formData.get('service') ?? '').trim();
    const location = String(formData.get('location') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    setStatus('sending');
    setErrorMsg('');

    try {
      // Field mapping: only the message textarea goes in messages_attributes[0].body.
      // All other fields (dropdowns, radios, checkboxes) must be added to conversation.data as { "Label": value } pairs.
      const res = await fetch('/api/contact/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation: {
            messages_attributes: [
              { body: message || 'New quote request submission' },
            ],
            data: {
              __gd_contact_form_title: 'Get Free Quote',
              'Service Required': service,
              'Phone Number': phone,
              'Location / Area': location,
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
      setErrorMsg(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Quote Request Sent!</h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          We've received your request and will call you back shortly. You can also reach us directly at{' '}
          <a href="tel:9491173428" className="text-accent font-semibold">
            9491173428
          </a>
          .
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-2 text-sm text-accent underline underline-offset-2 hover:text-accent/80 transition-colors"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {/* Honeypot — never included in POST body */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: 'absolute', left: '-9999px' }}
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="qf-name" className="text-sm font-semibold text-foreground">
            Full Name <span className="text-accent">*</span>
          </label>
          <input
            id="qf-name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="qf-phone" className="text-sm font-semibold text-foreground">
            Phone Number <span className="text-accent">*</span>
          </label>
          <input
            id="qf-phone"
            name="phone"
            type="tel"
            required
            placeholder="e.g. 9491173428"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="qf-email" className="text-sm font-semibold text-foreground">
          Email Address <span className="text-accent">*</span>
        </label>
        <input
          id="qf-email"
          name="email"
          type="email"
          required
          placeholder="your@email.com"
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Service */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="qf-service" className="text-sm font-semibold text-foreground">
            Service Required <span className="text-accent">*</span>
          </label>
          <select
            id="qf-service"
            name="service"
            required
            defaultValue=""
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors appearance-none cursor-pointer"
          >
            <option value="" disabled>
              Select a service…
            </option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="qf-location" className="text-sm font-semibold text-foreground">
            Your Area / Location
          </label>
          <input
            id="qf-location"
            name="location"
            type="text"
            placeholder="e.g. Banjara Hills, Hyderabad"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
          />
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="qf-message" className="text-sm font-semibold text-foreground">
          Additional Details
        </label>
        <textarea
          id="qf-message"
          name="message"
          rows={3}
          placeholder="Tell us more — floor number, number of windows, balcony size, etc."
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors resize-none"
        />
      </div>

      {/* Error */}
      {status === 'error' && (
        <div role="alert" className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 px-4 py-3 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-4 rounded-xl font-bold text-base hover:bg-accent/90 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-100 shadow-lg shadow-accent/20"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Sending…</span>
          </>
        ) : (
          <span>Get My Free Quote</span>
        )}
      </button>

      <p className="text-xs text-muted-foreground text-center">
        We'll call you back within a few hours. No spam, ever.
      </p>
    </form>
  );
}
