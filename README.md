# Second Life · Compudopt × Georgia Tech

A single-page, scroll-driven promotional site written as **Compudopt Atlanta** for **Georgia Tech students**, asking them to donate old laptops and devices, volunteer, or run a device drive. The issue is e-waste plus the digital divide, tied to **UN SDG 9** (targets 9.c and 9.4) and Georgia Tech's **Sustainability Next** plan and zero-waste-by-2050 goal.

A student project for Georgia Tech LMC 3403. Not an official Compudopt website.

- **Live site:** https://asriram72.github.io/LMC_Compudopt/
- **Team:** Aditya Sriram, Akshay Gupta, Rithvik Reddygari, Marie Anyolie
- Project brief and rules: [`CLAUDE.md`](CLAUDE.md) · site plan: [`PLAN.md`](PLAN.md) · build prompts: [`PROMPTS.md`](PROMPTS.md)

## Run it

```bash
npm install
npm run dev        # http://localhost:5173/LMC_Compudopt/
npm run build      # type-check + production build into dist/
npm run wordcount  # site copy word count (target 1,200–2,000)
npm run lint
```

Add `?motion=reduce` to the URL to preview the reduced-motion version.

## How content works

- **Every number and quote** lives in `src/data/facts.json`, linked by `src` to an APA entry in `src/data/references.json`. Don't add a number to the page without adding it there with a source.
- **All prose** lives in `src/content/copy.ts`. Write citations as `{{cite:reference-id}}` (or `{{cite:a,b}}`); they render as APA in-text citations linking to the Sources list, which only shows references cited on the page.
- Colors mean the same thing everywhere: gray-brown = waste/landfill, green = reused/donated, blue = access/connected.

## Deploy

Every push to `main` builds and deploys to GitHub Pages via `.github/workflows/deploy.yml`. Pull requests run the build only.

One-time setup (repo owner): **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Revision notes

| Phase | What changed |
|---|---|
| P0 | Project setup: brand tokens, data files, word count script, Pages workflow |
| P1 | Site copy (all facts cited). Changed a few planned lines that the sources didn't support, e.g. "most of a laptop's footprint" → "a third to over half" |
| P2 | Page skeleton, sticky nav, APA citations and Sources. Fixed contrast: darker link blue, ink text on green buttons |
| P3 | Scroll-driven hero story with reduced-motion fallback |
| P4 | US program map with Atlanta spotlight; world map of where dumped e-waste goes |
| P5 | Charts: e-waste bars, waffle, carbon split, growth line, outcome rings, 2025 stats |
| P6 | Device Journey stepper and Donation Checker |
| P7 | Carlos video, case studies, Take Action cards; filled in YouTube citation dates |
| P8 | Deploy setup, favicon, this README |
| P8+ | Added the team's Unit 1 flyer to Run a drive; Carlos intro rewritten from the team's notes on the video |
