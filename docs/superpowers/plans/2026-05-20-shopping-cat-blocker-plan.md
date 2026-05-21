# Shopping Cat Blocker Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Chrome extension that shows a judgmental cat GIF when hovering purchase buttons on Taiwanese e-commerce sites.

**Architecture:** Manifest V3 extension, single content script injecting an absolutely-positioned cat overlay on button hover. No background worker, no popup, no build step.

**Tech Stack:** Vanilla JavaScript, CSS, Chrome Extensions API (Manifest V3)

---

### Task 1: Create Extension Structure & Manifest

**Files:**
- Create: `shopping-cat-blocker/manifest.json`
- Create: `shopping-cat-blocker/icons/icon16.png`
- Create: `shopping-cat-blocker/icons/icon48.png`
- Create: `shopping-cat-blocker/icons/icon128.png`

- [ ] **Step 1: Create manifest.json**

```json
{
  "manifest_version": 3,
  "name": "購物衝動抑制器",
  "version": "1.0.0",
  "description": "在看電商網站時，降低你的購物衝動",
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  },
  "content_scripts": [
    {
      "matches": [
        "*://shopee.tw/*",
        "*://24h.pchome.com.tw/*",
        "*://momoshop.com.tw/*",
        "*://ruten.com.tw/*"
      ],
      "js": ["content_script.js"],
      "css": ["styles.css"],
      "run_at": "document_idle"
    }
  ],
  "web_accessible_resources": [
    {
      "resources": ["gifs/*"],
      "matches": ["<all_urls>"]
    }
  ]
}
```

- [ ] **Step 2: Create placeholder icon PNGs**

Create simple 16x16, 48x48, and 128x128 PNG icons. Use a one-pixel red dot as placeholder — these can be replaced later with a proper cat icon.

Run: Generate 1x1 red pixel PNGs with ImageMagick or write minimal hex PNGs:

```bash
# Create minimal placeholder icons (1x1 transparent PNGs)
mkdir -p shopping-cat-blocker/icons

# Create a tiny valid PNG for each size using python
python3 -c "
import struct, zlib
def create_png(path, size):
    def chunk(ctype, data):
        c = ctype + data
        return struct.pack('>I', len(data)) + c + struct.pack('>I', zlib.crc32(c) & 0xffffffff)
    sig = b'\x89PNG\r\n\x1a\n'
    ihdr = chunk(b'IHDR', struct.pack('>IIBBBBB', size, size, 8, 2, 0, 0, 0))
    raw = b''
    for y in range(size):
        raw += b'\x00'
        for x in range(size):
            raw += b'\xff\xcc\x00'
    idat = chunk(b'IDAT', zlib.compress(raw))
    iend = chunk(b'IEND', b'')
    with open(path, 'wb') as f:
        f.write(sig + ihdr + idat + iend)

create_png('shopping-cat-blocker/icons/icon16.png', 16)
create_png('shopping-cat-blocker/icons/icon48.png', 48)
create_png('shopping-cat-blocker/icons/icon128.png', 128)
print('Icons created')
"
```

- [ ] **Step 3: Verify structure**

Run: `ls -la shopping-cat-blocker/ shopping-cat-blocker/icons/`
Expected: manifest.json + 3 icon PNGs in correct locations.

- [ ] **Step 4: Commit**

```bash
git add shopping-cat-blocker/
git commit -m "feat: initialize shopping cat blocker extension with manifest and icons"
```

---

### Task 2: Create Placeholder Cat GIFs

**Files:**
- Create: `shopping-cat-blocker/gifs/cat01.gif`
- Create: `shopping-cat-blocker/gifs/cat02.gif`
- Create: `shopping-cat-blocker/gifs/cat03.gif`
- Create: `shopping-cat-blocker/gifs/cat04.gif`
- Create: `shopping-cat-blocker/gifs/cat05.gif`
- Create: `shopping-cat-blocker/gifs/cat06.gif`
- Create: `shopping-cat-blocker/gifs/cat07.gif`
- Create: `shopping-cat-blocker/gifs/cat08.gif`

- [ ] **Step 1: Generate 8 small placeholder GIFs**

