import { siteOrigin as site } from '@/lib/site-meta';
import { Helmet } from '@dr.pogodin/react-helmet';
import { services } from 'virtual:content';
import ServicePage from '@/components/ServicePage';

const service = services.find((s) => s.slug === 'children-safety-nets')!;
const url = `${site}/services/children-safety-nets`;
const title = 'Children Safety Nets in Hyderabad — Aravind Safety Nets';
const description = 'Protect your children from balcony and staircase falls. Certified children safety nets installed across Hyderabad. Free site visit. Call 9491173428.';
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${url}#service`,
  name: 'Children Safety Nets',
  description,
  provider: { '@id': `${site}/#organization` },
  areaServed: { '@type': 'City', name: 'Hyderabad' },
  url,
  isPartOf: { '@id': `${site}/#website` },
};

export default function ChildrenSafetyNetsPage() {
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
      <h1 className="sr-only">Children Safety Nets in Hyderabad</h1>
      <ServicePage {...service} />
    </>
  );
}
