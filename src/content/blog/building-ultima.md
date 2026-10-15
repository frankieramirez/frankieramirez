---
title: "Building Ultima: a design system you can make your own"
description: "Why I built Ultima for StyleX, and how Theme Studio lets you give its components your product's look."
date: "2026-10-15"
draft: true
related: [design-systems-in-the-agentic-era, building-my-own-agent-skills]
---

Ultima started with a fairly specific thing I wanted: a reusable starting point for building my own apps with StyleX.

I work with Tailwind, and I liked the source-ownership model of shadcn. I wanted something similar that fit the way I wanted to build with StyleX. I could bring components into a project, understand how they worked, and change them when the project needed it.

Once I started looking underneath those components, the work got bigger. A button already carries decisions about spacing, typography, color, borders, and interaction states. A collection of components also assumes that those decisions agree. The medium button should make sense beside the medium input. The same status should have the same meaning across the interface.

Existing tools had been supplying a lot of those choices. Building my own starting point meant deciding which ones to keep, which ones to change, and how they would fit together.

That became [Ultima](https://ultima.systems): a design system for React projects using StyleX, with shared tokens, component conventions, and tools for customizing its appearance. I'm building it for my own projects, but I also want other people to be able to make it feel like theirs.

That second goal affects much more than the color picker.

## A button carries more decisions than it seems

Take the Button component. Its API has three visual choices: variant, size, and tone. You can choose a solid, outline, or ghost button; a small, medium, or large size; and an accent or danger tone.

Those choices need definitions underneath them. What height is medium? How much space goes around the label? Which corner radius does it use? What happens to the background on hover? What color is the text against that background? How does keyboard focus appear?

There are also relationships to settle. Ultima uses the same spacing steps for the heights of Button, Input, and Select. A medium control therefore has a shared meaning across those components. If each component picked its own comfortable-looking height, the difference would show up when someone put them together in a form.

The solid accent button reads separate tokens for its default, hover, and active backgrounds, plus a token for the foreground color. Its focus ring has its own role. Light and dark modes each need values for those relationships.

![A medium solid accent Button in its rest, hover, and keyboard focus states, labeled with the tokens it reads: --ult-color-accent, --ult-color-accent-hover, and --ult-color-border-focus, plus --ult-space-10 for height, --ult-space-4 and --ult-space-5 for padding, --ult-radius-md for corners, and --ult-color-accent-active when pressed.](/images/blog/ultima/button-tokens.webp)

This is the work I want the system to carry forward into the next app. I want to choose the appropriate button and spend my attention on what the action does, what users need to know before taking it, and what happens afterward.

Most of Ultima's React components build on Base UI's unstyled primitives. StyleX handles their styling. That gives the system a foundation for interaction behavior while leaving the visual decisions explicit. Choosing a primitive still leaves plenty to decide about the component people will actually use.

## Give the decisions names people can use

Once those choices are shared, their names become important.

A component needs to ask for the surface color, muted text, or an accent's hover state. Naming those roles makes it possible to change the appearance while keeping the meaning of the component intact.

In Ultima, a token such as `--ult-color-accent-hover` keeps the same name across themes and color modes. Its value can change. Components keep referring to the same role.

The palette sits underneath that semantic layer. It provides the scales used to resolve the colors, while the component reads the role it needs. That separation gives a product a place to customize the system without searching through every component for a particular shade.

I also kept the names exposed to consumers conventional. Ultima has a fantasy theme in its branding and palette names, but someone using a component shouldn't need to learn that vocabulary to find a text color or a border radius.

Stable names have a maintenance cost. If someone has written a theme against a token, renaming it can break their work. The names are part of the interface the system promises to support.

They also make the styling choice more practical. Ultima preserves those semantic names as CSS custom properties, so a theme can override them through CSS or StyleX. Both routes refer to the same underlying decisions.

The same reasoning applies to component conventions. A small set of familiar prop names helps people carry what they learned from one component into another. Every additional variant or special case needs to justify the extra thing a consumer has to understand.

## Leave room for a product's own identity

A reusable starting point needs enough decisions to be useful. If every application has to invent its spacing, typography, and component states again, the system has handed over a lot of unfinished work.

It also needs room for the application to develop its own identity.

For Ultima, that means sharing the component structure and the roles behind its styling while making the visual values adjustable. A product can change its typography, density, corners, shadows, and motion alongside its colors. Those choices can make the same components feel quite different.

Color alone only gets you so far. A dense interface with small corners and compact typography has a different character from one with more space, softer corners, and a more expressive typeface. Swapping an accent color leaves most of that character untouched.

I want customization to work across those relationships. Changing the density should affect the spacing scale that components share. Changing the shape should work through the radius scale. That keeps the product from accumulating separate fixes for each button, input, and menu.

There are limits to what a theme should decide. It can change how a dialog looks. The product still needs to decide whether a dialog is appropriate for the workflow. It can give a danger action a recognizable treatment. The product still owns permissions, recovery, and the consequences of that action.

That boundary matters when evaluating a design system. A polished component gallery shows you part of what you're adopting. You also need to understand which decisions the system carries and which ones your application will need to make.

## Make customization something you can see

[Theme Studio](https://ultima.systems/theme-studio) is where those decisions become easier to explore.

It puts the controls beside a live preview built from Ultima components. You can adjust color, typography, density, shape, elevation, and motion, then see how those changes work together. Every edit applies to both modes, and the Compare view shows light and dark side by side.

![Theme Studio with the Ultima preset selected: theme controls on the left, a live preview of Ultima components on the right, and a contrast summary along the bottom reading 98 of 98 pass.](/images/blog/ultima/theme-studio.webp)

I wanted a way to evaluate the result in context. A color can look good in a swatch and be difficult to use for text or an interactive state. A type scale can look reasonable on its own and feel awkward when headings, labels, and controls share a screen.

![Theme Studio's Compare view, showing the same workspace form and project list in the dark and light versions of one theme.](/images/blog/ultima/compare-light-dark.webp)

The preview gives those choices somewhere to meet. It also gives you a reason to revisit a choice. If a button starts to feel cramped after changing the type, you can look at typography and density together instead of treating them as unrelated settings.

You can start from one of four presets or build a custom theme. Two of them vary much more than their palettes: Grove is green and earthy, with a serif and roomy spacing, and Cinder is copper, compact, and sharp-cornered. They're useful for seeing how several decisions can produce a different overall feel. Neutral is the achromatic default and a restrained starting point, while the Ultima preset keeps Ultima's own indigo and cyan appearance as an explicit option.

![The same Theme Studio preview under two presets. On the left, Grove: a serif typeface, roomy spacing, rounded corners, and a green accent. On the right, Cinder: a compact sans-serif, tight spacing, square corners, and a copper accent, with more of the preview fitting in the same space.](/images/blog/ultima/presets-grove-cinder.webp)

There's also a shuffle control for exploring combinations. You can lock groups you want to keep and vary the others. If the typography is already where you want it, you can hold onto that while exploring color or shape. Undo lets you return to an earlier direction.

The guided controls are a starting point for making coordinated changes. When a specific value needs attention, the token overrides let you go further. An override stays explicit instead of disappearing the next time you adjust a broader setting.

The checks need a similarly clear scope. Studio checks declared token contrast pairings in both modes and shows failures. That gives you useful feedback while editing. Passing those checks still leaves the application's accessibility to evaluate, including keyboard behavior, focus, labels, content, and the way components are combined.

The editor's own appearance stays separate from the preview theme. You can explore a dramatically different direction without changing all the controls you're using to work on it.

For someone evaluating Ultima, Studio is also a way to answer a practical question before adopting it: can these components take on the visual character my product needs?

## Take the result into an application

The next step is getting that theme into a real project without rebuilding the decisions by hand.

Theme Studio exports CSS, StyleX themes, an editable JSON draft, and a DESIGN.md that lists the resolved tokens for both modes, with short usage notes that point to Ultima's component guidance. It can also package the theme as a registry item for installation.

```text
ultima-theme.json           the editable draft
ultima-theme.css            generated
ultima-theme.stylex.ts      generated
DESIGN.md                   generated
ultima-theme.registry.json  installs the CSS, the draft, and DESIGN.md
```

The preview and exports come from the same resolved draft. That connection matters: choosing a theme would be much less useful if the exported files represented a different set of values.

I'd keep the JSON draft with the project. It's the editable source you can reopen when you want to revise the theme. The CSS and StyleX files are generated output. Hand-editing them is possible, but regenerating them can replace those edits.

There are still application details to handle. The stylesheet needs to be imported in the right order, or the StyleX themes applied at the appropriate boundary. A font stack declares the fonts you want; your application needs to load any face it doesn't already have. Then you need to check the actual interface in light, dark, and system modes.

Project setup is a separate step. The `ultima-design init` command sets up a new Vite or Next.js App Router application, or adds Ultima to a supported existing one. Yarn, Bun, workspaces, the Pages Router, and JavaScript-only projects still use the [manual setup](https://ultima.systems/install). Theme Studio handles the theme you'll bring into that application.

The component source belongs to the consuming project. That makes local changes possible, and it also leaves the project responsible for understanding those changes when adopting later fixes. StyleX brings its own integration requirement: the application needs the compiler setup. Those are real costs to weigh against the convenience of the starting point.

If you try Ultima, I'd start with one representative screen. Use your actual content, put controls together, open the menus and dialogs, and review the states people will encounter. That will tell you more about the fit than a theme preview alone.

Ultima grew from wanting a StyleX starting point into making the decisions behind that starting point explicit. Theme Studio gives those decisions a visible, editable form. The next application should be able to reuse that work and still feel like its own product. That's what I'm building toward.
