# Aravind Safety Nets

The website is a **React 19 + TypeScript application built with Vite**, with React Router and Tailwind CSS. The Vite project lives at the repository root. `src/pages`, `src/components`, and `src/layouts` contain the site; `src/content` holds the editable text and service data; `public` contains the exported images and media manifest. `cloudflare/worker.ts` handles the live API and media slot URLs.

## Build and preview

Use Node.js **22.22.3** (see `.node-version`):

```sh
npm ci
npm run build
npm run preview
```

`npm run build` generates the deployable site in **`dist/`**, with `dist/index.html`, HTML for every public route, `404.html`, assets, sitemap, robots.txt, and llms.txt. `dist-ssr/` is only used during prerendering; do not deploy it. `npm run preview` uses Wrangler so you can check the same routes and bindings used on Cloudflare. `npm run dev` is the Vite hot-reload server for day-to-day editing.

## Deploy to Cloudflare Workers

Use **Workers with Static Assets**, not a static-only Pages upload. The Worker serves the existing contact and quote endpoints and `/airo-assets/` image URLs. `wrangler.jsonc` declares the Worker and the `dist/` output directory.

In **Cloudflare → Workers & Pages**, create or open the Worker, connect this GitHub repository, and set the following in the Worker's build configuration:

| Setting | Value |
| --- | --- |
| Production branch | `main` (after merging); use a preview build to test a branch first |
| Root directory | Repository root (`/`) |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Static assets directory | `dist` (from `wrangler.jsonc`; no separate Workers dashboard field needed) |
| Node version | `22.22.3` via `.node-version`; update an older `NODE_VERSION` override if one is set |

The Worker name in Cloudflare must match `name` in `wrangler.jsonc`. If you already have a Worker with a different name, update the config to match before redeploying. If the existing project is **Pages**, create a **Worker** instead. A static-only Pages deployment would not implement the site's form and media endpoints.

On a successful deployment, open the `workers.dev` URL shown in the dashboard (enable your account's `workers.dev` subdomain first if prompted). To use `aravindsafetynets.in`, attach it to the Worker under **Settings → Domains & Routes** when you're ready to move traffic. Canonicals, social metadata, and the sitemap default to `https://aravindsafetynets.in`. If another origin will be the public site, set `VITE_PUBLIC_URL` to that full HTTPS origin as a **build variable** and redeploy.

The form endpoints still forward to the GoDaddy Inbox configured in `src/lib/contact-form.config.json`. After deployment, submit a test from each form and confirm both messages arrive in the Inbox. The site continues to use the exported copies of uploaded media and the original remote stock-image URLs from `public/airo-media.json`.

### Deploy from a terminal

From an authenticated Cloudflare CLI session:

```sh
npm ci
npm run build
npm run deploy -- --dry-run  # validate the Worker bundle and assets without uploading
npm run deploy              # publish and print the deployment URL
```

Run `npm run type-check` and `npm test -- --run` to verify the source and Worker routes before deploying.

### Local SEO: Bandlaguda Jagir

After publishing the custom domain, check `https://aravindsafetynets.in/service-areas/bandlaguda-jagir`, then submit `https://aravindsafetynets.in/sitemap.xml` in Google Search Console. Use **URL Inspection** on the landing page to confirm Google can fetch it and request indexing if needed. The production build generates a crawlable `robots.txt` pointing to the sitemap; the `public/robots.txt` fallback blocks crawlers on the Vite development server. Indexing and ranking are determined by Google.
