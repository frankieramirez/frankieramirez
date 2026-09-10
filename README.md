# Frankie Ramirez

**Staff Software Engineer focused on frontend architecture and design systems.** Based in New Jersey, with 14+ years building software across CRM, proptech, and SaaS.

At Luxury Presence, I led the design system from beta toward general availability and owned frontend direction for CRM and Contacts. That work included component APIs, navigation, saved-search flows, and a migration from Radix to Base UI.

I also build open-source tools and write about the way I use AI agents to develop and review software.

[Website](https://frankieramirez.com) · [LinkedIn](https://www.linkedin.com/in/frankieramirez) · [Email](mailto:hello@frankieramirez.com)

## Projects

- **[mana](https://github.com/frankieramirez/mana)**: Reusable agent skills that carry work from scoped tickets through implementation and review. Built around the way I work, with a fantasy theme.
- **[bushel](https://github.com/frankieramirez/bushel)**: A terminal UI for Apple Containers, built with Rust and Ratatui. Shows the exact command before destructive actions. [Website](https://bushel.sh)
- **[Ripen](https://github.com/frankieramirez/ripen)**: A Go CLI and daemon for controlled image updates in Portainer and Compose. Waits for image digests to mature before applying them and rolls back failed health checks. [Website](https://ripen.dev)
- **[Comicarr](https://github.com/frankieramirez/comicarr)**: A self-hosted app for comic collectors, with a React interface. [Website](https://comicarr.com)

## Writing

I write about frontend architecture and the tools I build, including [how I made my own agent skills](https://frankieramirez.com/blog/building-my-own-agent-skills/). Find more on [the blog](https://frankieramirez.com/blog/).

<details>
<summary><strong>About this site and local development</strong></summary>

This repository also contains the source for [frankieramirez.com](https://frankieramirez.com), a static Astro 7 site with a Markdown blog. It uses OKLCH color tokens and self-hosted Geist fonts. Astro and `@astrojs/sitemap` are its two direct production dependencies.

### Run locally

Use pnpm 10.33.0, as specified in `package.json`.

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm check
pnpm build
pnpm preview   # preview the production build
```

### Add a blog post

Create a Markdown file in `src/content/blog/`:

```yaml
---
title: My next post
description: A short description of the article.
date: 2026-09-09
draft: true
---
```

Drafts appear on `/blog/` during `pnpm dev` and are excluded from production builds. Set `draft: false` or remove the field to publish on the next deployed build. Posts default to published when `draft` is omitted.

Use `##` and `###` headings for automatic article navigation. Optional `source`, `image`, and `imageAlt` fields support original publication links and cover images.

</details>
