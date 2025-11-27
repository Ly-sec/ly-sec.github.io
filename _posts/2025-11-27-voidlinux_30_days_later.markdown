---
title: "Voidlinux - 30 days later"
date: 2025-11-27
---

Alright so it's officially been a bit more than 30 days since I wiped my drive and commited to Voidlinux for real.
And honestly? It's been kind of... uneventful. In a good way.

To give you an idea of what I'm working with, here’s my current fastfetch:

<figure>
  <img src="/assets/images/void-swiftfetch.png" alt="Fastfetch output on Void Linux" width="650">
  <figcaption>swiftfetch on my Void setup — clean, minimal, exactly how I like it.</figcaption>
</figure>

I thought I'd have at least *one* dramatic "why did I do this to myself" moment by now - you know, something breaking, a service refusing to start, a package being severely out of date or something else. But nope. Void just kept doing Void things and stayed fully out of my way.

## Nothing broke. Seriously.
Yup, I know - it's boring when stuff just works. But that's the surprisig part.
Zero issues. No random crashes, no mysterious errors, no "oh right, runit works differently" moments. My day-to-day workflow has stayed exactly the same, just on a system that feels less noisy.

I kept expecting to miss systemd here and there, but as it turns out I didn't miss *anything*. No journalctl diving, no unit files, no drama. Runit just does its thing, quietly and calm.

## Runit, 30 Days later
At first runit felt "cutely simple" but after a month it feels *correct*.
Services are directories with tiny scripts. Want to enable something? Symlink. Done. There is something oddly comforting about that level of transparency.

And you know what the best part is?
It hasn't annoyed me a single time.
Can't say that about systemd.

## The Cachy Kernel Situation
My CachyOS kernel template still performs exactly like it did on Arch (from my limited testing) - which is to say: fast, responsive and very stable.
No weird interactions, no Void specific shenanigans. It just works.

Maintaining it throgh xbps-src has been way smoother than expected too. I kind of enjoy the template workflow now (oh no :p).

## The "Void Vibe"
I think the reason Void stuck for me where other distros eventually got on my nerves is pretty simple: **Void does not care what you do, it just gets out of your way**.

It doesn’t assume things for you.
It doesn’t shove anything into the background.
It doesn’t boot with 15 daemons you’ll never use.
It’s just *quiet*.

## Will I Keep Using It?
Yeah.
Void is staying on my drive for the foreseeable future. It’s stable, minimal, and chill - exactly the kind of environment I like working in. No surprises, no nonsense. Just Linux.

I honestly expected the 30-day update to be a rant about something obscure that shattered my sanity. Instead it's like:

> “Hey, Void’s cool. Nothing happened.”

And honestly?
I’m okay with that.