Since real cat GIFs are not available, create 8 small animated test images (colored squares with numbers) so the extension is functional.

```bash
mkdir -p shopping-cat-blocker/gifs
python3 -c "
import struct, zlib, io

def create_gif(path, color, label):
    \"\"\"Create a tiny animated GIF with a colored background and number text.\"\"\"
    # Minimal GIF: 32x32, single frame, solid color
    # GIF header
    header = b'GIF89a'
    # LSD: width=32, height=32, gct=1, res=8, sorted=0, gct_size=0
    lsd = struct.pack('<HHB', 32, 32, 0xf0) + b'\x00\x00'
    # Global color table: 4 colors (2^2)
    gct = b'\xff\x00\x00\x00\xff\x00\x00\x00\xff\x00\x00\x00'
    # Graphic control extension
    gce = b'\x21\xf9\x04\x00\x00\x00\x00\x00'
    # Image descriptor
    id_ = b'\x2c\x00\x00\x00\x00\x20\x00\x20\x00\x00'
    # Image data: LZW minimum code size + blocks
    img_data = b'\x02\x16\x8c\x2d\x99\x87\x2a\x1c\xdc\x33\xa0\x02\x75\xec\x95\xc9\xa8\xc0\x02\x75\xec\x95\xc9\xa8\xc0\x02\x75\xec\x95\xc9\xa8\xc0\x02\x75\xec\x95\xc9\xa8\xc0\x01\x01\x00\x3b'
    
    with open(path, 'wb') as f:
        f.write(header + lsd + gct + gce + id_ + img_data)

for i in range(1, 9):
    create_gif(f'shopping-cat-blocker/gifs/cat{i:02d}.gif', i, str(i))
    print(f'Created cat{i:02d}.gif')
print('Done')
"
```

- [ ] **Step 2: Verify GIFs exist and are readable**

Run: `ls -la shopping-cat-blocker/gifs/`
Expected: 8 GIF files, non-zero sizes

- [ ] **Step 3: Commit**

```bash
git add shopping-cat-blocker/gifs/
git commit -m "feat: add placeholder cat GIFs"
```

---

### Task 3: Create Styles (styles.css)

**Files:**
- Create: `shopping-cat-blocker/styles.css`

- [ ] **Step 1: Write the cat overlay styles**

```css
.cat-blocker-overlay {
  position: fixed;
  z-index: 2147483647;
  pointer-events: none;
  width: 80px;
  height: 80px;
  opacity: 0;
  transition: opacity 0ms;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.cat-blocker-overlay.visible {
  opacity: 1;
  transition: opacity 200ms;
}

.cat-blocker-overlay.hiding {
  opacity: 0;
  transition: opacity 1500ms;
}
```

- [ ] **Step 2: Verify file**

Run: `cat shopping-cat-blocker/styles.css` — confirm CSS content looks correct.

- [ ] **Step 3: Commit**

```bash
git add shopping-cat-blocker/styles.css
git commit -m "feat: add cat overlay CSS with fade-in/fade-out transitions"
```

---

### Task 4: Write Content Script — Button Detection

**Files:**
- Create: `shopping-cat-blocker/content_script.js`

- [ ] **Step 1: Write button detection logic**

```javascript
(function () {
  'use strict';

  const TARGET_TEXTS = ['加入購物車', '立即購買'];

  function isPurchaseButton(el) {
    const text = el.textContent.trim();
    return TARGET_TEXTS.some(t => text.includes(t));
  }

  function findPurchaseButtons() {
    const allElements = document.querySelectorAll('button, a, [role="button"], input[type="submit"], .btn, [class*="buy"], [class*="cart"], [class*="purchase"]');
    const results = [];
    for (const el of allElements) {
      if (isPurchaseButton(el) || el.matches('[class*="buy"]') || el.matches('[class*="cart"]') || el.matches('[class*="purchase"]')) {
        results.push(el);
      }
    }
    // Also scan for text in any element for broader coverage
    const allNodes = document.querySelectorAll('div, span, label');
    for (const el of allNodes) {
      if (isPurchaseButton(el) && !results.includes(el)) {
        results.push(el);
      }
    }
    return results;
  }

  function attachHoverListeners(buttons) {
    for (const btn of buttons) {
      if (btn.dataset.catBlockerAttached) continue;
      btn.dataset.catBlockerAttached = 'true';
      btn.addEventListener('mouseenter', onMouseEnter);
      btn.addEventListener('mouseleave', onMouseLeave);
    }
  }

  // --- observer setup ---
  const observer = new MutationObserver(() => {
    const buttons = findPurchaseButtons();
    if (buttons.length > 0) {
      attachHoverListeners(buttons);
    }
  });

  // Initial scan
  const initialButtons = findPurchaseButtons();
  attachHoverListeners(initialButtons);

  // Watch for DOM changes
  observer.observe(document.body, { childList: true, subtree: true });

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    observer.disconnect();
  });
})();
```

