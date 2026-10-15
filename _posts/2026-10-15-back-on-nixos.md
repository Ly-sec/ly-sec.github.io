---
layout: post
title: "Back on NixOS for Noctalia Development"
date: 2026-10-15 10:00:00 +0200
categories: [blog, distro]
topic: linux
---

The last time I wrote about my distribution, I was [moving from Void to Gentoo]({% post_url 2026-01-22-from_void_to_gentoo %}). Newer toolchains and more control over the software I needed for Noctalia made Gentoo a good fit at the time.

There is an update missing between that post and what my setup looks like now: I am back on NixOS.

The main reason is fairly specific. Noctalia needs to be tested across multiple compositors, and I do not like having all of them installed and configured at the same time. I want to be able to move between those setups while keeping the rest of my working environment familiar.

That is where NixOS makes a lot of sense for me.

## Testing beyond my daily desktop

When working on Noctalia, checking that something behaves correctly in my usual session is only part of the job. It also needs testing in the other environments people use it in.

I could keep a collection of compositors installed and choose one at login. That works, but I prefer having a setup dedicated to whichever one I am currently using or testing. The compositor comes with its own configuration, startup behavior, and surrounding desktop integration. I want to keep those choices together.

My [NixOS repository](https://github.com/ly-sec/nixos) has separate desktop definitions for niri, Umbriel, Hyprland, Sway, labwc, Mango, and Plasma. They can all live in the repository without all being enabled in the current system configuration.

## Choosing one desktop setup

The selection lives in [my host settings](https://github.com/ly-sec/nixos/blob/main/hosts/nixos/settings.nix). For example, to select niri, the setting is:

```nix
desktop = "niri";
```

The [system configuration](https://github.com/ly-sec/nixos/blob/main/hosts/nixos/configuration.nix) imports the matching desktop's NixOS module, and [Home Manager](https://github.com/ly-sec/nixos/blob/main/home/default.nix) imports its user configuration. Shared programs and settings stay in the shared modules.

To change desktops, I change that setting and rebuild from the configuration repository:

```sh
nh os switch path:.
```

Then I start a new desktop session with that setup. The other desktop definitions are still there for the next time I need them. Older system generations can also retain their packages in the Nix store for rollback; the current configuration enables the desktop I selected.

There is some work in maintaining those modules, but the result is a workflow I can follow: select a desktop, rebuild, test Noctalia, and return to my usual setup when I am done.

## The usual NixOS things matter too

The compositor workflow was the main reason to return, but the rest of the NixOS model is useful alongside it.

I like having the system configuration in Git. Packages, services, and desktop settings become changes I can review together. When I adjust a setup for testing, I can look at the diff and see what I changed.

The [flake](https://github.com/ly-sec/nixos/blob/main/flake.nix) and its [lock file](https://github.com/ly-sec/nixos/blob/main/flake.lock) record the external inputs used by the configuration. Home Manager extends that approach to my user environment, including the shell and editor. Having those pieces declared together gives me a much better starting point for recreating a setup than trying to remember every adjustment I made manually.

I also appreciate being able to [return to an earlier system generation](https://nixos.org/manual/nixos/stable/#sec-rollback). When I am changing desktop configurations for development, having that route back makes experimentation more comfortable.

NixOS still asks me to understand its language and module system. Putting a desktop in a Nix module does not remove the work of configuring it. It gives that work a place to live, where I can keep it and use it again.

## Why it fits now

Gentoo gave me the control I wanted over versions and build choices. My testing workflow now makes being able to describe and switch complete desktop setups particularly useful.

That is why I came back. I can keep the environments I need for Noctalia in the configuration, choose one at a time, and keep working with the same shared tools around it.

One of those tools has changed quite a bit too. I have moved from Doom Emacs to [my own Emacs configuration]({% post_url 2026-10-15-from-doom-to-my-own-emacs-config %}), which is the next part of this setup update.

*Posted on October 15, 2026.*
