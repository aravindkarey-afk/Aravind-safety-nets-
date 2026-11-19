import { siteOrigin as site } from '@/lib/site-meta';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { Phone, MessageCircle, Mail, MapPin, Clock, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { contact } from 'virtual:content';
import { ContentListContext } from '@airo/content';
import ContactForm from '@/components/ContactForm';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${site}/contact#webpage`,
  name: 'Contact Aravind Safety Nets — Hyderabad',
  url: `${site}/contact`,
  isPartOf: { '@id': `${site}/#website` },
  about: { '@id': `${site}/#organization` },
};

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <>
      <Helmet>
        <title>Contact Us — Aravind Safety Nets Hyderabad</title>
        <meta
          name="description"
          content="Get in touch with Aravind Safety Nets. Call 9491173428, WhatsApp us, or fill in our contact form. Free site visit across Hyderabad & Secunderabad."
        />
        <link rel="canonical" href={`${site}/contact`} />
        <meta property="og:title" content="Contact Aravind Safety Nets — Hyderabad" />
        <meta property="og:description" content="Call, WhatsApp, or message us. Free site visit and quote across Hyderabad." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/contact`} />
        <meta property="og:image" content={`${site}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${site}/og-image.png`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main>
        {/* ── Hero ── */}
        <section className="bg-primary pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <span className="inline-block bg-accent/20 text-accent text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
                Reach us
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-primary-foreground mb-4">
                {contact.hero.heading}
              </h1>
              <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto">
                {contact.hero.subheading}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Contact cards + Form ── */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

              {/* Left: contact details */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="lg:col-span-2 flex flex-col gap-4"
              >
                <h2 className="text-2xl font-black text-foreground mb-2">Contact details</h2>

                {/* Phone */}
                <a
                  href={`tel:${contact.contactDetails.phone}`}
                  className="group flex items-center gap-4 bg-card border border-border rounded-2xl p-5 hover:border-accent/40 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Call us</p>
                    <p className="text-foreground font-bold text-base group-hover:text-accent transition-colors">
                      {contact.contactDetails.phone}
                    </p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${contact.contactDetails.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 bg-card border border-border rounded-2xl p-5 hover:border-accent/40 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-11 h-11 bg-secondary rounded-xl flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">WhatsApp</p>
                    <p className="text-foreground font-bold text-base group-hover:text-accent transition-colors">
                      Chat with us
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${contact.contactDetails.email}`}
                  className="group flex items-center gap-4 bg-card border border-border rounded-2xl p-5 hover:border-accent/40 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-11 h-11 bg-accent rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Email</p>
                    <p className="text-foreground font-bold text-sm group-hover:text-accent transition-colors break-all">
                      {contact.contactDetails.email}
                    </p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 bg-card border border-border rounded-2xl p-5">
                  <div className="w-11 h-11 bg-muted rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Location</p>
                    <p className="text-foreground font-bold text-sm">{contact.contactDetails.address}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{contact.contactDetails.serviceArea}</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-center gap-4 bg-card border border-border rounded-2xl p-5">
                  <div className="w-11 h-11 bg-muted rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Working hours</p>
                    <p className="text-foreground font-bold text-sm">{contact.contactDetails.hours}</p>
                  </div>
                </div>
              </motion.div>

              {/* Right: form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                className="lg:col-span-3 bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm"
              >
                <h2 className="text-2xl font-black text-foreground mb-1">{contact.form.heading}</h2>
                <p className="text-muted-foreground text-sm mb-6">{contact.form.subheading}</p>
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Map ── */}
        <section className="bg-muted">
          <div className="w-full h-72 sm:h-96">
            <iframe
              title="Aravind Safety Nets — Hyderabad location map"
              src={contact.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        {/* ── FAQ ── */}
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
              <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-2">
                {contact.faq.heading}
              </h2>
            </motion.div>

            <ContentListContext field="faq.items">
              <div className="flex flex-col gap-3">
                {contact.faq.items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="bg-card border border-border rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                      aria-expanded={openFaq === item.id}
                    >
                      <span className="font-semibold text-foreground text-sm">{item.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-accent shrink-0 transition-transform duration-200 ${
                          openFaq === item.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaq === item.id && (
                      <div className="px-6 pb-5">
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.answer}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </ContentListContext>
          </div>
        </section>
      </main>
    </>
  );
}
