# Visual Sales Journey Experiment Design

**Status:** Approved for branch implementation after owner review of the visual
storyboard and the instruction to review it independently and keep going.

## Objective

Create an experimental version of the Dogshit Duo Devices site that tells a
stronger sales story through purposeful illustrations, diagrams, and visual
artifacts. Preserve the published site's identity and most of its copy. Reduce
text-block fatigue by making each major visual answer a buyer question that the
copy currently carries alone.

The branch is designed phone first. The 390-pixel composition is the canonical
sales experience, not a reduced desktop layout. Desktop expands that system
without changing its reading order or commercial argument.

The experiment lives on `experiment/visual-sales-journey`. The published `main`
branch remains unchanged until the owner explicitly chooses to replace it.

## Immutable Foundation

The experiment keeps these distinctive assets:

- The paper, carbon, teal, orange, steel, and umber palette.
- Condensed display typography, highly legible body typography, monospaced
  labels, square geometry, thin rules, and restrained motion.
- The primary headline: `When a medtech sale stalls, inspect the pathway, not
  just the funnel.`
- The paired method: `Clinical reality` plus `Engineering discipline`.
- The operating vocabulary of stakeholder, decision, evidence, ownership,
  handoff, owner state, timing state, and smallest next move.
- The closing contrast: `Serious operators. Unfortunate name.`
- The serious consulting guise, anonymous public boundary, and dry humor.

The experiment does not become a stock-photo medtech site, a methodology book
report, an industrial cartoon, or a generic SaaS dashboard.

## Sales Story

The page follows seven buyer belief shifts.

Its central reframe is declarative: `The commercial pathway is broken.` The
page earns that statement by showing the recurring symptoms, interdependent
decisions, and handoff failures immediately after the cover.

### 1. Recognition

**Buyer question:** Is this my live commercial problem?

Keep the cover headline, scope line, pressure-test lede, operator lenses, and
primary action. Remove the early secondary jump to engagement cards. Add a
compact diagnostic apparatus that connects three existing stall signals to an
accountable next move:

`stall signal → pathway inspection → named break → owner and smallest move`

The apparatus is qualitative. It shows no numbers, scores, timelines, or
outcome claims.

### 2. Diagnosis

**Buyer question:** Which recurring failure pattern are we seeing?

Keep all five failure-register domains, translations, and pressure-test
questions. Preserve the strongest existing lines rather than rewriting them.
Visually organize the five domains into three engagement-aligned families:

- Decision story: commercial story.
- Stakeholder pathway: sales motion and leadership.
- Field transfer: team build and launch readiness.

One composite inspection plate shows the five faults inside the three families.
The existing detail disclosures remain available for deeper reading.

### 3. Reframe

**Buyer question:** Who must decide what, and where can momentum die?

Move `A funnel is not a buying environment` ahead of the engagement offers.
Replace the linear snake route with the signature annotated stakeholder
decision environment. The graphic has three connected zones:

- Adoption: user and clinical champion.
- Resource and approval: economic buyer and value analysis.
- Operationalization: contracting, implementation, field learning, and
  repeatability.

Show explicit gates between zones, retain `APPROVAL ≠ USE`, and add a feedback
route from field learning to story, evidence, implementation, and repeatability.
Label the model illustrative because roles and order vary by organization.

The graphic must not imply a universal timeline, measured flow, reporting
hierarchy, or single decision-maker.

### 4. Engagement Fit

**Buyer question:** Which bounded engagement matches the live failure?

Keep all three engagement names and the `Use when`, `Working format`, `Who
joins`, and `Hand-back` content. Change hierarchy more than wording. Lead each
row with `Use when` and `Hand-back`, then make room and format details available
without giving every attribute equal visual weight.

Add a compact selector that maps:

- Conflicting diagnoses across handoffs to `Pathway Autopsy`.
- Product explanation without a decision to `Pitch Decontamination`.
- A motion that depends on a hero to `Field Transfer`.

The section presents no tiers, popularity badges, durations, pricing, or
outcome promises.

### 5. Method Confidence

**Buyer question:** Is this a repeatable procedure or two branded opinions?

Keep `Two passes. One accountable hand-back.`, both existing lens
descriptions, and the five moves. Visualize the lenses as parallel inspection
passes operating inside the same five-move procedure. Both converge on one
decision ledger.

The diagram makes clear that `Engineering discipline` means commercial-system
constraints and operating rigor, not product-engineering consulting.

### 6. Tangible Hand-Back

**Buyer question:** What will my team actually receive?

Keep the exact disclaimer: `Illustration, not client evidence. A generic
example of the hand-back structure.`

Show one complete ledger row as an annotated specimen. Call out the stakeholder
decision, failure signal, internal next-move owner, owner state, timing state,
and smallest next move. Present the other two generic examples more compactly.
Unset owner or timing states are explicitly framed as exposed gaps, not as
completed accountability.

### 7. Personality and Immediate Utility

**Buyer question:** Can I trust the judgment and use the thinking now?

Move the existing DDD name reveal from immediately after the cover to a compact
serial-plate beat after the method and ledger have earned credibility. Preserve
its core joke. Keep the medtech-specific controlled-burn lines and all five
gut-check questions.

