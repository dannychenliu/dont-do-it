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