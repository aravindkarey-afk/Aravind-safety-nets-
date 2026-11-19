import { siteOrigin as site } from '@/lib/site-meta';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  Shield, Award, Star, Zap, CheckCircle, ThumbsUp,
  Phone, MessageCircle, MapPin } from
'lucide-react';
import { about } from 'virtual:content';
import { ContentListContext } from '@airo/content';
import QuoteRequestForm from '@/components/QuoteRequestForm';

const whyUsIcons: Record<string, React.ReactNode> = {
  'Same-Day Installation': <Zap className="w-5 h-5" />,
  'Trained Technicians': <Award className="w-5 h-5" />,
  'Warranty Backed': <CheckCircle className="w-5 h-5" />,
  'Wide Range of Services': <Shield className="w-5 h-5" />,
  'Affordable Pricing': <Star className="w-5 h-5" />,
  'Trusted by 1000+ Families': <ThumbsUp className="w-5 h-5" />
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' as const }
  })
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${site}/about#webpage`,
  name: 'About Aravind Safety Nets',
  url: `${site}/about`,
  isPartOf: { '@id': `${site}/#website` },
  about: { '@id': `${site}/#organization` }
};

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | Aravind Safety Nets — Hyderabad's Safety Net Experts</title>
        <meta
          name="description"
          content="Learn about Aravind Safety Nets — Hyderabad's trusted safety net and invisible grill specialists with 10+ years of experience, 500+ installations, and a warranty on all work." />
        
        <link rel="canonical" href={`${site}/about`} />
        <meta property="og:title" content="About Us | Aravind Safety Nets" />
        <meta property="og:description" content="10+ years protecting Hyderabad homes with premium safety nets and invisible grills. Meet our team and learn our story." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/about`} />
        <meta property="og:image" content={`${site}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${site}/og-image.png`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <main>
        {/* ── Hero ── */}
        <section className="relative bg-primary pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <img
              src="/airo-assets/images/pages/about/hero"
              alt="Aravind Safety Nets team at work"
              className="w-full h-full object-cover opacity-20"
              loading="eager"
              fetchPriority="high" />
            
            <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary pointer-events-none" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}>
              
              <span className="inline-block bg-accent/20 text-accent text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
                {about.hero.eyebrow}
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-primary-foreground leading-tight mb-4">
                <span>{about.hero.heading || 'Hyderabad\'s Trusted Safety Net Specialists'}</span>
              </h1>
              <p className="text-primary-foreground/75 text-lg max-w-2xl mx-auto">
                {about.hero.subheading}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="bg-accent py-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentListContext field="about.stats">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {about.stats.map((stat, i) =>
                <motion.div
                  key={stat.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}>
                  
                    <div className="text-3xl sm:text-4xl font-black text-primary">{stat.value}</div>
                    <div className="text-primary/70 text-sm font-medium mt-1">{stat.label}</div>
                  </motion.div>
                )}
              </div>
            </ContentListContext>
          </div>
        </section>

        {/* ── Story ── */}
        <section className="py-16 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' }}>
                
                <h2 className="text-3xl font-black text-foreground mb-6">{about.story.heading}</h2>
                <ContentListContext field="about.story.paragraphs">
                  <div className="flex flex-col gap-4">
                    {about.story.paragraphs.map((p) =>
                    <p key={p.id} className="text-muted-foreground leading-relaxed">
                        {p.text}
                      </p>
                    )}
                  </div>
                </ContentListContext>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                
                <img
                  src="/airo-assets/images/pages/home/about"
                  alt="Safety net installation in progress"
                  className="w-full h-full object-cover"
                  loading="lazy" />
                
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Founder ── */}
        <section className="py-16 bg-muted">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="rounded-2xl overflow-hidden shadow-xl aspect-[4/5] max-w-sm mx-auto lg:mx-0">
                
                



                
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' }}>
                
                <h2 className="text-3xl font-black text-foreground mb-2">{about.founder.heading}</h2>
                <div className="text-xl font-bold text-primary mb-1">{about.founder.name}</div>
                <div className="text-accent font-semibold text-sm mb-5">{about.founder.role}</div>
                <p className="text-muted-foreground leading-relaxed">{about.founder.bio}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Mission & Values ── */}
        <section className="py-16 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-foreground mb-4">{about.mission.heading}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{about.mission.statement}</p>
            </div>
            <ContentListContext field="about.mission.values">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {about.mission.values.map((val, i) =>
                <motion.div
                  key={val.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-card border border-border rounded-2xl p-6 text-center">
                  
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div className="font-bold text-foreground mb-2">{val.title}</div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{val.description}</p>
                  </motion.div>
                )}
              </div>
            </ContentListContext>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className="py-16 bg-primary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-primary-foreground mb-2">{about.whyUs.heading}</h2>
            </div>
            <ContentListContext field="about.whyUs.points">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {about.whyUs.points.map((pt, i) =>
                <motion.div
                  key={pt.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex gap-4 bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-5">
                  
                    <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center shrink-0 text-accent">
                      {whyUsIcons[pt.title] ?? <CheckCircle className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="font-bold text-primary-foreground mb-1">{pt.title}</div>
                      <p className="text-primary-foreground/70 text-sm leading-relaxed">{pt.description}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </ContentListContext>
          </div>
        </section>

        {/* ── Quality Promise ── */}
        <section className="py-16 bg-muted">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-foreground mb-2">{about.quality.heading}</h2>
            </div>
            <ContentListContext field="about.quality.points">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {about.quality.points.map((pt, i) =>
                <motion.div
                  key={pt.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-card border border-border rounded-2xl p-6">
                  
                    <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center mb-4">
                      <CheckCircle className="w-5 h-5 text-accent" />
                    </div>
                    <div className="font-bold text-foreground mb-2">{pt.title}</div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{pt.description}</p>
                  </motion.div>
                )}
              </div>
            </ContentListContext>
          </div>
        </section>

        {/* ── Service Area ── */}
        <section className="py-16 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-foreground mb-3">{about.serviceArea.heading}</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">{about.serviceArea.description}</p>
            </div>
            <ContentListContext field="about.serviceArea.localities">
              <div className="flex flex-wrap justify-center gap-3">
                {about.serviceArea.localities.map((loc) =>
                <span
                  key={loc.id}
                  className="flex items-center gap-1.5 bg-primary/5 border border-primary/20 text-primary text-sm font-medium px-4 py-2 rounded-full">
                  
                    <MapPin className="w-3.5 h-3.5" />
                    {loc.name}
                  </span>
                )}
              </div>
            </ContentListContext>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 bg-accent">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}>
              
              <h2 className="text-3xl font-black text-primary mb-3">{about.cta.heading}</h2>
              <p className="text-primary/70 mb-8">{about.cta.subheading}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-xl font-semibold text-base hover:bg-primary/90 transition-all duration-200 hover:scale-105 shadow-lg">
                  
                  <MessageCircle className="w-5 h-5" />
                  <span>{about.cta.buttonPrimary}</span>
                </Link>
                <a
                  href="tel:9491173428"
                  className="flex items-center gap-2 bg-white text-primary px-7 py-3 rounded-xl font-semibold text-base hover:bg-white/90 transition-all duration-200 hover:scale-105 shadow-lg">
                  
                  <Phone className="w-5 h-5" />
                  <span>{about.cta.buttonSecondary}</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Quote Form ── */}
        <section className="py-16 bg-background">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-foreground">Get a Free Quote</h2>
              <p className="text-muted-foreground mt-2">Fill in your details and we'll get back to you promptly.</p>
            </div>
            <QuoteRequestForm />
          </div>
        </section>
      </main>
    </>);

}