import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';
import test from 'node:test';
import { chromium } from 'playwright';

const root = fileURLToPath(new URL('..', import.meta.url));
const baseURL = 'http://127.0.0.1:4173/';
let browser;
let server;
let serverError = '';

async function waitForPreview(timeoutMs = 5000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (server?.exitCode !== null) {
      throw new Error(`Local preview exited early: ${serverError.trim()}`);
    }
    try {
      const response = await fetch(baseURL);
      if (response.ok) return;
    } catch {}
    await delay(80);
  }
  throw new Error('Local preview did not start');
}

test.before(async () => {
  server = spawn(process.execPath, ['scripts/serve.mjs'], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  server.stderr.on('data', (chunk) => { serverError += chunk; });
  await waitForPreview();
  browser = await chromium.launch({ headless: true });
});

test.after(async () => {
  await browser?.close();
  server?.kill('SIGTERM');
});

const viewports = [
  { name: 'desktop', width: 1280, height: 720, maxDocumentHeight: 7400 },
  { name: 'small-mobile', width: 320, height: 700, maxDocumentHeight: 11400 },
  { name: 'mobile', width: 390, height: 844, maxDocumentHeight: 10225 },
  { name: 'large-mobile', width: 430, height: 932, maxDocumentHeight: 9950 },
];

for (const viewport of viewports) {
  test(`renders the ${viewport.name} contract`, async (t) => {
    const page = await browser.newPage({ viewport });
    const errors = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));

    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    const metrics = await page.evaluate(() => {
      const rect = (selector) => {
        const value = document.querySelector(selector)?.getBoundingClientRect();
        return value ? { top: value.top, right: value.right, bottom: value.bottom,
          left: value.left, width: value.width, height: value.height } : null;
      };
      const targets = [...document.querySelectorAll(
        'button:not([hidden]), summary, .cover-actions a, .field-index a')]
        .filter((element) => {
          const style = getComputedStyle(element);
          return style.display !== 'none' && style.visibility !== 'hidden' &&
            element.getClientRects().length > 0;
        })
        .map((element) => ({
          label: element.textContent.trim().replace(/\s+/g, ' '),
          height: element.getBoundingClientRect().height,
          width: element.getBoundingClientRect().width,
        }));
      return {
        viewportWidth: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        documentHeight: document.documentElement.scrollHeight,
        cover: rect('.document-cover'),
        primaryAction: rect('.primary-action'),
        register: rect('.operator-register'),
        pathway: rect('#pathway'),
        sections: Object.fromEntries(['name-reveal', 'failure-register',
          'engagements', 'pathway', 'operators', 'manifesto', 'gut-check']
          .map((id) => [id, rect(`#${id}`)?.height])),
        routeLineDisplay: getComputedStyle(
          document.querySelector('.pathway-line')).display,
        routeTops: [...document.querySelectorAll('.pathway-route > li')]
          .map((item) => item.getBoundingClientRect().top),
        routeLefts: [...document.querySelectorAll('.pathway-route > li')]
          .map((item) => item.getBoundingClientRect().left),
        h1Size: Number.parseFloat(getComputedStyle(document.querySelector('h1')).fontSize),
        h2Size: Number.parseFloat(getComputedStyle(document.querySelector('h2')).fontSize),
        footerSize: Number.parseFloat(getComputedStyle(document.querySelector('footer')).fontSize),
        activeIndexLabelOpacity: getComputedStyle(
          document.querySelector('.field-index [aria-current="true"] span:last-child')).opacity,
        displayFontReady: document.fonts.check('700 32px "DDD Display"'),
        textFontReady: document.fonts.check('400 16px "DDD Text"'),
        targets,
      };
    });

    t.diagnostic(JSON.stringify(metrics));
    assert.ok(metrics.documentWidth <= metrics.viewportWidth + 1,
      `horizontal overflow: ${metrics.documentWidth} > ${metrics.viewportWidth}`);
    assert.ok(metrics.documentHeight <= viewport.maxDocumentHeight,
      `page exceeded the council-reviewed content-density ceiling: ${metrics.documentHeight}`);
    assert.ok(metrics.primaryAction.top < viewport.height,
      'primary action should enter the initial cover experience');
    assert.ok(metrics.displayFontReady && metrics.textFontReady,
      'self-hosted fonts should be loaded');
    assert.ok(metrics.footerSize >= 14, 'footer text must remain readable');
    for (const target of metrics.targets) {
      assert.ok(target.height >= 43.5,
        `${target.label} is shorter than the 44px target`);
    }

    if (viewport.width > 840) {
      assert.ok(metrics.cover.height <= viewport.height + 1);
      assert.ok(metrics.primaryAction.bottom <= viewport.height);
      assert.ok(metrics.register.bottom <= viewport.height);
      assert.ok(metrics.h1Size > metrics.h2Size,
        'the hero must outrank section headings');
      assert.notEqual(metrics.routeLineDisplay, 'none');
      assert.equal(metrics.activeIndexLabelOpacity, '0',
        'the active index label must not cover page copy');
      assert.ok(metrics.routeLefts[0] < metrics.routeLefts[1] &&
        metrics.routeLefts[1] < metrics.routeLefts[2]);
      assert.ok(metrics.routeLefts[3] < metrics.routeLefts[4] &&
        metrics.routeLefts[4] < metrics.routeLefts[5]);
    } else {
      assert.equal(metrics.routeLineDisplay, 'none');
      assert.ok(metrics.routeTops.every((top, index, values) =>
        index === 0 || top > values[index - 1]), 'mobile route follows 01–06');
      const maxPathwayHeight = viewport.width <= 360 ? 1950 : 1680;
      assert.ok(metrics.pathway.height <= maxPathwayHeight,
        `mobile pathway should be compressed: ${metrics.pathway.height}`);
    }

    assert.deepEqual(errors, []);
    await page.close();
  });
}

test('keeps the gut-check useful when JavaScript is disabled', async () => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(baseURL, { waitUntil: 'load' });
  assert.equal(await page.locator('.copy-gut-check').isVisible(), false);
  assert.equal(await page.locator('.gut-check-questions li').count(), 5);
  assert.equal(await page.locator('.gut-check-questions').isVisible(), true);
  await context.close();
});

test('honors reduced motion without removing content', async () => {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  const state = await page.evaluate(() => ({
    animation: getComputedStyle(document.querySelector('.reveal')).animationName,
    visibility: getComputedStyle(document.querySelector('.reveal')).visibility,
  }));
  assert.equal(state.animation, 'none');
  assert.equal(state.visibility, 'visible');
  await page.close();
});