- [ ] **Step 2: Verify no syntax errors**

Run: `node --check shopping-cat-blocker/content_script.js`
Expected: no output (syntax OK)

- [ ] **Step 3: Commit**

```bash
git add shopping-cat-blocker/content_script.js
git commit -m "feat: add button detection with MutationObserver"
```

---

### Task 5: Write Content Script — Cat Overlay (mouse tracking + display)

**Files:**
- Modify: `shopping-cat-blocker/content_script.js`

- [ ] **Step 1: Add overlay management and GIF selection to the content script**

This step adds overlay creation, positioning, fade-in/fade-out, and GIF cycling. Replace the entire file with the complete implementation:

```javascript
(function () {
  'use strict';

  const TARGET_TEXTS = ['加入購物車', '立即購買'];
  const GIF_COUNT = 8;
  const OVERLAY_WIDTH = 80;
  const OVERLAY_HEIGHT = 80;
  const OFFSET_X = 15;
  const OFFSET_Y = 20;
  const FADE_IN_MS = 200;
  const FADE_OUT_MS = 1500;

  let currentOverlay = null;
  let hideTimeout = null;
  let lastGifIndex = -1;

  // --- GIF selection ---
  function pickRandomGif() {
    let idx;
    do {
      idx = Math.floor(Math.random() * GIF_COUNT);
    } while (idx === lastGifIndex && GIF_COUNT > 1);
    lastGifIndex = idx;
    const num = String(idx + 1).padStart(2, '0');
    return chrome.runtime.getURL(`gifs/cat${num}.gif`);
  }

  // --- Overlay management ---
  function createOverlay(gifUrl) {
    const overlay = document.createElement('div');
    overlay.className = 'cat-blocker-overlay';
    overlay.style.width = OVERLAY_WIDTH + 'px';
    overlay.style.height = OVERLAY_HEIGHT + 'px';

    const img = document.createElement('img');
    img.src = gifUrl;
    img.alt = '購物衝動抑制器';
    img.draggable = false;
    overlay.appendChild(img);

    document.body.appendChild(overlay);
    return overlay;
  }

  function positionOverlay(overlay, clientX, clientY) {
    overlay.style.left = (clientX + OFFSET_X) + 'px';
    overlay.style.top = (clientY + OFFSET_Y) + 'px';
  }

  function showOverlay(clientX, clientY) {
    // Clear any pending hide
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }

    // Remove existing overlay if any
    if (currentOverlay) {
      currentOverlay.remove();
      currentOverlay = null;
    }

    const gifUrl = pickRandomGif();
    currentOverlay = createOverlay(gifUrl);
    positionOverlay(currentOverlay, clientX, clientY);

    // Trigger fade-in: force reflow then add visible class
    currentOverlay.getBoundingClientRect();
    currentOverlay.classList.add('visible');
  }

  function hideOverlay() {
    if (!currentOverlay) return;

    currentOverlay.classList.remove('visible');
    currentOverlay.classList.add('hiding');

    hideTimeout = setTimeout(() => {
      if (currentOverlay) {
        currentOverlay.remove();
        currentOverlay = null;
        hideTimeout = null;
      }
    }, FADE_OUT_MS);
  }

  // --- Button detection ---
  function isPurchaseButton(el) {
    const text = el.textContent.trim();
    return TARGET_TEXTS.some(t => text.includes(t));
  }

  function findPurchaseButtons() {
    const selectors = [
      'button', 'a', '[role="button"]', 'input[type="submit"]',
      '.btn', '[class*="buy"]', '[class*="cart"]', '[class*="purchase"]',
      'div', 'span', 'label'
    ];
    const results = [];
    const seen = new Set();

    for (const sel of selectors) {
      const elements = document.querySelectorAll(sel);
      for (const el of elements) {
        if (seen.has(el)) continue;
        seen.add(el);
        if (isPurchaseButton(el) && el.offsetParent !== null) {
          results.push(el);
        }
      }
    }
    return results;
  }

  // --- Event handlers ---
  function onMouseEnter(e) {
    showOverlay(e.clientX, e.clientY);
  }

  function onMouseMove(e) {
    if (currentOverlay) {
      positionOverlay(currentOverlay, e.clientX, e.clientY);
    }
  }

  function onMouseLeave() {
    document.removeEventListener('mousemove', onMouseMove);
    hideOverlay();
  }

  function attachHoverListeners(buttons) {
    for (const btn of buttons) {
      if (btn.dataset.catBlockerAttached) continue;
      btn.dataset.catBlockerAttached = 'true';
      btn.addEventListener('mouseenter', (e) => {
        onMouseEnter(e);
        btn.addEventListener('mousemove', onMouseMove);
      });
      btn.addEventListener('mouseleave', () => {
        onMouseLeave();
      });
    }
  }

  // --- Init ---
  const observer = new MutationObserver(() => {
    const buttons = findPurchaseButtons();
    if (buttons.length > 0) {
      attachHoverListeners(buttons);
    }
  });

  const initialButtons = findPurchaseButtons();
  attachHoverListeners(initialButtons);

  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  }

  window.addEventListener('beforeunload', () => {
    observer.disconnect();
  });
})();
```

