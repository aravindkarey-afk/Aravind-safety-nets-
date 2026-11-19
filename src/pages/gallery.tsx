import { siteOrigin as site } from '@/lib/site-meta';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { gallery } from 'virtual:content';
import { ContentListContext } from '@airo/content';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${site}/gallery#webpage`,
  name: 'Installation Gallery — Aravind Safety Nets',
  url: `${site}/gallery`,
  isPartOf: { '@id': `${site}/#website` },
  about: { '@id': `${site}/#organization` },
};

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('cat-all');

  return (
    <>
      <Helmet>
        <title>Installation Gallery — Aravind Safety Nets Hyderabad</title>
        <meta name="description" content="See our completed safety net and invisible grill installations across Hyderabad. Pigeon nets, children safety nets, balcony nets and more." />
        <link rel="canonical" href={`${site}/gallery`} />
        <meta property="og:title" content="Installation Gallery — Aravind Safety Nets" />
        <meta property="og:description" content="Real installations across Hyderabad — see the quality for yourself." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/gallery`} />
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
                Our work
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-primary-foreground mb-4">
                {gallery.heading}
              </h1>
              <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto">
                {gallery.subheading}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter + Grid */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category filter */}
            <div
              role="group"
              aria-label="Filter by category"
              className="flex flex-wrap justify-center gap-2 mb-10"
            >
              {gallery.categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    activeCategory === cat.id
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Masonry-style grid */}
            <ContentListContext field="items">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {gallery.items.map((item, i) => (
                  <motion.figure
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.04, ease: 'easeOut' }}
                    className={`relative group rounded-2xl overflow-hidden bg-muted border border-border ${
                      activeCategory !== 'cat-all' && item.category !== activeCategory ? 'hidden' : ''
                    }`}
                  >
                    <img
                      src={`/airo-assets/images/${item.slot}`}
                      alt={item.alt}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      width={500}
                      height={224}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <figcaption className="absolute bottom-0 left-0 right-0 px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-primary-foreground text-sm font-semibold">{item.caption}</p>
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            </ContentListContext>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-accent">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <h2 className="text-2xl sm:text-3xl font-black text-accent-foreground mb-3">
                {gallery.cta.heading}
              </h2>
              <p className="text-accent-foreground/80 text-base mb-8">
                {gallery.cta.subheading}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={`tel:${gallery.cta.phone}`}
                  className="flex items-center gap-2 bg-card text-accent px-6 py-3 rounded-xl font-bold text-sm hover:bg-card/90 transition-all hover:scale-105 shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {gallery.cta.phone}</span>
                </a>
                <a
                  href="https://wa.me/919491173428?text=Hello%20Aravind%20Safety%20Nets%2C%20I%20would%20like%20a%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-whatsapp text-whatsapp-foreground px-6 py-3 rounded-xl font-bold text-sm hover:bg-whatsapp/90 transition-all hover:scale-105 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
