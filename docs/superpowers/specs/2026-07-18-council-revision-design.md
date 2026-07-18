# Dogshit Duo Devices Council Revision

## Objective

Revise the live page in place so its controlled-document identity remains intact while the first screen, persuasion order, and comic timing work at real desktop and mobile sizes.

The revision is based on a pre-implementation visual QA pass plus two independent councils: five target-customer roles, five medtech marketing/sales/brand roles, and a five-voice comedy annex. The shared verdict is to preserve the identity and rebuild the order of persuasion.

## Evidence and decisions

- The 1280 by 720 cover currently reaches 1,144px. Both operator descriptions and the primary action are below the first viewport.
- The current desktop headline occupies 532px vertically at 98.56px.
- A forced 390px render splits `customers` mid-word and does not reach the supporting offer or action.
- Live navigation works, there is no horizontal overflow or console noise, and every interactive target is at least 44px.
- Clipboard access is unavailable in the tested browser. The fallback points `below` even though the checklist is above it.

The release will therefore:

1. Compress and reposition the cover around a buyer trigger, two operator lenses, and two internal actions.
2. Move recognition and hireable uses ahead of theory: cover, name reveal, failure register, engagements, pathway, combined method, controlled burn, gut-check.
3. Merge the repetitive lens and procedure material into one compact operating-method section.
4. Fix heading wrapping at all widths and treat 320, 390, 430, and 1280 by 720 as acceptance widths.
5. Keep the humor sparse: one name reveal, field-recognition translations, three controlled-burn lines, and a final callback.
6. Define conversion as useful self-diagnosis, not lead capture.

## Approved narrative

### Cover

- Eyebrow: `MEDICAL DEVICE COMMERCIALIZATION / TWO OPERATOR LENSES`
- H1: `When a medtech sale stalls, the problem is rarely the funnel. It's the pathway.`
- Scope: `For teams facing stalled deals, fragile launches, or a sales motion that depends on one heroic person.`
- Lede: `We pressure-test the story, stakeholders, evidence, ownership, and handoffs—then turn the failure points into accountable next moves.`
- Clinical reality: `Who must change behavior, what earns trust, and where adoption breaks.`
- Commercial system: `Who decides, who owns the handoffs, and whether the motion repeats without a hero.`
- Primary action: `Find where the pathway breaks` → `#failure-register`
- Secondary action: `See ways to use the duo` → `#engagements`

### Reveal and recognition

The first deliberate scroll reveals:

`DDD stands for Dogshit Duo Devices. We tried a more polished name. It sounded like the problem.`

The support line is:

`Plain language gets weak assumptions out of the meeting and into the work.`

The failure-register heading becomes `Where the commercial motion actually breaks.` Its first disclosure is open by default. The five translations are concise scar-tissue recognition, not a stream of jokes.

### Engagements and pathway

The engagement heading becomes `Bring the problem that keeps surviving the meeting.` Each offer retains `Use when` and `Leave with`, with claims review routed to the appropriate internal owners.

The pathway is explicitly a set of roles and handoffs, not a universal linear funnel. Each role uses `Must decide` and `Breaks when` so the framework can be applied rather than merely admired. Procurement and implementation include evidence fit and resource impact.

### Combined method

One section titled `Two passes. One accountable hand-back.` replaces the separate lens cards and procedural ledger. It names clinical reality and engineering/commercial system as the two passes, then gives five compact steps:

1. Pin the real decision.
2. Run the clinical-reality pass.
3. Run the engineering and commercial-system pass.
4. Red-team the story, evidence, ownership, and handoffs.
5. Assign the smallest next moves, owners, and dates.

The existing `operators` and `procedure` anchors remain available inside this combined section for stable internal navigation.

### Close

The controlled burn contains three lines:

- `A funnel is a picture. Buying is behavior.`
- `Alignment without an owner is synchronized nodding.`
- `If it only works in PowerPoint, it does not work.`

The gut-check stays useful and serious. The final callback is `Bad name. Better next move.` immediately before the required public-scope footer.

## Visual behavior

- Keep the paper, carbon, steel, teal, orange, and umber palette; square geometry; thin rules; monospaced labels; condensed display type; and no shadows, gradients, stock imagery, logos, or decorative device renders.
- At 1280 by 720, the complete primary action and both operator descriptions must finish by approximately y=680. The cover should be no taller than one viewport at that size.
- Use a 7/5 desktop cover split with a 64–72px headline at 1280px, a compact rail, and 48–64px cover padding.
- At mobile widths, use normal word wrapping, no hyphenation, balanced headings, a 44–54px H1, 24px-equivalent gutter behavior, a full-width primary action, and the content order eyebrow → H1 → scope → actions → lede → operator register.
- Reduce general section spacing without turning the page into a dashboard. The name reveal should act as a compact register strip.
- Open the first failure translation by default. Add no new animation.

## Clipboard behavior

The button reads `Copy or select the five questions`. If Clipboard API access fails, JavaScript reveals a plain-text fallback, selects it, focuses it, and reports:

`Copy is blocked here. The questions are selected—press Command/Ctrl+C.`

The questions remain fully usable without JavaScript; no dependency, download service, or backend is introduced.

## Public and safety boundaries

The site remains anonymous and public-safe. It includes no personal identities, employers, clients, biographies, contact route, tracking, fabricated metrics, testimonials, logos, or medical/regulatory/quality/reimbursement advice. The social description changes from `Clinical truth` to `Clinical perspective` to avoid overclaiming. Existing footer boundaries, semantic disclosures, reduced-motion behavior, relative URLs, and touch-target requirements remain.

## Release acceptance

- Automated source, privacy, metadata, enhancement, responsive-contract, and Pages checks pass.
- Visual QA at desktop and forced mobile shows no mid-word heading breaks, no horizontal overflow, and the intended first-screen hierarchy.
- Browser checks confirm internal navigation, disclosure behavior, clipboard success or selected fallback, clean console, and 44px targets.
- An independent release reviewer finds no blocking defect.
- Only after those checks is the anonymous commit pushed to `main` and the public Pages result verified over HTTPS.
