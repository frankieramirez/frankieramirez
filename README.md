# Frankie Ramirez

**Staff Frontend Engineer** — design systems, frontend architecture, and product surfaces that stay coherent as teams scale.

I lead the kind of work that shows up in tokens, component APIs, contribution paths, and the habits that keep large orgs shipping without local one-offs becoming permanent. Based in New Jersey. 15 years across CRM, proptech, and SaaS.

<p>
  <a href="https://frankieramirez.com"><strong>frankieramirez.com</strong></a> ·
  <a href="https://www.linkedin.com/in/frankieramirez">LinkedIn</a> ·
  <a href="mailto:hello@frankieramirez.com">hello@frankieramirez.com</a> ·
  <a href="https://github.com/frankieramirez/comicarr">Comicarr</a>
</p>

---

### Operating model

| Primitives | Composition | Governance |
| --- | --- | --- |
| Tokens, states, accessibility, type | Component APIs and product patterns | Contribution model, reviews, adoption |

### Where I am most useful

Staff frontend and design-system roles where interface quality, system governance, and AI-assisted engineering practice need to move together — not as separate workstreams.

---

## This repository

The live site and its source live here. One static page, one deliberate stack, no filler dependencies.

```
Astro 6 (static) · OKLCH token CSS · self-hosted Geist · @astrojs/sitemap
4 production dependencies · ~5 KB CSS gzip · pointer spotlight for panel lighting
```

**Homepage:** Hero → Work ledger → Judgment → Contact

<details>
<summary><strong>Stylesheet layout</strong> — for reviewers who read <code>src/styles/</code></summary>

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

---

*The site is the proof. The repo is the receipt.*