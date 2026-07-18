# Council Revision Implementation Plan

**Goal:** Ship the visual-QA and expert-council consensus without changing the site's identity or public boundary.

**Architecture:** Keep the dependency-free HTML/CSS/ES-module implementation. Reorder semantic sections in HTML, consolidate duplicated method presentation, adjust responsive CSS, and add an honest selectable clipboard fallback in the existing progressive enhancement.

## Tasks

- [x] Add failing tests for the new narrative, order, claims language, compact-cover CSS contract, safe heading wrapping, first-open disclosure, and clipboard-selection fallback.
- [x] Reorder and revise the semantic page while preserving stable section anchors and accessibility.
- [x] Rework the cover and responsive layout to satisfy the measured desktop and mobile criteria.
- [x] Add the clipboard fallback with an initially hidden, read-only text area that becomes selected when copying is blocked.
- [x] Update the social-card source and regenerate its 1200 by 630 PNG.
- [x] Run automated tests and whitespace checks.
- [x] Repeat desktop, mobile, interaction, overflow, target-size, and console visual QA.
- [x] Request independent release review and implement any verified blocking feedback.
- [ ] Commit anonymously, push `main`, and verify GitHub Pages over HTTPS.
