# Shopping Cat Blocker — Design Spec

## Overview

A Chrome extension (Manifest V3) that helps reduce impulse shopping by showing a judgmental cat GIF when the user hovers over "Add to Cart" / "Buy Now" buttons on Taiwanese e-commerce sites. Pure nudge — no blocking, no tracking.

## Target Sites (v1)

- Shopee (shopee.tw)
- PChome 24h (24h.pchome.com.tw)
- momo (momoshop.com.tw)
- Ruten (ruten.com.tw)

## Extension Structure

```
shopping-cat-blocker/
├── manifest.json
├── content_script.js
├── styles.css
├── gifs/
│   ├── cat01.gif (placeholder)
│   ├── cat02.gif (placeholder)
│   ├── cat03.gif (placeholder)
│   ├── cat04.gif (placeholder)
│   ├── cat05.gif (placeholder)
│   ├── cat06.gif (placeholder)
│   ├── cat07.gif (placeholder)
│   └── cat08.gif (placeholder)
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

No build step, no bundler, no npm dependencies. Plain web extension files.

## Manifest (manifest.json)

- **Manifest Version:** 3
- **Host Permissions:** Target domains (shopee.tw, 24h.pchome.com.tw, momoshop.com.tw, ruten.com.tw)
- **Content Script:** Injected on `document_idle` for all URLs on target domains
- **Web Accessible Resources:** gifs/ folder (so content script can load via `chrome.runtime.getURL`)
- **Permissions:** none beyond host_permissions

## Button Detection

- **Text matching** — scan for buttons/elements containing "加入購物車" or "立即購買"
- **Site-specific selectors** — per-platform CSS selectors for their purchase buttons (determined during implementation)
- **Initial scan** — runs on page load
- **MutationObserver** — watches for dynamically added content (popups, infinite scroll)
- When a matching element is found, attach `mouseenter` / `mouseleave` listeners

## Cat Overlay Behavior

1. **Trigger:** User's mouse enters a detected purchase button (`mouseenter`)
2. **GIF selection:** Pick one of 8 bundled cat GIFs at random (re-shuffle each time)
3. **Position:** 20px below, 15px to the right of the cursor
4. **Follow:** The cat element follows the cursor while the user is on the button
5. **Fade-in:** 200ms CSS opacity transition on appearance
6. **Dismiss:** On `mouseleave`, fade out over 1500ms, then remove the DOM element
7. **Implementation:** Absolutely-positioned `<img>` appended to `document.body`, high `z-index`

## GIFs

- 8 animated cat GIFs with disapproval/shaking-head/judgmental expressions
- v1 uses placeholder images for development
- No external API calls — everything bundled locally

## Error Handling

- If GIF fails to load, the element is still shown (broken image) and removed normally on mouseleave
- If no buttons are found on a page, the script does nothing (no errors thrown)
- MutationObserver disconnect on page unload to prevent leaks

## Testing

- Manual testing on each target site
- Verify: hover shows cat, cat follows cursor, mouseleave fades over 1500ms
- Verify: MutationObserver catches dynamically loaded buttons
- Verify: no console errors on non-e-commerce pages on target domains