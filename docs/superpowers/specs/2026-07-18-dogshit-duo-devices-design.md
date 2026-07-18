# Dogshit Duo Devices — Site Design

## Objective

Create a public, single-page static website that initially reads as a rigorous
medical-device commercialization consultancy and then reveals a dry,
self-aware critique of empty consulting language. The page must make a former
business partner laugh while remaining credible enough to evolve into a real
advisory practice.

The brand represents two anonymous veteran operators: one with a clinical lens
and one with an engineering lens. Their shared experience includes medical
device sales, sales leadership, pitch creation, commercialization, and building
teams from scratch. No personal details, prior employers, clients, photographs,
contact information, or identifying career history will appear.

## Chosen Direction: Sterile Field / Controlled Burn

The visual system begins as an immaculate institutional operating document.
Its grid, terminology, and “sales pathway” initially appear controlled. As the
visitor scrolls, blunt operator annotations expose where ceremonial strategy
fails in real buying environments. The composition bends under reality but
never becomes chaotic or unserious.

Humor comes from recognition and contrast. The site targets stale playbooks,
ambiguous ownership, and performative alignment—not clinicians, customers,
salespeople, regulated work, or specific organizations.

## Brand System

### Name treatment

The header uses `DDD / COMMERCIALIZATION PRACTICE` as an issuing-authority
lockup. The full name is revealed after the opening argument:

> DDD stands for Dogshit Duo Devices. The name is a joke. The work isn't.

The name is never censored, illustrated literally, or paired with a mascot.

### Palette

- Sterile Paper: `#F4F2EC`
- Carbon: `#111A1E`
- Surgical Steel: `#93A4AA`
- Institutional Teal: `#35666B`
- Containment Orange: `#E05235`
- Charred Umber: `#3B2A24`

Orange and umber stay below roughly ten percent of the page so annotations and
ruptures remain meaningful.

### Typography

Use an IBM Plex-style system: condensed grotesque display type, highly legible
sans-serif body copy, and a restrained monospace face for section numbers,
document codes, annotations, and pathway labels. Font assets may be locally
vendored under an open license; the page must retain a strong system-font
fallback and remain readable if fonts fail.

Display sizes use responsive `clamp()` values, tight line heights, and no
decorative effects. Body copy remains at least 16px with a 45–72 character
measure.

### Signature motif

A labeled sales-pathway route begins as a clean orthogonal line, then encounters
the user, champion, buyer, approver, procurement, implementation, and field
feedback. It detours, doubles back, and accumulates short orange operator
annotations. The motif is built with CSS and semantic HTML rather than a large
illustration. It is decorative and never carries essential meaning alone.

## Page Narrative

### 1. Cover sheet

The first viewport is composed like a controlled commercial-operations brief.

- Lockup: `DDD / COMMERCIALIZATION PRACTICE`
- Eyebrow: `MEDICAL DEVICE COMMERCIALIZATION`
- Headline: `Meet customers where they are. Then build a sales pathway for the
  world they actually occupy.`
- Supporting copy explains that the practice aligns product truth, clinical
  use, stakeholder decisions, and field execution.
- A compact operator register identifies `Clinical lens` and `Engineering
  lens` without biographies.
- Primary action: `Put the pathway on the table`, which scrolls to the
  diagnostic rather than using a fake contact route.

Apart from the name reveal, the first viewport stays straight-faced.

### 2. Controlled reveal

The page states the full company name and explains the operating principle:
plain language shortens the time spent defending weak assumptions. A restrained
orange underline/annotation introduces the controlled-burn layer.

### 3. Buying pathway under load

A semantic sequence replaces the generic funnel. It distinguishes:

- user;
- clinical champion;
- economic buyer;
- approver or committee;
- procurement and implementation;
- field learning and repeatability.

Each role is paired with the evidence or decision it needs. Copy emphasizes
that these are often different people and that a deck must understand the
difference.

### 4. Failure register

Full-width ruled rows replace template service cards. Each row contains a
formal diagnostic and a blunt operator translation:

- Commercial story: `Does the pitch create a decision?` / `The deck has 47
  slides and no point.`
- Sales motion: `Can the process work without one heroic person?` / `It only
  works when the founder is in the room.`
- Leadership: `Is ownership unambiguous?` / `Everyone owns it, so no one owns
  it.`
- Team build: `Are roles connected by an operating system?` / `You hired
  résumés and hoped they would form a company.`
- Launch readiness: `Does the work support the calendar?` / `The calendar says
  launch. The work says absolutely not.`

Rows are keyboard- and touch-operable disclosures. Both formal and translated
copy remain available without JavaScript.

### 5. Two lenses

Two adjacent fields explain the clinical and engineering perspectives.

- Clinical lens: use environment, adoption friction, stakeholder trust,
  conversations, and pitch reality.
- Engineering lens: constraints, systems, handoffs, execution mechanics, and
  repeatability.
