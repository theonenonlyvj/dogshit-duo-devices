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
  { name: '320x568', width: 320, height: 568, maxDocumentHeight: 11650 },
  { name: '320x700', width: 320, height: 700, maxDocumentHeight: 11650 },
  { name: '359x640', width: 359, height: 640, maxDocumentHeight: 11000 },
  { name: '360x640', width: 360, height: 640, maxDocumentHeight: 11000 },
  { name: '360x800', width: 360, height: 800, maxDocumentHeight: 10800 },
  { name: '375x812', width: 375, height: 812, maxDocumentHeight: 10700 },
  { name: '390x844', width: 390, height: 844, maxDocumentHeight: 10500 },
  { name: '412x915', width: 412, height: 915, maxDocumentHeight: 10350 },
  { name: '430x932', width: 430, height: 932, maxDocumentHeight: 10300 },
  { name: '479x844', width: 479, height: 844, maxDocumentHeight: 10100 },
  { name: '480x900', width: 480, height: 900, maxDocumentHeight: 10000 },
  { name: '768x1024', width: 768, height: 1024, maxDocumentHeight: 9000 },
  { name: '840x900', width: 840, height: 900, maxDocumentHeight: 8400 },
  { name: '841x900', width: 841, height: 900, maxDocumentHeight: 8400 },
  { name: '844x390', width: 844, height: 390, maxDocumentHeight: 8400 },
  { name: '1023x768', width: 1023, height: 768, maxDocumentHeight: 8200 },
  { name: '1024x768', width: 1024, height: 768, maxDocumentHeight: 7800 },
  { name: '1280x720', width: 1280, height: 720, maxDocumentHeight: 7600 },
  { name: '1423x900', width: 1423, height: 900, maxDocumentHeight: 7600 },
  { name: '1424x900', width: 1424, height: 900, maxDocumentHeight: 7600 },
  { name: '1440x900', width: 1440, height: 900, maxDocumentHeight: 7600 },
  { name: '1920x1080', width: 1920, height: 1080, maxDocumentHeight: 7800 },
];

test('aligns diagram artwork, captions, and local pathway lanes', async () => {
  for (const width of [1024, 1280, 1440, 1920]) {
    const page = await browser.newPage({ viewport: { width, height: 1080 } });
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    const geometry = await page.evaluate(() => {
      const box = (element) => {
        const rect = element.getBoundingClientRect();
        return { left: rect.left, right: rect.right, top: rect.top,
          bottom: rect.bottom, width: rect.width, height: rect.height };
      };
      const imageGeometry = (selector) => {
        const element = document.querySelector(selector);
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        const widthScale = rect.width / element.naturalWidth;
        const heightScale = rect.height / element.naturalHeight;
        let contentWidth = rect.width;
        if (style.objectFit === 'contain') {
          contentWidth = element.naturalWidth * Math.min(widthScale, heightScale);
        } else if (style.objectFit === 'cover') {
          contentWidth = element.naturalWidth * Math.max(widthScale, heightScale);
        } else if (style.objectFit === 'none') {
          contentWidth = element.naturalWidth;
        }
        return { ...box(element), naturalWidth: element.naturalWidth,
          naturalHeight: element.naturalHeight, objectFit: style.objectFit,
          maxHeight: style.maxHeight, contentWidth };
      };
      const railGeometry = (selector) => [...document.querySelectorAll(selector)]
        .map((element) => ({ ...box(element),
          fontSize: Number.parseFloat(getComputedStyle(element).fontSize) }));
      const pathwayCards = [...document.querySelectorAll('.pathway-zone-route > li')]
        .map((card) => {
          const cardRect = card.getBoundingClientRect();
          const node = card.querySelector('.route-node');
          const copy = [...card.querySelectorAll(':scope > .route-label, :scope > h4, ' +
            ':scope > p')]
            .filter((element) => element.getClientRects().length > 0)
            .map((element) => element.getBoundingClientRect());
          const pseudo = getComputedStyle(card, '::after');
          const connectorLeft = Number.parseFloat(pseudo.left);
          const connectorWidth = Number.parseFloat(pseudo.borderLeftWidth) || 0;
          return {
            node: box(node),
            minCopyLeft: Math.min(...copy.map((rect) => rect.left)),
            connectorContent: pseudo.content,
            connectorCenterX: Number.isFinite(connectorLeft)
              ? cardRect.left + connectorLeft + connectorWidth / 2
              : null,
          };
        });
      return {
        failure: imageGeometry('.fault-family-visual img'),
        failureKeys: railGeometry('.fault-family-key > li'),
        method: imageGeometry('.method-apparatus img'),
        methodCaptions: railGeometry('.method-apparatus figcaption > span'),
        pathwayCards,
      };
    });

    for (const [name, image, rail, minHeight, maxHeight] of [
      ['failure', geometry.failure, geometry.failureKeys, 128, 160],
      ['method', geometry.method, geometry.methodCaptions, 96, 128],
    ]) {
      assert.ok(image.naturalWidth > 0 && image.naturalHeight > 0,
        `${width}px ${name} must expose intrinsic image dimensions`);
      assert.equal(image.objectFit, 'fill', `${width}px ${name} must fill its plot band`);
      assert.equal(image.maxHeight, 'none', `${width}px ${name} must not be capped`);
      assert.ok(image.contentWidth >= image.width * 0.98,
        `${width}px ${name} artwork must occupy its plot width`);
      assert.ok(image.height >= minHeight && image.height <= maxHeight,
        `${width}px ${name} plot height is outside ${minHeight}-${maxHeight}px`);
      assert.equal(rail.length, 3, `${width}px ${name} must retain three live captions`);
      const artworkCenters = [106, 320, 534]
        .map((stageX) => image.left + image.width * stageX / 640);
      const railCenters = rail.map((item) => item.left + item.width / 2);
      assert.ok(railCenters.every((center, index) =>
        Math.abs(center - artworkCenters[index]) <= 2),
      `${width}px ${name} artwork stations must align with caption centers`);
    }

    assert.ok(geometry.methodCaptions.every((caption) => caption.fontSize >= 11.5),
      `${width}px method captions must remain at least 11.5px`);
    assert.equal(geometry.pathwayCards.length, 6);
    for (const [index, card] of geometry.pathwayCards.entries()) {
      assert.ok(card.node.right <= card.minCopyLeft - 12,
        `${width}px pathway node ${index + 1} must clear live copy`);
      if (index % 2 === 0) {
        assert.notEqual(card.connectorContent, 'none',
          `${width}px pathway connector ${index + 1} must be drawn locally`);
        assert.ok(Math.abs(card.connectorCenterX -
          (card.node.left + card.node.width / 2)) <= 2,
        `${width}px pathway connector ${index + 1} must align with its node`);
        assert.ok(card.connectorCenterX + 1 <= card.minCopyLeft - 12,
          `${width}px pathway connector ${index + 1} must clear live copy`);
      } else {
        assert.equal(card.connectorContent, 'none',
          `${width}px final zone card must end its local connector`);
      }
    }
    await page.close();
  }
});

