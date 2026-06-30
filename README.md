# frankieramirez.com

Personal portfolio for Frankie Ramirez - Staff Software Engineer and Frontend Architect.

## Architecture

- **Astro 6** static output — no application shell, no runtime JS on the homepage
- **Token-driven CSS** — OKLCH primitives, semantic custom properties, modular stylesheets under `src/styles/`
- **Self-hosted Geist** via `@fontsource` — no render-blocking third-party font requests
- **Modern CSS** — subgrid ledger alignment, container queries, scroll-driven section reveal, `@property` color transitions

## Commands

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # dist/
pnpm preview    # serve production build
```

## Stylesheet layout

```
src/styles/
  index.css           # import chain
  tokens/             # primitives, semantic, typography
  reset.css / base.css
  layout/wrap.css
  components/         # header, hero, ledger, judgment, contact, footer
  motion.css          # scroll-driven reveal + reduced-motion
```

## Built output

After `pnpm build`, site CSS (excluding fonts) is a single inlined stylesheet. Fonts ship as self-hosted woff2 with `font-display: swap`.
