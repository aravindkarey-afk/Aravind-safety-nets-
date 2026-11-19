import { siteOrigin as site } from '@/lib/site-meta';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { CheckCircle, Phone, MessageCircle, ArrowRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import QuoteRequestForm from '@/components/QuoteRequestForm';

interface Benefit { id: string; text: string; }
interface Step { id: string; step: string; title: string; description: string; }
interface Faq { id: string; question: string; answer: string; }

interface ServicePageProps {
  slug: string;
  name: string;
  tagline: string;
  heroImage: string;
  description: string;
  benefits: Benefit[];
  process: Step[];
  faqs: Faq[];
}


export default function ServicePage({
  slug, name, tagline, heroImage, description, benefits, process, faqs,
}: ServicePageProps) {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const url = `${site}/services/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    description,
    provider: { '@id': `${site}/#organization` },
    areaServed: { '@type': 'City', name: 'Hyderabad' },
    url,
  };

  return (
    <>
      <Helmet>
        <title>{name} in Hyderabad — Aravind Safety Nets</title>
        <meta name="description" content={`${tagline}. Professional ${name.toLowerCase()} installation across Hyderabad. Free site visit & quote. Call 9491173428.`} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={`${name} — Aravind Safety Nets`} />
        <meta property="og:description" content={`${tagline}. Expert installation in Hyderabad. Call 9491173428.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main>
        {/* ── Hero ── */}
        <section className="relative min-h-[60vh] flex items-end bg-primary pt-20">
          <div className="absolute inset-0 pointer-events-none">
            <img
              src={`/airo-assets/images/${heroImage}`}
              alt={name}
              className="w-full h-full object-cover opacity-30"
              loading="eager"
              fetchPriority="high"
              width={1400}
              height={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-14 pt-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-accent text-sm font-semibold mb-4 hover:text-accent/80 transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span>All Services</span>
              </Link>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary-foreground leading-tight mb-3">
                {name}
              </h1>
              <p className="text-primary-foreground/75 text-xl max-w-xl mb-8">{tagline}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:9491173428"
                  className="flex items-center gap-2 bg-accent text-accent-foreground px-5 py-3 rounded-xl font-semibold text-sm hover:bg-accent/90 transition-all hover:scale-105 shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
                <a
                  href="https://wa.me/919491173428?text=Hello%20Aravind%20Safety%20Nets%2C%20I%20would%20like%20a%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-whatsapp text-whatsapp-foreground px-5 py-3 rounded-xl font-semibold text-sm hover:bg-whatsapp/90 transition-all hover:scale-105 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Description + Benefits ── */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <span className="text-accent text-sm font-semibold uppercase tracking-wide">About this service</span>
                <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-2 mb-4">What we offer</h2>
                <p className="text-muted-foreground text-base leading-relaxed">{description}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              >
                <span className="text-accent text-sm font-semibold uppercase tracking-wide">Key benefits</span>
                <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-2 mb-5">Why choose us</h2>
                <ul className="flex flex-col gap-3">
                  {benefits.map((b) => (
                    <li key={b.id} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm font-medium">{b.text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="py-16 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-center mb-10"
            >
              <span className="text-accent text-sm font-semibold uppercase tracking-wide">How it works</span>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-2">Our installation process</h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                  className="bg-card border border-border rounded-2xl p-6 relative"
                >
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center font-black text-lg mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-foreground text-base mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  {i < process.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-accent z-10" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQs ── */}
        <section className="py-16 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-center mb-10"
            >
              <span className="text-accent text-sm font-semibold uppercase tracking-wide">FAQs</span>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-2">Common questions</h2>
            </motion.div>
            <div className="flex flex-col gap-3">
              {faqs.map((faq) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="bg-card border border-border rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                    aria-expanded={openFaq === faq.id}
                  >
                    <span className="font-semibold text-foreground text-sm">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-accent shrink-0 transition-transform duration-200 ${openFaq === faq.id ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === faq.id && (
                    <div className="px-6 pb-5">
                      <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Quote Form ── */}
        <section className="py-16 bg-muted">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm"
            >
              <h2 className="text-2xl font-black text-foreground mb-1">Get a Free Quote</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Interested in <span className="font-semibold text-foreground">{name}</span>? Fill in your details and we'll call you back.
              </p>
              <QuoteRequestForm />
            </motion.div>
          </div>
        </section>

        {/* ── Sticky Call Bar ── */}
        <div className="sticky bottom-0 z-40 bg-primary border-t-2 border-accent shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-primary-foreground text-sm font-semibold text-center sm:text-left">
              Ready to install <span className="text-accent">{name}</span>? Contact us now!
            </p>
            <div className="flex gap-3 shrink-0">
              <a
                href="tel:9491173428"
                className="flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-accent/90 transition-all hover:scale-105 shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
              <a
                href="https://wa.me/919491173428?text=Hello%20Aravind%20Safety%20Nets%2C%20I%20would%20like%20a%20quote."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-whatsapp text-whatsapp-foreground px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-whatsapp/90 transition-all hover:scale-105 shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
