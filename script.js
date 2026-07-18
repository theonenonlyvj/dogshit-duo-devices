export function stageForRatio(ratio) {
  if (ratio < 0.25) return 'brief';
  if (ratio < 0.5) return 'buyers';
  if (ratio < 0.75) return 'evidence';
  return 'execution';
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

  if (copyButton && copyStatus) {
    copyButton.addEventListener('click', async () => {
      const questions = [...doc.querySelectorAll('.gut-check-questions li')]
        .map((question, index) => `${index + 1}. ${question.textContent.trim()}`);

      try {
        const navigator = globalThis.navigator;
        if (questions.length !== 5 || !navigator || !navigator.clipboard ||
            typeof navigator.clipboard.writeText !== 'function') {
          throw new Error('Clipboard unavailable');
        }
        await navigator.clipboard.writeText(questions.join('\n'));
        copyStatus.textContent = 'Commercial gut-check copied.';
      } catch {
        copyStatus.textContent =
          'Copy unavailable — select the checklist below.';
      }
    });
  }
}
