# Responsive Precision Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the existing Dogshit Duo Devices sales page visually precise and persuasive from 320px phones through 1920px desktops without changing its copy direction.

**Architecture:** Preserve the static HTML and CSS architecture. Add small semantic markup for an in-flow chapter directory and an illustrative desktop ledger anatomy, rebuild the two authored SVG rails inside their existing intrinsic ratio, replace the stretched pathway overlay with local connector lanes, and make component-specific responsive rules. Extend the existing Node source tests and Playwright browser contract so each visible council finding has a regression check.

**Tech Stack:** Semantic HTML, authored SVG, CSS, Node test runner, Playwright Chromium, static GitHub Pages hosting.

## Global Constraints

- Preserve the current buyer-belief sequence, copy direction, field-document visual language, and delayed name reveal.
- Add no personal information, contact details, testimonials, analytics, tracking, forms, external runtime references, or invented proof.
- Keep all links and asset references relative for GitHub Pages project-path hosting.
- Add no em dash characters to tracked text files.
- Keep cumulative layout shift at or below 0.05.
- Keep compact interactive targets at least 44px.
- Keep existing document-height ceilings unless a council-reviewed render justifies a measured replacement.
- Council-review each task at desktop, tablet, and phone widths before starting the next task.
- Before the first commit, configure and verify the repository-local identity as `Dogshit Duo Devices <dogshit-duo-devices@users.noreply.github.com>`. Verify the resulting author after every commit.

---

## File Map

- `index.html`: semantic chapter navigation, local pathway structure, and illustrative desktop ledger anatomy.
- `styles.css`: responsive tiers, rail alignment, typography caps, dense-content reflow, numbering, and component geometry.
- `script.js`: shared current-section behavior and keyboard focus scrolling for both chapter-navigation treatments.
- `assets/visuals/failure-plate.svg`: three equal visual stages aligned with the failure key.
- `assets/visuals/method-convergence.svg`: three equal visual stages aligned with the method captions.
- `tests/site.test.mjs`: static source contracts for counters, authored SVG structure, navigation, and public-site restrictions.
- `tests/browser.test.mjs`: viewport matrix and measured responsive geometry.

### Task 1: Responsive Foundations and Visible Correctness

**Files:**
- Modify: `tests/site.test.mjs`
- Modify: `tests/browser.test.mjs`
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `script.js`

**Interfaces:**
- Consumes: Existing `.field-index`, `.manifesto-lines`, `.engagement-rows`, `.operator-register`, `h1`, and `h2` components.
- Produces: Named `manifesto` counters, zeroed definition margins, component-driven responsive tiers, capped desktop display type, and `.chapter-directory` semantic navigation.

- [ ] **Step 1: Write failing source tests**

Add source assertions that require a named manifesto counter, `dd` margin reset, a second navigation labeled `Field document directory`, and explicit reads of the new spec and plan in the anonymity and no-em-dash tests. Replace legacy source assertions for `840px`, `841px`, and the `361px` to `389px` cover patch with the approved `1023px`, `1024px`, and compact-phone contracts.

```js
const responsiveDesign = await readFile(new URL(
  '../docs/superpowers/specs/2026-07-19-responsive-precision-design.md',
  import.meta.url), 'utf8');
const responsivePlan = await readFile(new URL(
  '../docs/superpowers/plans/2026-07-19-responsive-precision.md',
  import.meta.url), 'utf8');
```

```js
test('uses explicit counters and neutral definition margins', () => {
  assert.match(css, /\.manifesto-lines\s*\{[^}]*counter-reset:\s*manifesto/s);
  assert.match(css, /\.manifesto-lines li\s*\{[^}]*counter-increment:\s*manifesto/s);
  assert.match(css, /content:\s*counter\(manifesto, decimal-leading-zero\)/);
  assert.match(css, /\.engagement-rows dd\s*\{[^}]*margin:\s*0/s);
});

test('ships a non-fixed mobile chapter navigation', () => {
  const directory = html.match(
    /<nav class="chapter-directory" aria-label="Field document directory">([\s\S]*?)<\/nav>/,
  )?.[1] ?? '';
  const fixedIndex = html.match(
    /<nav class="field-index" aria-label="Field document sections">([\s\S]*?)<\/nav>/,
  )?.[1] ?? '';
  const targets = (source) => [...source.matchAll(/href="#([^"]+)"/g)]
    .map((match) => match[1]);
  assert.deepEqual(targets(directory), targets(fixedIndex));
});
```

