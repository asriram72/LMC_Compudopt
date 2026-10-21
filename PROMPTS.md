# Claude Code prompts (run in order)

**Before you start:** put `CLAUDE.md`, `PLAN.md`, `PROMPTS.md` in the repo root and `facts.json` + `references.json` in `src/data/`. Commit them so every teammate's Claude Code session reads the same context. Open Claude Code in the repo root.

**How to use these prompts:**
- Paste one prompt at a time.
- For P3, P4 and P6, ask Claude Code to show its plan before it writes code.
- After each prompt: run `npm run dev`, look at the page on desktop **and** at phone width, then commit.
- If something looks generic, follow up with: *"Make this feel less templated. Push the typography scale, spacing and motion. Use the frontend-design skill if available."*

---

### P0 · Setup
```
Read CLAUDE.md and PLAN.md. Then set up the project:
1. Remove the Vite starter content (App.tsx demo, App.css, hero.png, react/vite logos).
2. Install: motion, d3-geo, d3-scale, d3-shape, topojson-client, us-atlas, world-atlas, and their @types. Install Tailwind v4 with @tailwindcss/vite. If Tailwind won't resolve against our Vite version, skip it and use plain CSS with the tokens from CLAUDE.md.
3. Add the brand tokens and load Figtree + Merriweather from Google Fonts in index.html. Set <title> to "Second Life · Compudopt × Georgia Tech" and add a meta description.
4. Make src/data/facts.json and references.json importable with types (src/data/types.ts).
5. Add a script "wordcount" that counts the words in src/content/copy.ts (string values only) and prints the total and the per-section counts.
6. Add a GitHub Actions workflow that builds and deploys to GitHub Pages, and set Vite `base` to '/LMC_Compudopt/'.
Run npm run build to confirm it passes. Summarize what you changed.
```

### P1 · Write the copy
```
Write all site prose into src/content/copy.ts, keyed by section (hero, problem, whyGT, meetCompudopt, stories, takeAction, footer), following the section outline and word budgets in PLAN.md section 2.
Voice: Compudopt Atlanta talking to Georgia Tech students. Warm, direct, a little punchy, second person ("your old laptop"). Short paragraphs, plain words, no corporate filler, no em-dash overuse.
Rules:
- Only use facts in src/data/facts.json. Wherever a fact appears, put a citation token like {{cite:itu-2024}} that a <Cite> component will turn into "(ITU, 2024)" linking to the Sources section.
- Each section needs one clear takeaway sentence and its headline. Headline ideas: "Two problems, one fix", "Why this is a Georgia Tech problem", "Meet Compudopt", "Second lives", "Your move".
- Connect explicitly to SDG 9 (9.c and 9.4) and to Georgia Tech's Sustainability Next plan and zero-waste-by-2050 goal.
- Total 1,500–1,800 words. Run npm run wordcount and show the result.
Show me the full copy for review before moving on.
```

### P2 · Layout skeleton, nav, citations, sources
```
Build the page skeleton from PLAN.md section 2, with placeholder boxes where visuals will go (label each with its component name).
- Sections: Hero, Problem, WhyGT, MeetCompudopt, Stories, TakeAction, Sources, Footer, each with an id for anchor links.
- Sticky top nav: Compudopt-style wordmark text "compudopt × GT" (don't copy their logo file), section links that highlight on scroll, and a green "Donate a device" button that jumps to TakeAction. On mobile, use a compact menu.
- <Cite id> component: renders "(Author, Year)" from references.json and links to #ref-<id>.
- Sources section: render the cited references in APA 7, alphabetized, with hanging indent and italics (convert *...* to <em>). Format "Retrieved <date>, from <url>" when there's a url. Hide uncited entries.
- Footer: the disclaimer from CLAUDE.md, a link to compudopt.org, and the group member names (leave a placeholder array).
- Section rhythm: alternate white and mist backgrounds. Make the Problem section a darker navy band for drama. Max text width 68ch, large type scale.
Check it at 375px and 1440px.
```

