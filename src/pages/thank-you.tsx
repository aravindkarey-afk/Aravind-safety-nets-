import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router';
import { CheckCircle, Phone, MessageCircle, Home, ArrowLeft } from 'lucide-react';
import { thank_you } from 'virtual:content';

export default function ThankYouPage() {
  const whatsappUrl =
    'https://wa.me/919491173428?text=Hello%20Aravind%20Safety%20Nets%2C%20I%20would%20like%20a%20quote.';

  return (
    <>
      <Helmet>
        <title>Thank You – Aravind Safety Nets</title>
        <meta
          name="description"
          content="Thank you for contacting Aravind Safety Nets. We have received your enquiry and will get back to you shortly."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-background">
        <div className="max-w-lg w-full text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Heading */}
          <h1
            className="text-3xl md:text-4xl font-bold text-primary mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {thank_you.heading}
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            {thank_you.subheading}
          </p>
          <p className="text-muted-foreground mb-8">
            {thank_you.body}
          </p>

          {/* Divider */}
          <div className="border-t border-border mb-8" />

          {/* Contact options */}
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
            {thank_you.fasterResponseLabel}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <a
              href="tel:+919491173428"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'hsl(var(--primary))' }}
            >
              <Phone className="w-4 h-4" />
              <span>{thank_you.callLabel}</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 bg-whatsapp"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{thank_you.whatsappLabel}</span>
            </a>
          </div>

          {/* Navigation links */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>{thank_you.backHomeLabel}</span>
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{thank_you.viewServicesLabel}</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
