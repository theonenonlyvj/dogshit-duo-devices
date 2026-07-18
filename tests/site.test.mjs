import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const agentRules = await readFile(new URL('../AGENTS.md', import.meta.url), 'utf8');
const implementationPlan = await readFile(new URL(
  '../docs/superpowers/plans/2026-07-18-dogshit-duo-devices-site.md',
  import.meta.url), 'utf8');
const personalName = String.fromCodePoint(86, 105, 106, 97, 121);

test('keeps repository rules and plans anonymous', () => {
  for (const source of [agentRules, implementationPlan]) {
    assert.ok(!source.toLowerCase().includes(personalName.toLowerCase()));
  }
});

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

test('contains the council-approved positioning and useful actions', () => {
  assert.match(html, /When a medtech sale stalls, the problem is rarely the funnel\. It&#39;s the pathway\./);
  assert.match(html, /Dogshit Duo Devices/);
  assert.match(html, /Clinical reality/);
  assert.match(html, /Commercial system/);
  assert.match(html, /Find where the pathway breaks/);
  assert.match(html, /See ways to use the duo/);
  assert.match(html, /Commercial gut-check/);
});

test('orders recognition and hireable uses before pathway theory', () => {
  const positions = ['name-reveal', 'failure-register', 'engagements',
    'pathway', 'operators', 'manifesto', 'gut-check']
    .map((name) => html.indexOf(`id="${name}"`));

  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
  assert.match(html, /<details open>/);
});

test('uses decision signals and routes claims to internal owners', () => {
  assert.equal((html.match(/<strong>Must decide:<\/strong>/g) ?? []).length, 6);
  assert.equal((html.match(/<strong>Breaks when:<\/strong>/g) ?? []).length, 6);
  assert.match(html, /evidence fit, resource impact/i);
  assert.match(html, /claims-review handoff for the appropriate internal owners/i);
  assert.match(html, /Bad name\. Better next move\./);
});

test('uses the approved Field Transfer engagement label', () => {
  assert.match(html, /<h3>Field Transfer<\/h3>/);
});

test('does not ship placeholders or personal contact channels', () => {
  for (const forbidden of [/@[a-z0-9.-]+\.[a-z]{2,}/i,
    /\+?\d[\d\s().-]{8,}\d/, /lorem ipsum/i, /example\.com/i,
    /href="mailto:/i, /href="tel:/i]) {
    assert.doesNotMatch(html, forbidden);
  }
});

const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
const approvedColors = new Map([
  ['--paper', '#f4f2ec'],
  ['--carbon', '#111a1e'],
  ['--steel', '#93a4aa'],
  ['--teal', '#35666b'],
  ['--orange', '#e05235'],
  ['--umber', '#3b2a24'],
]);

test('implements the approved palette and motion contract', () => {
  for (const [token, value] of approvedColors) {
    assert.match(css.toLowerCase(), new RegExp(
      `${token}:\\s*${value}\\s*;`));
  }
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /:focus-visible\s*\{[^}]*outline:\s*3px\s+solid\s+var\(--orange\)\s*;/s);
  assert.match(css, /a,\s*button,\s*summary\s*\{[^}]*min-height:\s*44px\s*;/s);
});

test('encodes the measured cover and safe heading-wrap contracts', () => {
  assert.match(css, /h1,\s*h2,\s*h3\s*\{[^}]*overflow-wrap:\s*normal\s*;[^}]*word-break:\s*normal\s*;[^}]*hyphens:\s*none\s*;/s);
  assert.match(css, /\.document-cover\s*\{[^}]*min-height:\s*100svh\s*;/s);
  assert.match(css, /\.cover-main\s*\{[^}]*grid-column:\s*1\s*\/\s*8\s*;/s);
  assert.match(css, /\.cover-context\s*\{[^}]*grid-column:\s*8\s*\/\s*-1\s*;/s);
  assert.match(css, /@media\s*\(max-width:\s*840px\)[\s\S]*?h1\s*\{[^}]*font-size:\s*clamp\(2\.75rem,\s*11vw,\s*3\.4rem\)\s*;/s);
});

test('keeps small annotation text on contrast-safe approved tokens', () => {
  assert.match(css, /\.lens-grid article:nth-child\(2\) \.lens-code\s*\{[^}]*color:\s*var\(--umber\)\s*;/s);
  assert.match(css, /tbody tr:nth-child\(3\) th\s*\{[^}]*color:\s*var\(--umber\)\s*;/s);
});

