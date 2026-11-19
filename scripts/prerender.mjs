import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { render, renderLlmsTxt, seoRoutes, siteMeta, siteOrigin } from '../dist-ssr/entry-server.js';

const template = await readFile('dist/index.html', 'utf8');
if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('Missing prerender markers in dist/index.html');
}

async function writePage(path, file, notFound = false) {
  const result = await render(path);
  if (result.redirect || result.status !== 200 || !result.head || !result.html || result.html.includes('Switched to client rendering')) {
    throw new Error(`Failed to prerender ${path}: status ${result.status}`);
  }
  const robots = notFound ? '<meta name="robots" content="noindex">' : '';
  const html = template
    .replace('<!--app-head-->', () => robots + result.head)
    .replace('<!--app-html-->', () => result.html);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

for (const { path } of seoRoutes) {
  await writePage(path, join('dist', path === '/' ? 'index.html' : `${path.slice(1)}.html`));
}
await writePage('/__not-found', 'dist/404.html', true);

const escapeXml = (value) => value.replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
})[c]);
const urls = seoRoutes.filter(({ path }) => path !== '/thank-you').map(({ path, lastmod, changefreq, priority }) => [
  '  <url>',
  `    <loc>${escapeXml(siteOrigin + path)}</loc>`,
  ...(lastmod ? [`    <lastmod>${escapeXml(lastmod)}</lastmod>`] : []),
  ...(changefreq ? [`    <changefreq>${changefreq}</changefreq>`] : []),
  ...(priority === undefined ? [] : [`    <priority>${priority.toFixed(1)}</priority>`]),
  '  </url>',
].join('\n'));
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`);
await writeFile('dist/llms.txt', renderLlmsTxt({
  baseUrl: siteOrigin,
  hostname: new URL(siteOrigin).hostname,
  ...siteMeta,
  routes: seoRoutes,
}));
console.log(`Prerendered ${seoRoutes.length} pages, 404.html and SEO files in dist/`);