test('uses a balanced tablet pathway rail before the desktop composition', async () => {
  for (const width of [600, 768, 1023, 1024]) {
    const page = await browser.newPage({ viewport: { width, height: 1024 } });
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    const geometry = await page.evaluate(() => {
      const box = (element) => {
        const rect = element.getBoundingClientRect();
        return { left: rect.left, right: rect.right, top: rect.top,
          bottom: rect.bottom, width: rect.width, height: rect.height };
      };
      const group = document.querySelector('.pathway-groups');
      return {
        columnCount: getComputedStyle(group).gridTemplateColumns
          .split(' ').filter(Boolean).length,
        zones: [...document.querySelectorAll('.pathway-zone')].map(box),
        cards: [...document.querySelectorAll('.pathway-zone-route > li')]
          .map((card) => {
            const liveCopy = [...card.querySelectorAll(
              ':scope > .route-label, :scope > h4, :scope > p')]
              .filter((element) => element.getClientRects().length > 0);
            const bodyCopy = [...card.querySelectorAll(
              ':scope > p:not(.route-label, .route-alert)')];
            const scanCopy = [...card.children]
              .filter((element) => element.matches(
                '.route-label, h4, .route-alert'));
            return {
              card: box(card),
              node: box(card.querySelector('.route-node')),
              liveCopy: liveCopy.map(box),
              bodyCopy: bodyCopy.map(box),
              scanCopy: scanCopy.map(box),
            };
          }),
      };
    });

    if (width <= 1023) {
      assert.equal(geometry.columnCount, 1,
        `${width}px tablet pathway zones must stay in semantic order`);
      for (const [index, card] of geometry.cards.entries()) {
        assert.equal(card.bodyCopy.length, 2,
          `${width}px pathway card ${index + 1} must keep both decision fields`);
        const [mustDecide, breaksWhen] = card.bodyCopy;
        assert.ok(Math.abs(mustDecide.width - breaksWhen.width) <= 2,
          `${width}px pathway card ${index + 1} needs balanced copy columns`);
        assert.ok(Math.abs(mustDecide.top - breaksWhen.top) <= 2,
          `${width}px pathway card ${index + 1} copy columns must start together`);
        assert.ok(mustDecide.right + 12 <= breaksWhen.left,
          `${width}px pathway card ${index + 1} copy columns must not overlap`);
        assert.ok(card.liveCopy.every((copy) =>
          copy.left >= card.card.left - 1 && copy.right <= card.card.right + 1 &&
          copy.top >= card.card.top - 1 && copy.bottom <= card.card.bottom + 1),
        `${width}px pathway card ${index + 1} copy must stay contained`);
        assert.ok(card.scanCopy.every((copy, scanIndex, values) =>
          scanIndex === 0 || copy.top >= values[scanIndex - 1].bottom - 1),
        `${width}px pathway card ${index + 1} label, title, and alert must preserve scan order`);
        assert.ok(card.scanCopy.every((copy, scanIndex, values) =>
          scanIndex === 0 || copy.top - values[scanIndex - 1].bottom <= 20),
        `${width}px pathway card ${index + 1} heading rail must not create dead space`);
        const firstBodyTop = Math.min(...card.bodyCopy.map((copy) => copy.top));
        assert.ok(card.scanCopy.every((copy) => copy.bottom <= firstBodyTop + 1),
          `${width}px pathway card ${index + 1} decision fields must follow its heading rail`);
        assert.ok(card.node.right <= Math.min(...card.liveCopy.map((copy) => copy.left)) - 12,
          `${width}px pathway card ${index + 1} node gutter must stay clear`);
      }
    } else {
      assert.equal(geometry.columnCount, 3,
        '1024px must retain the three-column desktop pathway');
      assert.ok(geometry.zones[0].left < geometry.zones[1].left &&
        geometry.zones[1].left < geometry.zones[2].left,
      '1024px desktop zones must progress across the rail');
      assert.ok(geometry.zones.every((zone) =>
        Math.abs(zone.top - geometry.zones[0].top) <= 1),
      '1024px desktop zones must share a top edge');
    }
    await page.close();
  }
});

