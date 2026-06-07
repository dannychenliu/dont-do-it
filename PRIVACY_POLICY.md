# Privacy Policy — Wallet Guardian

**Last updated: 2026-06-06**

---

## 1. Overview

Wallet Guardian ("the Extension") is a Chrome browser extension designed to help users become more mindful of online shopping impulses. When the Extension detects a purchase-related button on a supported e-commerce website, it displays a humorous cat GIF overlay as a gentle nudge — encouraging the user to pause before completing a purchase.

This Privacy Policy explains what the Extension does and does not do with respect to user data.

---

## 2. Data Collection

**Wallet Guardian does not collect, store, transmit, or share any personal data whatsoever.**

Specifically, the Extension:

- Does **not** collect your name, email address, location, or any other personally identifiable information.
- Does **not** track which websites you visit, which products you view, or which buttons you click.
- Does **not** record your browsing history or shopping behavior.
- Does **not** use cookies, fingerprinting, or any other tracking mechanism.
- Does **not** transmit any data to any external server, third party, or the developer.
- Does **not** connect to the internet or make any network requests.

---

## 3. How the Extension Works

The Extension operates entirely within your browser, locally, with no communication to any external service. Here is a precise technical description of its behavior:

### 3.1 Content Script Execution

A single JavaScript content script (`content_script.js`) is injected by the browser into pages belonging to the supported e-commerce domains listed in the Extension's manifest. This script runs in an isolated environment within your browser tab.

### 3.2 Button Detection

The content script scans the current page's DOM (Document Object Model) in real time to identify elements that resemble purchase-related buttons (e.g., "Add to Cart", "Buy Now", "加入購物車"). Detection is performed using:

- Site-specific CSS selectors and keyword lists (covering 100+ domains across 12 languages).
- Generic CSS selectors as a fallback.
- Broad keyword matching against button text, labels, and attributes.

This detection runs **locally in your browser only**. No page content, URL, product information, or button text is ever sent anywhere.

### 3.3 GIF Overlay Display

When a purchase button is detected and the user hovers over it, the Extension displays a cat GIF from a locally bundled set of 28 image files (stored inside the Extension package itself). The GIF is rendered as an absolutely-positioned overlay on the page and disappears automatically when the user moves the cursor away.

No external image is fetched. No remote resource is loaded. All GIF files are included within the Extension at installation time.

### 3.4 MutationObserver and Periodic Scan

To support single-page applications (SPAs) where page content changes dynamically, the Extension uses a `MutationObserver` to detect DOM changes and periodically re-scans the page for new purchase buttons. This functionality is entirely local and produces no network traffic.

---

## 4. Permissions

The Extension requests the following permissions, each explained below:

| Permission | Purpose |
|---|---|
| **Host permissions** (specific e-commerce domains) | Required to allow the content script to run on those pages. The Extension only activates on the listed shopping websites. |
| **`web_accessible_resources`** (GIF files) | Required to allow the content script to reference the locally bundled GIF files and display them as overlays on web pages. |

The Extension does **not** request permissions to read browsing history, access cookies, make network requests, or access any user account data.

---

## 5. Third-Party Services

Wallet Guardian does not integrate with, communicate with, or rely upon any third-party service, analytics platform, advertising network, or remote API. There are no third-party SDKs or tracking libraries included in the Extension.

---

## 6. Data Retention

Because no data is collected, there is nothing to retain or delete. All processing occurs transiently within your browser's memory and ceases when you close the relevant tab or disable the Extension.

---

## 7. Children's Privacy

Wallet Guardian does not collect data from any users, including children under the age of 13. The Extension is fully compliant with the Children's Online Privacy Protection Act (COPPA) and equivalent regulations, as no personal information is collected under any circumstances.

---

## 8. Changes to This Policy

If the Extension is updated in a way that materially changes its data practices, this Privacy Policy will be updated accordingly, and the "Last updated" date at the top of this document will be revised.

Because the Extension currently collects no data, any future update that introduces data collection would constitute a material change and would be disclosed prominently.

---

## 9. Contact

If you have any questions or concerns about this Privacy Policy, you may contact the developer at:

**Email:** whasssup0202@gmail.com

---

## 10. Summary

| What we collect | Nothing |
|---|---|
| What we share | Nothing |
| Network requests made | None |
| External servers contacted | None |
| Cookies or tracking | None |
| Your browsing data | Never accessed or recorded |

Wallet Guardian is a purely local, privacy-respecting tool. Your data stays on your device — because none of it ever leaves.
