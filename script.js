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
  const root = doc.documentElement;
  const Observer = globalThis.IntersectionObserver;
  const revealSections = [...doc.querySelectorAll('.reveal')];
  const sectionLinks = [...doc.querySelectorAll('.field-index [data-section]')];
  const sectionTargets = sectionLinks
    .map((link) => doc.getElementById(link.dataset.section))
    .filter(Boolean);

  const setActiveSection = (id) => {
    root.dataset.activeSection = id;
    for (const link of sectionLinks) {
      if (link.dataset.section === id) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
  };

  if (typeof Observer === 'function') {
    const visibleSections = new Map();
    const sectionObserver = new Observer((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleSections.set(entry.target, entry.intersectionRatio);
        else visibleSections.delete(entry.target);
      }

      const active = [...visibleSections].sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1];
        return Math.abs(a[0].getBoundingClientRect().top) -
          Math.abs(b[0].getBoundingClientRect().top);
      })[0];
      if (active) setActiveSection(active[0].id);
    }, {
      rootMargin: '-18% 0px -64%',
      threshold: [0, 0.2, 0.5, 0.8, 1],
    });

    for (const section of sectionTargets) sectionObserver.observe(section);

    const revealObserver = new Observer((entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -8%' });

    for (const section of revealSections) revealObserver.observe(section);
  } else {
    for (const section of revealSections) section.classList.add('is-visible');
  }

  let progressFrame;
  const updateProgress = () => {
    progressFrame = undefined;
    const scrollRange = root.scrollHeight - globalThis.innerHeight;
    const progress = scrollRange > 0
      ? Math.min(1, Math.max(0, globalThis.scrollY / scrollRange))
      : 1;
    root.style.setProperty('--page-progress', progress.toFixed(4));
  };
  const queueProgress = () => {
    if (progressFrame) return;
    progressFrame = globalThis.requestAnimationFrame(updateProgress);
  };
  globalThis.addEventListener('scroll', queueProgress, { passive: true });
  globalThis.addEventListener('resize', queueProgress, { passive: true });
  updateProgress();

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
          'Copy is blocked here. The questions are selected; press Command/Ctrl+C.';
      }
    });
    copyButton.hidden = false;
  }
}
