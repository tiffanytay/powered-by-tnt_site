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
index.html              Vite entry point
main.jsx                Mounts the app
TiffanyPortfolio.jsx    The entire site (nav, hero, services, work, about, contact)
index.css               Tailwind import + theme tokens (colors, fonts)
public/graphics/        Images and favicon, served as-is at /graphics/*
404.html                Static custom 404 page for GitHub Pages
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

## Deployment note

`dist/` is the deployable output — it is **not** committed to this repo.
GitHub Pages currently serves this repo's root directly, which works for
`404.html` but not for the Vite app (the raw source files aren't runnable
without a build step). Publishing the site requires either:

- pushing `dist/` to a `gh-pages` branch (or the branch Pages is configured
  to serve), or
- a GitHub Actions workflow that runs `npm run build` and deploys `dist/`
  on push to `main`.

Neither is set up yet.

## Editing content

Copy, project case studies, and links all live directly in
[`TiffanyPortfolio.jsx`](TiffanyPortfolio.jsx) as plain data (see the
`services` and `projects` arrays near the top of the file) — update them
there rather than hunting through markup.