for (const viewport of viewports) {
  test(`renders the ${viewport.name} contract`, async (t) => {
    const page = await browser.newPage({ viewport });
    const errors = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));

    await page.addInitScript(() => {
      const supported = 'PerformanceObserver' in globalThis &&
        PerformanceObserver.supportedEntryTypes?.includes('layout-shift');
      globalThis.__layoutShiftState = { score: 0, supported };
      if (!supported) return;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) globalThis.__layoutShiftState.score += entry.value;
        }
      });
      observer.observe({ type: 'layout-shift', buffered: true });
    });

    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(
      () => requestAnimationFrame(resolve))));

    const metrics = await page.evaluate(() => {
      const rect = (selector) => {
        const value = document.querySelector(selector)?.getBoundingClientRect();
        return value ? { top: value.top, right: value.right, bottom: value.bottom,
          left: value.left, width: value.width, height: value.height } : null;
      };
      const targets = [...document.querySelectorAll(
        'button:not([hidden]), summary, .cover-actions a, .field-index a, ' +
        '.chapter-directory a, .gut-check-action')]
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
      const coverImageElement = document.querySelector('.cover-apparatus img');
      const coverImageBox = coverImageElement.getBoundingClientRect();
      const coverImageStyle = getComputedStyle(coverImageElement);
      const widthScale = coverImageBox.width / coverImageElement.naturalWidth;
      const heightScale = coverImageBox.height / coverImageElement.naturalHeight;
      const coverImageContentWidth = coverImageStyle.objectFit === 'contain'
        ? coverImageElement.naturalWidth * Math.min(widthScale, heightScale)
        : coverImageStyle.objectFit === 'cover'
          ? coverImageElement.naturalWidth * Math.max(widthScale, heightScale)
          : coverImageBox.width;
      return {
        viewportWidth: innerWidth,
        cls: globalThis.__layoutShiftState?.score ?? null,
        clsObserverSupported: globalThis.__layoutShiftState?.supported ?? false,
        documentWidth: document.documentElement.scrollWidth,
        documentHeight: document.documentElement.scrollHeight,
        cover: rect('.document-cover'),
        coverVisual: rect('[data-visual-signature="cover-apparatus"]'),
        coverImage: rect('.cover-apparatus img'),
        coverImageContentWidth,
        coverLabels: [...document.querySelectorAll('.cover-apparatus figcaption span')]
          .map((element) => ({
            text: element.textContent.trim(),
            ...rect(`.cover-apparatus figcaption span:nth-child(${
              [...element.parentElement.children].indexOf(element) + 1})`),
            display: getComputedStyle(element).display,
            visibility: getComputedStyle(element).visibility,
            opacity: Number.parseFloat(getComputedStyle(element).opacity),
            textFits: element.scrollWidth <= element.clientWidth + 1 &&
              element.scrollHeight <= element.clientHeight + 1,
          })),
        coverCaptionSizes: [...document.querySelectorAll(
          '.cover-apparatus figcaption span')]
          .map((element) => Number.parseFloat(getComputedStyle(element).fontSize)),
        primaryAction: rect('.primary-action'),
        register: rect('.operator-register'),
        heroLedger: rect('.hero-ledger-anatomy'),
        heroLedgerDisplay: document.querySelector('.hero-ledger-anatomy')
          ? getComputedStyle(document.querySelector('.hero-ledger-anatomy')).display
          : 'missing',
        gutCheckAction: rect('.gut-check-action'),
        copyGutCheck: rect('.copy-gut-check:not([hidden])'),
        preflightMarkers: [...document.querySelectorAll('.preflight-mark span')]
          .map((element) => ({
            backgroundColor: getComputedStyle(element).backgroundColor,
            color: getComputedStyle(element).color,
          })),
        gutCheckRows: [...document.querySelectorAll('.gut-check-questions > li')]
          .map((element) => {
            const value = element.getBoundingClientRect();
            return { top: value.top, left: value.left, right: value.right };
          }),
        manifestoNumbers: [...document.querySelectorAll('.manifesto-number')]
          .map((element) => element.textContent.trim()),
        chapterDirectoryDisplay: document.querySelector('.chapter-directory')
          ? getComputedStyle(document.querySelector('.chapter-directory')).display
          : 'missing',
        directoryTrack: rect('.chapter-directory-track'),
        directoryTrackScrollWidth: document.querySelector('.chapter-directory-track')
          ?.scrollWidth ?? 0,
        directoryTrackClientWidth: document.querySelector('.chapter-directory-track')
          ?.clientWidth ?? 0,
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
          gutCheckDisplay: getComputedStyle(
            document.querySelector('.gut-check-questions')).display,
        },
        pathway: rect('#pathway'),
        sections: Object.fromEntries(['name-reveal', 'failure-register',
          'engagements', 'pathway', 'operators', 'manifesto', 'gut-check']
          .map((id) => [id, rect(`#${id}`)?.height])),
        routeLineDisplay: document.querySelector('.pathway-line')
          ? getComputedStyle(document.querySelector('.pathway-line')).display
          : 'missing',
        routeTops: [...document.querySelectorAll('.pathway-zone-route > li')]
          .map((item) => item.getBoundingClientRect().top),
        routeLefts: [...document.querySelectorAll('.pathway-zone-route > li')]
          .map((item) => item.getBoundingClientRect().left),
        visualSignatures: [...document.querySelectorAll('[data-visual-signature]')]
          .map((element) => ({
            name: element.dataset.visualSignature,
            display: getComputedStyle(element).display,
            visibility: getComputedStyle(element).visibility,
            opacity: Number.parseFloat(getComputedStyle(element).opacity),
            height: element.getBoundingClientRect().height,
            width: element.getBoundingClientRect().width,
          })),
        mobileDominant: [...document.querySelectorAll('[data-mobile-dominant]')]
          .map((element) => ({
            name: element.dataset.visualSignature,
            height: element.getBoundingClientRect().height,
          })),
        zoneLefts: [...document.querySelectorAll('.pathway-zone')]
          .map((element) => element.getBoundingClientRect().left),
        zoneTops: [...document.querySelectorAll('.pathway-zone')]
          .map((element) => element.getBoundingClientRect().top),
        zoneNodeCounts: [...document.querySelectorAll('.pathway-zone')]
          .map((element) => element.querySelectorAll('.pathway-zone-route > li').length),
        phoneNodeConnectors: [...document.querySelectorAll('.pathway-zone-route > li')]
          .map((element) => getComputedStyle(element, '::after').content),
        engagementPrimaryWeights: [...document.querySelectorAll('.engagement-primary dd')]
          .map((element) => Number.parseInt(getComputedStyle(element).fontWeight, 10)),
        engagementDetailWeights: [...document.querySelectorAll('.engagement-detail dd')]
          .map((element) => Number.parseInt(getComputedStyle(element).fontWeight, 10)),
        engagementRails: [...document.querySelectorAll('.engagement-rows dl')]
          .map((element) => {
            const value = element.getBoundingClientRect();
            return { left: value.left, right: value.right, width: value.width };
          }),
        engagementPrimaryRects: [...document.querySelectorAll('.engagement-primary')]
          .map((element) => {
            const value = element.getBoundingClientRect();
            return { left: value.left, right: value.right, width: value.width,
              articleIndex: [...document.querySelectorAll('.engagement-rows article')]
                .indexOf(element.closest('article')) };
          }),
        engagementDetailRects: [...document.querySelectorAll('.engagement-detail')]
          .map((element) => {
            const value = element.getBoundingClientRect();
            return { left: value.left, right: value.right, width: value.width,
              articleIndex: [...document.querySelectorAll('.engagement-rows article')]
                .indexOf(element.closest('article')) };
          }),
        ledgerSecondaryColumns: [...document.querySelectorAll('.ledger-secondary dl')]
          .map((element) => getComputedStyle(element).gridTemplateColumns
            .split(' ').filter(Boolean).length),
        denseBodySizes: Object.fromEntries([
          '.engagement-rows dd',
          '.ledger-row dd',
          '.pathway-zone-route li > p:not(.route-label, .route-alert)',
          '.operator-register dd',
        ].map((selector) => [selector, [...document.querySelectorAll(selector)]
          .map((element) => Number.parseFloat(getComputedStyle(element).fontSize))])),
        chapterDirectoryTargets: [...document.querySelectorAll('.chapter-directory a')]
          .map((element) => {
            const value = element.getBoundingClientRect();
            return { width: value.width, height: value.height };
          }),
        engagementLabelSizes: [...document.querySelectorAll('.engagement-rows dt')]
          .map((element) => Number.parseFloat(getComputedStyle(element).fontSize)),
        ledgerLabelSizes: [...document.querySelectorAll('.ledger-row dt')]
          .map((element) => Number.parseFloat(getComputedStyle(element).fontSize)),
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
    assert.equal(metrics.clsObserverSupported, true,
      'the browser must support real layout-shift observation');
    assert.ok(Number.isFinite(metrics.cls) && metrics.cls <= 0.05,
      `CLS must remain at or below 0.05: ${metrics.cls}`);
    assert.ok(metrics.documentHeight <= viewport.maxDocumentHeight,
      `page exceeded the council-reviewed content-density ceiling: ${metrics.documentHeight}`);
    assert.ok(metrics.primaryAction.top < viewport.height,
      'primary action should enter the initial cover experience');
    assert.ok(metrics.displayFontReady && metrics.textFontReady,
      'self-hosted fonts should be loaded');
    assert.ok(metrics.footerSize >= 14, 'footer text must remain readable');
    assert.deepEqual(metrics.coverLabels.map((label) => label.text), [
      'STALL SIGNAL', 'PATHWAY INSPECTION', 'NAMED BREAK', 'OWNER + SMALLEST MOVE',
    ]);
    assert.ok(metrics.coverLabels.every((label) =>
      label.display !== 'none' && label.visibility !== 'hidden' &&
      label.opacity > 0 && label.textFits),
    'all four cover stages must remain live and readable');
    assert.deepEqual(metrics.zoneNodeCounts, [2, 2, 2]);
    assert.equal(metrics.engagementPrimaryWeights.length, 6);
    assert.equal(metrics.engagementDetailWeights.length, 6);
    assert.ok(metrics.engagementPrimaryWeights.every((weight, index) =>
      weight > metrics.engagementDetailWeights[index]),
    'Use when and Hand-back must outrank engagement detail fields');
    assert.ok(metrics.engagementLabelSizes.every((size) => size >= 11.5),
      'engagement labels must be at least 0.72rem');
    assert.ok(metrics.ledgerLabelSizes.every((size) => size >= 11.5),
      'ledger labels must be at least 0.72rem');
    assert.ok(metrics.gutCheckAction && metrics.gutCheckAction.height >= 43.5,
      'the internal engagement route must meet the 44px target');
    assert.equal(metrics.preflightMarkers.length, 5,
      'the preflight strip must retain all five neutral markers');
    assert.ok(metrics.preflightMarkers.every((marker) =>
      marker.backgroundColor === 'rgba(0, 0, 0, 0)'),
    'all preflight markers must use a neutral transparent background');
    assert.equal(metrics.gutCheckRows.length, 5,
      'the gut-check must retain five question rows');
    assert.ok(metrics.gutCheckRows.every((row, index, rows) =>
      index === 0 || row.top > rows[index - 1].top),
    'the five gut-check questions must progress in one vertical sequence');
    assert.ok(metrics.gutCheckRows.every((row) =>
      Math.abs(row.left - metrics.gutCheckRows[0].left) <= 2 &&
      Math.abs(row.right - metrics.gutCheckRows[0].right) <= 2),
    'the five gut-check questions must align to one pair of rails');
    const heroLedgerShouldShow = viewport.width >= 1440 && viewport.height >= 800;
    if (heroLedgerShouldShow) {
      assert.notEqual(metrics.heroLedgerDisplay, 'none',
        'the illustrative ledger must balance the tall wide cover');
      assert.ok(metrics.heroLedger &&
        metrics.heroLedger.left >= metrics.cover.left - 1 &&
        metrics.heroLedger.right <= metrics.cover.right + 1 &&
        metrics.heroLedger.top >= metrics.cover.top - 1 &&
        metrics.heroLedger.bottom <= metrics.cover.bottom + 1,
      'the illustrative ledger must remain inside the initial cover');
    } else {
      assert.equal(metrics.heroLedgerDisplay, 'none',
        'the illustrative ledger must stay hidden below its width or height threshold');
    }
    assert.deepEqual(metrics.manifestoNumbers, ['01', '02', '03'],
      'manifesto numbers must be exact visible DOM text');
    if (viewport.width <= 1423) {
      assert.notEqual(metrics.chapterDirectoryDisplay, 'none',
        'the in-flow chapter directory must remain available through 1423px');
      assert.equal(metrics.fieldIndex.width, 0,
        'the fixed field index must remain hidden when it cannot clear the content rail');
    } else {
      assert.equal(metrics.chapterDirectoryDisplay, 'none',
        'the in-flow chapter directory must yield to the wide fixed index');
      assert.ok(metrics.fieldIndex.width >= 43.5,
        'the fixed field index must be visible from 1424px');
      const indexGap = metrics.fieldIndex.left - metrics.contentRail.right;
      assert.ok(Math.abs(indexGap - 8) <= 2,
        `the fixed index must sit 8px outside the capped rail: ${indexGap}`);
    }
    if (viewport.width <= 480) {
      assert.ok(metrics.directoryTrackScrollWidth > metrics.directoryTrackClientWidth,
        'the narrow directory must scroll inside its own track');
      assert.equal(metrics.chapterDirectoryTargets.length, 7,
        'the phone chapter directory must retain all seven destinations');
      assert.ok(metrics.chapterDirectoryTargets.every((target) =>
        target.width >= 43.5 && target.height >= 43.5),
      'every phone chapter-directory destination must retain a 44px target');
    }
    assert.equal(metrics.visualSignatures.length, 8);
    assert.ok(metrics.visualSignatures.every((visual) =>
      visual.display !== 'none' && visual.visibility !== 'hidden' &&
      visual.opacity > 0 && visual.height >= 35 && visual.width >= 35),
    'every sales chapter keeps a visual signature');
    for (const target of metrics.targets) {
      assert.ok(target.height >= 43.5,
        `${target.label} is shorter than the 44px target`);
      assert.ok(target.width >= 43.5,
        `${target.label} is narrower than the 44px target`);
    }

    if (viewport.width >= 1024) {
      assert.ok(metrics.cover.height <= viewport.height + 1);
      assert.ok(metrics.primaryAction.bottom <= viewport.height);
      assert.ok(metrics.register.bottom <= viewport.height);
      assert.ok(metrics.h1Size > metrics.h2Size,
        'the hero must outrank section headings');
      assert.ok(metrics.coverImageContentWidth >= metrics.coverVisual.width * 0.95,
        'the cover artwork must span the same four-column rail as its captions');
      assert.equal(metrics.routeLineDisplay, 'missing');
      assert.equal(metrics.activeIndexLabelOpacity, '0',
        'the active index label must not cover page copy');
      assert.equal(metrics.zoneLefts.length, 3);
      assert.ok(metrics.zoneLefts[0] < metrics.zoneLefts[1] &&
        metrics.zoneLefts[1] < metrics.zoneLefts[2]);
      assert.deepEqual(metrics.layoutMode, {
        coverDisplay: 'grid',
        pathwayColumnCount: 3,
        engagementArticleDisplay: 'grid',
        engagementColumnCount: 4,
        methodDisplay: 'grid',
        ledgerRowsDisplay: 'grid',
        gutCheckDisplay: 'block',
      });
    } else {
      assert.equal(metrics.routeLineDisplay, 'missing');
      assert.ok(metrics.coverVisual.top < viewport.height);
      assert.ok(metrics.coverImage.height >= 38,
        'the phone apparatus plot must retain a visible drawing band');
      assert.ok(metrics.coverImage.width >= metrics.coverVisual.width * 0.8,
        'the phone apparatus image must occupy most of the content width');
      assert.ok(metrics.coverImage.bottom <= Math.min(
        ...metrics.coverLabels.map((label) => label.top)) + 1,
      'the phone apparatus plot and label rail must not overlap');
      assert.ok(metrics.coverLabels.every((label) =>
        label.top >= metrics.coverVisual.top &&
        label.bottom <= metrics.coverVisual.bottom + 1),
      'the four cover labels must stay integrated inside the compact apparatus');
      assert.ok(metrics.coverVisual.bottom <= metrics.primaryAction.top + 1,
        'the phone cover apparatus must lead directly into the primary action');
      assert.equal(metrics.mobileDominant.length, 4);
      assert.deepEqual(metrics.mobileDominant.map((visual) => visual.name), [
        'cover-apparatus',
        'decision-environment',
        'method-convergence',
        'ledger-anatomy',
      ]);
      assert.ok(metrics.mobileDominant.every((visual) => visual.height >= 83.5));
      assert.equal(metrics.zoneTops.length, 3);
      assert.ok(metrics.zoneTops.every((top, index, values) =>
        index === 0 || top > values[index - 1]), 'phone nodes follow semantic order');
      assert.ok(metrics.routeTops.every((top, index, values) =>
        index === 0 || top > values[index - 1]), 'mobile zone lists stack without a universal timeline');
      assert.ok(metrics.phoneNodeConnectors.every((content) =>
        content === 'none' || content === 'normal'),
      'phone zone lists must not draw down-arrow connectors');
      const maxPathwayHeight = viewport.width <= 360 ? 1950 : 1680;
      assert.ok(metrics.pathway.height <= maxPathwayHeight,
        `mobile pathway should be compressed: ${metrics.pathway.height}`);
      assert.deepEqual(metrics.layoutMode, {
        coverDisplay: 'block',
        pathwayColumnCount: 1,
        engagementArticleDisplay: 'block',
        engagementColumnCount: viewport.width <= 359 ? 1 : 2,
        methodDisplay: 'block',
        ledgerRowsDisplay: 'block',
        gutCheckDisplay: 'block',
      });
    }

    if (viewport.width <= 480) {
      assert.ok(metrics.coverCaptionSizes.every((size) => size >= 11.5),
        'cover apparatus captions must remain at least 11.5px through the 480px boundary');
    }

    if (viewport.width <= 479) {
      for (const [selector, sizes] of Object.entries(metrics.denseBodySizes)) {
        assert.ok(sizes.length > 0, `${selector} must resolve to live dense body copy`);
        assert.ok(sizes.every((size) => size >= 14.5),
          `${selector} must remain at least 14.5px on compact phones`);
      }
      assert.equal(metrics.engagementPrimaryRects.length, 6,
        'the compact engagement rail must retain six primary decision fields');
      assert.equal(metrics.engagementDetailRects.length, 6,
        'the compact engagement rail must retain six secondary detail fields');
      assert.ok(metrics.engagementPrimaryRects.every((field) => {
        const rail = metrics.engagementRails[field.articleIndex];
        return field.width >= rail.width * 0.9 &&
          Math.abs(field.left - rail.left) <= 2 && Math.abs(field.right - rail.right) <= 2;
      }), 'compact-phone primary engagement fields must span their card rail');
      assert.ok(metrics.copyGutCheck && metrics.gutCheckAction,
        'both final gut-check controls must be visible on compact phones');
      assert.ok(Math.abs(metrics.copyGutCheck.left - metrics.gutCheckAction.left) <= 2 &&
        Math.abs(metrics.copyGutCheck.right - metrics.gutCheckAction.right) <= 2,
      'the copy control and final action must align to one compact-phone rail');
    }

    if (viewport.width <= 359) {
      assert.ok(metrics.ledgerSecondaryColumns.every((count) => count === 1),
        'secondary ledger details must stack below 360px');
    } else if (viewport.width <= 480) {
      assert.ok(metrics.ledgerSecondaryColumns.every((count) => count === 2),
        'secondary ledger details must retain two columns from 360px');
    }

    if (['320x568', '320x700', '359x640', '360x640'].includes(viewport.name)) {
      assert.ok(metrics.coverVisual.bottom <= viewport.height + 1,
        'the complete four-stage apparatus must fit inside the short-phone viewport');
      assert.ok(metrics.primaryAction.bottom <= viewport.height + 1,
        'the primary action must fit inside the short-phone viewport');
    }

    assert.deepEqual(errors, []);
    await page.close();
  });
}

