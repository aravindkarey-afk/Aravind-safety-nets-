export interface SiteMeta {
	name: string;
	summary: string;
}

export const siteMeta: SiteMeta = {
	name: "Aravind Safety Nets",
	summary: "Aravind Safety Nets provides premium Safety Nets, Pigeon Nets, Balcony Safety Nets, Children Safety Nets, Invisible Grills, Duct Area Nets and more in Hyderabad. Professional installation and affordable pricing.",
};

// Use the existing public domain unless a different canonical origin is set at build time.
export const siteOrigin = new URL(
  import.meta.env.VITE_PUBLIC_URL || 'https://aravindsafetynets.in',
).origin;
