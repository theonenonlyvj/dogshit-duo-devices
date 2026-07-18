export function stageForRatio(ratio) {
  if (ratio < 0.25) return 'brief';
  if (ratio < 0.5) return 'buyers';
  if (ratio < 0.75) return 'evidence';
  return 'execution';
}

export async function writeClipboardWithTimeout(clipboard, text, timeoutMs = 700) {
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = globalThis.setTimeout(() => {
      reject(new Error('Clipboard request timed out'));
    }, timeoutMs);
  });

  try {
    await Promise.race([clipboard.writeText(text), timeout]);
  } finally {
    globalThis.clearTimeout(timeoutId);
  }
}

const doc = globalThis.document;

if (doc) {
  const Observer = globalThis.IntersectionObserver;
  const stageSections = [...doc.querySelectorAll('[data-stage]')];
  const revealSections = [...doc.querySelectorAll('.reveal')];

  if (typeof Observer === 'function') {
    const visibleStages = new Map();
    const stageObserver = new Observer((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          visibleStages.set(entry.target, entry.intersectionRatio);
        } else {
          visibleStages.delete(entry.target);
        }
      }

      const active = [...visibleStages].sort((a, b) => b[1] - a[1])[0];
      if (active) {
        const stage = active[0].dataset.stage;
        doc.documentElement.dataset.activeStage = stage;
        doc.body.dataset.activeStage = stage;
      }
    }, {
      rootMargin: '-35% 0px -55%',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    for (const section of stageSections) stageObserver.observe(section);

    const revealObserver = new Observer((entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -10%' });

    for (const section of revealSections) revealObserver.observe(section);
  } else {
    for (const section of revealSections) section.classList.add('is-visible');
  }

  const copyButton = doc.querySelector('.copy-gut-check');
  const copyStatus = doc.querySelector('.copy-status');
  const copyFallback = doc.querySelector('.copy-fallback');

  if (copyButton && copyStatus && copyFallback) {
    copyButton.addEventListener('click', async () => {
      const questions = [...doc.querySelectorAll('.gut-check-questions li')]
        .map((question, index) => `${index + 1}. ${question.textContent.trim()}`);
      const questionText = questions.join('\n');

      try {
        const navigator = globalThis.navigator;
        if (questions.length !== 5 || !navigator || !navigator.clipboard ||
            typeof navigator.clipboard.writeText !== 'function') {
          throw new Error('Clipboard unavailable');
        }
        await writeClipboardWithTimeout(navigator.clipboard, questionText);
        copyFallback.hidden = true;
        copyStatus.textContent = 'Commercial gut-check copied.';
      } catch {
        copyFallback.value = questionText;
        copyFallback.hidden = false;
        copyFallback.focus();
        copyFallback.select();
        copyStatus.textContent =
          'Copy is blocked here. The questions are selected—press Command/Ctrl+C.';
      }
    });
  }
}
