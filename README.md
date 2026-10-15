# Ly-sec's Blog

A Jekyll blog about Linux, security and open source software, using the Fen palette.

## Run locally

With Ruby and Bundler installed:

```sh
bundle install
bundle exec jekyll serve
```

Open `http://localhost:4000`. To build without starting a server:

```sh
bundle exec jekyll build
```

The static output is written to `_site/`. The existing domain and post URLs are configured in `_config.yml` and `CNAME`.

## Writing

Add Markdown files to `_posts/` using the existing `YYYY-MM-DD-title.md` naming convention. The post layout is applied automatically. A minimal post looks like this:

```yaml
---
title: "Post title"
date: 2026-10-15
topic: development
---
```

Write the body below the front matter. The layout supplies the page title, date and reading time. Headings become links in the desktop table of contents. Fenced code blocks receive syntax highlighting and a copy button.

Supported topics are `linux`, `security`, `development`, `open-source`, `privacy`, `tools` and `notes`. Existing posts keep their categories and tags; the display topic is inferred when `topic` is omitted. Add or rename topics in `_data/topics.yml` and adjust `_includes/topic.html` if needed.

## Theme

The blog supports **Fen Dusk** and **Fen Dawn**. The selected theme is saved in the browser. Without JavaScript, the blog uses Dusk and all posts remain readable.

`_data/fen.json` is a copy of [Fen's native palette](https://github.com/Ly-sec/fen/blob/main/palette.json). Update that file to change the colors. Jekyll resolves the named colors and UI roles into CSS custom properties at build time; no Node build step is required.

- `_layouts/`: homepage, post and page layouts.
- `_includes/`: navigation, metadata and shared post components.
- `assets/main.css`: styles, Fen variables and syntax colors.
- `assets/blog.js`: theme switch, archive search, topic filters, contents and copy controls.
- `archive.html`: complete archive grouped by year.

Search and topic filters run locally in the browser. Post text and images are kept in their original files. Google Fonts provides the typography, with local fallbacks when it is unavailable.