test('enforces both hero-ledger width and height thresholds', async () => {
  for (const viewport of [
    { width: 1439, height: 900, visible: false },
    { width: 1440, height: 799, visible: false },
    { width: 1440, height: 800, visible: true },
    { width: 1920, height: 799, visible: false },
    { width: 1920, height: 1080, visible: true },
  ]) {
    const page = await browser.newPage({ viewport });
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const state = await page.evaluate(() => {
      const ledger = document.querySelector('.hero-ledger-anatomy');
      const cover = document.querySelector('.document-cover');
      if (!ledger) return { display: 'missing', ledger: null, cover: null };
      const box = (element) => {
        const rect = element.getBoundingClientRect();
        return { top: rect.top, right: rect.right, bottom: rect.bottom, left: rect.left };
      };
      return { display: getComputedStyle(ledger).display,
        ledger: box(ledger), cover: box(cover) };
    });

    if (viewport.visible) {
      assert.notEqual(state.display, 'none',
        `${viewport.width}x${viewport.height} must show the illustrative ledger`);
      assert.ok(state.ledger.left >= state.cover.left - 1 &&
        state.ledger.right <= state.cover.right + 1 &&
        state.ledger.top >= state.cover.top - 1 &&
        state.ledger.bottom <= state.cover.bottom + 1,
      `${viewport.width}x${viewport.height} ledger must stay inside the cover`);
    } else {
      assert.equal(state.display, 'none',
        `${viewport.width}x${viewport.height} must hide the illustrative ledger`);
    }
    await page.close();
  }
});

