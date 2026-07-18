import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
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

test('contains the approved positioning and useful action', () => {
  assert.match(html, /Meet customers where they are\./);
  assert.match(html, /Dogshit Duo Devices/);
  assert.match(html, /Clinical lens/);
  assert.match(html, /Engineering lens/);
  assert.match(html, /Put the pathway on the table/);
  assert.match(html, /Commercial gut-check/);
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
