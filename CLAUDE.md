# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Frankie Ramirez built with Astro v5, Tailwind CSS v4, and TypeScript. Static single-page site with a bento grid layout, dark/light theme toggle, and scroll-animated timeline. No backend or API routes — purely static generation.

## Commands

```bash
pnpm dev          # Start dev server at http://localhost:4321
pnpm build        # Production build to dist/
pnpm preview      # Serve production build locally
pnpm astro check  # Type and template diagnostics
```

No test framework is configured. Use `pnpm build` + `pnpm preview` as the gating check before pushing changes.

## Architecture

**Framework**: Astro with static output (`output: "static"`). All components are `.astro` files — no React or other UI framework integrations.

**Routing**: File-based via `src/pages/`. Currently a single page (`index.astro`).

**Layout hierarchy**: `Layout.astro` (root HTML shell with SEO/meta/fonts) → `BentoGrid.astro` (responsive grid container) → `BentoItem.astro` (individual cards with optional link wrapping).

**Key components**:
- `BentoItem.astro` — Accepts `span` (1–3 or full), `rowSpan`, optional `href`. Renders as `<a>` or `<div>` accordingly.
- `Timeline.astro` — Vertical timeline with hardcoded career/life events. Uses Intersection Observer via inline `<script>` for scroll-triggered animations.

**Styling**: Tailwind v4 with inline theme configuration in `src/styles/global.css` (no `tailwind.config.js`). Design tokens use OKLCh color space with CSS variables for light/dark mode parity. Custom animation keyframes (`fadeIn`, `slideUp`, `scaleIn`, `fadeInUp`) and utility classes defined in the same file. Respects `prefers-reduced-motion`.

**Fonts**: Manrope (sans) and Space Grotesk (display) loaded via Astro's experimental font API in `astro.config.mjs`, exposed as `--font-manrope` and `--font-space` CSS variables.

**Theme toggle**: Inline JS in `index.astro` toggles `.dark` class on `<html>` with localStorage persistence and `prefers-color-scheme` fallback.

**Images**: Use `astro:assets` Image component (optimized by Sharp) for files in `src/assets/`. Static files in `public/` are served as-is.

**Path alias**: `@/*` maps to `./src/*`.

## Coding Conventions

- Strict TypeScript (`astro/tsconfigs/strict`).
- PascalCase for components/layouts; lowercase with hyphens for routes.
- Tailwind utility-first; new design tokens go in `global.css` `:root` variables to maintain light/dark parity.
- Commits: short imperative subjects, scoped to one concern.
- For visual changes, verify both light/dark modes and reduced-motion behavior.

## Key Dependencies

- **@astrojs/partytown** — Third-party script isolation (configured to forward `dataLayer.push`)
- **@astrojs/sitemap** — Auto-generated sitemap on build
- **sharp** — Image optimization
- **tw-animate-css** — Extended Tailwind animation utilities