### P3 · Scroll-driven hero
```
Build src/components/hero/ScrollStory.tsx following the "Scroll storyboard" table in PLAN.md section 2. The animation is driven by scroll position, NOT autoplay: scrolling down plays it forward, scrolling up rewinds it.
Structure:
- An outer track section (height ~400vh desktop, ~300vh under 768px) containing a `position: sticky; top: 0; height: 100vh` stage with one full-screen inline SVG scene.
- `const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] })`, smoothed with useSpring (stiffness ~120, damping ~30).
- Split progress into 5 scenes (0–0.2, 0.2–0.4, 0.4–0.6, 0.6–0.8, 0.8–1). Use useTransform to map each range to the x/y/scale/rotate/opacity of the laptops, the width of the wipe bar, the screen color, the student figure, and the pathLength of the map arcs. Each scene's caption fades in and out across its range.
- Scene 5 transitions into the US map (simplified paths are fine until P4's UsProgramMap exists, then reuse it). Atlanta pulses, green arcs to facts.programStates draw with scroll, and the headline, subhead and two CTA buttons fade in at the end.
- Flat geometric illustration only: rounded-rect laptops, a simple student figure, no clip-art. Colors: pile = waste gray-brown, rescued laptop = green glow, screen = blue.
- UI: a thin vertical progress indicator with 5 step dots (clicking a dot scrolls to that scene), a "Scroll" hint on load that fades once scrolling starts, and a "Skip to the site" link that jumps past the track.
- Animate only transform, opacity and pathLength so it stays at 60fps. Never hijack or lock scrolling, and make sure trackpad, mouse wheel, touch and keyboard (space/arrows) all work naturally.
- prefers-reduced-motion: no pinning. Render the 5 scenes as static frames stacked vertically with their captions.
- After the track, add a StatCounter row (count-up on first view) with the compudoptCumulative numbers and a single (Compudopt, n.d.) citation.
Show me the plan before coding. Test on a phone-width viewport: the stage must fit 100svh with no overflow.
```

### P4 · Maps
```
Build two map components with d3-geo, rendering SVG paths in React. Use topojson from us-atlas (states-10m) and world-atlas (countries-110m).

1) UsProgramMap.tsx (MeetCompudopt section and hero end-state)
- Projection: geoAlbersUsa. States in facts.programStates.states are filled green (lighter tint), all others light gray. Hubs are navy dots with labels.
- Curved arcs from the nearest hub to each served state's centroid, drawn in with pathLength animation when the map scrolls into view. Caption: "States where Compudopt runs programs. Arcs are illustrative, drawn from regional hubs. (Compudopt, n.d.)"
- Hover/focus a state → tooltip with its name and "Compudopt programs here". Tapping works on mobile. States are keyboard-focusable.
- Clicking Georgia (or the Atlanta dot) opens an Atlanta spotlight side panel (bottom sheet on mobile) with facts.atlanta: ~8,000 computers by mid-2024, $7M Santander investment with its goals, 1,600 CDC Foundation computers, 500,000+ residents without access, and the 2025 partner list. Each fact gets a citation.

2) EwasteWorldMap.tsx (Problem section)
- geoEqualEarth, muted palette. Animated gray-brown flow lines from the US and western Europe to Accra, Ghana, with a pulsing marker and a short caption about Agbogbloshie (Shaw, 2019). One line of text makes the contrast clear: this is where dumped devices go, while reused devices stay in the community.

Both must resize responsively (use a ResizeObserver hook), have role="img" plus an aria-label summary, and respect reduced motion.
```

### P5 · Charts
```
Read CLAUDE.md. Build these as hand-made SVG chart components (d3-scale/d3-shape for math, React for rendering, motion for reveal-on-scroll). Shared style for all: no chart junk, direct labels instead of legends, the big number as the hero, source line under each chart with <Cite>, consistent color meaning (waste = gray-brown, reused = green, access = blue).
1. EwasteBars: 2022 generated 62 Mt, with the 13.8 Mt (22.3%) documented-recycled portion filled green. Next to it, a 2030 projected bar at 82 Mt with a dashed outline. Annotation: "rising 5x faster than recycling".
2. Waffle: 10x10 grid, 41 squares filled. Label "41 of every 100 lower-income US adults don't have a laptop or desktop". A toggle switches to 43 (no home broadband) with the squares animating.
3. CarbonSplit: one horizontal bar showing manufacturing at 35–56% (draw the range as a hatched band) vs. use. Label: "Most of a laptop's footprint happens before you ever open it."
4. GrowthLine: cumulative computers 65K (Mar 2023) → 160K (Nov 2025) → 200K (Oct 2026). Points labeled, line draws in. Each point cites its own source.
5. OutcomeRings: four radial progress rings (79, 84, 91, 81) with labels from facts.compudopt2025.outcomes.
Also a "2025 by the numbers" stat grid for MeetCompudopt.
Each chart needs an accessible text alternative (a visually hidden table or aria-label). Hover/tap shows exact values. Everything must work at 375px.
```

