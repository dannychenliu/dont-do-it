(function () {
  "use strict";

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
    "加入購物車",
    "結帳",
    "放入購物車",
    "加入購物袋",
    "加入購物籃",
    "放進購物車",
    "馬上買",
    "加入詢價",
    "新增至購物車",
    "增加到購物車",
    "新增至購物袋",
    "預購",
    "立即結帳",
    // 英文站
    "ADD TO CART",
    "buy",
    "Buy",
    "BUY NOW",
    "Buy now",
    "Buy Now",
    "ADD TO BAG",
    "ADD TO BASKET",
    "CHECKOUT",
    "PRE-ORDER",
    "PLACE ORDER",
    "PURCHASE",
    "BUY IT NOW",
    "ADD TO TROLLEY",
    "GO TO CHECKOUT",
    "I WANT THIS",
    "add to cart",
    "Add to cart",
    "buy now",
    "add to bag",
    "add to basket",
    "pre-order",
    "place order",
    "buy it now",
    "add to trolley",
    "trolley",
    // 日文站
    "カートに入れる",
    "購入する",
    "今すぐ購入",
    "カートを見る",
    "レジに進む",
    "ご購入手続き",
    "予約購入",
    "追加する",
    "購入確定",
    // 韓文站
    "장바구니",
    "바로구매",
    "구매하기",
    "장바구니담기",
    "주문하기",
    "결제하기",
    "카트",
    "주문완료",
    // 德文站
    "In den Warenkorb",
    "Jetzt kaufen",
    "Zum Warenkorb",
    "Kaufen",
    "Bestellen",
    "In den Einkaufswagen",
    "Jetzt bestellen",
    "Kasse",
    "Zahlungspflichtig bestellen",
    // 法文站
    "Ajouter au panier",
    "Acheter",
    "Acheter maintenant",
    "Commander",
    "Paiement",
    "Passer la commande",
    "Voir le panier",
    "Ajouter au sac",
    // 西班牙文站
    "Añadir al carrito",
    "Comprar",
    "Comprar ahora",
    "Tramitar pedido",
    "Pagar",
    "Finalizar compra",
    "Agregar al carrito",
    "Ir al carrito",
    // 荷蘭文站
    "In winkelwagen",
    "Koop nu",
    "Toevoegen aan winkelwagen",
    "Bestellen",
    "Afrekenen",
    "Winkelwagen",
    // 義大利文站
    "Aggiungi al carrello",
    "Acquista",
    "Acquista ora",
    "Procedi all'ordine",
    "Paga",
    "Carrello",
    "Aggiungi al carrello",
    // 波蘭文站
    "Dodaj do koszyka",
    "Kup teraz",
    "Zamów",
    "Do koszyka",
    "Zapłać",
    "Dodaj do koszyka",
    // 瑞典文站
    "Lägg i varukorgen",
    "Köp nu",
    "Beställ",
    "Till kassan",
    "Lägg i kundvagnen",
    "Köp",
    // 葡萄牙文站
    "Adicionar ao carrinho",
    "Comprar",
    "Comprar agora",
    "Finalizar compra",
    "Ir para o carrinho",
    "Adicionar ao carrinho",
    // 羅馬尼亞文站
    "Adaugă în coș",
    "Adaugă în coş",
    "Cumpără",
    "Cumpără acum",
    "Comandă",
    "Finalizare comandă",
    "Coș de cumpărături",
  ];

  // ============================================================
  // 共享文字陣列（各語言共通的購買關鍵字）
  // ============================================================
  const TW_TEXTS = [
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
    "新增至購物車",
    "增加到購物車",
    "新增至購物袋",
    "預購",
    "立即結帳",
    "選購",
    "Buy",
  ];
  const EN_TEXTS = [
    "Add",
    "Buy",
    "Add to Cart",
    "Buy Now",
    "Add to Bag",
    "Add To Bag",
    "Add to Basket",
    "Checkout",
    "Pre-order",
    "Place Order",
    "Purchase",
    "Buy It Now",
    "Add to Trolley",
    "Add to cart",
    "add to cart",
    "buy now",
    "add to bag",
    "add to basket",
    "pre-order",
    "place order",
    "buy it now",
    "add to trolley",
    "add to trolley",
    "trolley",
    "View product",
    "Add to basket",
    "Add to bag",
  ];
  const JP_TEXTS = [
    "カートに入れる",
    "購入する",
    "今すぐ購入",
    "カートを見る",
    "レジに進む",
    "ご購入手続き",
    "予約購入",
    "追加する",
    "購入確定",
    "予約する",
    "SHOP NOW",
    "かごに追加",
    "購入手続きへ",
  ];
  const KR_TEXTS = [
    "장바구니",
    "바로구매",
    "구매하기",
    "장바구니담기",
    "주문하기",
    "결제하기",
    "카트",
    "주문완료",
  ];
  const DE_TEXTS = [
    "In den Warenkorb",
    "Jetzt kaufen",
    "Zum Warenkorb",
    "Kaufen",
    "Bestellen",
    "In den Einkaufswagen",
    "Jetzt bestellen",
    "Kasse",
    "Zahlungspflichtig bestellen",
  ];
  const FR_TEXTS = [
    "Ajouter au panier",
    "Acheter",
    "Acheter maintenant",
    "Commander",
    "Paiement",
    "Passer la commande",
    "Voir le panier",
    "Ajouter au sac",
    "Voir les options d'achat",
  ];
  const ES_TEXTS = [
    "Añadir al carrito",
    "Comprar",
    "Comprar ahora",
    "Tramitar pedido",
    "Pagar",
    "Finalizar compra",
    "Agregar al carrito",
    "Ir al carrito",
    "Añadir",
    "Añadir a la cesta",
  ];
  const NL_TEXTS = [
    "In winkelwagen",
    "Koop nu",
    "Toevoegen aan winkelwagen",
    "Bestellen",
    "Afrekenen",
    "Winkelwagen",
    "In mijn winkelwagen",
  ];
  const IT_TEXTS = [
    "Aggiungi al carrello",
    "Acquista",
    "Acquista ora",
    "Procedi all'ordine",
    "Paga",
    "Carrello",
  ];
  const PL_TEXTS = [
    "Dodaj do koszyka",
    "Kup teraz",
    "Zamów",
    "Do koszyka",
    "Zapłać",
  ];
  const RO_TEXTS = [
    "Adaugă în coș",
    "Adaugă în coş",
    "Cumpără",
    "Cumpără acum",
    "Comandă",
    "Finalizare comandă",
    "Coș de cumpărături",
    "Adauga in Cos",
  ];

  // ============================================================
  // 共享選擇器陣列（通用 DOM 與 data-* 屬性）
  // ============================================================
  const BASE_SELECTORS = [
    "button",
    "a",
    '[role="button"]',
    'input[type="submit"]',
    // class-based
    ".btn",
    '[class*="buy"]',
    '[class*="cart"]',
    '[class*="purchase"]',
    '[class*="add"]',
    '[class*="checkout"]',
    '[class*="shop"]',
    // 廣義 data-* 屬性匹配（各平台通用）
    '[data-log*="addCart"]',
    '[data-log*="fastBuy"]',
    '[data-testid*="add"]',
    '[data-testid*="buy"]',
    '[data-testid*="cart"]',
    '[data-testid*="checkout"]',
    '[data-testid*="purchase"]',
    '[data-track*="cart"]',
    '[data-track*="buy"]',
    '[data-bn*="add_cart"]',
    '[data-bn*="buy_now"]',
    '[data-click="addCart"]',
    '[data-click="fastBuy"]',
    // 更多 data-* 屬性
    '[data-qa*="add"]',
    '[data-qa*="buy"]',
    '[data-qa*="cart"]',
    '[data-qa*="checkout"]',
    '[data-automation*="add"]',
    '[data-automation*="buy"]',
    '[data-automation*="cart"]',
    '[data-automation-id*="add"]',
    '[data-automation-id*="atc"]',
    '[data-automation-id*="cart"]',
    '[data-test*="cart"]',
    '[data-test*="checkout"]',
    '[data-test*="buy"]',
    '[data-action*="add"]',
    '[data-action*="buy"]',
    '[data-action*="cart"]',
    '[data-name*="add"]',
    '[data-name*="buy"]',
    '[data-name*="cart"]',
    '[data-label*="add"]',
    '[data-label*="buy"]',
    '[data-label*="cart"]',
    '[data-button*="add"]',
    '[data-button*="buy"]',
    '[data-button*="cart"]',
    '[data-ga*="add"]',
    '[data-ga*="cart"]',
    // id-based 匹配（避免過度匹配容器）
    '[id*="add-to-cart"]',
    '[id*="buy-now"]',
    '[id*="addToCart"]',
    '[id*="checkout"]',
  ];

  // ============================================================
  // 方法三：網站專屬按鈕定義（精確控制各站的規則）
  // 啟用後會優先於通用規則
  // ============================================================

  const SITE_BUTTONS = {
    // ----- 台灣電商 -----
    "momoshop.com.tw": {
      texts: TW_TEXTS,
      selectors: ["#buy_yes a", "#inCar a", ".checkoutArea a"],
    },
    "ruten.com.tw": {
      texts: [...TW_TEXTS, "出價"],
      selectors: [
        "button",
        "a",
        '[class*="qa-add-cart"]',
        '[class*="item-shopping-cart-action"]',
        '[class*="buy"]',
      ],
    },
    "shopee.tw": {
      texts: TW_TEXTS,
      selectors: [
        "button",
        "a",
        ".btn-solid-primary button",
        '[class*="btn-tinted"]',
      ],
    },
    "24h.pchome.com.tw": {
      texts: TW_TEXTS,
      selectors: ["button", "a", '[id*="BuyBtn"]', '[class*="buyBtn"]'],
    },
    "books.com.tw": {
      texts: TW_TEXTS,
      selectors: [
        "button",
        '[class*="buy"]',
        '[class*="add"]',
        '[class*="cart"]',
      ],
    },
    "etmall.com.tw": {
      texts: TW_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "rakuten.com.tw": {
      texts: [...TW_TEXTS, ...JP_TEXTS],
      selectors: ["button", ...BASE_SELECTORS],
    },
    "shop.pxmart.com.tw": {
      texts: TW_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "nike.com.tw": {
      texts: TW_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "pxgo.com.tw": {
      texts: [...TW_TEXTS, "加入"],
      selectors: ["button", ...BASE_SELECTORS],
    },
    "tw.buy.yahoo.com": {
      texts: TW_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "tw.bid.yahoo.com": {
      texts: TW_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "carousell.com.tw": {
      texts: TW_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "shop.muji.tw": {
      texts: TW_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "uniqlo.com": {
      texts: [...TW_TEXTS, ...JP_TEXTS, ...EN_TEXTS],
      selectors: ["button", ...BASE_SELECTORS],
    },
    "coupang.tw": {
      texts: [...TW_TEXTS, ...KR_TEXTS],
      selectors: ["button", ...BASE_SELECTORS],
    },
    "world.taobao.com": {
      texts: [...TW_TEXTS, ...EN_TEXTS],
      selectors: ["button", ...BASE_SELECTORS],
    },
    "tw.carousell.com/": {
      texts: [...TW_TEXTS, ...EN_TEXTS],
      selectors: ["button", ...BASE_SELECTORS],
    },
    "shop.pxgo.com.tw": {
      texts: [...TW_TEXTS, ...EN_TEXTS],
      selectors: ["button", ...BASE_SELECTORS],
    },

    // ----- 美國電商 -----
    "walmart.com": {
      texts: EN_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "target.com": {
      texts: EN_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "bestbuy.com": {
      texts: EN_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "costco.com": {
      texts: EN_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "macys.com": {
      texts: EN_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "nordstrom.com": {
      texts: EN_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "newegg.com": {
      texts: EN_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "ebay.com": {
      texts: [...EN_TEXTS, "Buy It Now", "加入購物車"],
      selectors: ["button", ...BASE_SELECTORS],
    },
    "etsy.com": {
      texts: EN_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "mercari.com": {
      texts: EN_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "offerup.com": {
      texts: EN_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "craigslist.org": {
      texts: EN_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "temu.com": {
      texts: EN_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "shein.com": {
      texts: EN_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "shein.tw": {
      texts: [...TW_TEXTS, ...EN_TEXTS],
      selectors: ["button", ...BASE_SELECTORS],
    },
    "aliexpress.com": {
      texts: [...EN_TEXTS, ...TW_TEXTS],
      selectors: ["button", ...BASE_SELECTORS],
    },
    "shop.tiktok.com": {
      texts: EN_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "nike.com": {
      texts: EN_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "apple.com": {
      texts: EN_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "sephora.com": {
      texts: EN_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "chewy.com": {
      texts: EN_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "wayfair.com": {
      texts: EN_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },

    // ----- Amazon（特殊選擇器）-----
    "amazon.com": {
      texts: [
        ...EN_TEXTS,
        ...TW_TEXTS,
        ...JP_TEXTS,
        ...DE_TEXTS,
        ...FR_TEXTS,
        ...ES_TEXTS,
        ...IT_TEXTS,
        ...NL_TEXTS,
      ],
      selectors: [
        "#add-to-cart-button",
        "#buy-now-button",
        "input[name='submit.addToCart']",
        "input[name='submit.buyNow']",
        '[data-asin] input[type="submit"]',
      ],
    },
    "amazon.co.jp": {
      texts: [...JP_TEXTS, ...EN_TEXTS, ...TW_TEXTS],
      selectors: [
        "#add-to-cart-button",
        "#buy-now-button",
        "input[name='submit.addToCart']",
        "input[name='submit.buyNow']",
        '[data-asin] input[type="submit"]',
      ],
    },
    "amazon.de": {
      texts: [...DE_TEXTS, ...EN_TEXTS],
      selectors: [
        "#add-to-cart-button",
        "#buy-now-button",
        "input[name='submit.addToCart']",
        "input[name='submit.buyNow']",
        '[data-asin] input[type="submit"]',
        // Amazon DE sometimes uses different name attributes
        "input[name*='add-to-cart']",
        "input[name*='buy-now']",
        "a#add-to-cart-button",
      ],
    },
    "amazon.fr": {
      texts: [...FR_TEXTS, ...EN_TEXTS],
      selectors: [
        "#add-to-cart-button",
        "#buy-now-button",
        "input[name='submit.addToCart']",
        "input[name='submit.buyNow']",
        '[data-asin] input[type="submit"]',
        "input[name*='add-to-cart']",
        "input[name*='buy-now']",
        "a#add-to-cart-button",
      ],
    },
    "amazon.it": {
      texts: [...IT_TEXTS, ...EN_TEXTS],
      selectors: [
        "#add-to-cart-button",
        "#buy-now-button",
        "input[name='submit.addToCart']",
        "input[name='submit.buyNow']",
        '[data-asin] input[type="submit"]',
        "input[name*='add-to-cart']",
        "input[name*='buy-now']",
        "a#add-to-cart-button",
      ],
    },
    "amazon.es": {
      texts: [...ES_TEXTS, ...EN_TEXTS],
      selectors: [
        "#add-to-cart-button",
        "#buy-now-button",
        "input[name='submit.addToCart']",
        "input[name='submit.buyNow']",
        '[data-asin] input[type="submit"]',
        "input[name*='add-to-cart']",
        "input[name*='buy-now']",
        "a#add-to-cart-button",
      ],
    },
    "amazon.nl": {
      texts: [...NL_TEXTS, ...EN_TEXTS],
      selectors: [
        "#add-to-cart-button",
        "#buy-now-button",
        "input[name='submit.addToCart']",
        "input[name='submit.buyNow']",
        '[data-asin] input[type="submit"]',
        "input[name*='add-to-cart']",
        "input[name*='buy-now']",
        "a#add-to-cart-button",
      ],
    },

    // ----- eBay Europe -----
    "ebay.co.uk": {
      texts: [...EN_TEXTS, "Buy It Now"],
      selectors: ["button", ...BASE_SELECTORS],
    },
    "ebay.de": {
      texts: [...DE_TEXTS, "Jetzt kaufen", "Sofort kaufen"],
      selectors: ["button", ...BASE_SELECTORS],
    },
    "ebay.fr": {
      texts: [...FR_TEXTS, "Acheter", "Acheter maintenant"],
      selectors: ["button", ...BASE_SELECTORS],
    },

    // ----- 德國 / 歐洲 -----
    "otto.de": { texts: DE_TEXTS, selectors: ["button", ...BASE_SELECTORS] },
    "zalando.com": {
      texts: [...DE_TEXTS, ...EN_TEXTS],
      selectors: ["button", ...BASE_SELECTORS],
    },
    "zalando.de": { texts: DE_TEXTS, selectors: ["button", ...BASE_SELECTORS] },
    "mediamarkt.de": {
      texts: DE_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "saturn.de": { texts: DE_TEXTS, selectors: ["button", ...BASE_SELECTORS] },

    // ----- 法國 -----
    "cdiscount.com": {
      texts: FR_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "fnac.com": { texts: FR_TEXTS, selectors: ["button", ...BASE_SELECTORS] },
    "carrefour.fr": {
      texts: FR_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },

    // ----- 荷蘭 -----
    "bol.com": { texts: NL_TEXTS, selectors: ["button", ...BASE_SELECTORS] },
    "coolblue.nl": {
      texts: NL_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },

    // ----- 西班牙 -----
    "elcorteingles.es": {
      texts: ES_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "pccomponentes.com": {
      texts: ES_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },

    // ----- 波蘭 / 東歐 -----
    "allegro.pl": { texts: PL_TEXTS, selectors: ["button", ...BASE_SELECTORS] },
    "emag.ro": {
      texts: [...RO_TEXTS, ...PL_TEXTS, ...EN_TEXTS],
      selectors: ["button", ...BASE_SELECTORS],
    },

    // ----- 英國 -----
    "asos.com": { texts: EN_TEXTS, selectors: ["button", ...BASE_SELECTORS] },
    "argos.co.uk": {
      texts: EN_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "johnlewis.com": {
      texts: EN_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "currys.co.uk": {
      texts: EN_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },

    // ----- 日本 -----
    "rakuten.co.jp": {
      texts: JP_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "shopping.yahoo.co.jp": {
      texts: JP_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "yodobashi.com": {
      texts: JP_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "biccamera.com": {
      texts: JP_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "omni7.jp": { texts: JP_TEXTS, selectors: ["button", ...BASE_SELECTORS] },
    "aeon.com": { texts: JP_TEXTS, selectors: ["button", ...BASE_SELECTORS] },
    "zozo.jp": { texts: JP_TEXTS, selectors: ["button", ...BASE_SELECTORS] },
    "muji.com": { texts: JP_TEXTS, selectors: ["button", ...BASE_SELECTORS] },
    "nissen.co.jp": {
      texts: JP_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },
    "lohaco.yahoo.co.jp": {
      texts: JP_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
    },

    // ----- 韓國 -----
    "gmarket.co.kr": {
      texts: KR_TEXTS,
      selectors: ["button", ...BASE_SELECTORS],
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
    const alt = el.getAttribute("alt") || "";
    const title = el.getAttribute("title") || "";
    const val = el.getAttribute("value") || "";
    const ariaLabel = el.getAttribute("aria-label") || "";
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
    return texts.some((t) => combined.includes(t)) && combined.length <= 300;
  }

  function isVisible(el) {
    if (el.offsetParent !== null) return true;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  // 支援路徑型地區判斷（如 uniqlo.com/tw 與 uniqlo.com/jp 分別用不同語言）
  function getSiteConfig() {
    const host = window.location.hostname;
    const path = window.location.pathname;

    // 特殊路徑判斷（優先於 host 匹配）
    if (host === "www.uniqlo.com" || host === "uniqlo.com") {
      if (path.startsWith("/tw"))
        return { texts: TW_TEXTS, selectors: ["button", ...BASE_SELECTORS] };
      if (path.startsWith("/jp"))
        return { texts: JP_TEXTS, selectors: ["button", ...BASE_SELECTORS] };
      return {
        texts: [...TW_TEXTS, ...JP_TEXTS, ...EN_TEXTS],
        selectors: ["button", ...BASE_SELECTORS],
      };
    }

    // 優先檢查完整 host
    for (const [domain, config] of Object.entries(SITE_BUTTONS)) {
      if (host === domain) return config;
    }

    // 次級：host 包含 domain（處理子網域）
    for (const [domain, config] of Object.entries(SITE_BUTTONS)) {
      if (host.includes(domain) && domain !== "aeon.com") return config;
    }

    // 特殊：aeon.com 只配對 aeons 開頭，但 AEON 日本也是 aeon.com
    // zozo.jp 裸域名（不帶 www.）
    if (host === "zozo.jp") {
      return SITE_BUTTONS["zozo.jp"];
    }

    return null;
  }

  function findPurchaseButtons() {
    const siteConfig = getSiteConfig();

    console.log(
      "[購物衝動抑制器] host:",
      window.location.hostname,
      "config:",
      siteConfig,
    );

    const selectors = siteConfig ? siteConfig.selectors : BASE_SELECTORS;

    const texts = siteConfig ? siteConfig.texts : null;
    const results = [];
    const seen = new Set();

    for (const sel of selectors) {
      const elements = document.querySelectorAll(sel);
      for (const el of elements) {
        if (seen.has(el)) continue;
        seen.add(el);
        const purchase = isPurchaseButton(el, texts);
        const visible = isVisible(el);
        if (purchase && visible) {
          console.log(
            `[購物衝動抑制器] MATCH!`,
            el.tagName,
            el.id || el.className || "(no id)",
          );
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

  // SPA 安全網：前 60 秒每 2 秒重新掃描一次
  let periodicCount = 0;
  periodicScanTimer = setInterval(() => {
    periodicCount++;
    if (periodicCount > 30) {
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
