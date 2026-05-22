(function () {
  "use strict";

  // const TARGET_TEXTS = ['加入購物車', '立即購買', '購物車', '直接購買', '直接買', '加到購物車', '結帳'];
  // ============================================================
  // 方法一：通用文字關鍵字（電商共通常用詞）
  // 只要按鈕文字包含以下任一詞，就會被偵測
  // ============================================================
  const TARGET_TEXTS = [
    // 台灣電商
    "加入購物車",
    "立即購買",
    "購物車",
    "加入購物",
    "直接購買",
    "直接買",
    "加到購物車",
    "結帳",
    "放入購物車",
    "加入購物袋",
    "加入購物籃",
    "放進購物車",
    "馬上買",
    "加入詢價",
    // 英文站
    "ADD TO CART",
    "BUY NOW",
    "ADD TO BAG",
    "CHECKOUT",
    "add to cart",
    "buy now",
    "add to bag",
    // 日韓站
    "カートに入れる",
    "購入する",
    "今すぐ購入",
    "장바구니",
    "바로구매",
    "구매하기",
  ];

  // ============================================================
  // 方法三：網站專屬按鈕定義（精確控制各站的規則）
  // 在下面的 SITE_BUTTONS 表格中自行加/減站點
  // 啟用後會優先於通用規則
  // ============================================================

  // 範例：取消下方註解即可啟用各站專屬規則
  const SITE_BUTTONS = {
    "momoshop.com.tw": {
      texts: ["放入購物車", "直接購買"],
      selectors: ["#buy_yes a", "#inCar a", ".checkoutArea a"],
    },
    "ruten.com.tw": {
      texts: ["加入購物車", "直接購買", "出價", "馬上買"],
      selectors: [
        "button",
        "a",
        '[class*="qa-add-cart"]',
        '[class*="item-shopping-cart-action"]',
        '[class*="buy"]',
      ],
    },
    "shopee.tw": {
      texts: ["加入購物車", "直接購買", "立即購買"],
      selectors: [
        "button",
        "a",
        ".btn-solid-primary button",
        '[class*="btn-tinted"]',
      ],
    },
    "24h.pchome.com.tw": {
      texts: ["加入購物車", "立即購買", "直接買"],
      selectors: ["button", "a", '[id*="BuyBtn"]', '[class*="buyBtn"]'],
    },
    "books.com.tw": {
      texts: ["加入購物車", "立即購買", "放入購物車"],
      selectors: ["button", '[class*="buy"]', '[class*="add"]'],
    },
    "etmall.com.tw": {
      texts: ["加入購物車", "立即購買", "購物車"],
      selectors: ["button", '[class*="cart"]'],
    },
    "rakuten.com.tw": {
      texts: ["加入購物車", "立即購買", "カートに入れる"],
      selectors: ["button", '[class*="cart"]'],
    },
    "amazon.com": {
      texts: ["Add to Cart", "Buy Now", "add to cart", "buy now", "加入購物車", "立即購買", "新增至購物車", "增加到購物車"],
      selectors: [
        "#add-to-cart-button",
        "#buy-now-button",
        "input[name='submit.addToCart']",
        "input[name='submit.buyNow']",
        '[data-asin] input[type="submit"]',
      ],
    },
    "amazon.co.jp": {
      texts: ["カートに入れる", "今すぐ購入", "新增至購物車", "增加到購物車"],
      selectors: [
        "#add-to-cart-button",
        "#buy-now-button",
        "input[name='submit.addToCart']",
        "input[name='submit.buyNow']",
        '[data-asin] input[type="submit"]',
      ],
    },
    "gmarket.co.kr": {
      texts: ["장바구니", "바로구매", "구매하기"],
      selectors: ["button", '[class*="cart"]', '[class*="buy"]'],
    },
  };

  // GIF 檔案列表：新增或刪除 GIF 時，在這陣列加/減一筆就好
  const GIF_FILES = Array.from({ length: 28 }, (_, i) => `${i + 1}.gif`);
  const GIF_COUNT = GIF_FILES.length;
  const OVERLAY_WIDTH = 150;
  const OVERLAY_HEIGHT = 150;
  const OFFSET_X = 15;
  const OFFSET_Y = -120;
  const FADE_OUT_MS = 1500;

  let currentOverlay = null;
  let hideTimeout = null;
  let rotateTimeout = null;
  let lastGifIndex = -1;

  // --- GIF selection ---
  function pickRandomGif() {
    let idx;
    do {
      idx = Math.floor(Math.random() * GIF_COUNT);
    } while (idx === lastGifIndex && GIF_COUNT > 1);
    lastGifIndex = idx;
    return chrome.runtime.getURL(`gifs/${GIF_FILES[idx]}`);
  }

  // --- Overlay management ---
  function createOverlay(gifUrl) {
    const overlay = document.createElement("div");
    overlay.className = "cat-blocker-overlay";
    overlay.style.width = OVERLAY_WIDTH + "px";
    overlay.style.height = OVERLAY_HEIGHT + "px";

    const img = document.createElement("img");
    img.src = gifUrl;
    img.alt = "購物衝動抑制器";
    img.draggable = false;
    overlay.appendChild(img);

    if (!document.body) return null;
    document.body.appendChild(overlay);
    return overlay;
  }

  function positionOverlay(overlay, clientX, clientY) {
    overlay.style.left = clientX + OFFSET_X + "px";
    overlay.style.top = clientY + OFFSET_Y + "px";
  }

  function rotateGif() {
    if (!currentOverlay) return;
    const img = currentOverlay.querySelector("img");
    if (img) {
      img.src = pickRandomGif();
    }
    rotateTimeout = setTimeout(rotateGif, 5000);
  }

  function showOverlay(clientX, clientY) {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
    if (rotateTimeout) {
      clearTimeout(rotateTimeout);
      rotateTimeout = null;
    }
    if (currentOverlay) {
      currentOverlay.remove();
      currentOverlay = null;
    }
    const gifUrl = pickRandomGif();
    currentOverlay = createOverlay(gifUrl);
    if (!currentOverlay) return;
    positionOverlay(currentOverlay, clientX, clientY);
    currentOverlay.getBoundingClientRect();
    currentOverlay.classList.add("visible");
    rotateTimeout = setTimeout(rotateGif, 5000);
  }

  function hideOverlay() {
    if (!currentOverlay) return;
    if (rotateTimeout) {
      clearTimeout(rotateTimeout);
      rotateTimeout = null;
    }
    currentOverlay.classList.remove("visible");
    currentOverlay.classList.add("hiding");
    hideTimeout = setTimeout(() => {
      if (currentOverlay) {
        currentOverlay.remove();
        currentOverlay = null;
        hideTimeout = null;
      }
    }, FADE_OUT_MS);
  }

  // --- Button detection ---
  function isPurchaseButton(el, siteTexts) {
    const texts = siteTexts || TARGET_TEXTS;
    const text = el.textContent.trim();
    if (/^購物車\s*\(/.test(text)) return false;
    // 檢查 textContent、alt、title、value、aria-label 等屬性
    const alt = el.getAttribute("alt") || "";
    const title = el.getAttribute("title") || "";
    const val = el.getAttribute("value") || "";
    const ariaLabel = el.getAttribute("aria-label") || "";
    // 也檢查子元素的 alt/title（圖示按鈕常見）
    let childAlt = "",
      childTitle = "";
    const img = el.querySelector("img");
    if (img) {
      childAlt = img.getAttribute("alt") || "";
      childTitle = img.getAttribute("title") || "";
    }
    const combined =
      text +
      " " +
      alt +
      " " +
      title +
      " " +
      val +
      " " +
      ariaLabel +
      " " +
      childAlt +
      " " +
      childTitle;
    return texts.some((t) => combined.includes(t)) && combined.length <= 120;
  }

  function isVisible(el) {
    if (el.offsetParent !== null) return true;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function getSiteConfig() {
    const host = window.location.hostname;
    for (const [domain, config] of Object.entries(SITE_BUTTONS)) {
      if (host.includes(domain)) return config;
    }
    return null;
  }

  function findPurchaseButtons() {
    // ============================================================
    // 方法三（已啟用）：先檢查是否匹配 SITE_BUTTONS 中的專屬規則
    // 如果有專屬規則，只用該規則掃描；沒有則走通用規則
    // ============================================================
    const siteConfig = getSiteConfig();

    // 偵錯：紀錄 host 與 config
    console.log(
      "[購物衝動抑制器] host:",
      window.location.hostname,
      "config:",
      siteConfig,
    );

    const selectors = siteConfig
      ? siteConfig.selectors
      : [
          // ============================================================
          // 方法二：通用 DOM 選擇器（fallback）
          // CSS class / data-* 屬性層級偵測按鈕
          // ============================================================
          "button",
          "a",
          '[role="button"]',
          'input[type="submit"]',
          ".btn",
          '[class*="buy"]',
          '[class*="cart"]',
          '[class*="purchase"]',
          // 廣義 data-* 屬性匹配（各平台通用）
          '[data-log*="addCart"]',
          '[data-log*="fastBuy"]',
          '[data-testid*="add"]',
          '[data-testid*="buy"]',
          '[data-track*="cart"]',
          '[data-track*="buy"]',
          '[data-bn*="add_cart"]',
          '[data-bn*="buy_now"]',
          '[data-click="addCart"]',
          '[data-click="fastBuy"]',
        ];

    const texts = siteConfig ? siteConfig.texts : null;
    const results = [];
    const seen = new Set();

    for (const sel of selectors) {
      const elements = document.querySelectorAll(sel);
      console.log(
        `[購物衝動抑制器] selector "${sel}" found ${elements.length} elements`,
      );
      for (const el of elements) {
        if (seen.has(el)) continue;
        seen.add(el);
        const purchase = isPurchaseButton(el, texts);
        const visible = isVisible(el);
        console.log(
          `[購物衝動抑制器] el:`,
          el.tagName,
          el.id || el.className || "(no id)",
          `textContent:"${el.textContent.trim()}"`,
          `purchase:${purchase}`,
          `visible:${visible}`,
        );
        if (purchase && visible) {
          console.log(`[購物衝動抑制器] MATCH!`, el);
          results.push(el);
        }
      }
    }
    return results;
  }

  // --- Event handlers ---
  function onMouseEnter(e) {
    showOverlay(e.clientX, e.clientY);
    document.addEventListener("mousemove", onMouseMove, { passive: true });
  }

  function onMouseMove(e) {
    if (currentOverlay) {
      positionOverlay(currentOverlay, e.clientX, e.clientY);
    }
  }

  function onMouseLeave() {
    document.removeEventListener("mousemove", onMouseMove);
    hideOverlay();
  }

  function attachHoverListeners(buttons) {
    for (const btn of buttons) {
      if (btn.dataset.catBlockerAttached) continue;
      btn.dataset.catBlockerAttached = "true";
      btn.addEventListener("mouseenter", onMouseEnter);
      btn.addEventListener("mouseleave", onMouseLeave);
    }
  }

  // --- Init ---
  let scanTimeout = null;
  let periodicScanTimer = null;
  const observer = new MutationObserver(() => {
    if (scanTimeout) return;
    scanTimeout = setTimeout(() => {
      scanTimeout = null;
      const buttons = findPurchaseButtons();
      if (buttons.length > 0) {
        attachHoverListeners(buttons);
      }
    }, 400);
  });

  const initialButtons = findPurchaseButtons();
  attachHoverListeners(initialButtons);

  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // SPA 安全網：前 30 秒每 2 秒重新掃描一次
  // 因 Shopee/電商網站商品頁按鈕可能透過非同步 React 渲染
  let periodicCount = 0;
  periodicScanTimer = setInterval(() => {
    periodicCount++;
    if (periodicCount > 15) {
      clearInterval(periodicScanTimer);
      periodicScanTimer = null;
      return;
    }
    const buttons = findPurchaseButtons();
    if (buttons.length > 0) {
      attachHoverListeners(buttons);
    }
  }, 2000);

  function cleanup() {
    if (scanTimeout) {
      clearTimeout(scanTimeout);
      scanTimeout = null;
    }
    if (periodicScanTimer) {
      clearInterval(periodicScanTimer);
      periodicScanTimer = null;
    }
    observer.disconnect();
  }

  window.addEventListener("beforeunload", cleanup);
  window.addEventListener("popstate", cleanup);
})();