- [ ] **Step 2: Run the source tests and verify the new assertions fail for the missing contracts**

Run: `npm test`

Expected: FAIL on the named manifesto counter, full `dd` margin reset, and mobile chapter navigation assertions.

- [ ] **Step 3: Write failing browser measurements**

Replace the viewport matrix with these exact entries and density ceilings: 320x568 at 11650px, 320x700 at 11650px, 359x640 at 11000px, 360x640 at 11000px, 360x800 at 10800px, 375x812 at 10700px, 390x844 at 10500px, 412x915 at 10350px, 430x932 at 10300px, 479x844 at 10100px, 480x900 at 10000px, 768x1024 at 9000px, 840x900 at 8400px, 841x900 at 8400px, 844x390 at 8400px, 1023x768 at 8200px, 1024x768 at 7800px, 1280x720 at 7600px, 1423x900 at 7600px, 1424x900 at 7600px, 1440x900 at 7600px, and 1920x1080 at 7800px. Collect computed manifesto labels, null-safe chapter-directory display, field-index geometry, content-rail geometry, exact layout-mode properties, and heading sizes. Add `.chapter-directory a` to the interactive-target collector and require both width and height to reach 44px.

```js
manifestoNumbers: [...document.querySelectorAll('.manifesto-lines li')]
  .map((element) => getComputedStyle(element, '::before').content.replaceAll('"', '')),
chapterDirectoryDisplay: document.querySelector('.chapter-directory')
  ? getComputedStyle(document.querySelector('.chapter-directory')).display
  : 'missing',
fieldIndex: rect('.field-index'),
contentRail: rect('.document-rail'),
layoutMode: {
  coverDisplay: getComputedStyle(document.querySelector('.document-cover')).display,
  pathwayColumnCount: getComputedStyle(document.querySelector('.pathway-groups'))
    .gridTemplateColumns.split(' ').filter(Boolean).length,
  engagementArticleDisplay: getComputedStyle(
    document.querySelector('.engagement-rows article')).display,
  engagementColumnCount: getComputedStyle(document.querySelector('.engagement-rows dl'))
    .gridTemplateColumns.split(' ').filter(Boolean).length,
  methodDisplay: getComputedStyle(document.querySelector('.method-ledger')).display,
  ledgerRowsDisplay: getComputedStyle(document.querySelector('.ledger-rows')).display,
  gutCheckDisplay: getComputedStyle(document.querySelector('.gut-check-questions')).display,
},
```

Assert `['01', '02', '03']`, require the chapter directory through 1423px, require the fixed field index from 1424px, keep the fixed index 8px outside the capped rail, and prevent `h2` from growing between 1440px and 1920px. The collected `layoutMode` stores only display keywords and integer column counts, never resolved pixel track widths. Deep-equal that normalized object at 840px and 841px and require tablet values: block cover, one pathway column, block engagement article, two engagement columns, block method, block ledger rows, and block gut-check list. At 1023px require those same tablet values. At 1024px require grid cover, three pathway columns, grid engagement article, four engagement columns, grid method, grid ledger rows, and the same block gut-check list. Require the directory track to scroll internally at narrow widths without increasing document width.

For 320x568, 320x700, 359x640, and 360x640, use this exact fold contract and intentionally omit `operatorRegister`:

```js
if (['320x568', '320x700', '359x640', '360x640'].includes(viewport.name)) {
  assert.ok(metrics.coverVisual.bottom <= viewport.height + 1,
    'the complete four-stage apparatus must fit inside the short-phone viewport');
  assert.ok(metrics.primaryAction.bottom <= viewport.height + 1,
    'the primary action must fit inside the short-phone viewport');
}
```

