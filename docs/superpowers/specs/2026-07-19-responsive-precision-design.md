# Responsive Precision Design

## Objective

Make the current Dogshit Duo Devices sales page feel intentionally composed from compact phones through ultrawide desktop monitors. Preserve the copy, buyer-belief sequence, field-document visual language, and delayed name reveal. Correct the diagram geometry, navigation, density, and breakpoint behavior that currently weaken credibility.

## Approved Direction

Use a targeted responsive precision pass. Do not redesign the page or rewrite the sales story. The existing order remains:

1. Recognize recurring failure signals.
2. Diagnose the pathway rather than blaming the funnel.
3. Route the buyer to a concrete engagement.
4. Demonstrate the two-pass operating method and accountable hand-back.
5. Reveal the name and burn down empty consulting language.
6. End with a useful commercial gut-check.

## Responsive System

The page uses component-driven layout changes instead of one universal breakpoint cliff.

- Compact phone: up to 359px.
- Phone: 360px to 479px.
- Wide phone and tablet: 480px to 1023px.
- Desktop: 1024px and above.
- The in-flow chapter strip remains available through 1423px. The fixed field index begins at 1424px, where a 44px control and an 8px gap fit outside the capped rail.
- Content remains capped at 82rem on wide monitors.
- Display type stops growing when the content rail stops growing.
- Body copy remains at least 14.5px in dense phone artifacts and at least 16px in ordinary prose.
- Meaningful diagram captions remain at least 11.5px. Smaller text is reserved for serial metadata.
- Interactive targets remain at least 44px in both dimensions where the target is compact.

Components may change layout inside these tiers when their content requires it, but no component may change personality across a one-pixel boundary without a measurable content reason.

The previous page-wide 840px split is removed. Cover, pathway, engagements, method, ledger, manifesto, gut-check, and navigation each declare their own responsive behavior. The 840px and 841px renders remain in the same tablet mode. Desktop composition begins at 1024px; navigation changes independently at 1424px.

## Rail and Color Contract

- Carbon marks document structure.
- Steel marks subordinate division.
- Teal marks diagnosis and pathway logic.
- Orange marks failure, exception, or action.
- Every diagram station aligns with its caption or key column.
- No rule, connector, or decorative path crosses live copy.
- Plot bands and live HTML caption bands are separate layout regions.
- The content rail, field index, headings, diagrams, and final actions share a visible alignment system.

## Diagram Corrections

### Buying Pathway

Retain the six roles, three zones, two handoff failures, and feedback route. Remove the global stretched SVG overlay. Draw each zone's vertical connection from its own route-node lane using card-attached CSS geometry and a reserved 4.5rem connector gutter. Render the field-learning feedback route in its own band below the cards. No connector depends on fixed viewBox coordinates or independently sized row tracks. Desktop connectors align with their local route-node centers and remain outside text rectangles. Mobile shows the same semantic order without a global overlay.

### Failure Plate

The three boxes in the SVG must occupy the same three equal columns as the live key below it. Retain the existing `0 0 640 240` intrinsic ratio and HTML dimensions. Render it in a controlled full-width plot band: 7rem on compact phones and `clamp(8rem, 13vw, 10rem)` elsewhere. Use `object-fit: fill` so actual artwork occupancy, not only the image element, spans the live key rail. Remove CSS width caps and letterboxing that separate the plot from its live key.

### Method Convergence

The graphic must express three equal stages: Clinical reality, Engineering discipline, and Accountable hand-back. Retain the existing `0 0 640 240` intrinsic ratio and HTML dimensions. Render it in a controlled full-width plot band: 6rem on compact phones and `clamp(6rem, 10vw, 8rem)` elsewhere. Use `object-fit: fill` so actual artwork occupancy spans the caption rail. The final orange hand-back mark belongs in the third stage rather than the first third of the caption rail. Remove `object-fit: contain` and maximum-height rules that currently letterbox the plot.

## Navigation and Orientation