test('contains responsive rules without template effects', () => {
  assert.match(css, /@media\s*\(max-width:\s*840px\)/);
  for (const forbidden of [/\b(?:linear|radial|conic)-gradient\s*\(/i,
    /\b(?:box-shadow|text-shadow|drop-shadow\s*\()/i,
    /\bbackground-image\s*:/i, /\burl\s*\(/i, /backdrop-filter/i,
    /cursor\s*:\s*(?:none|url\s*\()/i, /scroll-snap(?:-type|-align|-stop)?\s*:/i]) {
    assert.doesNotMatch(css, forbidden);
  }

  const literalColors = css.toLowerCase().match(/#[0-9a-f]{3,8}\b/g) ?? [];
  const allowedValues = new Set(approvedColors.values());
  assert.deepEqual([...new Set(literalColors.filter(
    (value) => !allowedValues.has(value)))], []);
});

test('maps ratios to pathway stages', async () => {
  const { stageForRatio } = await import('../script.js');
  assert.equal(stageForRatio(0), 'brief');
  assert.equal(stageForRatio(0.3), 'buyers');
  assert.equal(stageForRatio(0.6), 'evidence');
  assert.equal(stageForRatio(0.9), 'execution');
});

test('times out a clipboard request that never settles', async () => {
  const { writeClipboardWithTimeout } = await import('../script.js');
  let written = '';
  await writeClipboardWithTimeout({
    async writeText(value) { written = value; },
  }, 'field questions', 20);
  assert.equal(written, 'field questions');

  await assert.rejects(writeClipboardWithTimeout({
    writeText() { return new Promise(() => {}); },
  }, 'field questions', 5), /timed out/i);
});

test('keeps enhancement code small and progressive', async () => {
  const script = await readFile(new URL('../script.js', import.meta.url), 'utf8');
  assert.ok(Buffer.byteLength(script) < 10_240);
  assert.match(script, /IntersectionObserver/);
  assert.match(script, /navigator\.clipboard/);
  assert.match(script, /\.select\(\)/);
  assert.match(script, /questions are selected/i);
  assert.match(script, /document/);
});

test('ships a read-only clipboard fallback without hiding the questions', () => {
  assert.match(html, /class="copy-fallback"[^>]*readonly[^>]*hidden/);
  assert.match(html, /Copy or select the five questions/);
});

test('resolves every local href and src target', async () => {
  const documentUrl = new URL('../index.html', import.meta.url);
  const targets = [...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)]
    .map((match) => match[1])
    .filter((target) => !/^[a-z][a-z\d+.-]*:/i.test(target));

  assert.ok(targets.length > 0);
  for (const target of targets) {
    const targetUrl = new URL(target, documentUrl);
    targetUrl.hash = '';
    targetUrl.search = '';
    await assert.doesNotReject(access(targetUrl), `Missing local target: ${target}`);
  }
});

test('ships a 1200 by 630 PNG social card', async () => {
  const socialCard = await readFile(new URL('../assets/og.png', import.meta.url));
  assert.equal(socialCard.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  assert.equal(socialCard.readUInt32BE(16), 1200);
  assert.equal(socialCard.readUInt32BE(20), 630);
});

test('keeps the social card to the exact approved copy and palette', async () => {
  const socialSource = await readFile(new URL('../assets/og.html', import.meta.url), 'utf8');
  const body = socialSource.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
  const visibleText = body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

  assert.equal(visibleText, 'DOGSHIT DUO DEVICES Clinical perspective. Engineering discipline. Commercial motion. Serious operators. Unfortunate name.');
  for (const color of approvedColors.values()) {
    assert.match(socialSource.toLowerCase(), new RegExp(color));
  }
});

test('resolves recovery links from nested GitHub Pages URLs', async () => {
  const notFound = await readFile(new URL('../404.html', import.meta.url), 'utf8');
  const faviconHref = notFound.match(
    /<link\b(?=[^>]*\brel=["']icon["'])[^>]*\bhref=["']([^"']+)["']/i)?.[1];
  const recoveryHref = notFound.match(
    /<a\b[^>]*\bhref=["']([^"']+)["']/i)?.[1];

  assert.match(notFound, /This pathway does not exist\./);
  assert.ok(faviconHref, '404 page must include a favicon href');
  assert.ok(recoveryHref, '404 page must include a recovery href');
  assert.deepEqual({
    favicon: new URL(faviconHref,
      'https://owner.github.io/dogshit-duo-devices/a/b').href,
    recovery: new URL(recoveryHref,
      'https://owner.github.io/dogshit-duo-devices/a/b').href,
  }, {
    favicon: 'https://owner.github.io/dogshit-duo-devices/assets/favicon.svg',
    recovery: 'https://owner.github.io/dogshit-duo-devices/',
  });
});

test('disables Jekyll processing for the Pages source tree', async () => {
  await assert.doesNotReject(access(new URL('../.nojekyll', import.meta.url)));
});

test('documents local checks and the anonymous public-data boundary', async () => {
  const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');
  assert.match(readme, /npm test/);
  assert.match(readme, /npm start/);
  assert.match(readme, /public-data boundary/i);
  assert.match(readme, /anonymous/i);
});
