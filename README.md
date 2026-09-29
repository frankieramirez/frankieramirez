# Frankie Ramirez

**Staff Software Engineer focused on frontend architecture and design systems.** Based in New Jersey, with 14+ years building software.

I help teams build complex interfaces that stay consistent as they grow. I also build open-source tools, including [Ultima](https://ultima.systems), a React design system whose components install as source you own.

I write about design systems and how I use AI agents to build and review software.

[Website](https://frankieramirez.com) · [LinkedIn](https://www.linkedin.com/in/frankieramirez) · [Email](mailto:hello@frankieramirez.com)

## Projects

- **[Ultima](https://github.com/frankieramirez/ultima)**: A React design system built with Base UI and StyleX, with components you install as source and guidance for AI agents. [Website](https://ultima.systems)
- **[mana](https://github.com/frankieramirez/mana)**: Agent skills for planning and building software, with workflows for implementation and specialist code review.
- **[bushel](https://github.com/frankieramirez/bushel)**: A terminal UI for Apple Containers that shows the exact command before destructive actions, built with Rust and Ratatui. [Website](https://bushel.sh)
- **[Ripen](https://github.com/frankieramirez/ripen)**: A Go CLI and daemon that waits for container images to reach a minimum age before updating Portainer and Compose services, then rolls back if health checks fail. [Website](https://ripen.dev)
- **[Comicarr](https://github.com/frankieramirez/comicarr)**: A self-hosted app for comic and manga collectors that tracks new releases and organizes downloaded issues into a personal library. [Website](https://comicarr.com)

## Writing

- [When anyone can generate UI, what is a design system for?](https://frankieramirez.com/blog/design-systems-in-the-agentic-era/)
- [Building my own agent skills felt boring. So I gamified it.](https://frankieramirez.com/blog/building-my-own-agent-skills/)

[All posts](https://frankieramirez.com/blog/) · [RSS](https://frankieramirez.com/rss.xml)

<details>
<summary><strong>About this site and local development</strong></summary>

This repository also contains the source for [frankieramirez.com](https://frankieramirez.com), a static Astro site with a Markdown blog. It uses OKLCH color tokens and self-hosted IBM Plex Sans and IBM Plex Mono fonts.

### Run locally

Use the pnpm version pinned in `package.json`.

```bash
pnpm install --frozen-lockfile
pnpm dev       # http://localhost:4321
pnpm check     # Astro and TypeScript diagnostics
pnpm build     # Generate the production site in dist/
pnpm preview   # Preview the production build
```

### Add a blog post

Create a Markdown file in `src/content/blog/`:

```yaml
---
title: "My next post"
description: "A short description of the article."
date: "2026-09-29"
draft: true
---
```

Drafts appear on `/blog/` during local development and are excluded from production builds. Set `draft: false` or omit the field to publish on the next deployed build.

Use `##` and `###` headings for automatic article navigation.

Optional frontmatter fields:

- `updated`: The revision date, on or after the publication date.
- `related`: An array of related post IDs, matching their filenames without `.md`.
- `source`: A URL linking to the original publication.
- `image` and `imageAlt`: A cover image and its alternative text.

</details>
