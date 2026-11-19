import { Loader2, AlertCircle } from 'lucide-react';
import { enquiryLimits } from '@/lib/enquiry';
import { useEnquiryForm } from '@/lib/use-enquiry-form';

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
  const { handleSubmit, sending, errorMsg } = useEnquiryForm('quote-request');

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
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="qf-name" className="text-sm font-semibold text-foreground">
              Full Name <span className="text-accent">*</span>
            </label>
            <input
              id="qf-name"
              name="name"
              maxLength={enquiryLimits.name}
              autoComplete="name"
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
              maxLength={enquiryLimits.phone}
              autoComplete="tel"
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
            maxLength={enquiryLimits.email}
            autoComplete="email"
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
              maxLength={enquiryLimits.location}
              autoComplete="address-level3"
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
            maxLength={enquiryLimits.message}
            rows={3}
            placeholder="Tell us more — floor number, number of windows, balcony size, etc."
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors resize-none"
          />
        </div>

        {/* Error */}
        {errorMsg && (
          <div role="alert" className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 px-4 py-3 rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={sending}
          className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-4 rounded-xl font-bold text-base hover:bg-accent/90 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-100 shadow-lg shadow-accent/20"
        >
          {sending ? (
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
      </fieldset>
    </form>
  );
}
