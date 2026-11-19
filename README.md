# Aravind Safety Nets

The website is a **React 19 + TypeScript application built with Vite**, with React Router and Tailwind CSS. The Vite project lives at the repository root. `src/pages`, `src/components`, and `src/layouts` contain the site; `src/content` holds the editable text and service data; `public` contains the exported images and media manifest. `cloudflare/worker.ts` handles the live API and media slot URLs.

## Build and preview

Use Node.js **22.22.3** (see `.node-version`):

```sh
npm ci
npm run preview
```

`npm run build` generates the deployable site in **`dist/`**, with `dist/index.html`, HTML for every public route, `404.html`, assets, sitemap, robots.txt, and llms.txt. `dist-ssr/` is only used during prerendering; do not deploy it. `npm run preview` uses Wrangler, which runs the production build before starting the local Worker so you can check the same routes and bindings used on Cloudflare. `npm run dev` is the Vite hot-reload server for day-to-day editing.

## Deploy to Cloudflare Workers

Use **Workers with Static Assets**, not a static-only Pages upload. The Worker serves the existing contact and quote endpoints and `/airo-assets/` image URLs. `wrangler.jsonc` declares the Worker and the `dist/` output directory.

In **Cloudflare → Workers & Pages**, create or open the Worker, connect this GitHub repository, and set the following in the Worker's build configuration:

| Setting | Value |
| --- | --- |
| Production branch | `main` (after merging); use a preview build to test a branch first |
| Root directory | Repository root (`/`) |
| Build command | Leave blank; Wrangler runs `npm run build` via `wrangler.jsonc` |
| Deploy command | `npx wrangler deploy` |
| Static assets directory | `dist` (from `wrangler.jsonc`; no separate Workers dashboard field needed) |
| Node version | `22.22.3` via `.node-version`; update an older `NODE_VERSION` override if one is set |

The deploy log should show `[custom build] Running: npm run build` before Wrangler reads the static assets. No cached or committed `dist/` is required. If `npm run build` is already set in the dashboard, clear it after this update to avoid building twice.

The Worker name in Cloudflare must match `name` in `wrangler.jsonc`. If you already have a Worker with a different name, update the config to match before redeploying. If the existing project is **Pages**, create a **Worker** instead. A static-only Pages deployment would not implement the site's form and media endpoints.

On a successful deployment, open the `workers.dev` URL shown in the dashboard (enable your account's `workers.dev` subdomain first if prompted). To use `aravindsafetynets.in`, attach it to the Worker under **Settings → Domains & Routes** when you're ready to move traffic. Canonicals, social metadata, and the sitemap default to `https://aravindsafetynets.in`. If another origin will be the public site, set `VITE_PUBLIC_URL` to that full HTTPS origin as a **build variable** and redeploy.

### Enable enquiry delivery

The contact and quote forms POST to the Worker. The Worker sends through [Resend](https://resend.com/) to **aravindsafetynets@gmail.com**. The visitor’s email is set as `Reply-To`, not used as the sender. Set this up **before** publishing the form update:

1. In Resend, verify a sending domain you control (for example `mail.aravindsafetynets.in`), using the DNS records Resend provides. Use an address on that verified domain as the sender. The default `resend.dev` test sender is limited to sending to the Resend account owner.
2. In **Worker → Settings → Variables and Secrets**, set `CONTACT_FROM_EMAIL` as a runtime variable (for example `Aravind Safety Nets <enquiries@mail.aravindsafetynets.in>`) and add `RESEND_API_KEY` as a **secret**, using a sending-only key. Don't use a `VITE_` prefix or put the secret in Git. Configure the same settings separately for any preview Worker that needs live email.
3. Use `npm run preview` with an ignored `.dev.vars` file for a controlled local delivery test, or deploy a configured Worker preview. Submit a labelled test from each form, confirm both arrive in Gmail (check Spam if needed), and verify that Reply goes to the test sender. In case of failure, check the Worker logs for the provider status and Resend's delivery logs. `npm run dev` is for UI development and does not send live email.

Success is shown only after the email provider accepts the enquiry. A retry of unchanged fields in the same form reuses its idempotency key to avoid a second email if the first response was lost. Provider acceptance does not guarantee inbox placement.

The site continues to use the exported copies of uploaded media and the original remote stock-image URLs from `public/airo-media.json`.

### Deploy from a terminal

From an authenticated Cloudflare CLI session:

```sh
npm ci
npm run deploy -- --dry-run  # build and validate without uploading
npm run deploy              # build, publish and print the deployment URL
```

Run `npm run type-check` and `npm test -- --run` to verify the source and Worker routes before deploying.

### Local SEO: Bandlaguda Jagir

After publishing the custom domain, check `https://aravindsafetynets.in/service-areas/bandlaguda-jagir`, then submit `https://aravindsafetynets.in/sitemap.xml` in Google Search Console. Use **URL Inspection** on the landing page to confirm Google can fetch it and request indexing if needed. The production build generates a crawlable `robots.txt` pointing to the sitemap; the `public/robots.txt` fallback blocks crawlers on the Vite development server. Indexing and ranking are determined by Google.
