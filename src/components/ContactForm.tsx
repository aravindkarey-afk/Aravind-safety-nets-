import { Loader2 } from 'lucide-react';
import { enquiryLimits } from '@/lib/enquiry';
import { useEnquiryForm } from '@/lib/use-enquiry-form';

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
  const { handleSubmit, sending, errorMsg } = useEnquiryForm('contact-us');

  return (
    <form onSubmit={handleSubmit} method="post" aria-busy={sending} noValidate>
      <fieldset disabled={sending} className="flex min-w-0 flex-col gap-4">
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
              maxLength={enquiryLimits.name}
              autoComplete="name"
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
              maxLength={enquiryLimits.phone}
              autoComplete="tel"
              type="tel"
              required
              placeholder="Your phone number"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-email" className="text-sm font-semibold text-foreground">
            Email address <span className="text-accent">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            maxLength={enquiryLimits.email}
            autoComplete="email"
            type="email"
            required
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
            Message <span className="text-accent">*</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            maxLength={enquiryLimits.message}
            rows={4}
            required
            placeholder="Tell us about your requirement (location, type of property, etc.)"
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition resize-none"
          />
        </div>

        {errorMsg && (
          <p role="alert" className="text-sm text-destructive bg-destructive/10 px-4 py-2.5 rounded-xl">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={sending}
          className="flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-xl font-bold text-sm hover:bg-accent/90 transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-md"
        >
          {sending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending…</span>
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </fieldset>
    </form>
  );
}