Add an interaction test that scrolls the directory track to its start, focuses the last link, and asserts the last link rectangle becomes fully contained by the track rectangle. Then focus the first link and assert the same containment. The implementation computes link and track `getBoundingClientRect()` deltas and scrolls only the track.

- [ ] **Step 4: Run browser tests and verify the new assertions fail for the existing numbering, navigation, and rail behavior**

Run: `npm run test:browser`

Expected: FAIL because manifesto values are `00`, the chapter directory is absent, the whole page flips at 841px, and the wide field index is viewport-anchored.

- [ ] **Step 5: Implement the minimal semantic and CSS foundation**

Add `.chapter-directory` after `</header>`, reuse the existing seven chapter targets, and label the track `FIELD INDEX / SWIPE`. Update `script.js` so both navigation treatments receive `aria-current`. Scroll only the directory track when its active or focused link leaves the horizontal viewport; never call `scrollIntoView` on the in-flow navigation. Use explicit named counters, reset `.engagement-rows dd` with `margin: 0`, show the fixed index only where it fits 8px outside the capped rail, and replace the 360px headline inversion with monotonic compact-phone sizing. Cap desktop section heading size when the 82rem rail is reached. Replace the global 840/841 media pair with separate component rule groups for tablet composition through 1023px and desktop composition from 1024px. Hide the chapter directory in print.

```html
<nav class="chapter-directory" aria-label="Field document directory">
  <span>FIELD INDEX / SWIPE</span>
  <div class="chapter-directory-track">
    <a href="#top" data-section="top" aria-current="true">00 / Cover</a>
    <a href="#failure-register" data-section="failure-register">01 / Failure</a>
    <a href="#pathway" data-section="pathway">02 / Pathway</a>
    <a href="#engagements" data-section="engagements">03 / Engagements</a>
    <a href="#operators" data-section="operators">04 / Method</a>
    <a href="#manifesto" data-section="manifesto">05 / Burn</a>
    <a href="#gut-check" data-section="gut-check">06 / Act</a>
  </div>
</nav>
```

```css
.manifesto-lines { counter-reset: manifesto; }
.manifesto-lines li { counter-increment: manifesto; }
.manifesto-lines li::before {
  content: counter(manifesto, decimal-leading-zero);
}

.engagement-rows dd { margin: 0; }

@media (min-width: 1424px) {
  .field-index {
    right: calc((100vw - var(--content)) / 2 - 3.25rem);
  }
  .chapter-directory { display: none; }
}

@media (max-width: 1423px) {
  .field-index { display: none; }
  .chapter-directory-track {
    display: flex;
    overflow-x: auto;
  }
  .chapter-directory a {
    flex: 0 0 auto;
    white-space: nowrap;
  }
}
```

```js
const sectionLinks = [...doc.querySelectorAll(
  '.field-index [data-section], .chapter-directory [data-section]',
)];
const sectionTargets = [...new Set(sectionLinks
  .map((link) => doc.getElementById(link.dataset.section))
  .filter(Boolean))];
const directoryTrack = doc.querySelector('.chapter-directory-track');

const revealDirectoryLink = (link) => {
  if (!directoryTrack || !link || !directoryTrack.contains(link)) return;
  const trackRect = directoryTrack.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  if (linkRect.left < trackRect.left) {
    directoryTrack.scrollBy({ left: linkRect.left - trackRect.left });
  } else if (linkRect.right > trackRect.right) {
    directoryTrack.scrollBy({ left: linkRect.right - trackRect.right });
  }
};

const setActiveSection = (id) => {
  root.dataset.activeSection = id;
  for (const link of sectionLinks) {
    const active = link.dataset.section === id;
    link.toggleAttribute('aria-current', active);
    if (active) revealDirectoryLink(link);
  }
};

directoryTrack?.addEventListener('focusin', (event) => {
  revealDirectoryLink(event.target.closest('[data-section]'));
});
```

- [ ] **Step 6: Run source and browser tests and verify Task 1 passes**

Run: `npm test && npm run test:browser`

Expected: all Task 1 contracts pass with no previous regression.

- [ ] **Step 7: Run the Task 1 council gate**

