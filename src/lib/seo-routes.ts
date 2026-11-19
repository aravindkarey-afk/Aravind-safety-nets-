// Static routes for prerendering and sitemap generation. Keep in sync with src/routes.tsx.
export interface SeoRoute {
  path: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
  lastmod?: string;
}

export const seoRoutes: SeoRoute[] = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/services", changefreq: "monthly", priority: 0.8 },
  { path: "/services/pigeon-safety-nets", changefreq: "monthly", priority: 0.7 },
  { path: "/services/children-safety-nets", changefreq: "monthly", priority: 0.7 },
  { path: "/services/invisible-grills", changefreq: "monthly", priority: 0.7 },
  { path: "/services/balcony-safety-nets", changefreq: "monthly", priority: 0.7 },
  { path: "/services/duct-area-nets", changefreq: "monthly", priority: 0.7 },
  { path: "/services/monkey-safety-nets", changefreq: "monthly", priority: 0.7 },
  { path: "/services/cloth-hangers", changefreq: "monthly", priority: 0.7 },
  { path: "/service-areas/bandlaguda-jagir", changefreq: "monthly", priority: 0.8 },
  { path: "/gallery", changefreq: "monthly", priority: 0.8 },
  { path: "/about", changefreq: "monthly", priority: 0.8 },
  { path: "/contact", changefreq: "monthly", priority: 0.8 },
  { path: "/thank-you", changefreq: "monthly", priority: 0.8 },
];
