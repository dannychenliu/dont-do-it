# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**購物衝動抑制器** (Shopping Impulse Blocker) — a Chrome extension (Manifest V3) that shows a judgmental cat GIF when hovering purchase buttons on e-commerce sites. Pure nudge approach: no blocking, no tracking, no data collection.

## Project Structure

```
shopping-cat-blocker/       # Chrome extension root (no build step, no bundler, no npm)
├── manifest.json           # Manifest V3, content_script matches against target domains
├── content_script.js       # Single IIFE: button detection + cat overlay logic
├── styles.css              # Overlay positioning, opacity transitions, z-index
├── gifs/                   # 28 locally bundled cat GIFs (1.gif through 28.gif)
├── icons/                  # Extension icons (16, 48, 128 PNGs)

docs/superpowers/
├── plans/                  # Implementation plans
└── specs/                  # Design specifications
```

## Architecture

- **No background worker, no popup, no service worker** — everything runs in a content script injected at `document_idle`
- **Manifest V3** with `web_accessible_resources` for GIF access and `host_permissions` scoped to target domains
- **Button detection** uses three layers: (1) site-specific CSS selectors + text matching in `SITE_BUTTONS`, (2) generic CSS selectors as fallback, (3) broad `TARGET_TEXTS` keyword matching (Taiwanese, English, Japanese, Korean)
- **Cat overlay** is an absolutely-positioned `<div>` appended to `document.body` with high `z-index` and `pointer-events: none`
- **Target sites:** shopee.tw, 24h.pchome.com.tw, momoshop.com.tw, ruten.com.tw, books.com.tw, etmall.com.tw, rakuten.com.tw, amazon.com, amazon.co.jp, gmarket.co.kr
- **Detects elements** via textContent, alt, title, value, and child img attributes

## Adding a New Target Site

1. Add host match pattern to `manifest.json` `content_scripts[0].matches`
2. Add entry in `content_script.js` `SITE_BUTTONS` object with site-specific `texts` and `selectors`

## GIF Management

- GIFs are stored in `shopping-cat-blocker/gifs/` named `1.gif` through `28.gif`
- `GIF_FILES` array in `content_script.js` uses `Array.from({ length: 28 }, (_, i) => \`${i + 1}.gif\`)` — update the length when adding/removing GIFs

## Commands

- **Syntax check:** `node --check shopping-cat-blocker/content_script.js`
- **Load in Chrome:** Open `chrome://extensions` → Developer mode → Load unpacked → select `shopping-cat-blocker/`