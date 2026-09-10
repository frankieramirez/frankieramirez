# Frankie Ramirez

**Staff Software Engineer, Frontend Architecture and Design Systems.** I build design systems and the frontend architecture that keeps product surfaces coherent as teams scale.

The work shows up in tokens, component APIs, contribution paths, and the habits that keep large orgs shipping without local one-offs becoming permanent. Based in New Jersey, with 14+ years across CRM, proptech, SaaS, and the design-system work that ties them together.

<p>
  <a href="https://frankieramirez.com"><strong>frankieramirez.com</strong></a> ·
  <a href="https://www.linkedin.com/in/frankieramirez">LinkedIn</a> ·
  <a href="mailto:hello@frankieramirez.com">hello@frankieramirez.com</a> ·
  <a href="https://bushel.sh">bushel</a> ·
  <a href="https://ripen.dev">Ripen</a> ·
  <a href="https://github.com/frankieramirez/comicarr">Comicarr</a>
</p>

---

### Working model

| Primitive layer | Workflow layer | Adoption layer |
| --- | --- | --- |
| Tokens, states, semantics, accessibility, type | Routes, data contracts, review flows, eval tasks | Docs, contribution paths, PR review, release guardrails |

### Where I am most useful

Staff frontend and design-system roles that treat interface quality, system governance, adoption, and AI-assisted engineering practice as one job.

---

## This repository

The live site and its source live here. It includes a homepage and a Markdown blog, with two production dependencies.

```
Astro 7 (static) · OKLCH token CSS · self-hosted Geist · @astrojs/sitemap
2 production dependencies · ~5 KB CSS gzip · pointer spotlight for panel lighting
```

**Homepage sections, in order:** Hero, Work ledger, Judgment, Contact

### Blog

Add posts as Markdown files in `src/content/blog/` with `title`, `description`, and `date` frontmatter. Set `draft: true` to preview a post locally while excluding it from production. Set `draft: false` to publish it on the next build.

The blog index lives at `/blog/`. Article pages use a separate reading layout with automatic section links from `##` and `###` headings, an active section indicator, and a back link. The section navigation moves above the article on small screens. Optional `source`, `image`, and `imageAlt` fields preserve original publication links and cover images for cross-posted articles.

<details>
<summary><strong>Stylesheet layout</strong>, for reviewers who read <code>src/styles/</code></summary>

```
src/styles/
  index.css
  tokens/              primitives · semantic · typography
  reset.css / base.css / atmosphere.css
  layout/wrap.css
  components/
    folio-rule.css     tapered dividers + shimmer
    spotlight-panel.css cursor-driven border lighting
    header · hero · ledger · judgment · contact · footer
  motion.css           hero stagger · scroll-driven reveal
```

Techniques in use: CSS subgrid, container queries, `@property` transitions, `color-mix()`, `animation-timeline: view()`, `prefers-reduced-motion` clamps.

</details>

<details>
<summary><strong>Local development</strong></summary>

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build
pnpm preview
```

</details>
