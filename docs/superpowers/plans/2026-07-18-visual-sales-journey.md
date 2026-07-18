# Visual Sales Journey Experiment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a phone-first experimental branch that preserves the published Dogshit Duo Devices brand and copy while using purposeful technical illustrations to tell a stronger sales story.

**Architecture:** Reorder the existing semantic sections into a seven-stage buyer belief journey, then add three small local SVG assets plus five HTML and CSS visual artifacts. Keep substantive language in HTML, preserve no-JavaScript meaning, and extend the existing Node and Playwright contracts before each production change.

**Tech Stack:** Static HTML, CSS, browser-native JavaScript, authored SVG, Node.js test runner, Playwright, Git, GitHub branch preview

## Global Constraints

- Work only on `experiment/visual-sales-journey`; do not change or merge `main`.
- Design the 390-pixel phone composition first, then expand it for desktop.
- Keep the exact primary headline, paired lenses, closing contrast, approved palette, fonts, square geometry, and dry voice.
- State `The commercial pathway is broken.` without weakening qualifiers.
- Preserve all five failure-register ideas and group them into three engagement-aligned families.
- Use no more than eight authored visual moments and no more than 60 KiB of new SVG source.
- Use no stock media, generated photorealism, external runtime assets, fake data, client proof, personal information, forms, analytics, or tracking.
- Keep every substantive word in semantic HTML and every complex visual backed by an adjacent text equivalent.
- Keep zero em dash characters in tracked text.
- Preserve current document-height ceilings, 44-pixel controls, reduced-motion behavior, no-JavaScript usefulness, and zero horizontal overflow.
- Commit as `Dogshit Duo Devices <dogshit-duo-devices@users.noreply.github.com>`.

---

### Task 1: Encode and Implement the Sales Story Order

**Files:**
- Modify: `tests/site.test.mjs`
- Modify: `index.html`

**Interfaces:**
- Consumes: Existing section ids and copy in `index.html`
- Produces: Ordered sections `failure-register → pathway → engagements → operators → name-reveal → manifesto → gut-check`

- [ ] **Step 1: Replace the old order contract with the buyer-belief contract**

Replace the current `orders recognition and hireable uses before pathway theory`
test with the following tests. Also remove the existing
`assert.match(html, /See ways to use the duo/);` assertion from
`contains the council-approved positioning and useful actions` because the
secondary action is deliberately leaving the cover.

```js
test('orders the page as a buyer belief journey', () => {
  const positions = ['failure-register', 'pathway', 'engagements', 'operators',
    'name-reveal', 'manifesto', 'gut-check']
    .map((name) => html.indexOf(`id="${name}"`));

  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
  assert.match(html, /The commercial pathway is broken\./);
  assert.doesNotMatch(html, />See ways to use the duo</);
  assert.match(html, /<details open>/);
});

test('maps five failure signals to three engagement families', () => {
  assert.equal((html.match(/data-failure-family="decision-story"/g) ?? []).length, 1);
  assert.equal((html.match(/data-failure-family="stakeholder-pathway"/g) ?? []).length, 2);
  assert.equal((html.match(/data-failure-family="field-transfer"/g) ?? []).length, 2);
  for (const family of ['Decision story', 'Stakeholder pathway', 'Field transfer']) {
    assert.match(html, new RegExp(`<strong>${family}<\\/strong>`));
  }
});
```

- [ ] **Step 2: Run the source suite and confirm the expected failure**

Run:

```bash
npm test
```

Expected: the new order test fails because engagements still precede the
pathway, the name reveal is still second, the declarative reframe is absent,
and no failure-family attributes exist.

- [ ] **Step 3: Reorder existing sections without rewriting their core copy**

Use this section order in `<main>`:

```html
<section id="failure-register">...</section>
<section id="pathway">...</section>
<section id="engagements">...</section>
<section id="operators">...</section>
<section id="name-reveal">...</section>
<section id="manifesto">...</section>
<section id="gut-check">...</section>
```

Move the existing blocks intact. Remove the secondary cover action whose text
is `See ways to use the duo`. Keep the primary action unchanged.

Add this line beneath the failure-register introduction:

```html
<p class="diagnostic-reframe">The commercial pathway is broken.</p>
```

Add these attributes to the five existing `<details>` elements in source order:

```html
<details data-failure-family="decision-story" open>
<details data-failure-family="stakeholder-pathway">
<details data-failure-family="stakeholder-pathway">
<details data-failure-family="field-transfer">
<details data-failure-family="field-transfer">
```