test('keeps the 840px and 841px compositions in the same tablet mode', async () => {
  const states = [];
  for (const width of [840, 841]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    states.push(await page.evaluate(() => ({
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
    })));
    await page.close();
  }
  assert.deepEqual(states[0], states[1]);
});

test('keeps Failure Register summary fields in separate tablet columns', async () => {
  const viewports = [
    { width: 768, height: 1024 },
    { width: 840, height: 900 },
    { width: 841, height: 900 },
    { width: 1023, height: 768 },
  ];

  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    const rows = await page.locator('.failure-rows summary').evaluateAll((summaries) =>
      summaries.map((summary) => {
        const summaryRect = summary.getBoundingClientRect();
        const spans = [...summary.querySelectorAll(':scope > span')]
          .filter((span) => {
            const style = getComputedStyle(span);
            return style.display !== 'none' && style.visibility !== 'hidden' &&
              span.getClientRects().length > 0;
          })
          .map((span) => {
            const rect = span.getBoundingClientRect();
            return { left: rect.left, right: rect.right, text: span.textContent.trim() };
          })
          .sort((a, b) => a.left - b.left);
        return {
          summary: { left: summaryRect.left, right: summaryRect.right },
          spans,
        };
      }));

    for (const [rowIndex, row] of rows.entries()) {
      assert.equal(row.spans.length, 3,
        `${viewport.width}px row ${rowIndex + 1} must expose three summary fields`);
      for (const span of row.spans) {
        assert.ok(span.left >= row.summary.left - 1 && span.right <= row.summary.right + 1,
          `${viewport.width}px ${span.text} must stay inside its summary`);
      }
      for (let index = 1; index < row.spans.length; index += 1) {
        assert.ok(row.spans[index - 1].right <= row.spans[index].left + 1,
          `${viewport.width}px summary fields must not overlap: ` +
          `${row.spans[index - 1].text} / ${row.spans[index].text}`);
      }
    }
    await page.close();
  }
});

