import { siteOrigin as site } from '@/lib/site-meta';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Bird, Baby, Eye, Grid3X3, Wind, Shield, Shirt, Phone, MessageCircle } from 'lucide-react';
import { services } from 'virtual:content';
import { ContentListContext } from '@airo/content';

const serviceIcons: Record<string, React.ReactNode> = {
  'Pigeon Safety Nets': <Bird className="w-7 h-7" />,
  'Children Safety Nets': <Baby className="w-7 h-7" />,
  'Invisible Grills': <Eye className="w-7 h-7" />,
  'Balcony Safety Nets': <Grid3X3 className="w-7 h-7" />,
  'Duct Area Nets': <Wind className="w-7 h-7" />,
  'Monkey Safety Nets': <Shield className="w-7 h-7" />,
  'Cloth Hangers': <Shirt className="w-7 h-7" />,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${site}/services#webpage`,
  name: 'Safety Net Services in Hyderabad — Aravind Safety Nets',
  url: `${site}/services`,
  isPartOf: { '@id': `${site}/#website` },
  about: { '@id': `${site}/#organization` },
};

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Safety Net Services in Hyderabad — Aravind Safety Nets</title>
        <meta name="description" content="Pigeon nets, children safety nets, invisible grills, balcony nets, duct area nets, monkey nets & cloth hangers. Professional installation across Hyderabad." />
        <link rel="canonical" href={`${site}/services`} />
        <meta property="og:title" content="Safety Net Services — Aravind Safety Nets" />
        <meta property="og:description" content="Complete safety net and grill solutions for every need. Expert installation across Hyderabad." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/services`} />
        <meta property="og:image" content={`${site}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${site}/og-image.png`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main>
        {/* Hero */}
        <section className="bg-primary pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <span className="inline-block bg-accent/20 text-accent text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
                What we do
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-primary-foreground mb-4">Our Services</h1>
              <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto">
                Complete safety net and grill solutions for every home and apartment in Hyderabad.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentListContext field="services">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, i) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.07, ease: 'easeOut' }}
                    className="relative group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-accent/40 transition-all duration-200"
                  >
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <img
                        src={`/airo-assets/images/${service.heroImage}`}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        width={500}
                        height={192}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-3 w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-accent-foreground">
                        {serviceIcons[service.name] ?? <Shield className="w-5 h-5" />}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col gap-2 flex-1">
                      <h2 className="text-lg font-black text-foreground group-hover:text-accent transition-colors duration-200">
                        {service.name}
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed flex-1">{service.tagline}</p>
                      <Link
                        to={`/services/${service.slug}`}
                        aria-label={`Learn more about ${service.name}`}
                        className="flex items-center gap-1.5 text-accent text-sm font-semibold mt-2 group-hover:gap-2.5 transition-all duration-200 after:absolute after:inset-0 after:z-10"
                      >
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                    {/* Call buttons */}
                    <div className="relative z-20 px-6 pb-5 pt-0 flex gap-2">
                      <a
                        href="tel:9491173428"
                        className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-primary-foreground py-2.5 rounded-xl text-xs font-bold hover:bg-primary/90 transition-all hover:scale-105 shadow-sm"
                        aria-label={`Call about ${service.name}`}
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Now</span>
                      </a>
                      <a
                        href="https://wa.me/919491173428?text=Hello%20Aravind%20Safety%20Nets%2C%20I%20would%20like%20a%20quote."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 bg-whatsapp text-whatsapp-foreground py-2.5 rounded-xl text-xs font-bold hover:bg-whatsapp/90 transition-all hover:scale-105 shadow-sm"
                        aria-label={`WhatsApp about ${service.name}`}
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ContentListContext>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-primary-foreground mb-3">
              Not sure which service you need?
            </h2>
            <p className="text-primary-foreground/70 text-base mb-8">
              Call us or WhatsApp us — we'll assess your property and recommend the right solution.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:9491173428"
                className="flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:bg-accent/90 transition-all hover:scale-105 shadow-lg"
              >
                Call 9491173428
              </a>
              <Link
                to="/#contact"
                className="flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/30 text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary-foreground/20 transition-all"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
