# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Frankie Ramirez built with Astro v5, Tailwind CSS v4, and TypeScript. Static single-page site with section-based layout, fixed navigation, dark/light theme toggle, and scroll-animated sections. Minimalist, leerob-inspired aesthetic with signature interactive touches. No backend or API routes — purely static generation.

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

**Layout hierarchy**: `Layout.astro` (root HTML shell with SEO/meta/fonts, Header, Footer, theme init script, global scroll observer) → page content via `<slot />`.

**Page structure** (`index.astro`):
```
Layout → Header → main: Hero → About → Expertise → Contact → Footer
```

**Key components**:
- `Header.astro` — Fixed navigation with scroll-triggered backdrop blur, active section highlighting, circular theme wipe toggle (sun/moon), mobile hamburger overlay with staggered animations. Nav links: About, Focus, Contact.
- `Footer.astro` — Monogram, nav links, social icons, copyright.
- `Hero.astro` — Full-viewport hero with canvas particle constellation background, name, title, tagline, single mailto CTA. No avatar.
- `About.astro` — Single-column (`max-w-3xl`) bio text with clip-reveal animation on paragraphs.
- `Expertise.astro` — Prose-based "Focus" section with 3 paragraphs describing areas of expertise. Uses `.font-pixel` inline spans for key terms. No cards, no tilt.
- `Contact.astro` — Heading, short sentence, email link, social icon row (GitHub, LinkedIn, X). No form.
- `SectionHeading.astro` — Reusable section header with label (uppercase accent in Geist Pixel font), title (serif h2), optional description. Props: `label`, `title`, `description?`, `align?`.

**Styling**: Tailwind v4 with inline theme configuration in `src/styles/global.css` (no `tailwind.config.js`). Design tokens use OKLCh color space with CSS variables for light/dark mode parity. Warm amber accent (`oklch 0.78 0.145 65` dark / `oklch 0.65 0.16 55` light). Custom animation keyframes and utility classes defined in the same file. Respects `prefers-reduced-motion`.

**Animation architecture** (two-tier progressive enhancement):

1. **Baseline (all browsers)**: `.scroll-animate` class starts at `opacity: 0; translateY(40px)` and transitions to visible when `.in-view` is added by a single global IntersectionObserver in `Layout.astro`.

2. **Enhanced (CSS scroll-driven animations)**: Wrapped in `@supports (animation-timeline: view())`. Animation classes (`.clip-reveal`, `.scale-subtle-in`, `.parallax-slow`) use native scroll-driven animations. These classes override the IO-based opacity/transform so elements aren't invisible in supporting browsers. The global IO observer skips elements that have these enhanced classes.

**Signature interactions** (zero npm dependencies, ~5KB total JS):
- **Hero canvas particles**: ~150 amber dots (60 on mobile) with brownian motion, cursor attraction, connection lines. Fades on scroll. Script in `Hero.astro`.
- **Scroll progress bar**: 2px amber bar at bottom of header, fills left→right. Pure CSS `animation-timeline: scroll()` with JS fallback.
- **Scroll spine**: Fixed vertical indicator on right viewport edge (desktop only) with 3 section dots (about, expertise, contact) that pulse when active. Markup in `Layout.astro`.
- **Section choreography**: About and Expertise paragraphs clip-reveal left-to-right. Key terms highlighted with Geist Pixel Square accent font.
- **Circular theme wipe**: Theme toggle triggers `clip-path: circle()` overlay that expands from button center, swaps `.dark` class at midpoint. Script in `Header.astro`.

**Fonts**: Manrope (sans) and Space Grotesk (display/serif) loaded via Astro's experimental font API in `astro.config.mjs`, exposed as `--font-manrope` and `--font-space` CSS variables. **Geist Pixel Square** (accent) is self-hosted from `public/fonts/` via `@font-face` in `global.css`, exposed as `--font-pixel`. Applied via `.font-pixel` utility class to section labels and inline key terms.

**Theme toggle**: Inline `is:inline` script in `Layout.astro` `<head>` initializes theme before paint (prevents flash). Toggle button in Header triggers circular wipe overlay (`clip-path: circle()` expanding from button center) and swaps `.dark` class on `<html>` at animation midpoint. Falls back to instant swap with `prefers-reduced-motion`. localStorage persistence + `prefers-color-scheme` fallback.

**Images**: Use `astro:assets` Image component (optimized by Sharp) for files in `src/assets/`. Static files in `public/` are served as-is.

**Path alias**: `@/*` maps to `./src/*`.

## Coding Conventions

- Strict TypeScript (`astro/tsconfigs/strict`).
- PascalCase for components/layouts; lowercase with hyphens for routes.
- Tailwind utility-first; new design tokens go in `global.css` `:root` variables to maintain light/dark parity.
- Commits: short imperative subjects, scoped to one concern.
- For visual changes, verify both light/dark modes and reduced-motion behavior.
- Section components are self-contained `.astro` files with their own markup and styles. Scroll animation is handled globally — do not add per-component IntersectionObservers for `.scroll-animate`.
- New scroll animations go in `global.css` inside the `@supports (animation-timeline: view())` block. The IO fallback in `Layout.astro` automatically skips elements with CSS scroll-driven animation classes.
- Hero canvas has its own `<script>` block — this is the exception to the "no per-component scripts" rule since it's interactive canvas JS, not scroll reveal.
- All animations must respect `prefers-reduced-motion`. Canvas renders one static frame; CSS animations disabled by the global reduced-motion rule; theme wipe falls back to instant swap.

## Key Dependencies

- **@astrojs/partytown** — Third-party script isolation (configured to forward `dataLayer.push`)
- **@astrojs/sitemap** — Auto-generated sitemap on build
- **sharp** — Image optimization
- **tw-animate-css** — Extended Tailwind animation utilities
- **geist** — Vercel's Geist font family (Geist Pixel Square variant used as accent typeface)