test('marks both navigation treatments with the exact active section value', async () => {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  await page.locator('#failure-register').evaluate((element) =>
    element.scrollIntoView({ block: 'start' }));
  await page.waitForFunction(() =>
    document.documentElement.dataset.activeSection === 'failure-register');

  const state = await page.evaluate(() => {
    const links = [...document.querySelectorAll(
      '[data-section="failure-register"]',
    )];
    const visibleLink = links.find((link) => {
      const style = getComputedStyle(link);
      return style.display !== 'none' && style.visibility !== 'hidden' &&
        link.getClientRects().length > 0;
    });
    const orangeProbe = document.createElement('span');
    orangeProbe.style.color = 'var(--orange)';
    document.body.append(orangeProbe);
    const orange = getComputedStyle(orangeProbe).color;
    orangeProbe.remove();
    return {
      currentValues: links.map((link) => link.getAttribute('aria-current')),
      visibleBorder: getComputedStyle(visibleLink).borderBottomColor,
      orange,
    };
  });

  assert.deepEqual(state.currentValues, ['true', 'true']);
  assert.equal(state.visibleBorder, state.orange,
    'the visible current-section treatment must use the orange rule');
  await page.close();
});

test('caps desktop section type when the content rail stops growing', async () => {
  const sizes = [];
  for (const width of [1440, 1920]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    sizes.push(await page.locator('h2').first().evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).fontSize)));
    await page.close();
  }
  assert.ok(Math.abs(sizes[0] - sizes[1]) <= 0.1,
    `section type must stop growing with the capped rail: ${sizes.join(', ')}`);
});

