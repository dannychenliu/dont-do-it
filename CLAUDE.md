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
- **Target sites:** 80+ domains across TW, US, JP, KR, DE, FR, ES, NL, IT, PL, RO, UK markets — including Amazon (all regions), eBay (all regions), major US retailers (Walmart, Target, Best Buy, Costco), fast fashion (Temu, Shein, ASOS), marketplaces (Taobao, Mercari, Etsy, Vinted), and individual brand stores (Nike, Apple, Uniqlo, IKEA, Muji, Decathlon)
- **Route-based config:** `uniqlo.com` uses path prefix (`/tw`, `/jp`) to determine language-appropriate button texts
- **Amazon-specific selectors:** US/JP/DE/FR/IT/ES/NL each use `#add-to-cart-button`, `#buy-now-button`, and `data-asin` container matching with local-language text arrays
- **Detects elements** via textContent, alt, title, value, aria-label, and child img attributes
- **SPA support:** `MutationObserver` on `document.body` (400ms debounce) + periodic re-scan every 2s for the first 60s after load
- **Overlay behavior:** Shows cat GIF above cursor on mouseenter; follows cursor via mousemove; GIF rotates every 5s while hovering; fades out over 1500ms on mouseleave
- **No event duplication:** `dataset.catBlockerAttached` guard prevents attaching multiple listeners to the same element

## Button Detection

Three detection layers, evaluated in order:
1. **Site-specific config** (`SITE_BUTTONS`): Per-domain `texts` + `selectors`, checked via `host === domain` then `host.includes(domain)`. `uniqlo.com` is special-cased by path prefix.
2. **Generic CSS selectors** (`BASE_SELECTORS`): Covers `button`, `a`, `[role="button"]`, `input[type="submit"]`, class pattern matchers (`btn`, `*buy*`, `*cart*`, etc.), and 50+ `data-*` attribute selectors (`data-log`, `data-testid`, `data-track`, `data-bn`, `data-qa`, `data-automation`, etc.)
3. **Broad keyword matching** (`TARGET_TEXTS`): 100+ purchase keywords in 10 languages (TW, EN, JP, KR, DE, FR, ES, NL, IT, PL, RO, PT, SV), matched via `textContent + alt + title + value + aria-label + child img attrs`

A combined string length check (`<= 300`) prevents matching against huge blocks of unrelated text.

## Language Text Arrays

Shared text arrays in `content_script.js` (`TW_TEXTS`, `EN_TEXTS`, `JP_TEXTS`, `KR_TEXTS`, `DE_TEXTS`, `FR_TEXTS`, `ES_TEXTS`, `NL_TEXTS`, `IT_TEXTS`, `PL_TEXTS`, `RO_TEXTS`) are combined via spread when a site supports multiple languages.

## Adding a New Target Site

1. Add host match pattern to `manifest.json` `content_scripts[0].matches`
2. If the site uses a known language, reuse an existing text array (e.g. `EN_TEXTS`). If it needs custom keywords, add them to `SITE_BUTTONS` or to `TARGET_TEXTS` for broad coverage.
3. Add entry in `content_script.js` `SITE_BUTTONS` object with site-specific `texts` and `selectors` (or `BASE_SELECTORS` for generic matching).

## GIF Management

- GIFs are stored in `shopping-cat-blocker/gifs/` named `1.gif` through `28.gif`
- `GIF_FILES` array in `content_script.js` uses `Array.from({ length: 28 }, (_, i) => \`${i + 1}.gif\`)` — update the length when adding/removing GIFs
- GIF rotates to a different random GIF every 5 seconds while hovering (guaranteed no repeat of the previous index)

## Commands

- **Syntax check:** `node --check shopping-cat-blocker/content_script.js`
- **Load in Chrome:** Open `chrome://extensions` → Developer mode → Load unpacked → select `shopping-cat-blocker/`
- **Reload after changes:** `chrome://extensions` → click refresh icon on the extension card

## Project History

Based on `git log`, the project evolved from a simple Shopee-only blocker into a multi-region, multi-language shopping impulse blocker supporting 80+ domains. Key milestones include: adding Amazon support, expanding to Japanese/Korean markets, adding European language support, and route-based site configuration for multi-language sites like Uniqlo.