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

### Enable or restore enquiry delivery

Both forms POST to the Cloudflare Worker. It sends through [Resend](https://resend.com/) to **aravindsafetynets@gmail.com**. The visitor's address is `Reply-To`, not the sender. The contact form includes the visitor's name, phone, email, area/location, and message.

**If the form says “The form is temporarily unavailable”, neither a Gmail password nor a frontend change will fix it.** The running Worker is missing a non-blank `RESEND_API_KEY` or `CONTACT_FROM_EMAIL`; it has not called Resend yet. Set the bindings on the Worker that serves the public domain, not under Workers Builds environment variables. You can fix these settings on the existing Worker before merging any code changes.

1. **Resend → Domains → Add Domain.** Use a sending subdomain you control, such as `mail.aravindsafetynets.in`. Add the DNS records shown by Resend for that subdomain (in Cloudflare **DNS → Records** if Cloudflare hosts the zone). Don't replace the root domain's MX records. Click **Verify DNS Records** and wait until Resend marks the domain **Verified**. Do not use `@gmail.com` as your sender.
2. **Resend → API Keys → Create API Key.** Select **Sending access**, restricted to the verified sending domain if offered. Copy the key directly into Cloudflare; don't put it in Git, chat, or frontend environment variables.
3. **Cloudflare → Workers & Pages → `aravind-safety-nets` → Settings → Variables and Secrets → Add.** Add both of these as **Secret** bindings, and deploy the settings to the active Worker:

   | Secret name | Value |
   | --- | --- |
   | `RESEND_API_KEY` | The sending-only key from Resend |
   | `CONTACT_FROM_EMAIL` | `Aravind Safety Nets <enquiries@mail.aravindsafetynets.in>` if you verified that exact subdomain; otherwise use your verified sending domain |

   If the sender was previously a dashboard text variable, replace it with a Secret of the same name. Wrangler's `secrets.required` lists **names only** and tells deployments to inherit the bindings; uploads should fail if a required binding is absent instead of rolling out another broken form. Configure the bindings on any separate preview Worker as well.
4. **Test delivery.** Submit a labelled test with a location from `/contact` and a separate quote-form test. Confirm that the thank-you page appears, Resend records the emails under **Emails**, both messages arrive in Gmail (check Spam), the location is included, and Gmail's Reply goes to the test submitter. A Resend receipt is required for form success, but does not guarantee inbox placement.

From an authenticated terminal you can set the same secrets without putting values into shell history. These commands prompt for the values; run them only on the account that owns the Worker:

```sh
npx wrangler secret put RESEND_API_KEY --name aravind-safety-nets
npx wrangler secret put CONTACT_FROM_EMAIL --name aravind-safety-nets
npx wrangler secret list --name aravind-safety-nets
```

If the test still fails, look at the Worker's **Observability → Logs** while submitting. A `503` logs only which binding names are missing, never secret values or customer data. A provider `401`/`403` in the logs calls for checking the key's validity, domain permissions, and sender-domain verification. For controlled local delivery tests, `npm run preview` loads the two values from a gitignored `.dev.vars` file; `npm run dev` does not send email.

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