Add this semantic family key before the disclosure rows:

```html
<ul class="fault-family-key" role="list">
  <li><strong>Decision story</strong><span>Does the story create a decision?</span></li>
  <li><strong>Stakeholder pathway</strong><span>Can decisions and handoffs survive without rescue?</span></li>
  <li><strong>Field transfer</strong><span>Can the motion become repeatable use?</span></li>
</ul>
```

- [ ] **Step 4: Update the fixed document index to match the story**

Keep the existing link markup and use this order and labeling:

```html
<a href="#top" data-section="top"><span>00</span><span>Brief</span></a>
<a href="#failure-register" data-section="failure-register"><span>01</span><span>Breaks</span></a>
<a href="#pathway" data-section="pathway"><span>02</span><span>Pathway</span></a>
<a href="#engagements" data-section="engagements"><span>03</span><span>Use</span></a>
<a href="#operators" data-section="operators"><span>04</span><span>Method</span></a>
<a href="#manifesto" data-section="manifesto"><span>05</span><span>Burn</span></a>
<a href="#gut-check" data-section="gut-check"><span>06</span><span>Act</span></a>
```

- [ ] **Step 5: Run the source suite and commit the sales sequence**

Run:

```bash
npm test
```

Expected: 34 or more tests pass with zero failures.

Commit:

```bash
git add index.html tests/site.test.mjs
git -c user.name="Dogshit Duo Devices" -c user.email="dogshit-duo-devices@users.noreply.github.com" commit -m "feat: reorder the visual sales story"
```

---

### Task 2: Add the Authored Apparatus Assets

**Files:**
- Create: `assets/visuals/cover-apparatus.svg`
- Create: `assets/visuals/failure-plate.svg`
- Create: `assets/visuals/method-convergence.svg`
- Modify: `tests/site.test.mjs`
- Modify: `index.html`

**Interfaces:**
- Consumes: Existing palette values and adjacent semantic copy
- Produces: Three local, script-free, text-free SVG illustrations with `viewBox="0 0 640 240"`

- [ ] **Step 1: Add the failing authored-asset contract**

Add:

```js
test('ships small local text-free apparatus illustrations', async () => {
  const assets = [
    '../assets/visuals/cover-apparatus.svg',
    '../assets/visuals/failure-plate.svg',
    '../assets/visuals/method-convergence.svg',
  ];
  let totalBytes = 0;

  for (const path of assets) {
    const source = await readFile(new URL(path, import.meta.url), 'utf8');
    const bytes = Buffer.byteLength(source);
    totalBytes += bytes;
    assert.ok(bytes < 12_288, `${path} exceeds the 12 KiB asset budget`);
    assert.match(source, /viewBox="0 0 640 240"/);
    assert.doesNotMatch(source, /<text\b|<script\b|https?:|data:/i);
  }

  assert.ok(totalBytes < 61_440, 'authored SVG total exceeds 60 KiB');
});
```

- [ ] **Step 2: Run the source suite and confirm missing-file failure**

Run `npm test`.

Expected: FAIL because `assets/visuals/cover-apparatus.svg` does not exist.

- [ ] **Step 3: Create `cover-apparatus.svg`**

Create a 640 by 240 illustration with this semantic geometry and no live text:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 240" fill="none">
  <g stroke="#93a4aa" stroke-width="2"><path d="M24 48H616M24 192H616"/><path d="M80 24V216M320 24V216M560 24V216" stroke-dasharray="6 8"/></g>
  <g stroke="#111a1e" stroke-width="5">
    <path d="M36 134H150V92H238V134H350V86H444V134H604"/>
    <rect x="112" y="72" width="76" height="96"/><rect x="282" y="66" width="76" height="108"/><rect x="452" y="72" width="76" height="96"/>
  </g>
  <path d="M42 112H598" stroke="#35666b" stroke-width="5"/>
  <path d="M365 52l30 30-30 30-30-30 30-30Z" stroke="#e05235" stroke-width="6"/>
  <circle cx="604" cy="134" r="12" fill="#e05235"/>