Capture 320x568, 320x700, 390x844, 768x1024, 840x900, 841x900, 1023x768, 1024x768, 1280x720, 1423x900, 1424x900, 1440x900, and 1920x1080 renders. Ask independent reviewers to inspect navigation, fold, typography, rail alignment, breakpoint continuity, and visible numbering. Resolve all Critical and Important findings, rerun both test commands, then commit.

Before committing, run:

```bash
git config --local user.name "Dogshit Duo Devices"
git config --local user.email "dogshit-duo-devices@users.noreply.github.com"
git config --local --get user.name
git config --local --get user.email
```

```bash
git add index.html styles.css script.js tests/site.test.mjs tests/browser.test.mjs docs/superpowers/specs/2026-07-19-responsive-precision-design.md docs/superpowers/plans/2026-07-19-responsive-precision.md
git commit -m "fix: establish responsive document rails"
git log -1 --format='%an <%ae>'
```

### Task 2: Diagram Geometry

**Files:**
- Modify: `tests/site.test.mjs`
- Modify: `tests/browser.test.mjs`
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `assets/visuals/failure-plate.svg`
- Modify: `assets/visuals/method-convergence.svg`

**Interfaces:**
- Consumes: Three-column failure key, six pathway cards, route-node geometry, and three-column method captions.
- Produces: Full-width equal-stage SVGs and pathway connectors attached to local node lanes inside reserved card gutters.

- [ ] **Step 1: Write failing static SVG and pathway tests**

Read both SVG files in `tests/site.test.mjs`. Require `preserveAspectRatio="none"`, retain `viewBox="0 0 640 240"`, and parse `data-stage` translations at the three caption centers. Require removal of the global `.pathway-line` SVG and require a local connector rule tied to `.pathway-zone-route li`.

```js
test('aligns authored diagrams to their live caption rails', () => {
  assert.match(failurePlateSvg, /preserveAspectRatio="none"/);
  assert.deepEqual([...failurePlateSvg.matchAll(
    /data-stage="([^"]+)" transform="translate\((\d+) 0\)"/g,
  )].map((match) => [match[1], Number(match[2])]), [
    ['decision-story', 106],
    ['stakeholder-pathway', 320],
    ['field-transfer', 534],
  ]);
  assert.match(methodSvg, /data-stage="clinical"/);
  assert.deepEqual([...methodSvg.matchAll(
    /data-stage="([^"]+)" transform="translate\((\d+) 0\)"/g,
  )].map((match) => [match[1], Number(match[2])]), [
    ['clinical', 106],
    ['engineering', 320],
    ['hand-back', 534],
  ]);
  assert.doesNotMatch(pathwaySource, /class="pathway-line"/);
  assert.match(css, /\.pathway-zone-route li::after/);
});
```

- [ ] **Step 2: Run source tests and verify the diagram contracts fail**

Run: `npm test`

Expected: FAIL because the existing SVGs do not declare equal responsive rails and the pathway still uses centered spines.

- [ ] **Step 3: Write failing browser geometry tests**

Keep SVG internal-stage validation in the static source test because external `<img>` contents are not queryable from the page DOM. In browser tests, collect each image element's rendered box, `naturalWidth`, `naturalHeight`, `objectFit`, `maxHeight`, caption/key rail boxes, method-caption sizes, route-node boxes, card copy rectangles, and computed local connector x positions at 1024px, 1280px, 1440px, and 1920px. Compute actual object-content width from intrinsic and rendered dimensions. Require `objectFit === 'fill'`, `maxHeight === 'none'`, actual content occupancy at least 98 percent, failure plot height from 128px through 160px, and method plot height from 96px through 128px. Require method captions to be at least 11.5px. Require `abs(connectorCenterX - nodeCenterX) <= 2px`, connector stroke edge no farther right than `minCopyLeft - 12px`, and `node.right <= minCopyLeft - 12px`.

- [ ] **Step 4: Run browser tests and verify they fail on the observed alignment defects**

Run: `npm run test:browser`

Expected: FAIL because the failure and method images are capped or letterboxed away from their label rails, and the global pathway overlay intersects copy.

- [ ] **Step 5: Rebuild the two SVG rails and reroute the pathway**

