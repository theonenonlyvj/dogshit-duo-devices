# Dogshit Duo Devices Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a distinctive, public-safe, single-page medical-device commercialization site whose institutional presentation gradually becomes a controlled teardown of empty strategy language.

**Architecture:** The site is dependency-light static HTML, CSS, and JavaScript served directly by GitHub Pages from the repository root. Semantic HTML contains the full narrative and disclosure content; CSS owns the document-grid brand system and responsive behavior; JavaScript adds only scroll-state and copy-to-clipboard enhancements without hiding essential content.

**Tech Stack:** HTML5, CSS custom properties and responsive rules, browser-native ES modules, Node.js built-in test runner, Git, and GitHub Pages over HTTPS.

## Global Constraints

- Keep every durable file and git operation inside this repository.
- Treat the repository and site as public. Include no personal names, emails, phone numbers, locations, employer/client identifiers, photos, private source material, testimonials, fabricated metrics, medical claims, or confidential details.
- Use no server-side runtime, database, analytics, cookies, forms, authentication, external application data, or heavy frontend framework.
- Use relative asset and navigation URLs compatible with the repository Pages path.
- Identify the medical-device domain, two-operator model, offered work, and a useful next action in the first viewport.
- Target empty strategy and ambiguous ownership, never clinicians, customers, salespeople, regulated work, or specific organizations.
- Avoid gradient blobs, glass cards, pill clouds, icon triptychs, fake logos, stock device renders, animated counters, and generic agency copy.
- Maintain WCAG AA contrast, one `h1`, logical headings, a skip link, visible focus, underlined inline links, 44×44px targets, and reduced-motion behavior.
- Keep essential content understandable without JavaScript.
- Use `Dogshit Duo Devices <dogshit-duo-devices@users.noreply.github.com>` for every commit.

---

## File Map

- `AGENTS.md` — project-local public/privacy, publishing, and verification rules.
- `README.md` — public project description, preview, testing, and publishing notes.
- `package.json` — dependency-free test and preview scripts.
- `index.html` — complete semantic site narrative and metadata.
- `styles.css` — tokens, layouts, components, responsive rules, focus, and reduced motion.
- `script.js` — progressive scroll-state and clipboard enhancements.
- `scripts/serve.mjs` — minimal local static server using Node core modules.
- `tests/site.test.mjs` — source-contract, accessibility, privacy, asset, and enhancement tests.
- `assets/favicon.svg` — compact typographic DDD browser icon.
- `assets/og.html` — HTML/CSS source for the social card.
- `assets/og.png` — rendered 1200×630 social card.
- `404.html` — repository-path-safe recovery page.
- `.nojekyll` — disables unintended Jekyll processing.

### Task 1: Public-safe semantic foundation

**Files:**
- Create: `AGENTS.md`
- Create: `package.json`
- Create: `tests/site.test.mjs`
- Create: `index.html`

**Interfaces:**
- Consumes: `docs/superpowers/specs/2026-07-18-dogshit-duo-devices-design.md`.
- Produces: ids `top`, `pathway`, `failure-register`, `operators`, `procedure`, `engagements`, `manifesto`, and `gut-check`.

- [ ] **Step 1: Add repository-local rules**

Create `AGENTS.md` with the public-only boundary, a ban on personal/confidential data and tracking, GitHub Pages project-path compatibility, required `npm test`, the repository-local anonymous identity, and a prohibition on any unapproved remote or host.

- [ ] **Step 2: Add the failing semantic contract**

Create `package.json`:

~~~json
{
  "name": "dogshit-duo-devices",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "node --test tests/*.test.mjs",
    "start": "node scripts/serve.mjs"
  }
}
~~~

Create `tests/site.test.mjs`:

~~~js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('ships the complete semantic page contract', () => {
  assert.match(html, /<html lang="en">/);
  assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1);
  for (const id of ['top', 'pathway', 'failure-register', 'operators',
    'procedure', 'engagements', 'manifesto', 'gut-check']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(html, /class="skip-link"/);
  assert.match(html, /<details/);
  assert.match(html, /aria-live="polite"/);
});

test('contains the approved positioning and useful action', () => {
  assert.match(html, /Meet customers where they are\./);
  assert.match(html, /Dogshit Duo Devices/);
  assert.match(html, /Clinical lens/);
  assert.match(html, /Engineering lens/);
  assert.match(html, /Put the pathway on the table/);
  assert.match(html, /Commercial gut-check/);
});

test('does not ship placeholders or personal contact channels', () => {
  for (const forbidden of [/@[a-z0-9.-]+\.[a-z]{2,}/i,
    /\+?\d[\d\s().-]{8,}\d/, /lorem ipsum/i, /example\.com/i,
    /href="mailto:/i, /href="tel:/i]) {
    assert.doesNotMatch(html, forbidden);
  }
});
~~~

- [ ] **Step 3: Verify the tests fail**

Run: `npm test`

