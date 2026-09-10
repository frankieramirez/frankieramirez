---
title: "Building my own agent skills felt boring. So I gamified it."
description: "How a fantasy theme turned the agent workflows I kept repeating into mana, a skill stack I wanted to keep building."
date: "2026-09-09"
draft: false
source: "https://x.com/frankieramirez/status/2097690861299531916"
image: "/images/blog/mana.webp"
imageAlt: "Cover illustration for Building my own agent skills felt boring. So I gamified it."
---

I wanted to build my own agent skills. I had a pretty good idea of what they needed to do. I also found the prospect of developing another set of tools called code-review, plan, and implement incredibly boring.

Useful? Yes. Something I wanted to spend my evenings working on? Barely.

I’m also a big fantasy nerd. I love fantasy books and games like Final Fantasy, Chrono Trigger, Grandia, Golden Sun, and World of Warcraft. Giving abilities names and assembling a party of specialists is familiar territory for me.

Once I brought some of that into my agent skills, the project became about 100 times more interesting.

Review became scan. Implementation became cast. Cleaning up unnecessary code comments became banish. Reviewers became a party of specialists with their own roles.

I called the stack **mana**.

Suddenly, I wanted to spend my evenings building it.

By “gamified,” I mean giving the work names, roles, and a personality I enjoyed. That was enough to get me interested in developing something I already knew I needed.

The reason I needed it goes back to a much less entertaining problem: I was tired of repeating myself to coding agents.

## The same instructions, every project

Every project had some version of the same loop.

Triage the incoming work. Figure out what’s ready to build. Break bigger requests into tickets an agent can finish in a session. Implement the change. Open a PR with evidence. Review it. Work through the comments. Keep paying attention until it merges.

The agent could help with all of that. I kept having to explain how I wanted it done.

“Check whether the issue is real first.”

“This ticket is too big. Split it into pieces that can ship.”

“Review against the requirements, too.”

“Show me how you verified it.”

Each instruction was reasonable on its own. Repeating them across sessions and projects was wearing thin.

I wanted those expectations to live somewhere I could maintain them. When I learned something from a bad result, I wanted to improve the procedure and carry that improvement into the next project.

I built mana by adapting ideas from skill stacks I admired and adding the workflows I kept needing across projects.

## What I’m putting into a skill

For me, a skill captures how I want a recurring piece of work handled.

It needs to explain what the agent should examine, what decisions it can make, what it should produce, and where it needs help.

A name like code-review identifies the activity. There’s still a lot left to decide underneath it.

What should the review cover? How does it account for the original ticket? What happens when two reviewers flag the same issue? What if a finding sounds convincing but doesn’t hold up against the code?

Those are the details I care about encoding.

The same applies to implementation. “Build this” leaves room for a lot of interpretation. I want a manageable scope, relevant validation, and a result I can review without reconstructing the whole session.

Writing skills makes me work through those expectations. If I can’t explain what a good result looks like, the agent has to guess.

## How I use the stack

I choose a skill based on the state of the work.

When an idea still has unresolved decisions, I use **scry** to map them. Once there’s a plan worth building, **conjure** turns it into tickets sized for individual sessions and arranged in build order.

Incoming reports go through **sift**, so the inbox becomes work an agent can act on. **Cast** takes a ready ticket through implementation and opens the PR with proof.

Then comes review. **Scan** brings in specialists, **remedy** works through feedback, and **ward** keeps attending the open PR as checks and later feedback arrive.

For work that starts as an idea, the loop looks like this:

scry → conjure → cast → scan → remedy → ward

Sift brings incoming work into it. Smaller repair skills help along the way.

I don’t need to run the entire sequence for every change. If a ticket is ready, I can start with cast. If I already have a branch, I can start with scan.

What matters is the handoff. A planning session should leave something useful for implementation. Implementation should leave something I can review. Review should leave findings I can act on.

That’s where a lot of my repeated prompting used to happen.

## Giving reviewers actual jobs

Review is where the theme fits most naturally.

The Warrior handles correctness. The Rogue looks at security. The Mage looks at performance.

The names are fun, but each role needs a clear responsibility. Otherwise, I’m just asking several agents for loosely overlapping opinions.

