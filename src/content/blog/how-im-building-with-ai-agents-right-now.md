---
title: "How I’m building with AI agents right now"
description: "The models and bots I’m using, how I turn ideas into tickets, and how much freedom I give my agents."
date: 2026-09-10
draft: false
image: "/images/blog/agents.webp"
imageAlt: "Pixel-art night workshop: a developer at a lit desk with code and a landscape on screen, surrounded by small robots in wizard hats reading books and tending boards, a sleeping dog on the rug, forest and castle through the window"
related: [building-my-own-agent-skills, the-nas-is-the-easy-part]
---

I’m using several AI subscriptions, with different models handling different parts of my projects. I keep trying new tools and changing how I work, so I wanted to write down what I’m doing today. I’ll probably revisit this in a few months to see how much has changed.

## The models and bots I’m using

Grok Bot has become one of my favorite parts of my workflow. I have several bots helping manage different aspects of my life, plus dedicated project bots that keep work moving on specific projects.

Claude is still my go-to when I need intelligence I feel like I can almost blindly trust. Through my ChatGPT subscription, I’ve also been spending quite a bit of time with GPT-6 Astra. I’m still wary of it, so whenever it makes a substantial change, I have Fable 5.1 review the work.

Having multiple subscriptions lets me try new capabilities on actual projects. Over time, I get a feel for which models I’m comfortable trusting with which jobs.

## Turning ideas into tickets

I use [mana](https://github.com/frankieramirez/mana), my collection of agent skills, to turn ideas into GitHub issues that my agents can work through.

I wrote about [how I built mana and gave the skills a fantasy theme](/blog/building-my-own-agent-skills/) in an earlier post.

An idea usually starts with Fable 5.1 or GPT-6 Astra and my scry skill. That gives me an initial map of the work and the decisions we need to make. From there, Opus 5 handles most of the “grilling” tickets, where we work through questions and challenge assumptions before building anything. When something carries more weight, I use Fable 5.1 for the extra confidence.

How much I participate depends on the project. Sometimes I want to answer the questions myself and take my time thinking through the recommendations. Other times, I give Grok Bot permission to accept those recommendations and continue through planning until we have implementation tickets ready.

Once those tickets are ready, I can have Grok Bot manage a bunch of Cursor cloud agents working through them in parallel.

## How much freedom I give my agents

I sometimes have the bot label issues by risk level so I can decide how much oversight they need. On certain projects, I’m comfortable letting agents handle low-risk issues all the way through merging their own PRs.

I do this a lot when I’m experimenting with a new game idea. Before the agents start building, I spend a ton of time grilling the idea and working out how the game should play. I want to feel good about those decisions before letting them run with it.

Then I want a rough, playable version as quickly as possible. A gray-box prototype with basic visuals is enough, as long as there’s enough of the game working for me to get a feel for it.

Once I can play it, I have something concrete to react to. I can spend my time figuring out what feels right and fleshing out the details from there. That makes it worth giving the agents more freedom while they build the first version.

With my non-game projects, I tend to be more careful. Cloud agents can still burn through tickets, but they need to ping me when their PRs are ready for review.

For the most part, that review means having a model I trust, like Fable 5.1, review the code. I also test the result myself, either locally or in a temporary preview environment, before merging the PR.

## Keeping up with open source

[Comicarr](https://comicarr.com/) and some of my other public projects get a good amount of weekly traffic, with issues and feature requests coming in regularly. I used to miss new issues sometimes. Days could pass, occasionally more than a week, before I noticed one and got around to addressing it.

Now, Grok Bot uses webhooks to notify me immediately when an issue comes in. The bot also triages the issue and kicks off a cloud agent to address it. When the agent opens a PR and it’s ready for review, I get another notification.

By the time I sit down to look at an issue, there can already be a proposed fix waiting for me to review and test.

That’s been super fun, and it makes keeping up with these projects feel more manageable. I want to do more open source work because of it. I’m already thinking about what else I could build with other people now that keeping up with incoming issues takes less of my attention.