</svg>
```

- [ ] **Step 4: Create `failure-plate.svg`**

Create five fault modules inside three family bays:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 240" fill="none">
  <g stroke="#111a1e" stroke-width="4"><rect x="24" y="36" width="176" height="168"/><rect x="220" y="36" width="188" height="168"/><rect x="428" y="36" width="188" height="168"/></g>
  <g stroke="#35666b" stroke-width="4"><path d="M52 88H172M248 88H380M456 88H588"/><path d="M52 152H172M248 152H380M456 152H588"/></g>
  <g stroke="#e05235" stroke-width="7"><path d="m96 70 32 36m0-36-32 36M276 132l32 36m0-36-32 36M334 70l32 36m0-36-32 36M476 70l32 36m0-36-32 36M534 132l32 36m0-36-32 36"/></g>
</svg>
```

- [ ] **Step 5: Create `method-convergence.svg`**

Create two passes, five inspection gates, and one hand-back terminal:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 240" fill="none">
  <path d="M28 72H430C476 72 468 120 516 120H610" stroke="#35666b" stroke-width="6"/>
  <path d="M28 168H430C476 168 468 120 516 120" stroke="#111a1e" stroke-width="6"/>
  <g fill="#f4f2ec" stroke="#111a1e" stroke-width="4"><rect x="82" y="48" width="52" height="144"/><rect x="164" y="48" width="52" height="144"/><rect x="246" y="48" width="52" height="144"/><rect x="328" y="48" width="52" height="144"/><rect x="410" y="48" width="52" height="144"/></g>
  <path d="m566 82 38 38-38 38-38-38 38-38Z" fill="#e05235"/>
</svg>
```

- [ ] **Step 6: Reference the assets with adjacent live labels**

Insert this cover visual between `.scope-line` and `.cover-actions`:

```html
<figure class="cover-apparatus" data-visual-signature="cover-apparatus" data-mobile-dominant>
  <img src="./assets/visuals/cover-apparatus.svg" alt="" width="640" height="240">
  <figcaption><span>STALL SIGNAL</span><span>PATHWAY INSPECTION</span><span>OWNER + MOVE</span></figcaption>
</figure>
```

Wrap `.fault-family-key` and `failure-plate.svg` in this valid semantic
container so the image is not inserted as a non-list child of the `<ul>`:

```html
<div class="fault-family-visual" data-visual-signature="failure-plate">
  <img src="./assets/visuals/failure-plate.svg" alt="" width="640" height="240">
  <ul class="fault-family-key" role="list">...</ul>
</div>
```

Place `method-convergence.svg` inside `#procedure` with live labels for both
lenses and the hand-back. Set both images to intrinsic width 640 and height 240.

- [ ] **Step 7: Run source tests and commit the authored assets**

Run `npm test` and expect zero failures.

Commit:

```bash
git add assets/visuals index.html tests/site.test.mjs
git -c user.name="Dogshit Duo Devices" -c user.email="dogshit-duo-devices@users.noreply.github.com" commit -m "feat: add the commercialization apparatus"
```

---

### Task 3: Build the Signature Decision Environment and Supporting Visuals

**Files:**
- Modify: `tests/site.test.mjs`
- Modify: `index.html`
- Modify: `styles.css`

**Interfaces:**
- Consumes: Sales order from Task 1 and SVG assets from Task 2
- Produces: Eight elements marked with `data-visual-signature` and three decision zones marked with `data-pathway-zone`

- [ ] **Step 1: Add failing structure and visual-system contracts**

Add:

```js
test('ships the signature stakeholder decision environment', () => {
  assert.match(html, /class="pathway-environment"/);
  assert.equal((html.match(/data-pathway-zone=/g) ?? []).length, 3);
  for (const zone of ['Adoption', 'Resource and approval', 'Operationalization']) {
    assert.match(html, new RegExp(`<strong>${zone}<\\/strong>`));
  }
  assert.match(html, /ILLUSTRATIVE WORKING MODEL/);
  assert.match(html, /class="feedback-loop"/);
  assert.equal((html.match(/class="route-node"/g) ?? []).length, 6);
  assert.equal((html.match(/HANDOFF FAILURE/g) ?? []).length, 2);
});

test('gives every sales chapter an intentional visual signature', () => {
  const signatures = html.match(/data-visual-signature="[^"]+"/g) ?? [];
  assert.equal(new Set(signatures).size, 8);
  for (const name of ['cover-apparatus', 'failure-plate', 'decision-environment',
    'engagement-selector', 'method-convergence', 'ledger-anatomy', 'ddd-plate',
    'preflight-mark']) {
    assert.match(html, new RegExp(`data-visual-signature="${name}"`));
  }
});

test('makes accountability gaps explicit in the ledger', () => {
  assert.equal((html.match(/class="ledger-row ledger-primary"/g) ?? []).length, 1);
  assert.equal((html.match(/class="ledger-row ledger-secondary"/g) ?? []).length, 2);
  assert.match(html, /UNSET STATES EXPOSE THE GAP/);
});
```