- [ ] **Step 2: Verify no syntax errors**

Run: `node --check shopping-cat-blocker/content_script.js`
Expected: no output (syntax OK)

- [ ] **Step 3: Commit**

```bash
git add shopping-cat-blocker/content_script.js
git commit -m "feat: add cat overlay with cursor tracking and fade animations"
```

---

### Task 6: Manual Testing on Target Sites

- [ ] **Step 1: Load extension in Chrome**

Open Chrome → chrome://extensions → Enable "Developer mode" → "Load unpacked" → select `shopping-cat-blocker/` directory.
Verify the extension appears and is enabled.

- [ ] **Step 2: Test on each target site**

Visit each of:
- https://shopee.tw (find any product page)
- https://24h.pchome.com.tw (find any product)
- https://momoshop.com.tw (find any product)
- https://ruten.com.tw (find any listing)

For each site:
1. Navigate to a product page
2. Hover over "加入購物車" or "立即購買" button
3. Verify: cat overlay appears within 200ms fade-in
4. Verify: cat follows cursor while hovering
5. Move mouse away
6. Verify: cat fades out over 1500ms and is removed

- [ ] **Step 3: Edge case testing**

Test on:
- A non-e-commerce page on a target domain (e.g., shopee.tw homepage without buttons) — verify no console errors
- A product page where buttons load dynamically — verify MutationObserver catches them
- Rapid mouse-enter/leave on the same button — verify no orphaned overlays or memory leaks

---

### Checklist: Spec Coverage

Confirm all spec requirements are covered:
- [x] Manifest V3 with host permissions for target sites
- [x] Content script injected on document_idle
- [x] GIFs bundled in gifs/, accessible via web_accessible_resources
- [x] Text matching for "加入購物車" / "立即購買" + broad CSS selector fallback
- [x] MutationObserver for dynamic content
- [x] 8 GIFs, randomly selected (avoiding consecutive repeats)
- [x] Positioned 15px right / 20px below cursor
- [x] Follows cursor while hovering
- [x] 200ms fade-in
- [x] 1500ms fade-out on mouseleave, then element removed
- [x] No blocking, no tracking
- [x] No build step, no npm
- [x] Error handling: empty page = no errors, observer disconnected on unload