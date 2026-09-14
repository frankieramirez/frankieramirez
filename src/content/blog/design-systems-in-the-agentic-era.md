---
title: "When anyone can generate UI, what is a design system for?"
description: "How I document design decisions so people and AI agents can apply them in product work."
date: "2026-09-14"
draft: false
related: [how-im-building-with-ai-agents-right-now, building-my-own-agent-skills]
---

Ask an agent to follow existing patterns, and it will use the repository as examples for its next implementation. Some of those examples may conflict with what the team wants to build today. OpenAI observed this in its own engineering work: Codex reproduces repository patterns even when they are inconsistent or suboptimal.[^harness]

Imagine a product with several complex forms inside modals. The team has decided that workflows of that complexity deserve dedicated pages, but most older screens still use modals. An agent building a similar feature could copy them and repeat a decision the team has moved away from.

Design systems already help teams explain which decisions to follow. USWDS, for example, uses principles to guide design and implementation choices.[^principles] Agent-assisted development makes documenting that reasoning more urgent. Someone remembering a conversation or catching a familiar mistake in review is a fragile way to pass guidance to the next implementation.

## Document the decisions behind the components

During a design-system migration, engineering and design agreed that engineers could migrate lower-priority pages using established patterns without a fresh formal design for every page. The agreement covered work where we'd already settled the design decisions. Unfamiliar workflows still needed design involvement.

I want an agent-facing design system to explain that scope. Alongside a drawer component, it should describe the workflows that suit a drawer and those that deserve a dedicated page. It should also identify questions that need a designer's judgment. An interface can use the approved components and still deliver a poor experience.

I understand why smaller teams put off writing this guidance. Documenting a convention competes with shipping the next feature, and a conversation can resolve today's question. Tomorrow's agent, or the next person joining the team, needs a record of that decision.

A hypothetical deletion pattern would need guidance like this:

| Decision | What the system should explain |
| --- | --- |
| When to use it | Which irreversible actions warrant explicit confirmation, and when a reversible action could use undo. |
| What to communicate | How to identify the affected item and explain the consequences. |
| How it behaves | What users see while the action runs and after it succeeds or fails, including what happens after the item disappears. |
| What it cannot decide | The product determines permissions and retention requirements. Whether recovery exists is also a product constraint. |

The guidance should explain the reasoning and include counterexamples. Readers need to know which parts are requirements and which are recommendations; documenting a repeated habit doesn't make it mandatory. People and agents should be able to apply settled decisions while recognizing situations that need further design work.

## Explain where a component works

I brought shared form components into another application and found a specialized selector that depended on Apollo Client. The consuming application didn't use Apollo, so I got the integration working with the underlying Select component.

The specialized selector assumed a particular data environment. That can suit a domain-specific component, though it limits where consumers can reuse it. Using the lower-level Select left more composition work with the consuming application because it gave up some specialized behavior. It also let the application reuse the interaction without adopting Apollo.

An agent told to use the selector needs to know which layer fits the application and what dependencies it requires. The guidance should explain how to compose an alternative when the specialized version doesn't fit.

### Test the compatibility contract

A follow-on improvement would be to document and test those dependencies so each consumer can check compatibility before integrating the component.

For example, a data-independent Select could accept options and a selected value from the caller, with a callback for changes. The consuming application would retrieve the data. A specialized wrapper could connect that interface to Apollo where appropriate.

To verify the proposed boundary, a minimal consuming application should install the Select and build code that imports it without Apollo. Interaction tests should exercise selection and keyboard behavior without an Apollo provider.

A rendering test inside the main application can miss dependency problems because that application's setup may supply something another consumer lacks. The minimal consumer checks whether the distributed component works outside that environment. The specialized wrapper would need its own documented dependencies and tests for the contexts it supports.

## Help agents find the guidance

An agent should be able to find the supported approach from a task description, even when it doesn't know a component's name. Figma's MCP integration with Code Connect can deliver component mappings and implementation instructions. Storybook's manifests expose structured component and documentation information for supported frameworks. Storybook documents those AI capabilities as preview features.[^figma][^storybook]

The source material still needs to agree. In a design-system discussion, we found that `text-xs` in Figma meant something different from `text-xs` in code. An agent matching those names could produce the wrong result. Giving it access to both artifacts would leave that disagreement for someone to resolve.

I favor versioned guidance connected to the implementation it describes. An agent should be able to find recommended examples, required dependencies, applicable patterns, known exceptions, and checks it can run. It also needs to know which guidance applies to the version the consuming application has installed.

I'd name a design owner for pattern intent and an engineering owner for implementation compatibility. They should review changes together when those changes affect both. When documentation and code disagree, the owners need to decide what to correct or migrate, including whether a particular version needs an exception. Record the resolution alongside the affected guidance so it remains available beyond the chat where people discussed it.

A small system may need only an index of focused Markdown pages with working examples and reliable test commands. More elaborate integrations need to justify the cost of maintaining them. Whatever the format, the guidance should help agents interpret the repository and keep changes within the task's scope. A preferred pattern for new work doesn't authorize an unrelated rewrite during a targeted legacy fix.