Add this exact CSS presence contract:

```js
test('ships phone-first apparatus styles for every visual chapter', () => {
  for (const selector of ['.cover-apparatus', '.fault-family-visual',
    '.fault-family-key', '.pathway-environment', '.engagement-selector',
    '.method-apparatus', '.ledger-primary', '.ddd-serial-plate',
    '.preflight-mark']) {
    assert.match(css, new RegExp(`\\${selector}\\b`));
  }
  assert.match(css, /@media\s*\(min-width:\s*841px\)/);
  assert.match(css, /@media\s*\(max-width:\s*840px\)/);
});
```

- [ ] **Step 2: Run `npm test` and confirm the new structures are missing**

Expected: FAIL at `ships the signature stakeholder decision environment`.

- [ ] **Step 3: Rebuild the pathway as three labeled zones**

Wrap the existing route in:

```html
<div class="pathway-environment" data-visual-signature="decision-environment" data-mobile-dominant>
  <p class="working-model-label">ILLUSTRATIVE WORKING MODEL / ROLES AND ORDER VARY</p>
  <div class="pathway-zone-labels" aria-hidden="true">
    <span data-pathway-zone="adoption"><strong>Adoption</strong></span>
    <span data-pathway-zone="approval"><strong>Resource and approval</strong></span>
    <span data-pathway-zone="operationalization"><strong>Operationalization</strong></span>
  </div>
  <!-- existing pathway SVG, six route nodes, and two alerts -->
  <p class="feedback-loop">Field learning returns to story, evidence, implementation, and repeatability.</p>
</div>
```

Assign route nodes 01 and 02 to adoption, 03 and 04 to approval, and 05 and 06
to operationalization using `data-node-zone` attributes. Redraw the desktop SVG
with three vertical zone spines, two cross-zone gates, and one dashed feedback
route. Keep the six decision and break statements in live HTML.

- [ ] **Step 4: Add the engagement, method, ledger, personality, and preflight artifacts**

Add this selector before `.engagement-rows`:

```html
<ul class="engagement-selector" role="list" data-visual-signature="engagement-selector">
  <li><span>Conflicting handoff diagnoses</span><strong>Pathway Autopsy</strong></li>
  <li><span>Explanation without a decision</span><strong>Pitch Decontamination</strong></li>
  <li><span>Motion depends on a hero</span><strong>Field Transfer</strong></li>
</ul>
```

Wrap the convergence image and both lens labels in
`<figure class="method-apparatus" data-visual-signature="method-convergence" data-mobile-dominant>`.

Change ledger row classes to one `ledger-row ledger-primary` and two
`ledger-row ledger-secondary`. Add:

```html
<p class="ledger-gap-note">UNSET STATES EXPOSE THE GAP. THEY ARE NOT COMPLETED ACCOUNTABILITY.</p>
```

Mark the ledger container with `data-visual-signature="ledger-anatomy"` and
`data-mobile-dominant`.

Inside the relocated name reveal, add:

```html
<p class="ddd-serial-plate" data-visual-signature="ddd-plate">DDD / COMMERCIAL PATHWAY PRACTICE / 002</p>
```

Before the gut-check list, add:

```html
<div class="preflight-mark" data-visual-signature="preflight-mark" aria-hidden="true">
  <span>01</span><span>02</span><span>03</span><span>04</span><span>05</span>
</div>
```

Add the interpretation line after the list:

```html
<p class="gut-check-interpretation">Conflicting answers across functions are a pathway problem. Match the live break to the engagement built for it.</p>
```

- [ ] **Step 5: Implement the phone-first visual CSS**

Use these base contracts outside media queries:

```css
.cover-apparatus,
.method-apparatus {
  margin: var(--space-4) 0;
}

.cover-apparatus img,
.method-apparatus img {
  display: block;
  width: 100%;
  height: auto;
}

.cover-apparatus figcaption {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-2);
  font-family: var(--mono);
  font-size: 0.68rem;
  font-weight: 750;
  letter-spacing: 0.06em;
}

.fault-family-key,
.engagement-selector {
  display: grid;
  grid-template-columns: 1fr;
  margin: var(--space-5) 0;
  padding: 0;
  list-style: none;
  border-top: 2px solid var(--carbon);
}

.pathway-zone-labels,
.pathway-route {
  display: grid;
  grid-template-columns: 1fr;
}

.ledger-secondary dl {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.ddd-serial-plate,
.ledger-gap-note {
  border: 2px solid var(--orange);
  font-family: var(--mono);
  font-weight: 750;
  letter-spacing: 0.06em;
}
```