- Wide desktop from 1424px retains the compact fixed field index, anchored 8px outside the capped content rail rather than to the viewport edge.
- The fixed index is hidden where a complete 44px control cannot fit outside the rail.
- Phones, tablets, and narrower desktops through 1423px receive a separate, non-fixed, horizontally scrollable chapter directory immediately after the cover.
- Chapter links retain 44px targets and use the existing section labels.
- The chapter directory includes a visible `FIELD INDEX / SWIPE` label and an orange continuation rule rather than a gradient. Links do not wrap, keyboard focus scrolls the focused link fully into view, and the current section is marked by the existing intersection observer.
- The chapter directory must not obscure content, increase document width, or introduce a persistent overlay.

## Phone Density

- Increase the cover apparatus height and caption size so all four stages act as sales content, not microprint.
- Preserve the four-stage wording and artwork.
- Engagement definitions reset browser `dd` margins at every width.
- On all phones, the two primary engagement fields use the full card width. Secondary details use two columns from 360px through 479px and one column below 360px.
- On compact phones, secondary decision-ledger fields stack to one column.
- Remove the 360px headline-size inversion. Narrower phones must not receive a larger, taller headline than wider phones.
- Align the copy control and internal action in the final section to one mobile rail.
- On short phones, the complete four-stage apparatus and primary action remain in the first viewport. The operator register may continue below the fold rather than being compressed into unreadable type.
- Dense phone copy means `.engagement-rows dd`, `.ledger-row dd`, `.pathway-zone-route li > p:not(.route-label, .route-alert)`, and `.operator-register dd`. Each is at least 14.5px through 479px.

## Desktop Composition

- Stop `h2` growth after the 82rem content cap so wider monitors do not create new headline wraps.
- Keep the existing editorial asymmetry in the hero.
- Add a compact, explicitly illustrative decision-ledger anatomy to the hero's lower-right area from 1440px upward when the viewport is at least 800px tall. It must reuse existing concepts, contain no links or outcome claims, and must not imply client evidence.
- Render the five gut-check questions as five vertical rows at every width. Avoid an orphaned fifth item in a two-column zigzag.
- Remove the orange fill from the static `05` preflight marker unless it represents a real state.

## Accessibility and Public-Site Constraints

- Preserve semantic heading order, skip link, reduced-motion behavior, no-JavaScript gut-check content, and keyboard focus states.
- Add no personal information, contact details, testimonials, analytics, tracking, forms, external runtime references, or invented proof.
- Keep assets local and relative for GitHub Pages project-path hosting.
- Add no em dash characters to tracked text files.
- Existing document-height ceilings remain in force unless a council-reviewed render proves that a specific readability improvement requires a measured replacement.

## Verification Matrix

Automated browser coverage includes 320x568, 320x700, 359x640, 360x640, 360x800, 375x812, 390x844, 412x915, 430x932, 479x844, 480x900, 768x1024, 840x900, 841x900, 844x390 landscape, 1023x768, 1024x768, 1280x720, 1423x900, 1424x900, 1440x900, and 1920x1080.

The responsive contract verifies:

- no horizontal overflow;
- cumulative layout shift at or below 0.05;
- readable caption and dense-content font sizes;
- 44px interactive targets;
- correct manifesto numbering;
- static SVG stage coordinates aligned to thirds, plus rendered plot boxes aligned to their live captions;
- local pathway connector lanes outside live copy;
- field index proximity to the capped rail;
- chapter-directory visibility through 1423px and fixed-index visibility from 1424px;
- hero and primary action fold behavior;
- semantic order and no-JavaScript fallback;
- no console or page errors.

## Council Gates

Work proceeds in four increments. After each increment, a visual council reviews current desktop, tablet, and phone renders. Critical and important findings are resolved before the next increment begins.

1. Responsive foundations and visible correctness.
2. Diagram geometry.
3. Compact-phone density and orientation.
4. Desktop composition and final device matrix.
