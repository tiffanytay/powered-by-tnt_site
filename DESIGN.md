# Design system

Small on purpose: one token block, one component file. This is the map.

## Tokens

Defined once in the `@theme` block of [`index.css`](index.css). Tailwind v4 turns each into
utilities (`bg-ink`, `text-emerald-deep`, `fill-emerald`, `stroke-line`, `font-display`, …).
Use the class, not the hex.

| Token          | Value     | Use                                                        |
| -------------- | --------- | ---------------------------------------------------------- |
| `paper`        | `#ffffff` | Page background                                            |
| `mist`         | `#f4f6f5` | Alternate section background                               |
| `line`         | `#e2e7e4` | Borders, dividers                                          |
| `ink`          | `#0b1210` | Body text; use `/60`-style opacity for secondary text      |
| `pine`         | `#071013` | Dark sections                                              |
| `emerald`      | `#66c3ff` | Brand accent: on dark backgrounds and decorative graphics  |
| `emerald-deep` | `#0b6bb0` | Brand accent as text on `paper`/`mist` (clears 4.5:1)      |

| Font           | Family         | Use                                  |
| -------------- | -------------- | ------------------------------------ |
| `font-sans`    | Inter          | Body                                 |
| `font-display` | Space Grotesk  | Headings                             |
| `font-mono`    | IBM Plex Mono  | Eyebrows, labels, small caps text    |

Illustrations (envelopes, flowers, passport stamps, Budget Canary) carry their own
palettes inline. Those colors are artwork, not tokens.

## Components

All in [`TiffanyPortfolio.jsx`](TiffanyPortfolio.jsx). Search for `function <Name>`.

**Layout**
- `SiteHeader`, `SiteFooter`: page chrome; header is a 4rem sticky bar
- `PageHeader`: numbered eyebrow and title for each section (`index`, `label`, `title`, `dark`)
- `Reveal`: fade/slide-in on scroll (Framer Motion)

**Interactive**
- `FramedCta`: primary CTA; `kind="flowers" | "envelopes"` grows a frame on hover/focus
- `JigsawShatter`: Off-the-clock puzzle tile that breaks apart on hover
- `DogSprite`: dog that runs across the footer
- Passport stamps: Travel & Food tile (`usePassport`)

**Visuals**
- `DataVisual`, `CanaryVisual`: project card heroes
- Services `art`: per-card SVG diagrams, animated via `.a-*` classes in `index.css`

**Sections / pages**
- `Hero`, `WorkSection`, `ProjectDetail`, `ServicesSection`, `AboutSection`,
  `OffTheClockSection`, `ContactSection`; routed via `PAGES`

## Motion

- Easing in use: `cubic-bezier(.19,1,.22,1)` (out-expo) for entrances,
  `cubic-bezier(.34,1.56,.64,1)` for pops, `cubic-bezier(.4,0,.2,1)` for state changes.
- Every animation has a `prefers-reduced-motion: reduce` fallback. Keep it that way.
