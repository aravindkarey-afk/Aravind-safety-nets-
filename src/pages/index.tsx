import { siteOrigin as site } from '@/lib/site-meta';
import { bandlagudaJagir, bandlagudaPlace } from '@/lib/bandlaguda-jagir';
import { Link } from 'react-router';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import {
  Phone, MessageCircle, FileText, CheckCircle, Shield,
  Star, Zap, Award, ThumbsUp, Grid3X3, Bird, Baby,
  Eye, Wind, Shirt, Home, MapPin, ArrowRight,
} from 'lucide-react';
import { home } from 'virtual:content';
import QuoteRequestForm from '@/components/QuoteRequestForm';

const serviceIcons: Record<string, React.ReactNode> = {
  'Pigeon Safety Nets': <Bird className="w-6 h-6" />,
  'Children Safety Nets': <Baby className="w-6 h-6" />,
  'Invisible Grills': <Eye className="w-6 h-6" />,
  'Balcony Safety Nets': <Grid3X3 className="w-6 h-6" />,
  'Duct Area Nets': <Wind className="w-6 h-6" />,
  'Monkey Safety Nets': <Shield className="w-6 h-6" />,
  'Cloth Hangers': <Shirt className="w-6 h-6" />,
};

const whyUsIcons: Record<string, React.ReactNode> = {
  'Premium Materials': <Shield className="w-6 h-6" />,
  'Experienced Technicians': <Award className="w-6 h-6" />,
  'Affordable Pricing': <Star className="w-6 h-6" />,
  'Same-Day Installation': <Zap className="w-6 h-6" />,
  'Warranty Support': <CheckCircle className="w-6 h-6" />,
  '100% Customer Satisfaction': <ThumbsUp className="w-6 h-6" />,
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' as const },
  }),
};

