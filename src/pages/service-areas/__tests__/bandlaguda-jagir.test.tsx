// @vitest-environment node
import { HelmetProvider, type HelmetServerState } from '@dr.pogodin/react-helmet';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { bandlagudaJagir, bandlagudaServices } from '@/lib/bandlaguda-jagir';
import { seoRoutes } from '@/lib/seo-routes';
import { siteOrigin } from '@/lib/site-meta';
import BandlagudaJagirPage from '../bandlaguda-jagir';

function renderPage() {
  const context: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <HelmetProvider context={context}>
      <MemoryRouter initialEntries={[bandlagudaJagir.path]}>
        <BandlagudaJagirPage />
      </MemoryRouter>
    </HelmetProvider>,
  );
  return { html, head: context.helmet! };
}

describe('Bandlaguda Jagir landing page', () => {
  it('is eligible for prerendering and has its own title, description, and canonical', () => {
    const { html, head } = renderPage();
    expect(seoRoutes.some(({ path }) => path === bandlagudaJagir.path)).toBe(true);
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(head.title.toString()).toContain('Invisible Grills &amp; Safety Nets in Bandlaguda Jagir');
    expect(head.meta.toString()).toContain('Bandlaguda Jagir, Hyderabad');
    expect(head.link.toString()).toContain(`href="${siteOrigin}${bandlagudaJagir.path}"`);
  });

  it('describes the service area, not an unverified physical address or reviews', () => {
    const { head } = renderPage();
    const json = head.script.toString().match(/<script[^>]*>(.*?)<\/script>/s)?.[1];
    expect(json).toBeDefined();
    const graph = JSON.parse(json!)['@graph'];
    const business = graph.find((node: Record<string, unknown>) => node['@type'] === 'LocalBusiness');
    expect(business).toMatchObject({ name: 'Aravind Safety Nets', telephone: '+919491173428', areaServed: { name: 'Bandlaguda Jagir' } });
    expect(business).not.toHaveProperty('address');
    expect(business).not.toHaveProperty('aggregateRating');
    const services = graph.filter((node: Record<string, unknown>) => node['@type'] === 'Service');
    expect(services).toHaveLength(bandlagudaServices.length);
    for (const service of services) {
      expect(service.provider).toEqual({ '@id': business['@id'] });
      expect(service.areaServed.name).toBe('Bandlaguda Jagir');
    }
  });

  it('includes contact, service links, and FAQ answers in the initial HTML', () => {
    const { html } = renderPage();
    expect(html).toContain('href="tel:+919491173428"');
    expect(html).toContain('href="https://wa.me/919491173428?text=');
    expect(html).toContain('<summary');
    expect(html).toContain('Pricing depends on the opening size');
    for (const { slug } of bandlagudaServices) {
      expect(html).toContain(`href="/services/${slug}"`);
    }
  });
});
