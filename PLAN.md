# Compudopt × Georgia Tech — Website Plan

**Working title:** *Second Life* — "Your old laptop is someone's first."
**Due:** Fri Oct 23, 2026 (grace to Sun Oct 25) · **Repo:** asriram72/LMC_Compudopt (React + Vite + TS scaffold, nothing built yet)

---

## 1. The big decisions

| Rubric piece | Our answer |
|---|---|
| Issue at GT | Old laptops and devices from GT students and departments end up in drawers or recycling, while ~500,000 people in metro Atlanta have no home computer or high-speed internet. |
| Organizational author | **Compudopt Atlanta**, talking to GT. Uses Compudopt's mission language ("technology access and education to under-resourced youth and their communities"), brand colors and fonts. |
| Target audience | **GT students**, especially ones upgrading laptops, moving out, or graduating. Secondary: **student orgs** (who can run a drive) and **GT departments** with surplus. |
| SDG | **SDG 9**: target **9.c** (ICT access) is the core. **9.4** (resource efficiency) covers the reuse side. Small chips for 4.4, 10.2, 12.5. |
| GT plan | **Sustainability Next** (six priorities, e.g., "Institute Operations" and "Living Learning Campus") + GT's **zero waste by 2050** circular-economy goal. |
| Persuasion hook | GT researchers (Cindy Lin, Josiah Hester) warned that up to **240M PCs** could be landfilled after Windows 10 support ended. GT's own surplus sent **~69,000 lbs** to electronics recycling in one year. Reuse beats recycling: **35–56%** of a laptop's carbon footprint comes from manufacturing it. |
| Calls to action | 1) Donate a device (Donation Checker → drop-off). 2) Volunteer (individual or group form). 3) Run a device drive in your dorm or org. 4) Need a computer? Get one. |
| Video (required) | YouTube: **"Compudopt Carlos"** (2:49, recipient story) in Stories. Optional: Santander video (2:03) in the Atlanta spotlight. Stretch: our own 45–60 s clip. |
| Interactive (required) | **Donation Checker** (main one), **Device Journey** stepper, **clickable US map**, hover charts. |

### Changes to your original plan (and why)
1. **World map → two maps.** Compudopt only works in the US (21 states in 2025, ~25 + DC in its location list), so green arrows going around the world would be inaccurate. Instead:
   - The hero ends on a **US map**, with green arcs from Compudopt's hubs (Atlanta, Houston, Dallas, Chicago, Mesa) to the states it serves, and Atlanta pulsing.
   - The Problem section gets a **world map** showing where *dumped* e-waste goes (US/Europe → Agbogbloshie, Ghana). The contrast between where waste goes and where reuse goes is the persuasive point.
2. **Use the annual report's real numbers.** The live homepage now says **945,000+ lbs** of e-waste recycled and **200,000+ computers**. That replaces the older 711,000 lb figure from your sources page. The 2025 Annual Report has the per-year numbers.
3. **Case studies: mostly not from Compudopt's blog.** The blog's recent posts are about Arizona and leadership news, with nothing on Atlanta. Stronger case studies for a GT audience: the CDC Foundation → Atlanta students donation, the Clayton County giveaway, App State's refurbished laptops for first-years (a direct model for GT), and Chicago's city-wide partnership. Recipient stories: Carlos (video) and Tamria Matondo (annual report).

---

## 2. Site map (single scrolling page, sticky nav)

Word budget ≈ **1,650** (limit is 1,200–2,000).

### 0 · Hero / scroll-driven story (~60 words)
- **Scroll-driven, not autoplay.** The scene is pinned (sticky) while the visitor scrolls, and scroll position drives the animation. Scrolling down moves it forward and scrolling up rewinds it. The page only scrolls on past the hero once the story finishes.
- The scroll track is about **400vh** tall on desktop and **300vh** on phones, with one sticky full-screen SVG stage inside it.
- A small progress bar or step dots on the side show where you are. A "Skip to the site" link jumps past the track.
- Scroll ends on the US map plus a headline, a one-line subhead, and two buttons: **Donate a device** · **See the impact**.
- Stat bar right after the pinned section, with count-up numbers: **1,000,000+ lives · 200,000+ computers · 61,000+ homes connected · 945,000+ lbs e-waste recycled** (Compudopt, n.d.).
- With reduced motion, there's no pinning. The five scenes show as a short stack of static frames with their captions.

