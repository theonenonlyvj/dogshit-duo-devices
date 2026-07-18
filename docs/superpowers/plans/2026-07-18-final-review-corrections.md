# Final Review Corrections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct the final mobile boundary rule, closing action sequence, failure-family mapping, compact selector symptom, and add browser-side CLS protection.

**Architecture:** Keep the static page structure and current responsive system. Strengthen source contracts around semantic DOM order and family membership, then extend the existing Playwright viewport loop with three intermediate boundaries and a pre-navigation layout-shift observer. Apply only the HTML and CSS changes required by those failing contracts.

**Tech Stack:** Semantic HTML, CSS media queries, Node.js test runner, Playwright Chromium.

## Global Constraints

- Use strict RED/GREEN test-first implementation.
- Preserve every existing document-height and pathway-height ceiling.
- Keep apparatus, primary action, and full operator register inside 700px at 361 through 389px.
- Assert CLS is no greater than 0.05 at every tested viewport.
- Keep tracked text free of em dash characters.
- Commit with `Dogshit Duo Devices <dogshit-duo-devices@users.noreply.github.com>`.
- Do not push.

---

### Task 1: Add failing source contracts

**Files:**
- Modify: `tests/site.test.mjs`
- Test: `tests/site.test.mjs`

**Interfaces:**
- Consumes: `sectionSource(id)` and the shipped HTML/CSS strings.
- Produces: exact family membership, selector copy, closing DOM order, and continuous media-query contracts.

- [x] **Step 1: Write the failing family and selector assertions**

Assert exact membership as:

```js
{
  'Decision story': ['Commercial story'],
  'Stakeholder pathway': ['Leadership', 'Team build'],
  'Field transfer': ['Sales motion', 'Launch readiness'],
}
```

Assert the compact Field Transfer symptom is exactly `Motion depends on a hero`.

- [x] **Step 2: Write the failing closing-order assertion**

Slice the gut-check section and assert that `.copy-gut-check` precedes
`.gut-check-interpretation`, which precedes `.gut-check-action`.

- [x] **Step 3: Write the failing responsive-rule assertion**

Require `@media (min-width: 361px) and (max-width: 389px)` and reject an
exact-width 361px exception.

- [x] **Step 4: Run the source suite and capture RED**

Run: `npm test`

Expected: failures for family membership, selector copy, closing order, and
continuous boundary rule while unrelated contracts remain green.

### Task 2: Add failing browser boundary and CLS contracts

**Files:**
- Modify: `tests/browser.test.mjs`
- Test: `tests/browser.test.mjs`

**Interfaces:**
- Consumes: the existing viewport loop and layout metrics.
- Produces: 362x700, 375x700, and 389x700 cases plus `metrics.cls` from a real browser observer.

- [x] **Step 1: Add the intermediate boundary viewports**

Add 362x700, 375x700, and 389x700 with the existing 11400 document-height
ceiling and all current assertions.

- [x] **Step 2: Install a layout-shift observer before navigation**

Use `page.addInitScript()` before `page.goto()` to create a buffered
`PerformanceObserver` for `layout-shift`, sum only entries without recent
input, and expose the score on `globalThis`.

- [x] **Step 3: Assert the observer and CLS ceiling**

After fonts settle, read the score into `metrics.cls`, assert the observer is
supported, and assert `metrics.cls <= 0.05` for every viewport.

- [x] **Step 4: Extend the 700px containment branch**

Apply apparatus, primary-action, and operator-register containment checks to
every 700px viewport through 389px.

- [x] **Step 5: Run the browser suite and capture RED**

Run: `npm run test:browser`

Expected: the new intermediate widths fail the operator-register containment
contract before CSS changes. CLS measurement must produce a finite numeric
score rather than a synthetic constant.

### Task 3: Apply the minimal HTML and CSS corrections

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Test: `tests/site.test.mjs`
- Test: `tests/browser.test.mjs`

**Interfaces:**
- Consumes: all RED contracts from Tasks 1 and 2.
- Produces: corrected semantic grouping, closing sequence, selector copy, and continuous 361 through 389px cover fit.

- [x] **Step 1: Reorder existing failure disclosures**

Move the unchanged Leadership and Team build disclosures under Stakeholder
pathway, and the unchanged Sales motion and Launch readiness disclosures under
Field transfer. Preserve one/two/two counts and core disclosure copy.

- [x] **Step 2: Restore the compact selector symptom**

Replace the Field Transfer selector symptom with exactly
`Motion depends on a hero`.

- [x] **Step 3: Restore closing DOM sequence**

Move the interpretation paragraph outside `details`, then place the copy
button before it and the engagement link after it. Keep status and fallback
elements associated with the copy control.

- [x] **Step 4: Replace the exact-width media rule**

Change the 361px-only query to a continuous 361 through 389px query while
keeping the compact register declarations.

- [x] **Step 5: Run GREEN verification**

Run `npm test`, then `npm run test:browser`, then `git diff --check`. Preserve
all current ceilings and record the maximum observed CLS and exact boundary
geometry.

### Task 4: Report and commit

**Files:**
- Modify: `.superpowers/sdd/final-council-fix-report.md` (ignored evidence log)
- Commit: `index.html`, `styles.css`, `tests/site.test.mjs`, `tests/browser.test.mjs`, and this covering plan.

**Interfaces:**
- Consumes: RED/GREEN output, maximum CLS, boundary geometry, and final diff.
- Produces: a complete local evidence record and one anonymous commit.

- [ ] **Step 1: Append complete evidence**

Record source/browser RED and GREEN counts, CLS results, boundary geometry,
scope review, privacy review, and concerns.

- [ ] **Step 2: Verify tracked scope and anonymous identity**

Stage only covering files, run cached diff checks, and commit with the required
anonymous identity.

- [ ] **Step 3: Run post-commit verification**

Run the complete source and browser suites again, confirm `git diff --check`,
confirm a clean worktree, and report the full commit hash.