Expected: FAIL because `index.html` does not exist.

- [ ] **Step 4: Implement `index.html`**

Create one semantic document with:

- metadata and relative references to `styles.css`, `script.js`, `assets/favicon.svg`, and `assets/og.png`;
- a skip link and a `DDD / COMMERCIALIZATION PRACTICE` document rail;
- the exact hero: `Meet customers where they are. Then build a sales pathway for the world they actually occupy.`;
- the full-name reveal: `DDD stands for Dogshit Duo Devices. The name is a joke. The work isn't.`;
- a six-role buying pathway for user, champion, buyer, approver, procurement/implementation, and field learning;
- five native `details` failure rows pairing formal diagnostics with operator translations;
- clinical and engineering lens sections without biographies;
- a five-row `INPUT / ACTION / OUTPUT` procedure;
- `Pathway Autopsy`, `Pitch Decontamination`, and `Field Transfer` engagement rows;
- the controlled-burn manifesto and `Serious operators. Unfortunate name.`;
- the five-question commercial gut-check, a `.copy-gut-check` button, and an `aria-live="polite"` `.copy-status`;
- the full commercial-advisory limitation and warning not to send PHI or confidential material.

Every section uses the ids in **Interfaces**. Use no external links, placeholder contact route, ellipsis placeholder, or invented proof.

- [ ] **Step 5: Verify and commit Task 1**

Run: `npm test && git diff --check`

Expected: all tests PASS and no whitespace errors.

Commit:

~~~bash
git add AGENTS.md package.json tests/site.test.mjs index.html
git commit -m "feat: add public-safe site narrative"
~~~

### Task 2: Controlled-burn visual system

**Files:**
- Modify: `tests/site.test.mjs`
- Create: `styles.css`

**Interfaces:**
- Consumes: the section ids and classes in `index.html`.
- Produces: `--paper`, `--carbon`, `--steel`, `--teal`, `--orange`, `--umber`, `[data-active-stage]`, and `.is-visible`.

- [ ] **Step 1: Add failing CSS contract tests**

Append:

~~~js
const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

test('implements the approved palette and motion contract', () => {
  for (const value of ['#f4f2ec', '#111a1e', '#93a4aa',
    '#35666b', '#e05235', '#3b2a24']) {
    assert.match(css.toLowerCase(), new RegExp(value));
  }
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /min-height:\s*44px/);
});

test('contains responsive rules without template effects', () => {
  assert.match(css, /@media\s*\(max-width:\s*840px\)/);
  for (const forbidden of [/backdrop-filter/i, /cursor:\s*none/i,
    /scroll-snap-type/i]) {
    assert.doesNotMatch(css, forbidden);
  }
});
~~~

- [ ] **Step 2: Verify the tests fail**

Run: `npm test`

Expected: FAIL because `styles.css` does not exist.

- [ ] **Step 3: Implement `styles.css`**

Define these exact tokens:

~~~css
:root {
  --paper: #f4f2ec;
  --carbon: #111a1e;
  --steel: #93a4aa;
  --teal: #35666b;
  --orange: #e05235;
  --umber: #3b2a24;
  --gutter: clamp(1rem, 4vw, 3.5rem);
  --content: 82rem;
  color-scheme: light;
}
~~~

Implement the approved 12-column cover sheet, large condensed typography, thin rules, document codes, operator register, CSS sales route, six pathway stops, full-width diagnostic disclosures, two-lens split, procedural ledger, engagement rows, inverse manifesto, gut-check, and restrained footer.

Use square corners, no shadows, no gradients, no image backgrounds, and no rounded card grid. All links/buttons/summaries receive `min-height: 44px`; `:focus-visible` receives a 3px orange outline. At `max-width: 840px`, collapse grids and tables into labeled stacked records with no horizontal scrolling. In `prefers-reduced-motion: reduce`, disable smooth scrolling, animations, and transitions.

- [ ] **Step 4: Verify and commit Task 2**

Run: `npm test && git diff --check`

Expected: all tests PASS.

Commit:

~~~bash
git add tests/site.test.mjs styles.css
git commit -m "feat: add controlled-burn visual system"
~~~

### Task 3: Progressive enhancement and preview

**Files:**
- Modify: `tests/site.test.mjs`
- Create: `script.js`
- Create: `scripts/serve.mjs`

**Interfaces:**
- Consumes: `[data-stage]`, `.reveal`, `.copy-gut-check`, and `.copy-status`.
- Produces: `stageForRatio(ratio)` returning `brief`, `buyers`, `evidence`, or `execution`; local preview at `http://127.0.0.1:4173/`.

- [ ] **Step 1: Add failing enhancement tests**

Append:

~~~js
test('maps ratios to pathway stages', async () => {
  const { stageForRatio } = await import('../script.js');
  assert.equal(stageForRatio(0), 'brief');
  assert.equal(stageForRatio(0.3), 'buyers');
  assert.equal(stageForRatio(0.6), 'evidence');
  assert.equal(stageForRatio(0.9), 'execution');
});