**Scroll storyboard** (scroll progress 0 → 1 through the pinned section)
| Progress | Scene | What moves as you scroll | Caption that fades in |
|---|---|---|---|
| 0–0.2 | Pile-up | Gray-brown laptops drop in one by one and stack into a heap | "62 million tonnes of e-waste in 2022. Less than a quarter was recycled." |
| 0.2–0.4 | Rescue | One laptop lifts off the top and glows green as the pile dims | "But most old laptops still work." |
| 0.4–0.6 | Refurbish | A wipe bar sweeps the screen in step with the scroll, the screen turns blue, and a check mark pops at the end | "Wiped to NIST 800-88. Refurbished. Ready." |
| 0.6–0.8 | Hand-off | The laptop slides into a student figure's hands, who smiles | "Free to a student who didn't have one." |
| 0.8–1.0 | Zoom out | The camera pulls back into Atlanta on a US map, green arcs draw to the program states as you scroll, and the headline and buttons fade in | Headline: "Your old laptop is someone's first." |

Build: inline SVG + `motion`. Use `useScroll({ target, offset: ["start start", "end end"] })` on the track and `useTransform` to map progress to each element's position, scale, opacity and `pathLength`. Smooth it with `useSpring`. Use simple geometric shapes, no stock clip-art.

### 1 · The Problem: "Two problems, one fix" (~320 words)
- **E-waste**: an **EwasteBars** chart for 2022 (62 Mt generated vs. 13.8 Mt documented recycled, 22.3%) and a 2030 projection bar (82 Mt). Line under it: "rising five times faster than documented recycling" (ITU, 2024).
- **World map** (EwasteWorldMap): animated flow lines from the US and EU to Ghana, plus a short caption about Agbogbloshie (Shaw, 2019).
- **Digital divide**: a **Waffle** chart (100 squares, 41 filled): "41% of US adults earning under $30K don't have a laptop or desktop. 43% don't have home broadband" (Vogels, 2021).
- **Why reuse beats recycling**: a **CarbonSplit** bar showing the manufacturing share (35–56%) against the use phase (Prakash et al., 2012). Point: "The greenest laptop is the one that already exists."

### 2 · Why it matters at Georgia Tech (~250 words)
- Callout card with GT's own research: Windows 10 end of support → up to **240M PCs** at risk of landfill (Georgia Institute of Technology, 2025).
- GT surplus: **~69,000 lbs** sent to electronics recycling in FY2023 (GT Procurement, 2023). Recycling recovers materials, but reuse keeps the whole machine working.
- **Sustainability Next**: show the six priorities as chips and highlight *Institute Operations* and *Living Learning Campus*, since device reuse is a campus-operations practice. Add GT's zero-waste-by-2050 and circular-economy goal.
- **SDG 9 card**: big 9.c and 9.4 tiles with one line each on how Compudopt hits them. Small secondary chips for 4.4, 10.2, 12.5.
- Atlanta stat: **500,000+** metro residents without a home computer and/or high-speed internet. Optional: the BeltLine 25–33% broadband-gap stat.

### 3 · Meet Compudopt (~280 words)
- Mission line, founded 2007, in Atlanta since 2021, office at 760 Bolton Rd (verify hours).
- **Device Journey** (interactive stepper): Drop off → Data wiped (NIST 800-88) → Refurbish or recycle (R2 / e-Stewards) → Delivered free. Each step animates the same laptop icon.
- **2025 by the numbers** grid: 41,970 computers · 319 giveaway events · 10,277 homes connected · 234,119 lbs e-waste · 120 cities in 21 states.
- **US Program Map** (interactive): states shaded green, hubs as dots. Hover or tap a state for its name. Clicking Georgia opens the **Atlanta spotlight** panel: ~8,000 free computers by mid-2024, $7M Santander investment (goals: 7,500 computers, 10,000 homes, 24,000 people trained), 1,600 computers from the CDC Foundation, and 2025 Atlanta partners (Georgia Power, Microsoft, Boys & Girls Club of Metro Atlanta…).
- **GrowthLine**: cumulative computers 65K (Mar 2023) → 160K (Nov 2025) → 200K (Oct 2026).
- **OutcomeRings**: 79% use daily · 84% of kids use for schoolwork · 91% gained tech confidence · 81% more STEM interest.