Keep both SVGs in their existing `0 0 640 240` coordinate system. Use three equal stage centers at x=106, x=320, and x=534. Put the final method diamond at x=534. Remove `.fault-family-visual img` width caps and `.method-apparatus img` containment and maximum-height rules. Give the failure plot `height: clamp(8rem, 13vw, 10rem)` and the method plot `height: clamp(6rem, 10vw, 8rem)`, both with `object-fit: fill` and `max-height: none`. Use 7rem and 6rem respectively below 480px. Set the base method caption size to `0.72rem`. Delete the stretched pathway overlay. Reserve 4.5rem at the start of every pathway card, draw local vertical segments with `li::after` from the corresponding node center, and style `.feedback-loop` as the separate return route below the card grid. Preserve all six semantic cards and both handoff alerts.

Use this three-stage failure plate structure:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 240" preserveAspectRatio="none" fill="none">
  <g data-stage="decision-story" transform="translate(106 0)">
    <rect x="-94" y="36" width="188" height="168" stroke="#111a1e" stroke-width="4"/>
    <path d="M-74 88H74M-74 152H74" stroke="#35666b" stroke-width="4"/>
    <path d="m-28 70 28 32m0-32-28 32" stroke="#e05235" stroke-width="7"/>
  </g>
  <g data-stage="stakeholder-pathway" transform="translate(320 0)">
    <rect x="-94" y="36" width="188" height="168" stroke="#111a1e" stroke-width="4"/>
    <path d="M-74 88H74M-74 152H74" stroke="#35666b" stroke-width="4"/>
    <path d="m-28 132 28 32m0-32-28 32" stroke="#e05235" stroke-width="7"/>
  </g>
  <g data-stage="field-transfer" transform="translate(534 0)">
    <rect x="-94" y="36" width="188" height="168" stroke="#111a1e" stroke-width="4"/>
    <path d="M-74 88H74M-74 152H74" stroke="#35666b" stroke-width="4"/>
    <path d="m-28 70 28 32m0-32-28 32" stroke="#e05235" stroke-width="7"/>
  </g>
</svg>
```

Use this three-stage method structure:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 240" preserveAspectRatio="none" fill="none">
  <g data-stage="clinical" transform="translate(106 0)" stroke="#35666b" stroke-width="6">
    <path d="M-94 72H94M-94 168H94"/>
  </g>
  <g data-stage="engineering" transform="translate(320 0)" fill="#f4f2ec" stroke="#111a1e" stroke-width="4">
    <rect x="-78" y="48" width="44" height="144"/>
    <rect x="-22" y="48" width="44" height="144"/>
    <rect x="34" y="48" width="44" height="144"/>
  </g>
  <g data-stage="hand-back" transform="translate(534 0)">
    <path d="M-94 72C-48 72-48 120-20 120" stroke="#35666b" stroke-width="6"/>
    <path d="M-94 168C-48 168-48 120-20 120" stroke="#111a1e" stroke-width="6"/>
    <path d="m20 82 38 38-38 38-38-38 38-38Z" fill="#e05235"/>
    <path d="M58 120H94" stroke="#111a1e" stroke-width="6"/>
  </g>
</svg>
```

The source test parses the `data-stage` group translations. The browser test verifies rendered image boxes against live labels and verifies local CSS connector lanes against real text rectangles.

```css
.fault-family-visual img {
  width: 100%;
  height: clamp(8rem, 13vw, 10rem);
  max-height: none;
  object-fit: fill;
}

.method-apparatus img {
  width: 100%;
  height: clamp(6rem, 10vw, 8rem);
  max-height: none;
  object-fit: fill;
}

@media (min-width: 1024px) {
  .pathway-zone-route li {
    padding-inline: 4.5rem 1.25rem;
  }
  .pathway-zone-route li::after {
    content: "";
    position: absolute;
    left: 2.02rem;
    top: 3.43rem;
    bottom: -3.25rem;
    border-left: 2px solid var(--teal);
  }
  .pathway-zone-route li:last-child::after { content: none; }
}
```

- [ ] **Step 6: Run source and browser tests and verify Task 2 passes**