test('keeps enhancement code small and progressive', async () => {
  const script = await readFile(new URL('../script.js', import.meta.url), 'utf8');
  assert.ok(Buffer.byteLength(script) < 10_240);
  assert.match(script, /IntersectionObserver/);
  assert.match(script, /navigator\.clipboard/);
  assert.match(script, /document/);
});
~~~

- [ ] **Step 2: Verify the tests fail**

Run: `npm test`

Expected: FAIL because `script.js` does not exist.

- [ ] **Step 3: Implement `script.js`**

Begin with:

~~~js
export function stageForRatio(ratio) {
  if (ratio < 0.25) return 'brief';
  if (ratio < 0.5) return 'buyers';
  if (ratio < 0.75) return 'evidence';
  return 'execution';
}

const doc = globalThis.document;
~~~

When `doc` exists, use `IntersectionObserver` to set
`documentElement.dataset.activeStage` from visible `[data-stage]` sections and
to add `.is-visible` to `.reveal` without hiding its text. On `.copy-gut-check`
activation, write the five questions to `navigator.clipboard` and report success
in `.copy-status`. On failure report:
`Copy unavailable — select the checklist below.`

- [ ] **Step 4: Implement `scripts/serve.mjs`**

Use `node:http`, `node:fs`, and `node:path`. Bind only to `127.0.0.1`, use port
`4173`, serve the repository root, map `/` to `index.html`, reject path traversal,
and return correct MIME types for HTML, CSS, JavaScript, SVG, and PNG.

- [ ] **Step 5: Verify and commit Task 3**

Run: `npm test`

Expected: all tests PASS.

Run `npm start`, request `/` and `/styles.css`, and confirm HTTP 200.

Commit:

~~~bash
git add tests/site.test.mjs script.js scripts/serve.mjs
git commit -m "feat: add progressive site interactions"
~~~

### Task 4: Public assets, documentation, QA, and publication

**Files:**
- Modify: `tests/site.test.mjs`
- Create: `README.md`
- Create: `assets/favicon.svg`
- Create: `assets/og.html`
- Create: `assets/og.png`
- Create: `404.html`
- Create: `.nojekyll`

**Interfaces:**
- Consumes: the final hero and visual tokens.
- Produces: a complete GitHub Pages source tree and public HTTPS site.

- [ ] **Step 1: Add failing release tests**

Append tests that:

- check every local `href` and `src` target exists;
- verify `assets/og.png` has a PNG signature and 1200×630 dimensions;
- verify `404.html` links to `./`;
- verify `.nojekyll` exists;
- verify `README.md` contains `npm test`, `npm start`, and the public-data boundary.

- [ ] **Step 2: Verify the tests fail**

Run: `npm test`

Expected: FAIL with missing release files.

- [ ] **Step 3: Create the release files**

Create a square typographic DDD favicon using carbon, paper, and orange. Create
`assets/og.html` as a 1200×630 presentation of the finished hero with exactly:

- `DOGSHIT DUO DEVICES`
- `Clinical truth. Engineering discipline. Commercial motion.`
- `Serious operators. Unfortunate name.`

Render it once to `assets/og.png`; inspect it for exact text, cropping, and
contrast. Create `404.html` with `This pathway does not exist.` and a relative
`./` return link. Create empty `.nojekyll`. Create `README.md` describing the
satirical-but-serious premise, anonymous public boundary, `npm start`,
`npm test`, and GitHub Pages publication.

- [ ] **Step 4: Run automated and visual verification**

Run:

~~~bash
npm test
git diff --check
git status --short
~~~

Expected: all tests PASS and no whitespace errors.

Preview desktop and mobile widths. Verify hero hierarchy, grid alignment,
overflow, disclosure operation with keyboard/touch, focus visibility,
pathway-state updates, clipboard feedback, and reduced motion. Fix defects and
rerun `npm test`.

- [ ] **Step 5: Commit the release**

~~~bash
git add .nojekyll README.md 404.html assets tests/site.test.mjs
git commit -m "docs: prepare public GitHub Pages release"
~~~

- [ ] **Step 6: Run the completion gate**

Run:

~~~bash
npm test
git diff --check
git status --short --branch
git log --format='%h %an <%ae> %s'
~~~

Expected: tests PASS, the tree is clean, and every commit uses the anonymous
repository identity.

- [ ] **Step 7: Publish over HTTPS**

Create public repository `dogshit-duo-devices` under the authenticated GitHub
account without initializing remote files. Add only its HTTPS URL as `origin`,
push `main`, and enable GitHub Pages from the repository root on `main`. Perform
all git operations from this project folder.

- [ ] **Step 8: Verify the public result**

Check public visibility, the repository file list, Pages build status, and the
final HTTPS site. Confirm the hero, stylesheet, JavaScript, favicon, social
image, and 404 route load beneath the repository project path. Report both URLs.
