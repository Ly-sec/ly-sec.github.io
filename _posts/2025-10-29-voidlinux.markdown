---
layout: post
title: "My Voidlinux journey"
date: 2025-10-29 12:00:00 +0000
categories: [blog, editors]
---
# My voidlinux journey
4 days ago I decided to finally run Voidlinux on my main drive. I did try it before, but there were some quirks I couldn't deal with, so I instantly uninstalled it and went back to CachyOS. However, I decided to give it another try, this time for real.

---

# Installation
The installation went really well. I used the minimal version (network, not local) and created /boot/efi (2GB), swap (34GB) - yes I know, it might be a bit much, but I'd rather be safe than sorry when it comes to hibernation. The rest of my 1TB NVMe is my root partition.

My setup is currently quite barebones, which is exactly what I wanted. For my compositor, I chose niri because I'm very used to it from before (Arch & NixOS). My editor is (doom) emacs - I switched from nvim to it shortly before I switched to void, and had no issues there either :).

---

# Runit
One of the biggest differences coming to Void is the init system. Instead of systemd, Void uses runit, and honestly, it's refreshingly simple. Runit is basically a lightweight init system that focuses on doing one thing well: managing services.

The main thing you need to know is that services are just directories in /etc/sv/, and each one has a "run" script that tells it how to start. To enable a service, you just symlink it to /var/service/, and runit takes care of the rest. Want to restart something? Just use `sv restart service-name`. Need to check status? `sv status service-name`. It's straightforward and fast.

Coming from systemd, it felt weird at first not having all those complex unit files and targets, but after a day or two, I actually prefer how simple and transparent runit is. You can literally read the run scripts and understand exactly what's happening - no magic involved.

---

# Kernel
I started with the default kernel, but it was rather old, so I decided to switch to linux-mainline, which was actually really simple. Most people would probably be fine with it, but given I wanted to learn more about kernels and templates (Voidlinux's version of PKGBUILDs basically), I decided to create a template for the CachyOS kernel. Oh boy, this was a rollercoaster! If I remember correctly, it took around 8 or so compiles of the kernel to get everything working properly - a fun 7 hours of my time!

---

# Templates
Since we're on the topic of templates, I think now is a good time to talk about my experience with them. 

Templates are basically Void's way of building packages from source. They're similar to Arch's PKGBUILDs, but with their own flavor. You have a void-packages repository where all the templates live, and when you want to build something, you use xbps-src to handle the compilation.

The nice thing is that templates support different build_style options - so if you're building something with CMake, Meson, or GNU configure, you can just specify the build style and xbps-src handles most of the heavy lifting for you. You still need to define dependencies, the version, checksums, and any patches, but the actual build process is pretty streamlined.

Given that I'd created some PKGBUILDs before, it took me a bit to get used to the different names, layout, and just how templates work overall. While it was a bit different, it was surprisingly easy once I got the hang of it. The documentation could be better, but reading existing templates helped a lot.

---

# Summary
While I've only been using Voidlinux for 4 days, I have to say it feels VERY nice. The package manager (xbps) is insanely fast too - it just feels really snappy and responsive.

I do have to say that I would not recommend Void for any new Linux user. You need to handle services yourself, and overall it's a bit more hands-on compared to things like CachyOS that come preconfigured and ready to go. But if you're comfortable with Linux and want something lean, fast, and transparent, Void is absolutely worth trying.

*Posted on October 29, 2025.*

---

**Note:** This post will be updated as I continue my Voidlinux journey and learn more about the system.
