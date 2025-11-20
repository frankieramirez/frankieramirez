# Repository Guidelines

## Project Structure & Module Organization
- `src/pages` holds Astro route files (`index.astro` renders the homepage grid). Keep new routes minimal and static-friendly.
- `src/components` and `src/layouts` store reusable UI pieces; use PascalCase filenames. `src/lib` is for small helpers; avoid duplicating logic in pages.
- Global token-driven styling lives in `src/styles/global.css` (Tailwind v4 inline theme + animation keyframes). Add new design tokens there instead of scattering custom colors.
- Static assets belong in `public/` (served as-is) or `src/assets/` when using `astro:assets` for optimization. Built output lands in `dist/`.

## Build, Test, and Development Commands
- `pnpm install` — install dependencies (pnpm is preferred package manager).
- `pnpm dev` — start Astro dev server at `http://localhost:4321`.
- `pnpm astro check` — type and template diagnostics using Astro’s strict TS config.
- `pnpm build` — produce the static site in `dist/`; run before pushing UI changes.
- `pnpm preview` — serve the production build locally for smoke-testing routing, animations, and theme toggle.

## Coding Style & Naming Conventions
- TypeScript is strict (`tsconfig` extends `astro/tsconfigs/strict`) with `@/*` aliasing `src/*`.
- Use 2-space indentation, semicolons in configs, and concise imports; prefer Astro components over raw HTML fragments.
- Components/layouts use PascalCase; routes and utility modules stay lower-case with hyphens only when needed for URLs.
- Favor Tailwind utility classes over ad-hoc CSS. When adding custom colors/radii, wire them through `:root` tokens in `global.css` to keep light/dark parity.

## Testing Guidelines
- No automated test suite is present; treat `pnpm build` + `pnpm preview` as the gating check.
- For visual changes, verify both light/dark modes, reduce-motion behavior, and that `astro:assets` images still resolve.
- Keep bundle safe for static hosting; avoid runtime-only Node APIs.

## Commit & Pull Request Guidelines
- Recent history uses short, imperative subjects (e.g., `Clean up light mode UX and update tech stack`). Follow that tone; keep commits scoped to one concern.
- PRs should include: summary of intent, before/after screenshots for UI tweaks, checklist of local commands run (`dev`, `build`, `preview`), and linked issue if applicable.
- Highlight any config changes (e.g., `astro.config.mjs` site URL or font tweaks) so sitemap/canonical outputs stay correct.

## Deployment & SEO Notes
- The site is static (`output: "static"`, `compressHTML: true`); `dist/` is ready for CDN/edge hosting.
- `astro.config.mjs` drives sitemap generation and font loading; update `site` when domains change to keep canonical URLs accurate.
