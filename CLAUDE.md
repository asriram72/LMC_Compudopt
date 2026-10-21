# CLAUDE.md — Compudopt × Georgia Tech promo site

Read this first, then `PLAN.md`. This is a group class project (Georgia Tech LMC, Unit 2: Sustainability Promotional Website). Final site due Fri Oct 23, 2026 (2-day grace to Oct 25).

## What we're building
A single-page, scroll-driven promotional website written **as Compudopt Atlanta** (organizational author) **for Georgia Tech students** (primary audience), persuading them to donate old laptops/devices, volunteer, or run a device drive. The issue: e-waste + the digital divide. Main goal: **UN SDG 9** (target 9.c ICT access, 9.4 resource efficiency). Also tied to **Georgia Tech's Sustainability Next plan** and GT's zero-waste-by-2050 goal.

## Hard rules
1. **No invented numbers or quotes.** Every stat, quote and claim comes from `src/data/facts.json`, which links each fact to an id in `src/data/references.json`. If you need a new fact, look it up, add it to both files with a source, and tell me.
2. Every stat shown on the page carries a small in-text APA citation, e.g. `(Compudopt, 2026)`, that links to its entry in the Sources section.
3. Sources section renders `references.json` in APA 7 style, alphabetical, hanging indent. Italics are marked with `*...*` in the JSON. If an entry says "Retrieved <date>." and has a url, render "Retrieved <date>, from <url>". Entries with `"awn": true` have no URL (APA allows this for newswire/newspaper database articles). Hide entries not cited anywhere on the page.
4. Never claim Compudopt ships laptops worldwide. It's US-only. The world map is only for where **dumped** e-waste goes.
5. Footer disclaimer: "A student project for Georgia Tech LMC 3403. Not an official Compudopt website." Link to compudopt.org.
6. Keep total written copy at **1,200–2,000 words** (excluding Sources). `npm run wordcount` should report it.
7. Accessibility: semantic HTML, alt text, keyboard-usable interactives, visible focus, color contrast AA, and `prefers-reduced-motion` must skip/shorten every animation.
8. Must work at 375px wide (phone) with no horizontal scroll.

## Stack
- Existing: React 19 + Vite + TypeScript (this repo).
- Add: `motion` (Framer Motion) for animation, `d3-geo` + `d3-scale` + `d3-shape` + `topojson-client` + `us-atlas` + `world-atlas` for maps/charts (render SVG in React, no canvas), `lite-youtube-embed` or a hand-rolled click-to-load YouTube facade (use `youtube-nocookie.com`).
- Styling: Tailwind CSS v4 via `@tailwindcss/vite`. If it won't install against this Vite version, use plain CSS with the tokens below; don't fight it.
- No backend. Static build deployed to GitHub Pages (or Vercel).

## Brand (sampled from compudopt.org)
```
--navy:  #193460   (primary text on light, dark sections)
--blue:  #1D76BB   (links, data highlight)
--green: #8EC441   (action, "reused/refurbished", CTA buttons)
--ink:   #192434
--slate: #5B687B   (muted text)
--mist:  #F1F4F7   (section background)
--waste: #8A8178   (muted gray-brown for e-waste/landfill only)
Fonts: Figtree (body/UI), Merriweather (big pull-quotes/stat numerals optional). Google Fonts.
```
Color meaning is consistent everywhere: gray-brown = waste/landfill, green = reused/donated, blue = access/connected.

## File layout to aim for
```
src/
  data/facts.json, references.json
  content/copy.ts           # all prose, keyed by section, so word count is easy
  components/
    Nav.tsx  Footer.tsx  Cite.tsx  StatCounter.tsx  Section.tsx  YouTube.tsx
    hero/ScrollStory.tsx    # scroll-driven pinned hero (useScroll + useTransform), not autoplay
    maps/UsProgramMap.tsx  maps/EwasteWorldMap.tsx
    charts/EwasteBars.tsx  charts/Waffle.tsx  charts/GrowthLine.tsx  charts/OutcomeRings.tsx  charts/CarbonSplit.tsx
    interactive/DeviceJourney.tsx  interactive/DonationChecker.tsx
  sections/ Hero.tsx Problem.tsx WhyGT.tsx MeetCompudopt.tsx Stories.tsx TakeAction.tsx Sources.tsx
```

## Workflow
- Small, reviewable steps. After each phase: `npm run build` must pass, then commit with a clear message.
- Several teammates push to this repo. Pull before starting, work on a branch named for the phase, keep PRs small.
- When you finish a phase, list what's done, what's stubbed, and any fact you couldn't source.
