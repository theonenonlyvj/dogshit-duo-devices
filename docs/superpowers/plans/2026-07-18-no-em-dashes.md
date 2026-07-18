# Zero Em Dashes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove every em dash character from tracked repository text, preserve the site's editorial meaning, and prevent the character from returning.

**Architecture:** Add one repository-wide source contract that enumerates tracked text files through Git and scans their decoded contents for Unicode code point `0x2014`. Rewrite each existing occurrence according to its sentence function, then rely on the existing real-browser suite to prove the punctuation edits did not disturb layout or interaction behavior.

**Tech Stack:** Static HTML, CSS, browser-native JavaScript, Node.js test runner, GitHub Actions, GitHub Pages

## Global Constraints

- No tracked text file may contain Unicode code point `0x2014`.
- Use periods for hard turns, colons for explanation, commas for flow, parentheses only for true asides, and recast awkward sentences.
- Preserve the existing voice, claims boundary, terminology, and humor placement.
- Keep all public content anonymous and free of personal or confidential information.
- Use the repository identity `Dogshit Duo Devices <dogshit-duo-devices@users.noreply.github.com>` for commits.
- Do not add dependencies, third-party services, analytics, tracking, forms, or external asset references.

---

### Task 1: Add the Repository-Wide Punctuation Contract

**Files:**
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes: Git's null-delimited list of tracked files from `git ls-files -z`
- Produces: A Node test named `contains no em dash characters in tracked text files`

- [ ] **Step 1: Write the failing test**

Add these imports and constants to `tests/site.test.mjs`:

```js
import { execFileSync } from 'node:child_process';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const trackedTextExtensions = new Set([
  '.css', '.html', '.js', '.json', '.md', '.mjs', '.svg', '.txt', '.yaml', '.yml',
]);
```

Add this test after the anonymous-repository contract:

```js
test('contains no em dash characters in tracked text files', async () => {
  const trackedFiles = execFileSync('git', ['ls-files', '-z'], {
    cwd: projectRoot,
    encoding: 'utf8',
  }).split('\0').filter(Boolean).filter((file) =>
    trackedTextExtensions.has(extname(file)) || ['.gitignore', '.nojekyll'].includes(file));
  const forbiddenCharacter = String.fromCodePoint(0x2014);
  const offenders = [];

  for (const file of trackedFiles) {
    const source = await readFile(join(projectRoot, file), 'utf8');
    if (source.includes(forbiddenCharacter)) offenders.push(file);
  }

  assert.deepEqual(offenders, []);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm test
```

Expected: FAIL in `contains no em dash characters in tracked text files`, listing the current source, test, fallback, and historical documentation files as offenders.

---

### Task 2: Rewrite Every Existing Occurrence

**Files:**
- Modify: `index.html`
- Modify: `404.html`
- Modify: `script.js`
- Modify: `tests/site.test.mjs`
- Modify: `docs/superpowers/specs/2026-07-18-adversarial-oomph-design.md`
- Modify: `docs/superpowers/plans/2026-07-18-adversarial-oomph.md`
- Modify: `docs/superpowers/specs/2026-07-18-council-revision-design.md`
- Modify: `docs/superpowers/plans/2026-07-18-dogshit-duo-devices-site.md`
- Modify: `docs/superpowers/specs/2026-07-18-dogshit-duo-devices-design.md`

**Interfaces:**
- Consumes: The failing repository-wide punctuation contract from Task 1
- Produces: Tracked text with no Unicode code point `0x2014`

- [ ] **Step 1: Rewrite live HTML and JavaScript copy**

Use these exact final forms in `index.html`:

```html
<title>Dogshit Duo Devices | Commercialization Practice</title>
<h1>When a medtech sale stalls, inspect the pathway, not just the funnel.</h1>
<p class="lede">We pressure-test the story, stakeholders, evidence, ownership, and handoffs. Then we turn the failure points into accountable next moves.</p>
<p><strong>Pressure-test:</strong> Which decision should this meeting create? What can disappear without weakening it?</p>
<div><dt>Working format</dt><dd>A cross-functional review of one live commercial pathway: stakeholders, decisions, evidence, ownership, and handoffs.</dd></div>
<p>Constraints, decision mechanics, ownership, handoffs, and field feedback, organized into a commercial system that can repeat without a hero.</p>
<p>Illustration, not client evidence. A generic example of the hand-back structure.</p>
```

