# Dogshit Duo Devices

Dogshit Duo Devices is a satirical-but-serious field document for medical-device commercialization work. The name makes the joke immediately; the site applies a clinical lens and an engineering lens to the less funny work of aligning product truth, stakeholder decisions, and field execution.

The production site is dependency-free and built for GitHub Pages. It uses semantic HTML, a restrained CSS document system, self-hosted OFL fonts, and a small browser-native JavaScript enhancement layer. It includes no analytics, cookies, forms, authentication, backend, or third-party application data. Playwright is a development-only dependency for real-browser regression checks.

## Public-data boundary

This repository and its history are intentionally anonymous and public-safe. Do not add names, contact details, locations, photographs, identifying career history, employer or client identifiers, testimonials, private source material, protected health information, confidential material, secrets, fabricated proof, or unverifiable claims.

## Local preview

Run the local server:

```sh
npm start
```

Then open `http://127.0.0.1:4173/`.

Run the source, privacy, accessibility, and release checks:

```sh
npm test
```

Install the Playwright Chromium binary into the repository-local ignored cache once, then run the responsive real-browser checks:

```sh
PLAYWRIGHT_BROWSERS_PATH=.playwright-browsers npx playwright install chromium
npm run test:browser
```

## GitHub Pages publication

The repository root is the complete Pages source tree. After the repository owner authorizes publication, configure GitHub Pages to deploy from the root of the `main` branch over HTTPS. All site links and asset references are relative so the project continues to work beneath its repository path.

Publication is an explicit owner action: local development does not add or change remotes, push, deploy, upload, or configure a host.
