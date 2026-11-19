import { Helmet } from '@dr.pogodin/react-helmet';
import { ArrowRight, Bird, Camera, ChevronDown, Grid3X3, MapPin, MessageCircle, Phone, Ruler, Shield, View } from 'lucide-react';
import { Link } from 'react-router';
import { bandlagudaFaqs, bandlagudaJagir, bandlagudaPlace, bandlagudaServices } from '@/lib/bandlaguda-jagir';
import { siteMeta, siteOrigin } from '@/lib/site-meta';

const title = 'Invisible Grills & Safety Nets in Bandlaguda Jagir | Aravind';
const description = 'Need invisible grills or balcony safety nets in Bandlaguda Jagir, Hyderabad? Get a quote for window grills, pigeon protection or child safety net installation.';
const url = `${siteOrigin}${bandlagudaJagir.path}`;
const businessId = `${siteOrigin}/#organization`;
const icons = { 'invisible-grills': View, 'balcony-safety-nets': Grid3X3, 'pigeon-safety-nets': Bird, 'children-safety-nets': Shield };

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': businessId,
      name: siteMeta.name,
      url: `${siteOrigin}/`,
      telephone: bandlagudaJagir.telephone,
      areaServed: bandlagudaPlace,
    },
    ...bandlagudaServices.map((service) => ({
      '@type': 'Service',
      '@id': `${url}#${service.slug}`,
      name: service.name,
      serviceType: service.name,
      description: service.description,
      url: `${url}#${service.slug}`,
      areaServed: bandlagudaPlace,
      provider: { '@id': businessId },
    })),
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteOrigin}/` },
        { '@type': 'ListItem', position: 2, name: bandlagudaJagir.name, item: url },
      ],
    },
  ],
};

const buttonClasses = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';

function ContactActions() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
      <a href={`tel:${bandlagudaJagir.telephone}`} className={`${buttonClasses} bg-accent text-primary hover:bg-yellow-300`}>
        <Phone className="h-4 w-4" aria-hidden="true" /> Call Now
      </a>
      <a href={bandlagudaJagir.whatsapp} className={`${buttonClasses} bg-emerald-100 text-emerald-950 hover:bg-emerald-200`}>
        <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
      </a>
    </div>
  );
}

export default function BandlagudaJagirPage() {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteMeta.name} />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${siteOrigin}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(structuredData).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <main>
        <section className="bg-primary bg-gradient-to-br from-primary to-secondary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 md:pt-28 lg:px-8 lg:pb-20">
            <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/85">
              <Link to="/" className="underline decoration-white/50 underline-offset-4 hover:text-white">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Bandlaguda Jagir</span>
            </nav>
            <div className="grid items-center gap-9 lg:grid-cols-[3fr_2fr] lg:gap-16">
              <div>
                <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-white">
                  <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" /> Hyderabad, Telangana
                </p>
                <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  Invisible Grills &amp; Safety Nets in <span className="text-accent">Bandlaguda Jagir</span>
                </h1>
                <p className="mb-6 mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
                  Aravind Safety Nets installs balcony nets, pigeon protection and invisible grills for windows and balconies. Tell us what you need to protect, and we’ll help you compare options for your home.
                </p>
                <ContactActions />
                <p className="mt-4 text-sm text-white/85">{bandlagudaJagir.displayTelephone} · Call or message for a quote</p>
              </div>

              <aside aria-labelledby="local-quote-prep" className="rounded-3xl border border-white/15 bg-white/10 p-5 sm:p-7">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">Before you message us</p>
                <h2 id="local-quote-prep" className="mb-4 text-xl font-bold sm:text-2xl">What to share for a quote</h2>
                <ul className="space-y-3">
                  {[
                    { Icon: MapPin, text: 'Your locality and the type of opening: balcony, window, or utility ledge.' },
                    { Icon: Camera, text: 'A wide photo showing the opening and the surfaces around it.' },
                    { Icon: Ruler, text: 'Approximate width and height, if you can measure safely from inside.' },
                  ].map(({ Icon, text }) => (
                    <li key={text} className="flex items-start gap-3 rounded-xl bg-white/10 p-3 text-sm leading-relaxed text-white/90">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" /> {text}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section aria-labelledby="local-services" className="bg-background py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Window &amp; balcony safety</p>
            <h2 id="local-services" className="text-2xl font-bold text-primary sm:text-4xl">Balcony Safety Solutions in Bandlaguda Jagir</h2>
            <p className="mb-7 mt-3 max-w-3xl leading-relaxed text-muted-foreground">
              Start with the opening and the problem you want to solve. These are the options we can discuss for homes and apartments in the area.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {bandlagudaServices.map((service) => {
                const Icon = icons[service.slug];
                return (
                  <article key={service.slug} id={service.slug} className="flex scroll-mt-24 flex-col rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mb-2 text-lg font-bold text-primary sm:text-xl">{service.name}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">{service.description}</p>
                    <Link to={`/services/${service.slug}`} className="mt-4 inline-flex min-h-11 items-center gap-2 self-start text-sm font-bold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">
                      {service.linkLabel} <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section aria-labelledby="local-faqs" className="bg-muted py-12 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_2fr] lg:gap-12 lg:px-8">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Installation FAQs</p>
              <h2 id="local-faqs" className="text-2xl font-bold text-primary sm:text-3xl">Questions before you book</h2>
            </div>
            <div className="space-y-3">
              {bandlagudaFaqs.map(({ question, answer }) => (
                <details key={question} className="group rounded-xl border border-border bg-card">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary sm:px-5 sm:text-base [&::-webkit-details-marker]:hidden">
                    {question}
                    <ChevronDown className="h-5 w-5 shrink-0 group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground sm:px-5 sm:text-base">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="local-contact" className="bg-primary py-12 text-primary-foreground sm:py-16">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <h2 id="local-contact" className="text-2xl font-bold sm:text-3xl">Planning an installation in Bandlaguda Jagir?</h2>
              <p className="mt-3 max-w-lg leading-relaxed text-white/90">
                Call to discuss your options, send photos on WhatsApp, or <Link to="/contact" className="font-semibold text-accent underline underline-offset-4">use our contact form</Link>.
              </p>
            </div>
            <ContactActions />
          </div>
        </section>
      </main>
    </>
  );
}
