---
layout: post
title: "From Void to Gentoo: A Shift in Workflow"
date: 2026-01-22
categories: [blog, distro]
---

# From Void to Gentoo: A Shift in Workflow

On October 29th, I wrote about my fresh start with Void Linux. I had been using Void for a while and genuinely enjoyed it. The system is clean, runit is refreshingly simple, and xbps is insanely fast. For general use, Void is fantastic: lean, stable, and predictable.

After several months though, I decided to switch to Gentoo. The reason was not philosophical or emotional. It was practical. My current workflow started to lean more toward newer software than Void is designed to provide by default.

---

# The practical limitation

My work on **noctalia-shell**, which is based on **Quickshell**, requires reasonably up-to-date Qt versions. While Void does eventually ship newer Qt releases, the delay compared to upstream sometimes meant waiting longer than I was comfortable with during active development.

In addition to that, I regularly test noctalia-shell across multiple compositors. Many of these compositors, especially newer or rapidly evolving ones, benefit from newer toolchains and system libraries. When getting newer GCC versions or certain libraries required extra effort, testing started to feel more cumbersome than it needed to be.

At that point, it became clear that my needs had shifted.

---

# Why Gentoo fits now

The conclusion was straightforward: if I am already compiling and tweaking parts of the system, it makes sense to use a distribution that embraces that workflow.

With Gentoo and the `~amd64` (testing) profile, I get:

- Earlier access to newer Qt releases for QuickShell development
- More recent toolchains like GCC for compositor testing
- A modern graphics stack that many compositors rely on

Portage gives me fine-grained control over versions, USE flags, and dependencies. I can ensure that noctalia-shell and everything it depends on is built against the versions I want, without working around a fixed release cycle.

---

# No hard feelings, just different needs

This is not a criticism of Void Linux. Void does exactly what it sets out to do, and it does it very well. For a lot of use cases, and for where I was before, its stability and simplicity are real strengths.

For my current projects though, I value being able to adjust quickly when upstream changes. Gentoo makes that easier for me right now.

Void taught me a lot about simplicity and service management. Gentoo is teaching me about optimization and system-level flexibility. Different tools for different stages.

*Posted on January 22, 2026.*