test('keeps keyboard-focused directory links inside the horizontal track', async () => {
  const page = await browser.newPage({ viewport: { width: 320, height: 700 } });
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  await page.locator('.chapter-directory').scrollIntoViewIfNeeded();
  const pageScrollBefore = await page.evaluate(() => scrollY);

  for (const position of ['last', 'first']) {
    const geometry = await page.evaluate(async (linkPosition) => {
      const track = document.querySelector('.chapter-directory-track');
      const links = [...track.querySelectorAll('a')];
      if (linkPosition === 'last') track.scrollLeft = 0;
      const link = linkPosition === 'last' ? links.at(-1) : links[0];
      link.focus();
      await new Promise((resolve) => requestAnimationFrame(() =>
        requestAnimationFrame(resolve)));
      const trackRect = track.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      return {
        trackLeft: trackRect.left,
        trackRight: trackRect.right,
        linkLeft: linkRect.left,
        linkRight: linkRect.right,
        pageScrollY: scrollY,
      };
    }, position);
    assert.ok(geometry.linkLeft >= geometry.trackLeft - 1 &&
      geometry.linkRight <= geometry.trackRight + 1,
    `${position} directory link must be fully contained by its track`);
    assert.ok(Math.abs(geometry.pageScrollY - pageScrollBefore) <= 1,
      'directory focus must scroll only the horizontal track');
  }
  await page.close();
});

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
