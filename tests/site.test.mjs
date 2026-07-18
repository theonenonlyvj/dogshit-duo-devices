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