Run: `npm test && npm run test:browser`

Expected: diagram and pathway assertions pass with no prior regression.

- [ ] **Step 7: Run the Task 2 council gate**

Capture the failure register, pathway, and operating-method sections at 320px, 390px, 768px, 1024px, 1440px, and 1920px. Ask independent reviewers to trace each graphic against its captions and copy. Resolve all Critical and Important findings, rerun both test commands, then commit.

```bash
git add index.html styles.css assets/visuals/failure-plate.svg assets/visuals/method-convergence.svg tests/site.test.mjs tests/browser.test.mjs
git commit -m "fix: align sales diagrams to their captions"
git log -1 --format='%an <%ae>'
```

### Task 3: Compact-Phone Density and Action Hierarchy

**Files:**
- Modify: `tests/browser.test.mjs`
- Modify: `styles.css`

**Interfaces:**
- Consumes: Existing engagement field classes, ledger primary and secondary rows, cover apparatus, chapter directory, copy control, and gut-check action.
- Produces: Readable phone captions, full-width primary engagement fields, stacked compact-phone ledger details, and one final-action rail.

- [ ] **Step 1: Write failing compact-phone browser tests**

At 320px, 359px, 360px, 375px, 390px, 412px, 430px, 479px, and 480px collect apparatus caption sizes, engagement primary/detail rectangles, ledger secondary grid columns, exact dense-body selector sizes, chapter-directory targets, copy-control width, and action width.

```js
coverCaptionSizes: [...document.querySelectorAll('.cover-apparatus figcaption span')]
  .map((element) => Number.parseFloat(getComputedStyle(element).fontSize)),
engagementPrimaryRects: [...document.querySelectorAll('.engagement-primary')]
  .map((element) => element.getBoundingClientRect().toJSON()),
ledgerSecondaryColumns: [...document.querySelectorAll('.ledger-secondary dl')]
  .map((element) => getComputedStyle(element).gridTemplateColumns),
```

Require cover captions at least 11.5px, every exact dense-body selector at least 14.5px through 479px, primary engagement rows at least 90 percent of their card rail, single-column secondary ledger rows through 359px, and final controls aligned within 2px. Preserve the existing short-phone assertion for the complete apparatus and primary action, but remove the requirement that the full operator register fit inside 700px.

- [ ] **Step 2: Run browser tests and verify they fail on the current microtype and two-column density**

Run: `npm run test:browser`

Expected: FAIL on caption size, compact-phone field width, ledger columns, dense text size, and final-control alignment.

- [ ] **Step 3: Implement component-specific compact-phone reflow**

Increase the cover apparatus plot and caption band while keeping the complete apparatus and primary action inside the tested short-phone fold. Allow the operator register to continue below that fold. Use full-width primary engagement fields below 480px, retain a readable secondary grid where space allows, stack secondary ledger rows below 360px, raise dense text sizes, and give `.copy-gut-check` and `.gut-check-action` the same width contract.

```css
@media (max-width: 479px) {
  .cover-apparatus { min-height: 6.25rem; }
  .cover-apparatus figcaption { font-size: 0.72rem; }
  .engagement-rows dl { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .engagement-primary { grid-column: 1 / -1; }
  .engagement-rows dd,
  .ledger-row dd,
  .pathway-zone-route li > p:not(.route-label, .route-alert),
  .operator-register dd { font-size: 0.91rem; }
  .copy-gut-check,
  .gut-check-action { width: 100%; }
}

@media (max-width: 359px) {
  .engagement-rows dl,
  .ledger-secondary dl { grid-template-columns: 1fr; }
}
```

- [ ] **Step 4: Run source and browser tests and verify Task 3 passes**

Run: `npm test && npm run test:browser`

Expected: compact-phone density and fold contracts pass with no previous regression.

- [ ] **Step 5: Run the Task 3 council gate**

Capture full phone journeys at 320x568, 320x700, 359x640, 360x640, 360x800, 375x812, 390x844, 412x915, 430x932, 479x844, 480x900, and 844x390. Ask independent reviewers to inspect fold value, wrapping, density, chapter orientation, touch targets, and final action hierarchy. Resolve all Critical and Important findings, rerun both test commands, then commit.

