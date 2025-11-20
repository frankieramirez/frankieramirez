# Project Context: Personal Portfolio Website

## Overview
This project is a personal portfolio website built with **Astro**. It focuses on high performance, clean design, and smooth animations. The site is statically generated for optimal speed and SEO.

## Tech Stack
- **Framework:** [Astro](https://astro.build) (v5.8.1)
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Animations:** Custom CSS animations & `tw-animate-css`
- **Package Manager:** `pnpm`
- **Build Tool:** Vite (internal to Astro)

## Project Structure
```
/
├── astro.config.mjs    # Astro configuration (Site URL, Integrations, Tailwind)
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── src/
│   ├── assets/         # Static assets (images, etc.)
│   ├── components/     # Reusable UI components (.astro)
│   ├── layouts/        # Layout wrappers (e.g., Layout.astro)
│   ├── pages/          # Route definitions (file-based routing)
│   └── styles/         # Global styles (global.css)
└── public/             # Public static files (favicon, robots.txt)
```

## Development Workflow

### Prerequisites
- Node.js (v18+)
- pnpm

### Key Commands
| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts the local development server at `http://localhost:4321` |
| `pnpm build` | Builds the production site to the `dist/` directory |
| `pnpm preview` | Serves the built `dist/` folder locally for testing |
| `pnpm astro` | Runs the Astro CLI directly |

## Conventions & Configuration

### Styling
- **Global Styles:** Located in `src/styles/global.css`.
- **Tailwind:** Uses Tailwind v4. The configuration is largely handled in `src/styles/global.css` via CSS variables and the `@theme` directive (no `tailwind.config.js` required for basic v4 setup, though one might exist if legacy config is needed).
- **Fonts:** Uses **Manrope** from Google Fonts, configured via Astro's experimental `fonts` API in `astro.config.mjs`.

### Routing
- **File-based Routing:** Pages in `src/pages/` automatically become routes.
- **Layouts:** `src/layouts/Layout.astro` is the main wrapper, handling `<head>` meta tags, SEO, and global styles.

### Path Aliases
- `@/*` is configured in `tsconfig.json` to resolve to `./src/*`.

### Integration
- **Partytown:** Configured for third-party script optimization.
- **Sitemap:** Automatically generates a sitemap on build.