## Review the work against the guidance

The same guidance could help reviewers assess interfaces that humans design. Suppose a design uses a temporary notification for an error that requires user action. A reviewer with access to the system's guidance could flag the mismatch with the team's recovery pattern and ask whether the departure is intentional:

> “This failure appears to require a persistent recovery action, but the design only shows a temporary notification. Is there another state that provides the recovery path?”

I'd separate **checkable constraints**, such as a deprecated component reference, from **contextual judgments**, such as whether a workflow warrants its own page. Where source data permits it, deterministic checks can enforce the constraints. Contextual judgments call for review suggestions that explain the relevant guidance and leave room for the designer's reasoning.

Reviewers also need to account for the evidence available. A screenshot can't establish keyboard behavior, and a missing state in one frame doesn't prove the workflow omits it. Those gaps call for more evidence before declaring a defect.

Teams still need to evaluate behavior and appearance, along with accessibility. W3C notes that no tool alone can establish accessibility conformance; knowledgeable people must evaluate it too.[^accessibility] An agent handling a regression also needs to preserve the acceptance criteria. Accepting a new screenshot baseline or weakening a failing test doesn't resolve the underlying problem.

## Record exceptions before others copy them

A team can have a legitimate deadline and a task the shared pattern doesn't support. For a bounded design-pattern exception, I'd ask the product's design and engineering owners to agree on the approach. System maintainers should join when it affects shared contracts or other consumers.

The record should identify the scope, rationale, owner, and a review trigger. That trigger could be the next migration or another team requesting the same capability. The team can then deliver locally while keeping the shared API unchanged. Mark the exception as unsuitable for general reuse and keep it discoverable, since an agent could otherwise copy it as an established convention. Security and accessibility requirements still apply.

Agents could help find repeated custom implementations or recurring integration problems. They could also flag stale examples. Each finding gives maintainers something to investigate before deciding whether a new component belongs in the system. GOV.UK's contribution criteria offer a precedent: proposed additions need evidence of usefulness and distinct value.[^contributions]

Before promoting an exception, the team should establish whether consumers share the underlying need and validate the proposed approach with them. Someone must own its maintenance. A better example or an extension point may address the need without adding another abstraction.

Teams also need to decide how they'll distribute and maintain the code. A shared package needs a compatible upgrade path. For source-owned components, consumers need a way to identify local modifications and reconcile future fixes. An agent-assisted migration needs evidence that the consuming experience works before the team can call it complete.

## Test one workflow

I'd start with one recurring workflow that causes implementation or review friction. Document the decisions, connect them to supported examples, expose compatibility requirements, and provide a way to verify the result.

Then give an agent a clear brief and a blank page. See whether the system supplies enough context for a credible implementation without coaching it through every established convention. The brief still needs user goals, data, permissions, and product constraints. On an unfamiliar problem, the agent may need to raise an unanswered question before choosing a pattern.

Compare equivalent tasks with and without dedicated system guidance, keeping the model, starting repository, permissions, and resource budget consistent. Use the same independent acceptance criteria and repeat trials. Agent outputs vary between runs; Anthropic's evaluation guidance emphasizes repeated attempts and clean starting environments.[^evals]

Include a task where the closest existing example is the wrong reference. The legacy-modal scenario or a selector in an incompatible data environment would test whether the guidance helps the agent choose an appropriate implementation.

Measure correct pattern selection, missing states, integration defects, human correction time, and review effort. For automated design review, also measure false positives and missed issues. If agents keep bypassing the supported route, investigate whether they can find and use it before treating that as a compliance problem.

Count the cost of authoring and updating guidance, maintaining integrations, supporting consumers, reviewing exceptions, and operating the agent workflow. That cost matters when judging whether faster generation makes the investment worthwhile.

Use the failures to examine the system. Confusing names and ambiguous APIs can send an agent down the wrong path; incomplete examples need attention too. When an agent follows the documented pattern and still produces a poor experience, revisit the pattern with the people who own it.

---

[^harness]: OpenAI, “Harness engineering: leveraging Codex in an agent-first world,” February 11, 2026, especially “Entropy and garbage collection.” https://openai.com/index/harness-engineering/
[^principles]: U.S. Web Design System, “Design principles.” https://designsystem.digital.gov/design-principles/
[^figma]: Figma, “Code Connect integration.” Capabilities differ between CLI and UI mappings. https://developers.figma.com/docs/figma-mcp-server/code-connect-integration/
[^storybook]: Storybook, “Manifests.” Framework support varies; these AI capabilities are documented as preview features as of September 12, 2026. https://storybook.js.org/docs/ai/manifests
[^accessibility]: W3C Web Accessibility Initiative, “Evaluating Web Accessibility Overview.” https://www.w3.org/WAI/test-evaluate/
[^contributions]: GOV.UK Design System, “Contribution criteria.” https://design-system.service.gov.uk/community/contribution-criteria/
[^evals]: Anthropic, “Demystifying evals for AI agents.” https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
