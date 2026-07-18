# Adversarial Oomph Design

**Status:** Approved by the owner via “do it all” after the adversarial council review.

## Objective

Turn the existing public field document into an unmistakable, ownable Dogshit Duo Devices experience without losing its credible consulting-company guise. The page should be funny because an unusually serious medtech operating system carries an unfortunate name—not because the interface becomes novelty merchandise.

## Non-negotiables

- Keep the site anonymous, public-safe, static, and deployable from a GitHub Pages project path.
- Keep the paper, carbon, teal, orange, and umber field-document palette; square geometry; sparse motion; and one uncensored name reveal.
- Add no forms, analytics, tracking, cookies, external runtime dependencies, personal details, client material, testimonials, or fabricated outcomes.
- Treat all claims as perspective, method, or clearly labeled illustration—not proof of results.
- Preserve semantic HTML, keyboard operation, reduced-motion behavior, 44px controls, and readable small text.

## Design decisions

### 1. Brand typography becomes a shipped asset

Use a permissively licensed, self-hosted condensed display face for headlines and a highly legible self-hosted sans for body copy. Store the font files and license inside `assets/fonts/`, define them with `@font-face`, and retain conservative local fallbacks. The page must have the same hierarchy and line breaks on macOS, Windows, Android, and Linux instead of relying on unshipped system fonts.

The hero remains the only maximum-scale headline. Section headings step down materially so they cannot compete with the cover.

### 2. The buying pathway becomes the signature move

Keep one semantic ordered list in source order. On desktop, place the first three nodes on the top row and the next three left-to-right on the bottom row. Connect them with a continuous orthogonal SVG line whose exaggerated dogleg carries the route from 03 back to 04, plus direction markers, numbered nodes, and two sparse `HANDOFF FAILURE` annotations. DOM order and visual reading order therefore agree while the handoff remains the signature move.

On narrow screens, hide the desktop SVG and turn the same ordered list into a vertical route with a continuous spine, directional arrowheads, and annotations in document order. The route must not create horizontal overflow at 320px.

### 3. The page gains a real progress spine

Replace the decorative stage state with a fixed edge-progress treatment and a semantic section index on large screens. Intersection observation updates the active section; scroll position updates a CSS progress variable. The interface must clear stale state, retain a useful static appearance when JavaScript is absent, and stay out of the way on mobile.

### 4. The consulting offer becomes forwardable

Each engagement states four things a buyer can copy into an internal message:

- Use when
- Working format
- Who joins
- Hand-back

No invented duration, pricing, availability, client proof, or result claim is allowed.

### 5. The scar tissue becomes visible on the scan

Each failure-register row exposes the corporate-language translation in the summary instead of hiding every punchline behind a disclosure. Opening a row reveals a practical pressure-test question. Native `details` behavior remains the interaction model.

### 6. Method language becomes canonical

Use the same two operator lenses everywhere:

- Clinical reality
- Engineering discipline

Their shared output is the commercial system. Do not rename either lens between the cover, social metadata, method, and closing language.

### 7. The page demonstrates a hand-back without pretending it is proof

Add an `ILLUSTRATIVE HAND-BACK / DECISION LEDGER` artifact near the operating method. It shows a decision, observed break signal, named next move, owner state, and timing state using invented generic content. It must be labeled as an illustration and never framed as a client deliverable or result.

### 8. The middle moves faster

Reduce global section padding and heading gaps, tighten card interiors, and alternate dense registers with open brand beats. Compress the long mobile pathway in particular. The name reveal, signature route, illustrative artifact, manifesto, and final gut-check should have distinct rhythms rather than repeating the same heading-plus-grid cadence.

### 9. Accessibility and resilience fixes ship with the redesign

- Change the small method counter from low-contrast orange to a contrast-safe token.
- Hide the clipboard enhancement in HTML and reveal it only after JavaScript attaches a listener; the five questions remain directly selectable without JavaScript.
- Use an outcome-focused copy label and expose the fallback textarea only on failure.
- Remove ineffective ARIA labeling from generic containers.
- Convert favicon lettering to path geometry so no live font is required.
- Raise footer text to a comfortable reading size.
- Remove dead table and shared-range CSS.

## Responsive acceptance criteria

- At 1280×720, the cover call-to-action and operator register remain visible without horizontal overflow.
- At 320×700, 390×844, and 430×932, the page has no horizontal overflow, controls remain at least 44px, the primary action appears in the initial cover experience, and no heading breaks inside a word.
- The desktop route has a visible continuous connector and explicit direction; the mobile route follows DOM order 01–06.
- With JavaScript disabled, the copy control is absent and the five questions remain readable.
- With reduced motion enabled, the page remains fully legible and functional without animation.

## Verification strategy

Keep the fast source/privacy/accessibility suite and add real-browser regression coverage with Playwright. The browser audit will check responsive overflow, cover composition, tap targets, route geometry, no-JavaScript behavior, reduced motion, and console errors. GitHub Actions will run the browser suite on pushes and pull requests while the published site remains dependency-free at runtime.
