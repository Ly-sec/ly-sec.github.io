---
layout: post
title: "From Doom to My Own Emacs Config"
date: 2026-10-15 12:00:00 +0200
categories: [blog, editors]
topic: tools
---

Almost a year ago, I wrote [(n)vim or Emacs?]({% post_url 2025-10-23-nvim_or_emacs %}) after moving from AstroNvim to Doom Emacs. I expected Emacs to feel dated and difficult to get into. Instead, Doom made it feel surprisingly approachable, Magit felt more natural to me, and Org mode ended up replacing my separate notes apps.

I am still using Emacs. The Doom part has changed.

As I covered in [my NixOS update]({% post_url 2026-10-15-back-on-nixos %}), I am back on NixOS for my Noctalia development setup. My [Emacs configuration](https://github.com/ly-sec/nixos/tree/main/home/programs/emacs) now lives alongside it. Writing it means making decisions that Doom previously made for me, including some fairly small ones that turn out to matter when you use an editor every day.

## Why write my own config

What I liked about Doom in that first post was how coherent it felt. There was a structure, the defaults made sense, and I could start using Emacs without first having to assemble an editor out of unfamiliar packages.

That gave me a starting point. Now I want to be able to follow my configuration from the first file it loads to the command behind a keybinding. If I want to change how something works, I want to know where that behavior comes from.

There is more responsibility in that, obviously. Choosing the packages is the easy part. Making their environments, hooks, and keybindings work together is where the configuration actually happens.

## A few files with clear jobs

The main part of my [init.el](https://github.com/ly-sec/nixos/blob/main/home/programs/emacs/init.el) is a list of modules:

```emacs-lisp
(dolist (module '(core editing completion ui files development notes dashboard keys))
  (load (expand-file-name (format "lisp/%s.el" module) lysec-config-directory) nil t))
```

Editing behavior lives in [editing.el](https://github.com/ly-sec/nixos/blob/main/home/programs/emacs/lisp/editing.el), language tooling in [development.el](https://github.com/ly-sec/nixos/blob/main/home/programs/emacs/lisp/development.el), Org configuration in [notes.el](https://github.com/ly-sec/nixos/blob/main/home/programs/emacs/lisp/notes.el), and the command menus in [keys.el](https://github.com/ly-sec/nixos/blob/main/home/programs/emacs/lisp/keys.el). It is a structure I can read through without having to remember too much at once.

The [Home Manager module](https://github.com/ly-sec/nixos/blob/main/home/programs/emacs/default.nix) installs Emacs, the packages, and the external tools. The Lisp files configure them. I still use `use-package`, but package installation belongs to Nix, and `package.el`'s automatic startup activation is disabled.

That puts tools like `nixd`, `clangd`, formatters, and ripgrep alongside the editor configuration that uses them. [core.el](https://github.com/ly-sec/nixos/blob/main/home/programs/emacs/lisp/core.el) gives backups, history, and other writable state their own directory too, which the undo configuration also uses.

## Meow and my own keybindings

I chose Meow for modal editing. The bindings are set up around my QWERTZ keyboard, with `i`, `j`, `k`, and `l` for up, left, down, and right. For example, `a` selects a word and `f` changes the selection. I can see what I have selected before acting on it.

It is a fairly personal layout. That is part of the appeal of doing this myself: I can arrange the editor around how I want to use it.

I kept Space as the entry point for command groups. `SPC f` is for files, `SPC p` for projects, `SPC g` for Git, and `SPC n` for notes. Which-key shows the available commands, so I do not need to memorize the entire thing before it becomes useful.

There is also an [Org file with a key reference](https://github.com/ly-sec/nixos/blob/main/home/programs/emacs/org/keybindings.org) that I can open beside what I am working on. Writing the bindings yourself apparently does not mean you instantly remember all of them :).

## Keeping the development setup understandable

For development, I use Emacs' built-in project support, Eglot for language servers, and Flymake for diagnostics. The configured language servers cover Nix, Nim, and C/C++. Apheleia handles formatting, with the formatter selected for each language.

One detail that deserves more attention than it sounds like is the project environment. The config loads it through `envrc` before starting the language server. A server needs the tools and environment of the project it is supposed to understand, so the order matters.

The [completion setup](https://github.com/ly-sec/nixos/blob/main/home/programs/emacs/lisp/completion.el) uses Vertico, Orderless, and Marginalia in the minibuffer, with Consult for things like switching buffers and searching. Corfu handles completion inside buffers. These are still several separate pieces to configure, but I can see how they fit together.

And yes, Magit is staying. That part of the old post still holds up.

## Org mode and a terminal home

Org mode is still central to the setup. I have capture templates for tasks, quick notes, and journal entries, an agenda, and Org-roam for linked notes and daily entries. The reason I liked it originally is still there: my writing, notes, and tasks are available in the same place as my code.

The editor itself runs in the terminal, using `emacs-nox`. A user service runs the daemon, and my `emacs` launcher starts the service if needed before opening a terminal client. Closing that client leaves the Emacs session running.

I also added a small [dashboard called Observatory](https://github.com/ly-sec/nixos/blob/main/home/programs/emacs/lisp/dashboard.el), with shortcuts to projects, recent files, notes, the journal, and Git. The [theme comes from Noctalia](https://github.com/ly-sec/nixos/blob/main/home/programs/emacs/themes/noctalia-theme.el). Having my own config still leaves room for making it look nice.

## More of the decisions are mine now

Doom was how Emacs clicked for me. Building this config means taking on the work behind the comfortable setup I appreciated back then, including the little integration details that are easy to take for granted.

The result still has the things that made me stay with Emacs in the first place. I can work on a project, check its Git history, capture a task, and open my notes without leaving it. Now I can also follow the configuration that connects those things.

That feels like a good next step from where that first post ended: figuring out what works best for something I use every day.

*Posted on October 15, 2026.*