At `min-width: 841px`, expand the fault key and selector to three columns,
expand the decision environment to three zones, and place route-node pairs in
the same zone column. Keep the existing desktop page grid and maximum width.

At `max-width: 840px`, simplify the route SVG out of view and connect the six
nodes with one CSS spine. Keep all eight `data-visual-signature` elements
visible. The four `data-mobile-dominant` elements receive at least 84 pixels of
rendered height; the remaining marks receive at least 36 pixels.

- [ ] **Step 6: Run source tests and commit the visual system**

Run `npm test` and expect zero failures.

Commit:

```bash
git add index.html styles.css tests/site.test.mjs
git -c user.name="Dogshit Duo Devices" -c user.email="dogshit-duo-devices@users.noreply.github.com" commit -m "feat: build the visual commercial pathway"
```

---

### Task 4: Prove the Phone-First Composition in Real Browsers

**Files:**
- Modify: `tests/browser.test.mjs`
- Modify: `styles.css`
- Modify: `index.html`

**Interfaces:**
- Consumes: Eight `data-visual-signature` elements and four `data-mobile-dominant` elements
- Produces: Browser metrics for visual visibility, first-phone-viewport composition, zone order, label readability, and unchanged page ceilings

- [ ] **Step 1: Add visual metrics to each viewport contract**

Inside the browser-side metrics object add:

```js
coverVisual: rect('[data-visual-signature="cover-apparatus"]'),
visualSignatures: [...document.querySelectorAll('[data-visual-signature]')]
  .map((element) => ({
    name: element.dataset.visualSignature,
    display: getComputedStyle(element).display,
    height: element.getBoundingClientRect().height,
    width: element.getBoundingClientRect().width,
  })),
mobileDominant: [...document.querySelectorAll('[data-mobile-dominant]')]
  .map((element) => ({
    name: element.dataset.visualSignature,
    height: element.getBoundingClientRect().height,
  })),
zoneLefts: [...document.querySelectorAll('[data-node-zone]')]
  .map((element) => element.getBoundingClientRect().left),
zoneTops: [...document.querySelectorAll('[data-node-zone]')]
  .map((element) => element.getBoundingClientRect().top),
```

Add common assertions:

```js
assert.equal(metrics.visualSignatures.length, 8);
assert.ok(metrics.visualSignatures.every((visual) =>
  visual.display !== 'none' && visual.height >= 35), 'every sales chapter keeps a visual signature');
```

For widths at or below 840 add:

```js
assert.ok(metrics.coverVisual.top < viewport.height);
assert.ok(metrics.coverVisual.bottom <= metrics.primaryAction.top + 1,
  'the phone cover apparatus must lead directly into the primary action');
assert.ok(metrics.mobileDominant.every((visual) => visual.height >= 83.5));
assert.ok(metrics.zoneTops.every((top, index, values) =>
  index === 0 || top > values[index - 1]), 'phone nodes follow semantic order');
```

For desktop replace the old three-across route assertion with:

```js
assert.ok(Math.abs(metrics.zoneLefts[0] - metrics.zoneLefts[1]) < 2);
assert.ok(Math.abs(metrics.zoneLefts[2] - metrics.zoneLefts[3]) < 2);
assert.ok(Math.abs(metrics.zoneLefts[4] - metrics.zoneLefts[5]) < 2);
assert.ok(metrics.zoneLefts[0] < metrics.zoneLefts[2] &&
  metrics.zoneLefts[2] < metrics.zoneLefts[4]);
```

- [ ] **Step 2: Run the browser suite and confirm mobile-first failures**

Run:

```bash
npm run test:browser
```

Expected: FAIL until cover order, compact marks, zone placement, and dominant
visual sizes meet the new phone-first contracts.

- [ ] **Step 3: Correct phone cover and section density**

Adjust only responsive spacing and visual sizing. Keep the first phone viewport
in this order:

```text
eyebrow
headline
scope line
diagnostic apparatus
primary action
operator register
```

Compress the relocated name reveal, engagement attribute rows, and secondary
ledger examples enough to keep the existing document-height ceilings. Do not
raise those ceilings to make the test pass.