### P6 · Interactives
```
Build two interactive components. Show me the plan first.

1) DeviceJourney.tsx (MeetCompudopt): a 4-step horizontal stepper (vertical on mobile) from facts.donation.steps. One laptop illustration transforms at each step: drop-off box → wipe bar sweep with "NIST 800-88" → wrench/sparkle with a recycle branch to "R2 / e-Stewards" → handed to a person. Steps advance by clicking the step chips or Next/Back, by arrow keys, and on mobile by swiping. Auto-advance once when scrolled into view, unless reduced motion is on.

2) DonationChecker.tsx (TakeAction, the main interactive):
- Q1: device type (icon buttons): Laptop, Desktop, Tablet, Phone, Monitor (LCD/LED), CRT monitor or big TV, Printer/copier, Other parts (RAM, drives, cables).
- Q2 (when relevant): condition: Works / Broken but hard drive is in it / No hard drive.
- Result card from facts.donation: accepted ✅ / accepted at Compudopt only, not Micro Center ⚠️ / not accepted ❌. Include specific next steps: Compudopt Atlanta address (with "call ahead" and the phone number), Micro Center note, and for ❌ a link to GT's Zero Waste hub (https://sustain.gatech.edu/zero-waste-resource-hub/).
- Under every result: a "Before you drop it off" checklist (back up files, sign out of Apple ID / Microsoft account / Find My, remove the SIM or SD card) and a note that Compudopt wipes drives to NIST 800-88 anyway.
- A small, playful "impact" line using only sourced facts, e.g., "Compudopt has given away 200,000+ computers. Yours could be next." Don't make up per-device CO2 numbers.
- Fully keyboard-accessible, with aria-live on the result.
```

### P7 · Stories + video + Take Action content
```
1) YouTube.tsx: a click-to-load facade (thumbnail from i.ytimg.com plus a play button) that swaps in a youtube-nocookie iframe on click, with a title prop and 16:9 aspect ratio.
2) Stories section: embed video A2je5Ut1JPY ("Compudopt Carlos") with the copy from copy.ts. Add a large pull quote from Tamria Matondo (from facts.stories) with a citation. Then 4 case study cards from PLAN.md section 4 (CDC Foundation→Atlanta, Clayton County, App State, Chicago), each with a stat badge, 2–3 sentences, a citation, and a "Read more" link where references.json has a url. Make the App State card say "GT could do this" as the bridge to Take Action.
3) TakeAction section: lay out DonationChecker first, then cards for Drop off / Volunteer (two buttons to the Airtable forms in facts.volunteer: "Volunteer solo" and "Bring your org") / Run a drive (3 numbered steps from PLAN.md) / Need a computer? (links to https://www.compudopt.org/programs/computer-giveaways/ and https://www.compudopt.org/compudopt-connect-low-cost-internet/). All external links open in a new tab with rel="noopener".
4) Optional: the Santander video (LSPzD6ovbFQ) inside the Atlanta spotlight panel.
```

### P8 · Deploy
```
Make sure the GitHub Pages workflow builds and deploys from main. Fix any base-path issues (fonts, topojson imports, images). Tell me exactly which repo setting the repo owner needs to flip (Settings → Pages → Source: GitHub Actions) and what the final URL will be.
```

### P9 · QA pass (run Friday)
```
Do a full QA pass and fix what you find:
1. Facts audit: list every number and quote rendered on the page, the facts.json key it came from, and its citation. Flag anything without a source.
2. npm run wordcount: confirm 1,200–2,000 words. Trim or expand to about 1,650.
3. Check every external link (no 404s) and every in-text citation (each jumps to an existing Sources entry). Remove uncited references.
4. Accessibility: run axe or Lighthouse, fix contrast, alt text, focus order, and keyboard traps. Test reduced motion.
5. Mobile: test at 375, 768 and 1440 widths. No horizontal scroll, tap targets ≥44px, the map panel works as a bottom sheet.
6. Performance: lazy-load the maps and charts below the fold, keep the Lighthouse performance score ≥90.
7. Rubric check against PLAN.md section 3: tell me any criterion that looks weak.
Report findings as a short checklist.
```
