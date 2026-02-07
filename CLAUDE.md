# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Frankie Ramirez built with Astro v5, Tailwind CSS v4, and TypeScript. Static single-page site with section-based layout, fixed navigation, dark/light theme toggle, and scroll-animated sections. No backend or API routes — purely static generation.

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
Layout → Header → main: Hero → About → Expertise → Timeline → Contact → Footer
```

**Key components**:
- `Header.astro` — Fixed navigation with scroll-triggered backdrop blur, active section highlighting, theme toggle (sun/moon), mobile hamburger overlay with staggered animations.
- `Footer.astro` — Monogram, nav links, social icons, copyright.
- `Hero.astro` — Full-viewport hero with avatar, "Available for work" badge, name, title, tagline, CTAs, gradient orb backgrounds.
- `About.astro` — 5-column grid: bio paragraphs (col-span-3) + sidebar with photo, quick facts, resume download (col-span-2).
- `Expertise.astro` — Three category cards (Frontend Architecture, Design Engineering, Platform & Tooling) with icons and skill badges.
- `Timeline.astro` — Vertical timeline with professional entries only (Senior FE Engineer → Frontend Dev → Web Dev → Education). Pulsing dot on current role.
- `Contact.astro` — Two-column: info/social links + mailto contact form.
- `SectionHeading.astro` — Reusable section header with label (uppercase accent), title (serif h2), optional description. Props: `label`, `title`, `description?`, `align?`.

**Styling**: Tailwind v4 with inline theme configuration in `src/styles/global.css` (no `tailwind.config.js`). Design tokens use OKLCh color space with CSS variables for light/dark mode parity. Warm amber accent (`oklch 0.78 0.145 65` dark / `oklch 0.65 0.16 55` light). Custom animation keyframes (`fadeIn`, `slideUp`, `scaleIn`, `fadeInUp`, gradient orbs, pulse-dot) and utility classes (`.scroll-animate`, `.card-hover`, `.glass`, `.social-link`) defined in the same file. Respects `prefers-reduced-motion`.

**Scroll animations**: `.scroll-animate` class starts at `opacity: 0; translateY(40px)` and transitions to visible when `.in-view` is added. A single global IntersectionObserver in `Layout.astro` handles all `.scroll-animate` elements across all sections.

**Fonts**: Manrope (sans) and Space Grotesk (display/serif) loaded via Astro's experimental font API in `astro.config.mjs`, exposed as `--font-manrope` and `--font-space` CSS variables.

**Theme toggle**: Inline `is:inline` script in `Layout.astro` `<head>` initializes theme before paint (prevents flash). Toggle button in Header toggles `.dark` class on `<html>` with localStorage persistence and `prefers-color-scheme` fallback.

**Images**: Use `astro:assets` Image component (optimized by Sharp) for files in `src/assets/`. Static files in `public/` are served as-is. Resume PDF is in `public/resume.pdf`.

**Path alias**: `@/*` maps to `./src/*`.

## Coding Conventions

- Strict TypeScript (`astro/tsconfigs/strict`).
- PascalCase for components/layouts; lowercase with hyphens for routes.
- Tailwind utility-first; new design tokens go in `global.css` `:root` variables to maintain light/dark parity.
- Commits: short imperative subjects, scoped to one concern.
- For visual changes, verify both light/dark modes and reduced-motion behavior.
- Section components are self-contained `.astro` files with their own markup and styles. Scroll animation is handled globally — do not add per-component IntersectionObservers for `.scroll-animate`.

## Key Dependencies

- **@astrojs/partytown** — Third-party script isolation (configured to forward `dataLayer.push`)
- **@astrojs/sitemap** — Auto-generated sitemap on build
- **sharp** — Image optimization
- **tw-animate-css** — Extended Tailwind animation utilities
