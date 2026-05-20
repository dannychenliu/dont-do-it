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