In mana, the review brings those findings together and checks them before presenting the report. It also explains dismissed findings, which gives me a way to question what the review decided to leave out.

That matters to me because a detailed, confident review can still be wrong.

The party idea gives me a memorable way to think about coverage. It also gives me a design question whenever I consider adding another reviewer: what job does this one have?

A new character is easy to invent. A useful responsibility takes more thought.

## Why the names changed my motivation

I could have built these same procedures under conventional names.

But when I pictured maintaining a directory full of triage-issues, implement-ticket, and review-pr, it felt like more administrative work waiting for me after work.

Finding a theme changed how I felt about the project. I started having ideas for how the skills could fit together. I wanted to develop them, use them, and come back to improve them.

Calling a comment cleanup skill banish is a small thing. It still makes me more interested in working on it than cleanup-comments ever did.

That interest matters when you’re the person responsible for every unfinished detail.

The first version of personal tooling is often the exciting part. Then you have to tighten instructions, handle awkward cases, and find out whether something that worked in one project works in another.

I needed enough interest to keep doing that part, too.

The theme gave me a reason to return to the project beyond “this would probably save me time eventually.” I enjoyed making it.

## Of course I added a mage

I even created **Archmage**, an optional narrator inspired by Khadgar from World of Warcraft. Dry humor, a little theatrical, and occasionally exasperated by whatever we’ve brought into the tower.

That’s exactly the sort of thing I wanted to spend time making once I found the theme. I started with reusable workflow instructions and ended up thinking about how I wanted the agent to sound while we worked together.

There are boundaries, though. Review findings stay technical. Structured output keeps its format. PR descriptions and replies written on my behalf still need to sound like me.

But while we’re working through a stubborn issue? I enjoy having a slightly dramatic mage along for the ride.

The names need boundaries, too. Someone encountering scry for the first time won’t necessarily know what it does. I still owe them plain descriptions and clear entry points.

And the agent needs to be precise about its limits. Ward’s monitoring runs within the active session, and a person still merges the PR. A fantasy name doesn’t change what the tool can actually do.

I want the personality to make using the stack more enjoyable while keeping the results easy to judge.

## What I built on

Mana owes a lot to other people’s skill stacks. Building my own meant finding approaches I liked, adapting them to how I work, and connecting them into a loop I could reuse across projects.

Every’s **compound-engineering** was the starting point for scan and remedy, which began as forks of its review skills and were rewritten in mana. **Matt Pocock’s skills** inspired parts of the planning, implementation, triage, and merge workflows.

**Cursor’s pstack** influenced comment cleanup, risk assessment, prose editing, and how reviews explain dismissed findings. **HumanLayer’s skills** informed how mana presents PR descriptions and proof. **OpenAI’s Codex PR watcher** inspired ward.

My contribution is in how I’ve adapted those ideas, connected the workflows, and shaped the stack into something I enjoy using and maintaining.

The [repo acknowledgements](https://github.com/frankieramirez/mana#acknowledgements) link to those projects, map their influences to individual skills, and distinguish the forks from implementations written from scratch.

## What I’d suggest if you’re building your own

Start with something you keep explaining to an agent.

Pick a recurring task, write down how you want it handled, and use that procedure on real work. Pay attention to where you still have to intervene. Those moments tell you what needs to become clearer.

Look at what other people have built. Borrow thoughtfully, give credit, and take the time to understand which parts fit your own workflow.

You don’t need a complete stack on day one. One skill you use and improve is a useful place to start.

And give yourself permission to care about whether you enjoy working on it.

For me, the obvious names were making a project I wanted to exist feel dull to develop. Finding a theme got me invested enough to keep going.

Now I have a reusable stack for work I was already doing across projects, with fewer instructions to reconstruct every time I open a session.

And typing /cast is a lot more fun than /implement-ticket. That was the whole point.

**mana** is available on [GitHub](https://github.com/frankieramirez/mana).

Install it in Claude Code:

```sh
/plugin marketplace add frankieramirez/mana
```

```sh
/plugin install mana@frankieramirez
```

Or through skills.sh:

```sh
npx skills add frankieramirez/mana
```