- [ ] **Step 4: Run the complete local gate and commit responsive behavior**

Run:

```bash
npm test
npm run test:browser
git diff --check
```

Expected: source suite and all six browser scenarios pass with zero console
errors and unchanged page-height ceilings.

Commit:

```bash
git add index.html styles.css tests/browser.test.mjs
git -c user.name="Dogshit Duo Devices" -c user.email="dogshit-duo-devices@users.noreply.github.com" commit -m "feat: make the visual journey phone first"
```

---

### Task 5: Make Social Sharing Lead with the Buying Problem

**Files:**
- Modify: `assets/og.html`
- Modify: `assets/og.png`
- Modify: `index.html`
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes: Primary sales reframe and pathway visual grammar
- Produces: A 1,200 by 630 social card that establishes the medtech problem before the profane name can read as a prank

- [ ] **Step 1: Add the failing social-memory contract**

Replace the social-card visible-text assertion with:

```js
assert.equal(visibleText, 'DOGSHIT DUO DEVICES INSPECT THE PATHWAY. NOT JUST THE FUNNEL. Serious operators. Unfortunate name.');
```

Add:

```js
assert.match(html, /<meta property="og:description" content="When a medtech sale stalls, inspect the pathway, not just the funnel\.">/);
```

- [ ] **Step 2: Run `npm test` and confirm the old social card fails**

Expected: FAIL because the current card leads with the lens statement.

- [ ] **Step 3: Rebuild the social card source**

Keep the current border rail, fonts, palette, and closing line. Replace the hero
body with:

```html
<div class="hero">
  <p class="brand">DOGSHIT DUO DEVICES</p>
  <h1>INSPECT THE PATHWAY.<br><span>NOT JUST THE FUNNEL.</span></h1>
</div>
<p class="closing">Serious operators. Unfortunate name.</p>
```

Use `--orange` for the second headline line and add a small three-zone pathway
diagram made from CSS borders behind or beside the headline without obscuring
text.

Update the page metadata description to the exact headline sentence.

- [ ] **Step 4: Render and verify the social image**

Run:

```bash
npm run render:og
npm test
```

Expected: 34 or more source tests pass and `assets/og.png` remains exactly
1,200 by 630.

- [ ] **Step 5: Commit the social-memory asset**

```bash
git add assets/og.html assets/og.png index.html tests/site.test.mjs
git -c user.name="Dogshit Duo Devices" -c user.email="dogshit-duo-devices@users.noreply.github.com" commit -m "feat: make the pathway the social memory asset"
```

---

### Task 6: Visual Review, Five-Seat Council, and Branch Publication

**Files:**
- Verify: `index.html`
- Verify: `styles.css`
- Verify: `assets/visuals/*.svg`
- Verify: `assets/og.png`
- Verify: `tests/site.test.mjs`
- Verify: `tests/browser.test.mjs`

**Interfaces:**
- Consumes: Completed experimental branch
- Produces: A reviewed remote branch and local browser preview without changing `main`

- [ ] **Step 1: Run the complete verification gate**

Run:

```bash
npm test
npm run test:browser
git diff --check
git status --short
```

Expected: all source and browser tests pass, patch checks are clean, and the
working tree is clean.

- [ ] **Step 2: Inspect the actual site at four viewports**

Review the cover, failure plate, decision environment, engagement selector,
method, ledger, relocated name reveal, controlled burn, and gut-check at:

```text
1280 by 720
320 by 700
390 by 844
430 by 932
```

Reject any version where phone art feels like a shrunken desktop diagram,
visual labels are too small, the primary action leaves the first viewport, or
illustrations lengthen the page instead of replacing prose density.

- [ ] **Step 3: Dispatch the five-seat adversarial council**

Ask independent reviewers for evidence-backed P0, P1, and P2 findings only:

```text
editorial art and information design
medtech buyer journey and consulting credibility
enterprise sales narrative and complex-deal logic
positioning, messaging, and brand memory
accessibility, phone behavior, and performance
```

Verify every finding against source and browser evidence. Implement valid
findings test first. Do not implement preference-only feedback.

- [ ] **Step 4: Push only the experiment branch**

Run:

```bash
git push -u origin experiment/visual-sales-journey
```

Expected: the remote experiment branch exists and `main` is unchanged.

- [ ] **Step 5: Hand back the local preview**

Start the existing static preview server, navigate the in-app browser to the
local branch build, and give the owner the remote branch URL. Do not change
GitHub Pages configuration and do not merge or force-push `main`.
