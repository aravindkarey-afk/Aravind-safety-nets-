import { Helmet } from '@dr.pogodin/react-helmet';
import { useEffect, type ReactElement } from 'react';
import { ScrollRestoration } from 'react-router';

import Footer from '@/layouts/parts/Footer';
import Header from '@/layouts/parts/Header';
import Website from '@/layouts/Website';

/**
 * Root layout component that wraps all pages with consistent header and footer.
 *
 * To customize the header or footer, directly edit the Header.tsx and Footer.tsx
 * files in the layouts/parts directory.
 *
 * Site-wide <title> and <meta> live in the <Helmet> below. Individual pages can
 * override them by rendering their own <Helmet> — last-mounted wins.
 */
interface RootLayoutProps {
  children: ReactElement;
}

export default function RootLayout({ children }: RootLayoutProps) {
  // These classic scripts mutate media DOM, so start them only after hydration.
  useEffect(() => {
    for (const name of ['airo-video-slots', 'airo-logo-orientation']) {
      if (document.getElementById(name)) continue;
      const script = document.createElement('script');
      script.id = name;
      script.src = `/${name}.js`;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <Website>
      <Helmet>
        <title>Aravind Safety Nets | Safety Nets &amp; Invisible Grills in Hyderabad</title>
        <meta name="description" content="Aravind Safety Nets provides premium Safety Nets, Pigeon Nets, Balcony Safety Nets, Children Safety Nets, Invisible Grills, Duct Area Nets and more in Hyderabad. Professional installation and affordable pricing." />
        <meta name="keywords" content="Safety Nets in Hyderabad, Pigeon Nets in Hyderabad, Invisible Grills in Hyderabad, Balcony Safety Nets, Children Safety Nets, Bird Protection Nets, Duct Area Safety Nets, Mesh Doors, Cloth Hangers, Aravind Safety Nets" />
      </Helmet>
      <ScrollRestoration />
      <Header />
      {children}
      <Footer />
    </Website>
  );
}