export default function HomePage() {
  const autoplay = useRef(Autoplay({ delay: 3500, stopOnInteraction: false }));
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${site}/#website`, name: 'Aravind Safety Nets', url: `${site}/` },
      {
        '@type': 'LocalBusiness',
        '@id': `${site}/#organization`,
        name: 'Aravind Safety Nets',
        url: `${site}/`,
        telephone: bandlagudaJagir.telephone,
        areaServed: [bandlagudaPlace, { '@type': 'City', name: 'Hyderabad' }],
        email: 'aravindsafetynets@gmail.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Hyderabad',
          addressRegion: 'Telangana',
          addressCountry: 'IN',
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${site}/#webpage`,
        url: `${site}/`,
        isPartOf: { '@id': `${site}/#website` },
        about: { '@id': `${site}/#organization` },
        datePublished: '2026-08-25',
        dateModified: '2026-08-25',
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Aravind Safety Nets | Safety Nets &amp; Invisible Grills in Hyderabad</title>
        <meta
          name="description"
          content="Aravind Safety Nets provides premium Safety Nets, Pigeon Nets, Balcony Safety Nets, Children Safety Nets, Invisible Grills, Duct Area Nets and more in Hyderabad. Professional installation and affordable pricing."
        />
        <meta name="keywords" content="Safety Nets in Hyderabad, Pigeon Nets in Hyderabad, Invisible Grills in Hyderabad, Balcony Safety Nets, Children Safety Nets, Bird Protection Nets, Duct Area Safety Nets, Mesh Doors, Cloth Hangers, Aravind Safety Nets" />
        <link rel="canonical" href={`${site}/`} />
        <meta property="og:title" content="Aravind Safety Nets | Safety Nets &amp; Invisible Grills in Hyderabad" />
        <meta property="og:description" content="Aravind Safety Nets provides premium Safety Nets, Pigeon Nets, Balcony Safety Nets, Children Safety Nets, Invisible Grills, Duct Area Nets and more in Hyderabad. Professional installation and affordable pricing." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/`} />
        <meta property="og:image" content={`${site}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${site}/og-image.png`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main>
        {/* ── Hero ── */}
        <section className="relative min-h-screen flex items-center bg-primary pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Text */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <span className="inline-block bg-accent/20 text-accent text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
                  Hyderabad's Safety Net Experts
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary-foreground leading-tight mb-6">
                  <span>{home.hero.heading || 'Protect Your Home with Premium Safety Nets'}</span>
                </h1>
                <p className="text-primary-foreground/75 text-lg leading-relaxed mb-8 max-w-lg">
                  {home.hero.subheading}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="tel:9491173428"
                    className="flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-xl font-semibold text-base hover:bg-accent/90 transition-all duration-200 hover:scale-105 shadow-lg"
                  >
                    <Phone className="w-5 h-5" />
                    <span>{home.hero.ctaCall}</span>
                  </a>
                  <a
                    href="https://wa.me/919491173428?text=Hello%20Aravind%20Safety%20Nets%2C%20I%20would%20like%20a%20quote."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-whatsapp text-whatsapp-foreground px-6 py-3 rounded-xl font-semibold text-base hover:bg-whatsapp/90 transition-all duration-200 hover:scale-105 shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{home.hero.ctaWhatsApp}</span>
                  </a>
                  <a
                    href="#contact"
                    className="flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/30 text-primary-foreground px-6 py-3 rounded-xl font-semibold text-base hover:bg-primary-foreground/20 transition-all duration-200"
                  >
                    <FileText className="w-5 h-5" />
                    <span>{home.hero.ctaQuote}</span>
                  </a>
                </div>
              </motion.div>

              {/* Right: Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden border-4 border-accent shadow-2xl shadow-black/40">
                  <img
                    src="/airo-assets/images/pages/home/hero"
                    alt="Safety net installation on apartment balcony in Hyderabad"
                    className="w-full h-[420px] lg:h-[520px] object-cover"
                    loading="eager"
                    fetchPriority="high"
                    width={700}
                    height={520}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent pointer-events-none" />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground px-4 py-3 rounded-xl shadow-xl">
                  <p className="text-2xl font-black leading-none">500+</p>
                  <p className="text-xs font-medium opacity-90">Installations Done</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Trust Badges ── */}
        <section className="bg-foreground text-background py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center">
              {home.trustBadges.map((badge, i) => (
                <div key={badge.id} className="flex items-center">
                  <span className="text-sm font-semibold px-4 py-2 text-background/90">
                    {badge.text}
                  </span>
                  {i < home.trustBadges.length - 1 && (
                    <span className="text-accent font-bold text-lg">|</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Image Scroll Strip ── */}
        <section className="py-10 bg-background overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
              <Home className="w-4 h-4 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-black text-foreground">Our Installations</h2>
          </div>
          <Carousel opts={{ loop: true, align: 'start' }} plugins={[autoplay.current]}>
            <CarouselContent className="-ml-3">
              {[
                { slot: 'pages/home/pigeon-nets', alt: 'Pigeon safety nets installed on apartment balcony', label: 'Pigeon Nets' },
                { slot: 'gallery/invisible-grill-1', alt: 'SS316 invisible grills installed on balcony', label: 'Invisible Grills' },
                { slot: 'pages/services/cloth-hangers/hero', alt: 'Cloth hanger system on balcony', label: 'Cloth Hangers' },
                { slot: 'pages/home/children-safety-net', alt: 'Children safety net on balcony', label: 'Children Safety Nets' },
                { slot: 'gallery/invisible-grill-2', alt: 'Stainless steel invisible grills on window', label: 'Invisible Grills' },
                { slot: 'pages/services/balcony-safety-nets/hero', alt: 'Balcony safety net enclosure', label: 'Balcony Nets' },
                { slot: 'pages/services/pigeon-safety-nets/hero', alt: 'Pigeon net on building exterior', label: 'Pigeon Nets' },
                { slot: 'gallery/invisible-grill-3', alt: 'SS316 invisible grills high-rise installation', label: 'Invisible Grills' },
                { slot: 'pages/home/about', alt: 'Safety net installation in progress', label: 'Installation' },
              ].map((img, i) => (
                <CarouselItem key={i} className="pl-3 basis-[72%] sm:basis-[45%] md:basis-[32%] lg:basis-[24%]">
                  <div className="relative rounded-2xl overflow-hidden border border-border shadow-sm group">
                    <img
                      src={`/airo-assets/images/${img.slot}`}
                      alt={img.alt}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      width={320}
                      height={192}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent pointer-events-none" />
                    <span className="absolute bottom-3 left-3 text-white text-xs font-bold bg-accent text-accent-foreground px-2.5 py-1 rounded-lg">
                      {img.label}
                    </span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>

        {/* ── Services ── */}
        <section id="services" className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-center mb-12"
            >
              <span className="text-accent text-sm font-semibold uppercase tracking-wide">What we offer</span>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2 mb-3">
                {home.services.heading}
              </h2>
              <p className="text-muted-foreground text-base max-w-xl mx-auto">
                {home.services.subheading}
              </p>
            </motion.div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Featured cards — span 2 cols each */}
              {home.services.items.filter((s) => s.featured).map((service, i) => (
                <motion.div
                  key={service.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="lg:col-span-2 bg-primary text-primary-foreground rounded-2xl p-8 flex flex-col gap-4 cursor-default shadow-lg"
                >
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
                    {serviceIcons[service.name] ?? <Shield className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                    <p className="text-primary-foreground/70 text-sm leading-relaxed">{service.description}</p>
                  </div>
                  <div className="mt-auto">
                    <img
                      src={
                        service.name === 'Pigeon Safety Nets'
                          ? '/airo-assets/images/pages/home/pigeon-nets'
                          : '/airo-assets/images/pages/home/children-safety-net'
                      }
                      alt={service.name}
                      className="w-full h-40 object-cover rounded-xl opacity-80 mb-4"
                      loading="lazy"
                      width={400}
                      height={160}
                    />
                    <div className="flex gap-3">
                      <a
                        href="tel:9491173428"
                        className="flex-1 flex items-center justify-center gap-2 bg-accent text-accent-foreground py-2.5 rounded-xl text-sm font-bold hover:bg-accent/90 transition-all hover:scale-105 shadow-md"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call Now</span>
                      </a>
                      <a
                        href="https://wa.me/919491173428?text=Hello%20Aravind%20Safety%20Nets%2C%20I%20would%20like%20a%20quote."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-whatsapp text-whatsapp-foreground py-2.5 rounded-xl text-sm font-bold hover:bg-whatsapp/90 transition-all hover:scale-105 shadow-md"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Regular service cards */}
              {home.services.items.filter((s) => !s.featured).map((service, i) => {
                const serviceImageMap: Record<string, string> = {
                  'Invisible Grills': 'pages/services/invisible-grills/hero',
                  'Cloth Hangers': 'pages/services/cloth-hangers/hero',
                  'Duct Area Nets': 'pages/services/duct-area-nets/hero',
                  'Monkey Safety Nets': 'pages/services/monkey-safety-nets/hero',
                  'Balcony Safety Nets': 'pages/services/balcony-safety-nets/hero',
                  'Terrace Safety Nets': 'pages/home/terrace-safety-nets',
                  'Bird Spikes': 'pages/home/bird-spikes',
                };
                const imgSlot = serviceImageMap[service.name];
                return (
                  <motion.div
                    key={service.id}
                    custom={i + 2}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col cursor-default shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    {imgSlot && (
                      <div className="relative h-32 overflow-hidden bg-muted">
                        <img
                          src={`/airo-assets/images/${imgSlot}`}
                          alt={service.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          width={300}
                          height={128}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent pointer-events-none" />
                      </div>
                    )}
                    <div className="p-5 flex flex-col gap-2 flex-1">
                      <div className="w-9 h-9 bg-accent/15 rounded-xl flex items-center justify-center text-accent">
                        {serviceIcons[service.name] ?? <Shield className="w-5 h-5" />}
                      </div>
                      <h3 className="text-base font-bold text-foreground">{service.name}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                    </div>
                    <div className="px-5 pb-5 flex gap-2">
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
                );
              })}
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <span className="text-accent text-sm font-semibold uppercase tracking-wide">About us</span>
                <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2 mb-4">
                  {home.about.heading}
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed mb-6">
                  {home.about.body}
                </p>
                <ul className="flex flex-col gap-3">
                  {home.about.highlights.map((h) => (
                    <li key={h.id} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm font-medium">{h.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <a
                    href="tel:9491173428"
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors w-fit"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Us Today</span>
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              >
                <div className="rounded-2xl overflow-hidden border-4 border-accent/30 shadow-xl">
                  <img
                    src="/airo-assets/images/pages/home/about"
                    alt="Aravind Safety Nets technician installing safety net"
                    className="w-full h-[380px] object-cover"
                    loading="lazy"
                    width={600}
                    height={380}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section id="why-us" className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-center mb-12"
            >
              <span className="text-accent text-sm font-semibold uppercase tracking-wide">Our advantage</span>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2 mb-3">
                {home.whyUs.heading}
              </h2>
              <p className="text-muted-foreground text-base max-w-xl mx-auto">
                {home.whyUs.subheading}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {home.whyUs.items.map((item, i) => (
                <motion.div
                  key={item.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-card border border-border rounded-2xl p-6 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shrink-0">
                    {whyUsIcons[item.title] ?? <CheckCircle className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-base mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Service Areas ── */}
        <section id="service-areas" aria-labelledby="home-service-areas" className="border-t border-border bg-background py-12 sm:py-16">
          <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">Local installation</p>
              <h2 id="home-service-areas" className="text-2xl font-bold text-foreground sm:text-3xl">Areas We Serve in Hyderabad</h2>
              <p className="mt-3 max-w-lg text-muted-foreground">Explore local options for balcony nets, bird protection, and invisible grills for your home.</p>
            </div>
            <Link to={bandlagudaJagir.path} className="group flex items-center gap-4 rounded-2xl border border-border bg-muted/50 p-4 transition-colors hover:border-primary/40 hover:bg-muted sm:p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-bold text-primary">{bandlagudaJagir.name}</span>
                <span className="mt-1 block text-sm text-muted-foreground">Hyderabad, Telangana</span>
              </span>
              <ArrowRight className="h-5 w-5 shrink-0 text-primary motion-safe:transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* ── Contact CTA + Quote Form ── */}
        <section id="contact" className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-center mb-12"
            >
              <span className="text-accent text-sm font-semibold uppercase tracking-wide">Get in touch</span>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2 mb-3">
                {home.contact.heading}
              </h2>
              <p className="text-muted-foreground text-base max-w-xl mx-auto">
                {home.contact.subheading}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              {/* Left: Direct contact options */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex flex-col gap-5"
              >
                <a
                  href={`tel:${home.contact.phone}`}
                  className="flex items-center gap-4 bg-primary text-primary-foreground px-6 py-5 rounded-2xl font-bold text-base hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] shadow-md group"
                >
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-primary-foreground/60 font-medium mb-0.5">Call us directly</p>
                    <p className="text-lg font-black">{home.contact.phone}</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/919491173428?text=Hello%20Aravind%20Safety%20Nets%2C%20I%20would%20like%20a%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-whatsapp text-whatsapp-foreground px-6 py-5 rounded-2xl font-bold text-base hover:bg-whatsapp/90 transition-all duration-200 hover:scale-[1.02] shadow-md"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-whatsapp-foreground/70 font-medium mb-0.5">Chat on WhatsApp</p>
                    <p className="text-lg font-black">WhatsApp Us Now</p>
                  </div>
                </a>

                <a
                  href={`mailto:${home.contact.email}`}
                  className="flex items-center gap-4 bg-card border border-border text-foreground px-6 py-5 rounded-2xl font-bold text-base hover:border-accent hover:shadow-md transition-all duration-200"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">Email us</p>
                    <p className="text-sm font-semibold text-foreground break-all">{home.contact.email}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 bg-card border border-border px-6 py-5 rounded-2xl">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">Service area</p>
                    <p className="text-sm font-semibold text-foreground">{home.contact.location}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  {[
                    { id: 'ci1', text: 'Same-day response' },
                    { id: 'ci2', text: 'Free site visit' },
                    { id: 'ci3', text: 'No obligation quote' },
                  ].map((item) => (
                    <span key={item.id} className="flex items-center gap-1.5 text-sm text-foreground font-medium">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      <span>{item.text}</span>
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Right: Quote form */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm"
              >
                <h3 className="text-xl font-black text-foreground mb-1">Get a Free Quote</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Fill in your details and we'll get back to you with a quote.
                </p>
                <QuoteRequestForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Floating Action Buttons — right side, vertically centred ── */}
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
          {/* Call button */}
          <a
            href="tel:9491173428"
            aria-label="Call us"
            className="group flex items-center justify-end overflow-hidden shadow-xl hover:scale-105 transition-all duration-200"
          >
            <span className="max-w-0 group-hover:max-w-[120px] overflow-hidden transition-all duration-300 ease-in-out whitespace-nowrap bg-primary text-primary-foreground text-xs font-bold px-0 group-hover:px-3 py-4 rounded-l-xl">
              Call Us Now
            </span>
            <span className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center rounded-l-xl shrink-0">
              <Phone className="w-5 h-5" />
            </span>
          </a>

          {/* WhatsApp button */}
          <a
            href="https://wa.me/919491173428?text=Hello%20Aravind%20Safety%20Nets%2C%20I%20would%20like%20a%20quote."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="group flex items-center justify-end overflow-hidden shadow-xl hover:scale-105 transition-all duration-200"
          >
            <span className="max-w-0 group-hover:max-w-[120px] overflow-hidden transition-all duration-300 ease-in-out whitespace-nowrap bg-whatsapp text-whatsapp-foreground text-xs font-bold px-0 group-hover:px-3 py-4 rounded-l-xl">
              WhatsApp Us
            </span>
            <span className="w-12 h-12 bg-whatsapp text-whatsapp-foreground flex items-center justify-center rounded-l-xl shrink-0">
              <MessageCircle className="w-5 h-5" />
            </span>
          </a>

        </div>
      </main>
    </>
  );
}
