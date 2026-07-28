# poweredbytnt.com

Portfolio site for **Tiffany Tay, CPA** — nonprofit finance and operations
consulting. A single-page React app showcasing services, selected case
studies, credentials, and a contact form.

## Stack

- **Vite** + **React 19** — build tooling and rendering
- **Tailwind CSS v4** — styling, via `@theme` tokens in [`index.css`](index.css)
- **Framer Motion** — scroll-reveal animations
- **lucide-react** — icons
- **Web3Forms** — contact form backend (no server of our own)

## Structure

```
index.html                    Vite entry point
main.jsx                      Mounts the app
TiffanyPortfolio.jsx          The entire site (nav, hero, services, work, about, contact)
index.css                     Tailwind import + theme tokens (colors, fonts)
public/graphics/              Images and favicon, copied as-is into dist/graphics/*
public/404.html               Custom 404 page, copied as-is into dist/404.html
public/CNAME                  Custom domain (poweredbytnt.com), copied as-is into dist/CNAME
.github/workflows/deploy.yml  Builds and publishes dist/ to GitHub Pages on push to main
```

Everything lives in one component file by design — this is a single static
page, not an app that needs routing or shared state across views.

## Development

```bash
npm install
npm run dev
```

Starts the Vite dev server (default `http://localhost:5173`) with hot reload.

## Build

```bash
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which runs `npm run build` and publishes `dist/` to GitHub Pages. `dist/`
itself is never committed — it's rebuilt fresh on every deploy.

**One-time setup** (already done if the site is live, but needed again if
Pages ever gets reconfigured): in the repo's **Settings → Pages**, set
"Build and deployment" → Source to **GitHub Actions** (not "Deploy from a
branch"). After that, every push to `main` deploys automatically — no
manual `gh-pages` branch, no manual `npm run build` before pushing.

Vite's `base` is set to `'./'` in [`vite.config.ts`](vite.config.ts), so
the built asset paths are relative. This means the same build works
whether Pages serves it from a project subpath
(`https://tiffanytay.github.io/powered-by-tnt_site/`) or a custom domain
mapped to the repo root (e.g. `poweredbytnt.com`, configured separately
via a `CNAME` file or the Pages settings UI) — no config change needed
either way.

To trigger a deploy without pushing new code (e.g. after changing the
Pages source setting), run the workflow manually from the **Actions**
tab — it's set up with `workflow_dispatch`.

### Custom domain (poweredbytnt.com)

Two things both have to be true for the custom domain to work — missing
either one produces GitHub's `NotServedByPagesError`:

1. **A `CNAME` file in the published output**, containing exactly
   `poweredbytnt.com`. [`public/CNAME`](public/CNAME) provides this so it
   lands in `dist/CNAME` on every build. This step matters specifically
   because Pages "Source" is set to **GitHub Actions** here — in that mode
   GitHub does *not* auto-write a `CNAME` file for you the way it does
   under the older "Deploy from a branch" mode, so it has to be part of
   the build artifact instead.
2. **DNS records at your domain registrar** pointing `poweredbytnt.com` at
   GitHub Pages. This has to be done in whatever dashboard manages the
   domain (registrar or DNS provider) — it isn't something this repo
   controls. For an apex domain like `poweredbytnt.com`, that means four
   `A` records pointing at:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
   (optionally also `AAAA` records at `2606:50c0:8000::153`,
   `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` for
   IPv6). If `www.poweredbytnt.com` should also work, add a `CNAME` record
   for the `www` subdomain pointing at `tiffanytay.github.io`.

After both are in place, re-check (or re-save) the custom domain field in
**Settings → Pages** — GitHub re-runs its DNS check at that point, and it
can take anywhere from a few minutes up to 24 hours for DNS propagation
before the check passes.

## Editing content

Copy, project case studies, and links all live directly in
[`TiffanyPortfolio.jsx`](TiffanyPortfolio.jsx) as plain data (see the
`services` and `projects` arrays near the top of the file) — update them
there rather than hunting through markup.
