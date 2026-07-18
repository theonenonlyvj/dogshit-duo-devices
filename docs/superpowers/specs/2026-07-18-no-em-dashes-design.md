# Zero Em Dashes Design

## Goal

Remove every em dash character from the public repository and keep it out. The
site should retain its clipped, confident editorial voice without relying on a
punctuation habit that can make otherwise sharp copy feel synthetic or overly
performed.

## Scope

The cleanup covers all tracked text sources, including the live page, fallback
page, JavaScript messages, tests, README material, implementation plans, and
design specifications. Binary font files and the rendered social image are not
text-rewritten. Generated visual assets only need regeneration if their visible
source copy changes.

## Editorial Rules

Each sentence will be rewritten according to its meaning instead of replacing
every character with the same mark:

- Use a period when the em dash separates two complete, forceful thoughts.
- Use a colon when the second phrase explains, translates, or itemizes the
  first.
- Use a comma when the phrase is a natural continuation of the sentence.
- Use parentheses only when the phrase is genuinely secondary.
- Recast the sentence when direct substitution would produce awkward rhythm.

The existing voice, claims boundary, terminology, and humor placement remain
unchanged.

## Regression Contract

Add a source test that recursively checks tracked project text files and fails
if an em dash appears. The test will exclude binary assets and dependency or
browser-cache directories. The test itself will construct the forbidden
character from its Unicode code point so the repository can satisfy its own
zero-character rule.

The required red-green sequence is:

1. Add the repository-wide assertion and confirm it fails on existing copy.
2. Rewrite every occurrence with context-appropriate punctuation.
3. Run the complete source and real-browser suites.
4. Confirm a direct repository scan finds no em dash characters.

## Release

Commit with the repository's anonymous identity, push the existing `main`
branch, wait for the browser workflow and Pages deployment, then verify the
cache-busted HTTPS page contains the revised copy.