Use this title in `404.html`:

```html
<title>Pathway not found | Dogshit Duo Devices</title>
```

Use this fallback message in `script.js`:

```js
'Copy is blocked here. The questions are selected; press Command/Ctrl+C.';
```

- [ ] **Step 2: Update source expectations**

Use these final assertions in `tests/site.test.mjs`:

```js
assert.match(html, /When a medtech sale stalls, inspect the pathway, not just the funnel\./);
assert.match(html, /Illustration, not client evidence\./);
```

- [ ] **Step 3: Rewrite historical documentation**

Apply the same sentence-level forms to historical specs and plans:

```text
Dogshit Duo Devices: Site Design
ambiguous ownership, and performative alignment, not clinicians, customers,
1. Intake: isolate assumptions and define the real decision.
2. Dual pass: compare clinical and engineering/commercial failure signals.
3. Red team: pressure-test story, sequence, ownership, and handoffs.
4. Rebuild: identify the smallest executable corrections.
5. Hand back: establish accountable owners and explicit next moves.
```

Use colons for file-description lists, commas for `not` contrasts, periods before imperative fallback instructions, and the exact revised live copy wherever a historical document quotes the current interface.

- [ ] **Step 4: Run the source suite to verify the contract passes**

Run:

```bash
npm test
```

Expected: PASS with 33 tests and zero failures.

- [ ] **Step 5: Confirm the direct scan is empty**

Run:

```bash
node --input-type=module -e "import { execFileSync } from 'node:child_process'; import { readFileSync } from 'node:fs'; const files=execFileSync('git',['ls-files','-z'],{encoding:'utf8'}).split('\0').filter(Boolean); const mark=String.fromCodePoint(0x2014); const hits=files.filter(file=>{try{return readFileSync(file,'utf8').includes(mark)}catch{return false}}); console.log(JSON.stringify(hits)); if(hits.length)process.exit(1);"
```

Expected: `[]`

- [ ] **Step 6: Commit the implementation**

```bash
git add 404.html index.html script.js tests/site.test.mjs docs/superpowers/plans docs/superpowers/specs
git -c user.name="Dogshit Duo Devices" -c user.email="dogshit-duo-devices@users.noreply.github.com" commit -m "style: replace em dashes across public copy"
```

---

### Task 3: Verify and Release

**Files:**
- Verify: `index.html`
- Verify: `404.html`
- Verify: `script.js`
- Verify: `tests/site.test.mjs`
- Verify: `.github/workflows/browser-regression.yml`

**Interfaces:**
- Consumes: The committed punctuation cleanup from Task 2
- Produces: A green browser workflow and a cache-busted HTTPS deployment

- [ ] **Step 1: Run the complete local release gate**

Run:

```bash
npm test
npm run test:browser
git diff --check
git status --short
```

Expected: 33 source tests pass, 6 browser tests pass, the diff check is clean, and the working tree is clean after the implementation commit.

- [ ] **Step 2: Push the existing main branch**

```bash
git push origin main
```

Expected: The remote advances to the punctuation-cleanup commit without changing remotes.

- [ ] **Step 3: Wait for GitHub verification**

```bash
gh run list --commit "$(git rev-parse HEAD)" --limit 5 --json databaseId,headSha,name,status,conclusion,url
gh run watch "$(gh run list --commit "$(git rev-parse HEAD)" --workflow "Browser regression" --limit 1 --json databaseId --jq '.[0].databaseId')" --exit-status
gh run watch "$(gh run list --commit "$(git rev-parse HEAD)" --workflow "pages-build-deployment" --limit 1 --json databaseId --jq '.[0].databaseId')" --exit-status
```

Expected: Both the browser regression workflow and Pages deployment complete with `success` for the release commit.

- [ ] **Step 4: Verify the public HTTPS copy**

```bash
curl -sSf "https://theonenonlyvj.github.io/dogshit-duo-devices/?v=$(git rev-parse --short HEAD)" | node --input-type=module -e "let body=''; for await (const chunk of process.stdin) body+=chunk; const mark=String.fromCodePoint(0x2014); if(!body.includes('inspect the pathway, not just the funnel.')) process.exit(1); if(body.includes(mark)) process.exit(1); console.log('public copy verified');"
```

Expected: HTTP 200; the response contains `inspect the pathway, not just the funnel.` and does not contain Unicode code point `0x2014`.
