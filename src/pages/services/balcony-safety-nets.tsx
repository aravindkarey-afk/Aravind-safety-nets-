import { siteOrigin as site } from '@/lib/site-meta';
import { Helmet } from '@dr.pogodin/react-helmet';
import { services } from 'virtual:content';
import ServicePage from '@/components/ServicePage';

const service = services.find((s) => s.slug === 'balcony-safety-nets')!;
const url = `${site}/services/balcony-safety-nets`;
const title = 'Balcony Safety Nets in Hyderabad — Aravind Safety Nets';
const description = 'Full balcony enclosure nets for complete protection. Custom-fitted, UV-resistant balcony safety nets installed across Hyderabad. Call 9491173428.';
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${url}#service`,
  name: 'Balcony Safety Nets',
  description,
  provider: { '@id': `${site}/#organization` },
  areaServed: { '@type': 'City', name: 'Hyderabad' },
  url,
  isPartOf: { '@id': `${site}/#website` },
};

export default function BalconySafetyNetsPage() {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${site}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${site}/og-image.png`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <h1 className="sr-only">Balcony Safety Nets in Hyderabad</h1>
      <ServicePage {...service} />
    </>
  );
}