- Shared range: sales, sales leadership, team building, pitches, launches, and
  commercialization.

The layout uses functional labels only. It includes no portraits, biographies,
initials, social profiles, employer history, or invented experience totals.

### 6. Operating procedure

The method is shown as a five-row `INPUT / ACTION / OUTPUT` procedure:

1. Intake — isolate assumptions and define the real decision.
2. Dual pass — compare clinical and engineering/commercial failure signals.
3. Red team — pressure-test story, sequence, ownership, and handoffs.
4. Rebuild — identify the smallest executable corrections.
5. Hand back — establish accountable owners and explicit next moves.

### 7. Ways to use the duo

Three ledger rows describe realistic engagement shapes without pricing,
promised timelines, or fabricated outcomes:

- Pathway Autopsy
- Pitch Decontamination
- Field Transfer / Team Operating Reset

Each row includes `Use when` and `Leave with` fields.

### 8. Controlled burn manifesto

The darkest section dismantles empty language and immediately replaces it with
operating truth. Key lines include:

- `A funnel is a picture. Buying is behavior.`
- `Alignment without action is synchronized nodding.`
- `Claims discipline is commercial discipline.`
- `If nobody owns it, it is not a next step.`
- `If the pathway only works in PowerPoint, burn the map.`

The closing beat restores visual order:

> Serious operators. Unfortunate name.

### 9. Commercial gut-check

The final action is useful without requiring personal contact information. A
visitor can expand a five-question checklist:

1. Who is trying to make which decision?
2. What changes for each stakeholder?
3. What proof can the field responsibly use?
4. Where does momentum actually die?
5. Who owns the next move, and by when?

The page may later add a role-based inbox or privacy-appropriate form, but this
version ships without a fake address, dead button, placeholder form, or link to
a personal profile.

## Interaction and Motion

Interactions are progressive enhancements with no heavy framework dependency.

1. A short underline animation introduces the first operator annotation.
2. Failure-register disclosures expose formal/operator translations on click,
   tap, or keyboard activation.
3. The sales-pathway route receives small state changes as its related sections
   enter the viewport.

There is no scroll hijacking, parallax, custom cursor, autoplay, marquee,
pointer-following effect, or continuous animation. `prefers-reduced-motion`
removes drawing and entrance transitions. Essential content is present in the
document and understandable without JavaScript.

## Responsive and Accessibility Requirements

- Semantic HTML landmarks, one `h1`, logical heading order, and a skip link.
- WCAG AA contrast; orange is not the sole carrier of meaning.
- Underlined inline links and visible 3px focus treatment.
- Interactive targets are at least 44×44px.
- Tables become labeled stacked records on small screens and never require
  horizontal scrolling.
- At tablet width the document grid collapses into a single reading column.
- No horizontal overflow at 320, 375, 768, 1024, or 1440px.
- Complete content remains available to assistive technology and without
  animation.
- The literal brand name is exposed consistently to visual and assistive users.

## Technical Architecture

Use a static, dependency-light implementation suitable for GitHub Pages:

- semantic `index.html`;
- focused CSS organized around tokens, layout, components, responsive rules,
  and motion preferences;
- a small JavaScript module for progressive enhancements;
- static metadata, favicon, Open Graph image, and `404.html`;
- no server, database, analytics, cookies, forms, authentication, or external
  application data;
- relative asset and navigation URLs that remain valid under the repository
  Pages path.

Publishing uses the public `dogshit-duo-devices` GitHub repository over HTTPS.
All source and repository operations remain inside the project folder. No
umbrella-level git operation or project file is created.

## Public-Safety Boundaries

The repository and site contain no names, personal email addresses, phone
numbers, locations, employer/client identifiers, private source material,
photos, testimonials, logos, fabricated metrics, unverifiable outcomes, medical
claims, or confidential commercial details.

The footer states that Dogshit Duo Devices offers commercial and operating
perspective only and does not provide patient-specific, medical, clinical,
legal, regulatory, quality, reimbursement, financial, or investment advice.
It instructs visitors not to send protected health information or confidential
material through future public contact channels.

## Verification

- Automated checks confirm required landmarks, metadata, privacy language,
  local links, disclosure semantics, and absence of known placeholders.
- CSS and JavaScript receive syntax checks.
- The site is previewed at desktop and mobile widths for hierarchy, overflow,
  focus visibility, disclosure behavior, and reduced-motion behavior.
- The final public URL is checked after publishing.
- Repository contents and git status are reviewed before the initial commit and
  push.

## Acceptance Standard

A first-time visitor understands the domain, two-operator model, offer, and next
action in the first viewport. The humor always resolves into a credible
operating point in the same section. The page avoids every common landing-page
template tell: gradient blobs, glass cards, pill clouds, icon triptychs, fake
logos, stock device renders, animated counters, and generic agency copy.

The result should feel like two experienced medical-device operators issued an
elegant field document, then annotated it after the strategy deck encountered
an actual purchasing decision.
