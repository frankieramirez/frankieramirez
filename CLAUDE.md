# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Frankie Ramirez built with Astro v6, Tailwind CSS v4, and TypeScript. Static single-page editorial portfolio with a two-variant design system: **Paper** (default) — warm off-white, Instrument Serif display type, rust accent — and **Console** — near-black with acid lime accent, sans/mono-forward. Visitors toggle via a nav control (`data-variant` on `<html>`, persisted to localStorage). No backend or API routes — purely static generation.

## Commands

```bash
pnpm dev          # Start dev server at http://localhost:4321
pnpm build        # Production build to dist/
pnpm preview      # Serve production build locally
```

No test framework is configured. Use `pnpm build` + `pnpm preview` as the gating check before pushing changes.

## Architecture

**Framework**: Astro with static output (`output: "static"`). All components are `.astro` files — no React or other UI framework integrations.

**Routing**: File-based via `src/pages/`. Currently a single page (`index.astro`).

**Layout hierarchy**: `Layout.astro` (root HTML shell with SEO/meta, Google Fonts, variant pre-paint init, Header, Footer, ⌘K palette + scripts) → page content via `<slot />`.

**Page structure** (`index.astro`):
```
Layout → Header → main: Hero → About (+ PullQuote) → Expertise (Focus) → Work → Contact → Footer
```

**Key components**:
- `Header.astro` — Sticky nav with `frankie/ramirez` serif mark, nav links (About/Focus/Work/Contact), "Open to Staff / Architect roles" status pill, **Paper/Console mode toggle**, ⌘K command palette button.
- `Footer.astro` — Monospace foot with `Deployed from main — <date>` + version.
- `Hero.astro` — Contains **both variant A (Editorial)** and **variant B (Terminal)**. Only one is visible based on `html[data-variant]`. A has big Instrument Serif display, eyebrow row, hero lede, 4-column meta bar. B has terminal prompt row, sans bold name with blinking cursor caret, `<role>` tags, metrics grid, cursor-reactive grid background.
- `About.astro` — Drop-cap prose in `max-w-3xl`-ish column + 3:4 portrait (`astro:assets` Image, grayscale filter). Also contains the pull-quote section immediately after.
- `Expertise.astro` — "Focus" section: 6-cell grid (3 cols desktop, 1 mobile) with `/ 0N` numbering, serif titles, mono tag chips; followed by an infinite marquee **stack ticker**.
- `Work.astro` — Two work items: Comicarr (links to GitHub) and "Everything else is proprietary" (NDA note).
- `Contact.astro` — Serif display headline with inline mailto link + 6 social columns (Email, GitHub, LinkedIn, X, Bluesky, Mastodon `rel="me"`).

**Styling**: Tailwind v4 is imported but the editorial design uses vanilla CSS in `src/styles/global.css` — the Tailwind layer mostly provides the reset + utility availability. Design tokens (colors, type families, spacing) live on `:root` and switch under `html[data-variant="b"]`. No `tailwind.config.js`.

**Fonts**: Google Fonts via `<link>` in `Layout.astro` head:
- **Instrument Serif** (roman + italic) — display type + variant A section/contact titles + pull quote
- **Inter** (300–700) — body sans + variant B name display
- **JetBrains Mono** (400/500/600) — eyebrows, mono chips, meta labels, variant B title families

No self-hosted fonts. `public/fonts/` is not used.

**Variant toggle**: Inline `is:inline` script in `Layout.astro` `<head>` reads `localStorage.getItem("variant")` and sets `document.documentElement.dataset.variant` before paint (prevents flash). The nav toggle buttons flip the attribute + persist. A bottom-mounted script in `Layout.astro` wires `setVariant()` to the buttons and the ⌘K palette's "Toggle Paper / Console" command.

**Scripts in `Layout.astro`** (at the end of `<body>`):
1. Cursor-reactive grid for variant B (sets `--mx` / `--my` on `.cursor-grid` from mouse coords).
2. Variant setter + persistence.
3. ⌘K command palette (nav commands, send/copy email, open social profiles, toggle variant). Keyboard: ⌘K opens, ↑↓ move, Enter runs, Esc closes.
4. IntersectionObserver scroll-reveal on `.section, .work-item, .metric, .focus-cell` (opacity 0 → 1, translateY 24 → 0 at threshold 0.1).

**Signature interactions**:
- **Paper/Console toggle** — full theming swap of tokens + type families + display styles (e.g., hero name switches from serif italic accent to sans bold with blinking caret).
- **⌘K command palette** — keyboard-navigable, ⌘K / Ctrl+K or button in nav, jump-to-section + utility commands.
- **Cursor-reactive grid** (variant B only) — grid pattern revealed via radial mask following the mouse.
- **Stack ticker** — infinite horizontal marquee in the Focus section with mono tech-stack labels.
- **Portrait grayscale filter** — `object-fit: cover` + `filter: grayscale(1)` (adjusted for Console), label pill uses backdrop blur.

**Images**: Use `astro:assets` `Image` component (optimized by Sharp, emits responsive `webp`) for files in `src/assets/`. Static files in `public/` (favicons, `og.png`, `resume.pdf`) are served as-is.

**Path alias**: `@/*` maps to `./src/*`.

## Responsive strategy

Breakpoints live in `global.css`:
- `≤ 900px` — hide `.nav-links` and `.status-pill`; multi-column layouts (`.section-head`, `.about-grid`, `.pullquote-inner`, `.focus-grid`, `.work-item`) collapse to 1 col at `≤ 820px`.
- `≤ 820px` — tighter hero/section padding, reduced folio/focus-cell sizes, portrait capped height instead of 3:4.
- `≤ 720px` — `.mode-toggle` button labels hide (glyph only).
- `≤ 640px` — `.metrics` becomes 2×2.
- `≤ 560px` — shrink nav mark, reduce display / contact clamps further, stack foot vertically.

Display-type clamps use low minimums (44/36/30 px) + `overflow-wrap: break-word` so nothing clips at 320px.

## Coding Conventions

- Strict TypeScript (`astro/tsconfigs/strict`).
- PascalCase for components/layouts; lowercase with hyphens for routes.
- Prefer plain CSS in `global.css` for new styles — the design is not Tailwind-driven.
- New design tokens go on `:root` and get a corresponding override under `html[data-variant="b"]`.
- Section components are self-contained `.astro` files. Scroll-reveal is wired globally in `Layout.astro` — don't attach per-component IntersectionObservers for reveal.
- All animations must respect `prefers-reduced-motion`. The ticker disables, and all transitions clamp to 0.01ms under the reduced-motion rule in `global.css`.
- Commits: short imperative subjects, scoped to one concern.
- For visual changes, verify at 1440 / 768 / 390 / 320 and both variants.

**Accessibility patterns**:
- Skip-to-main link before Header (`.skip-link`).
- `aria-hidden="true"` on decorative SVGs (portrait stripes, work previews, comicarr cells).
- `aria-pressed` on variant toggle buttons, synced by `setVariant()`.
- `aria-label` on ⌘K button and command palette input.
- `role="dialog"` + `aria-modal="true"` on cmdk backdrop.
- Keyboard traps: Esc closes palette; ⌘K / Ctrl+K opens it.

## Key Dependencies

- **@astrojs/sitemap** — Auto-generated sitemap on build
- **sharp** — Image optimization for `astro:assets`
- **tailwindcss** + **@tailwindcss/vite** — Utilities + reset (design uses vanilla CSS)