```bash
git add styles.css tests/browser.test.mjs
git commit -m "fix: sharpen the compact phone sales journey"
git log -1 --format='%an <%ae>'
```

### Task 4: Desktop Composition and Final Device Matrix

**Files:**
- Modify: `tests/site.test.mjs`
- Modify: `tests/browser.test.mjs`
- Modify: `index.html`
- Modify: `styles.css`

**Interfaces:**
- Consumes: Current hero context, illustrative decision-ledger concepts, preflight strip, five gut-check questions, and all responsive contracts from Tasks 1 through 3.
- Produces: Balanced desktop ledger anatomy, a linear gut-check sequence, neutral preflight markers, and final release evidence.

- [ ] **Step 1: Write failing desktop composition tests**

Require the hero ledger anatomy to be labeled `ILLUSTRATIVE`, contain no client or outcome claims or links, remain hidden through 1439px and whenever height is below 800px, appear at 1440x900 and 1920x1080, and fit inside the initial desktop cover. Require all preflight markers to use a neutral background. Require all five gut-check question tops to increase strictly and all five left and right rails to align within 2px.

- [ ] **Step 2: Run source and browser tests and verify the composition contracts fail**

Run: `npm test && npm run test:browser`

Expected: FAIL because the ledger anatomy does not exist, preflight `05` has a false active state, and the desktop gut-check uses a two-column zigzag.

- [ ] **Step 3: Implement the minimal desktop composition correction**

Add a compact hero ledger anatomy labeled as illustrative and reuse only `Decision`, `Owner`, `Evidence`, and `Smallest next move`. Show it from 1440px upward when the viewport is at least 800px tall, inside the existing right cover column after the lede. Remove the false selected state from `05`. Keep the gut-check as five vertical rows at every width.

```html
<aside class="hero-ledger-anatomy" aria-label="Illustrative decision-ledger anatomy">
  <p>ILLUSTRATIVE HAND-BACK / DECISION LEDGER ANATOMY</p>
  <ol role="list">
    <li><span>Decision</span><strong>What changes now?</strong></li>
    <li><span>Owner</span><strong>Who carries the move?</strong></li>
    <li><span>Evidence</span><strong>What makes it defensible?</strong></li>
    <li><span>Smallest next move</span><strong>What happens next?</strong></li>
  </ol>
</aside>
```

```css
.hero-ledger-anatomy { display: none; }
.preflight-mark span:last-child { background: transparent; color: var(--teal); }

@media (min-width: 1440px) and (min-height: 800px) {
  .hero-ledger-anatomy { display: block; }
}

.gut-check-questions { display: block; }
```

- [ ] **Step 4: Run the complete automated verification suite**

Run: `npm test && npm run test:browser`

Expected: all source and browser tests pass with zero failures and no console errors across the full viewport matrix.

- [ ] **Step 5: Run the final adversarial council**

Capture section-level and full-page renders at every exact viewport in the approved matrix: 320x568, 320x700, 359x640, 360x640, 360x800, 375x812, 390x844, 412x915, 430x932, 479x844, 480x900, 768x1024, 840x900, 841x900, 844x390, 1023x768, 1024x768, 1280x720, 1423x900, 1424x900, 1440x900, and 1920x1080. Have independent mobile, tablet, desktop, typography, and sales-story reviewers rank findings as Critical, Important, or Minor. Resolve every Critical and Important finding and rerun the complete suite.

- [ ] **Step 6: Run final repository checks and commit**

Run:

```bash
git diff --check
git status --short
git diff --stat origin/main...HEAD
git log -1 --format='%an <%ae>'
```

Expected: no whitespace errors, only intentional project files changed, the experiment remains isolated from `main`, and commit identity is `Dogshit Duo Devices <dogshit-duo-devices@users.noreply.github.com>`.

```bash
git add index.html styles.css tests/site.test.mjs tests/browser.test.mjs
git commit -m "feat: finish the responsive sales document"
git log -1 --format='%an <%ae>'
git push origin experiment/visual-sales-journey
```