### 4 · Stories (~380 words)
- **Video**: "Compudopt Carlos" (YouTube embed, click-to-load), with 2–3 sentences of setup.
- **Pull quote**: Tamria Matondo, "That blue bag has changed our household." (Compudopt, 2026).
- **Case study cards** (each with a headline, 2–3 sentences, a stat badge, and a "Read more" link):
  1. *CDC Foundation → Atlanta students*: 1,600+ computers, ~2,000 people helped (2024).
  2. *Clayton County giveaway*: 200 laptops with the county's Office of Digital Equity (2025).
  3. *App State's "Second life, stronger start"*: 200 refurbished laptops for first-years (2026). **"GT could do this."**
  4. *Chicago*: city partnership, 16,000+ computers given, against a 260,000-household gap.
- Optional: a short quote strip from Houston students (Thomas, 2024) or the San Angelo veterans (Banda, 2026).

### 5 · Take Action (~300 words)
- **Donation Checker** (main interactive):
  1. Pick a device from icon buttons: laptop, desktop, tablet, phone, monitor, CRT/TV, printer.
  2. Pick its condition: works / broken but hard drive intact / no hard drive.
  3. Get a result: ✅ accepted (with drop-off options) / ⚠️ Micro Center takes working laptops and desktops only / ❌ not accepted, plus where to recycle on campus (GT Zero Waste hub).
  4. A "Before you donate" checklist: back up, sign out of iCloud/Microsoft, and note that Compudopt wipes drives anyway.
- **Drop-off cards**: Compudopt Atlanta (address, call first) · Micro Center Atlanta-area stores · Mail-in on request.
- **Volunteer**: buttons for the individual form and the group form (pitched to student orgs: "Bring your org").
- **Run a drive** (3 steps): pick a week (move-out or finals), book a collection with Compudopt (855-532-5060), and promote it with our Unit 1 flyer (downloadable).
- **Need a computer?** Link to Compudopt's computer giveaways and low-cost internet pages, for GT students in need too.

### 6 · Sources + footer
- APA list built from `references.json`, with in-text citations linking to it.
- Disclaimer: "Student project for Georgia Tech LMC, not an official Compudopt site."

---

## 3. Rubric coverage check

| Criterion | Where it's covered |
|---|---|
| Audience & purpose | GT student voice ("your old MacBook"), move-out timing, student-org drive, Donation Checker |
| Org authorship & GT alignment | Compudopt brand, mission and voice. Sustainability Next + zero-waste-2050 section. Atlanta partners. |
| Content & evidence | 30+ sourced facts, in-text APA, Sources section, 4 case studies |
| Persuasion & engagement | Problem → GT relevance → proof → 4 specific CTAs with real forms and addresses |
| Multimodal & interactive | Scroll-driven hero story (also counts as an interactive), 2 maps, 5 charts, YouTube video, Device Journey, Donation Checker, clickable map |
| Design & usability | Sticky nav, consistent color meaning, mobile layout, reduced motion, alt text |
| Collaboration & revision | Git history with phase branches/PRs. Revision notes in the README. |

---

## 4. Schedule (3 days)

| When | Phase (see PROMPTS.md) | Owner idea |
|---|---|---|
| **Tue night** | P0 setup · P1 copy draft · P2 layout + nav + sources | Person A (setup/layout), Person B (copy) |
| **Wed** | P3 scroll hero · P4 maps · P5 charts | A: hero + maps, C: charts |
| **Thu** | P6 interactives · P7 stories + video · P8 deploy | B: stories/video, D: Take Action + deploy |
| **Fri** | P9 QA pass (facts, word count, mobile, a11y) → submit link | Everyone reviews on phones |

Merge often: one branch per phase, short PRs, and pull before starting a prompt.

---

## 5. Still to confirm (team)
- [ ] Compudopt Atlanta drop-off address and hours: call 855-532-5060. The contact page says 760 Bolton Rd, but a 2025 article says Forest Park. **Assumed for now:** 760 Bolton Rd (the official contact page), always shown with "call ahead" and the phone number, no hours listed.
- [ ] Which Micro Center Atlanta stores take donations (likely Duluth and Marietta): check the scheduling link. **Assumed for now:** don't name stores; say "participating Micro Center stores (two in metro Atlanta), working laptops and desktops only", which is what our source supports.
- [ ] YouTube upload dates for the APA video citations.
- [ ] Watch the Carlos and Santander videos before embedding.
- [ ] Optionally open the Sustainability Next flipbook (https://online.fliphtml5.com/zvwro/mrlu/) and quote one line from it directly.
- [x] Course number for the footer disclaimer: **LMC 3403**. Team: Aditya Sriram, Akshay Gupta, Rithvik Reddygari, Marie Anyolie (in `src/content/team.ts`).
