---
layout: post
title: "The Dependency Question"
date: 2026-04-08
categories: [blog, dev]
---
# The Dependency Question

When I started working seriously on noctalia-shell, one of the first decisions I had to think about was dependencies. Not in the abstract, philosophical sense, but in a very practical one: what does this project actually need to pull in, and what does that cost?

Most desktop shell projects today are built on top of either Qt or GTK. This makes a lot of sense. Both toolkits are mature, well-documented, and solve a huge range of problems out of the box - rendering, input handling, accessibility, theming. If you want to ship something quickly that looks and behaves consistently across setups, reaching for one of them is a reasonable choice.

But there is a cost that does not always get talked about.

---
# What a heavy dependency actually means

When your project depends on Qt or GTK, you are not just depending on a library. You are depending on a runtime, a theming system, a set of version assumptions, and in many cases a particular ecosystem's release cadence. For end users, this often means pulling in a significant chunk of software just to run your shell.

For something that wants to sit close to the system - something that loads early, runs persistently, and should feel lightweight - that weight is worth questioning. A shell component is not an office suite. The closer something lives to the core of the desktop, the more I think it is worth asking whether its dependencies are proportionate to what it actually does.

---
# The practical side of a leaner approach

Building without a large toolkit dependency means a few things in practice. You need to handle more yourself. Rendering, layout, input, compositor communication - things that Qt or GTK abstract away become your responsibility or require more focused, smaller libraries. That is more work upfront.

The tradeoff is that the result can be genuinely leaner. Faster to start, smaller on disk, easier to reason about at the system level. No theming engine to fight with. No version mismatch between your dependency and whatever the user has installed. The surface area of what can go wrong shrinks considerably.

Whether that tradeoff is worth it depends entirely on what you are building and what you value. For a full desktop environment, probably not. For something more focused, it starts to make a lot more sense.

---
# No ideology, just tradeoffs

I want to be clear that this is not a critique of Qt or GTK. Both projects are genuinely impressive and have enabled a huge amount of Linux desktop software that would not exist otherwise. For a lot of projects, they are the right answer.

But I think it is worth having the conversation openly, especially as Wayland matures and more people are building compositor-adjacent tools from scratch. The ecosystem is young enough that we are still figuring out what the right defaults are. Not every tool needs to carry the same weight.

noctalia-shell is something I think about in that context. More on where it is heading eventually.

*Posted on April 8, 2026.*
