# Adversarial Oomph Implementation Plan

> Execute continuously. Apply test-first changes, verify each task, and preserve the repository’s public-data boundary.

**Goal:** Implement every technically valid adversarial-council recommendation that strengthens the Dogshit Duo Devices page while preserving its serious field-document guise.

**Architecture:** Keep the production site as static `index.html`, `styles.css`, and a small `script.js`. Add relative self-hosted font assets, one inline decorative route SVG, semantic section navigation, and a clearly labeled illustrative artifact. Extend the Node source-contract suite and add an opt-in Playwright browser suite plus CI coverage; no production package or third-party runtime requests are introduced.

**Tech stack:** Semantic HTML, modern CSS, browser-native ES modules, Node test runner, Playwright for development/CI browser QA, GitHub Pages.

---

## Task 1: Encode the approved contract before implementation

**Files:**

- Modify: `tests/site.test.mjs`
- Create: `tests/browser.test.mjs`

1. Add source tests for canonical lens naming, the safer cover claim, the continuous route SVG and annotations, forwardable engagement fields, visible failure translations, the illustrative decision ledger, the medtech manifesto line, the enhanced-only clipboard control, contrast-safe method counters, local font declarations/assets, path-only favicon, section index, and removed dead CSS.
2. Add browser tests for 1280×720, 320×700, 390×844, and 430×932.
3. Add browser checks for horizontal overflow, cover composition, 44px controls, route geometry, no-JavaScript clipboard behavior, reduced motion, and browser console errors.
4. Run the suites and confirm the new assertions fail for the missing behavior.

## Task 2: Lock typography and resilience

**Files:**

- Create: `assets/fonts/*`
- Modify: `assets/favicon.svg`
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `script.js`

1. Add officially sourced, permissively licensed font files and the license text.
2. Define local `@font-face` rules with `font-display: swap`, appropriate weight ranges, and conservative fallbacks.
3. Rebalance H1/H2/H3 hierarchy around the shipped faces.
4. Replace live favicon text with path geometry.
5. Remove ineffective ARIA labeling.
6. Hide the copy enhancement by default and reveal it after listener attachment.
7. Make method counters and footer text contrast/readability safe.
8. Remove unused table and shared-range CSS.
9. Run the source suite and relevant browser checks.

## Task 3: Build the signature pathway and live progress spine

**Files:**

- Modify: `index.html`
- Modify: `styles.css`
- Modify: `script.js`
- Modify: `tests/site.test.mjs`
- Modify: `tests/browser.test.mjs`

1. Keep route items 01–06 in semantic DOM order.
2. Add a desktop orthogonal SVG connector, directional markers, numbered node treatment, and two useful handoff-failure annotations.
3. Add the narrow-screen vertical spine and directional treatment.
4. Add a semantic large-screen section index and edge progress variable.
5. Replace the old four-stage observer with active-section state that clears correctly.
6. Verify route order, visibility, overflow, reduced motion, and no-JavaScript behavior.

## Task 4: Make the content buyable, funny, and demonstrably useful

**Files:**

- Modify: `index.html`
- Modify: `styles.css`
- Modify: `tests/site.test.mjs`

1. Change the cover claim to “When a medtech sale stalls, inspect the pathway—not just the funnel.”
2. Canonicalize the two operator lenses as Clinical reality and Engineering discipline, with the commercial system as their shared output.
3. Expand all three engagements with Use when, Working format, Who joins, and Hand-back.
4. Put all five scar-tissue translations in the visible summary and add a pressure-test prompt inside each disclosure.
5. Add the clearly labeled illustrative decision ledger.
6. Add one medtech-specific controlled-burn line and finish with “Serious operators. Unfortunate name.”
7. Keep all language public-safe, generic, and free of implied proof.
8. Run the source suite.

## Task 5: Compress and differentiate the page rhythm

**Files:**

- Modify: `styles.css`
- Modify: `tests/browser.test.mjs`

1. Reduce global desktop and mobile section padding and section-heading gaps.
2. Give failure rows, engagement cards, the route, operating method, artifact, manifesto, and gut-check distinct density patterns.
3. Compress the mobile route without sacrificing readable decision/break signals.
4. Add disclosure hover/focus/open states that are visible without excessive motion.
5. Run all responsive browser sizes and record document/section-height deltas against the council baseline.

## Task 6: Add durable browser regression coverage

**Files:**

- Modify: `package.json`
- Create: `package-lock.json`
- Create: `.github/workflows/visual-regression.yml`
- Modify: `README.md`
- Modify: `tests/browser.test.mjs`

1. Add Playwright as a development-only dependency and a `test:browser` script.
2. Make the browser suite start and stop the local static server itself.
3. Add a GitHub Actions workflow that installs Chromium and runs both source and browser suites.
4. Document the local source and browser commands and keep the production runtime dependency-free.
5. Run both suites locally.

## Task 7: Adversarial browser review, correction, and release

**Files:**

- Modify only files implicated by verified findings.

1. Inspect the local page in real desktop and narrow browser viewports.
2. Record cover geometry, document height, key section heights, route geometry, target sizes, overflow, no-JavaScript behavior, and console output.
3. Send the completed result through visual-brand, buyer/comedy, and mobile/accessibility review.
4. Verify each finding against the rendered page and implement technically valid issues test-first.
5. Run `npm test`, `npm run test:browser`, inspect `git diff --check`, and confirm repository status.
6. Commit with the anonymous repository identity, push the existing `main` remote, and confirm the GitHub Pages URL serves the new revision over HTTPS.