The final action sequence is:

1. Copy the five-question gut-check.
2. Use conflicting answers across functions as a signal of a pathway problem.
3. Match that live problem to the relevant engagement.

The site remains a self-qualification, referral, and live-conversation tool. It
does not add an unauthorized form, personal contact channel, or lead-tracking
system.

## Visual System

The signature asset is the annotated commercial pathway schematic. The broader
grammar is a fictional commercialization apparatus drawn like a restrained
technical field manual. It uses orthographic linework, square joints,
inspection arrows, numbered callouts, orange fault tags, teal clinical-reality
annotations, and carbon engineering constraints.

The page uses no more than eight authored visual moments:

1. Cover diagnostic apparatus.
2. Five-fault inspection plate.
3. Stakeholder decision environment.
4. Engagement-fit selector.
5. Dual-pass convergence map.
6. Annotated decision-ledger specimen.
7. DDD serial plate and controlled-burn transition.
8. Five-point preflight mark for the gut-check.

Every visual must explain a stakeholder, decision, gate, failure, handoff,
constraint, owner, or next move. Decorative gears, funnels, stethoscopes,
product renders, headshots, hospitals, anonymous teams, glowing waveforms,
gradients, glass effects, fake dashboards, and literal joke imagery are banned.

## Asset Strategy

Use semantic HTML, CSS, and authored SVG for the core visual system. Do not use
generated photorealism or stock media. Raster artwork is not required for this
experiment because the technical-manual visual language is more intentional,
more accessible, more responsive, and less likely to look fabricated when
drawn as vectors.

All substantive words remain live HTML. Complex graphics have an adjacent
semantic equivalent. Inline SVGs with unique meaning use `role="img"`, a unique
`title`, and a concise `desc`. When adjacent HTML already carries the complete
meaning, the SVG is hidden from assistive technology.

## Responsive Pacing

Design the 390-pixel version first. Its opening viewport contains the headline,
a meaningful fragment of the diagnostic apparatus, and the primary action.
The apparatus is not a decorative background and the action remains reachable
without an initial scroll marathon.

At 320 to 430 pixels, every chapter retains a visual signature. Four graphics
remain dominant:

1. Cover diagnostic apparatus.
2. Stakeholder decision environment.
3. Dual-pass convergence map.
4. Annotated ledger specimen.

The failure plate, engagement selector, serial plate, and preflight mark become
compact row marks or simplified diagrams. They remain meaningful and visible.
They do not shrink a desktop graphic until its labels become unreadable.

Desktop shows all seven to eight visual moments with more generous diagrams,
one dominant graphic per major chapter, and quiet space between them. Visuals
occupy existing column space or replace equivalent prose density rather than
extending the page.

Keep the current document-height ceilings:

- 7,400 pixels at 1,280 by 720.
- 11,400 pixels at 320 by 700.
- 10,225 pixels at 390 by 844.
- 9,950 pixels at 430 by 932.

Maintain zero horizontal overflow, 44-pixel controls, the initial cover action,
readable heading wraps, and no layout shift from graphics.

## Motion and Resilience

New graphics enter with the existing section reveal only. No element receives
independent path drawing, looping motion, parallax, scroll scrubbing, or layout
animation. Maximum motion remains opacity plus eight pixels of translation
inside the existing 380-millisecond reveal.

With reduced motion, all elements are immediately visible. With JavaScript
disabled, every decision, failure signal, engagement, method step, ledger field,
and gut-check question remains available in document order.

## Performance Budget

- No third-party requests or runtime libraries.
- No new first-viewport raster request.
- No more than 60 KiB of authored SVG source before transfer compression.
- No individual SVG above 12 KiB without a documented reason.
- First-view transfer remains below 250 KiB on mobile and 320 KiB on desktop.
- Layout shift remains at or below 0.05.

## Council Gates

Five specialist seats review the branch before it is presented as a candidate
for `main`:

1. Editorial art and information design.
2. Medtech buyer-journey and consulting credibility.
3. Enterprise sales narrative and complex-deal logic.
4. Positioning, messaging, memory, and brand distinctiveness.
5. Accessibility, responsive behavior, and performance.

The primary agent verifies every council finding against the implementation.
Council preference alone does not justify a change. Only evidence-backed P0,
P1, and P2 findings are implemented before the branch preview is handed back.

## Acceptance Criteria

A reader scanning only headings and graphics can answer, in order:

1. Is this my commercial problem?
2. Which failure pattern do we have?
3. Who must decide what?
4. Where can momentum fail?
5. Which engagement fits?
6. How does the work proceed?
7. What comes back to the team?
8. What can we do before the next meeting?

Source contracts must prove the approved section order, exact immutable copy,
five-to-three failure mapping, illustrative labels, no em dash characters,
no personal or fabricated proof, SVG accessibility, no external media, and the
branch-specific visual components.

Real-browser contracts must prove the existing viewport geometry, current
document-height ceilings, no horizontal overflow, readable visual labels,
no-JavaScript usefulness, reduced-motion behavior, and zero console errors.

The experiment is complete only when the local visual review, full automated
gate, five-seat adversarial council, anonymous branch commit, and pushed remote
branch all succeed. `main` is not changed by this work.
