import { copy } from '../content/copy'
import { Placeholder } from '../components/Placeholder'

const c = copy.hero

export function Hero() {
  return (
    <div id="top">
      <a href="#hero-end" className="skip-link">
        {c.skip}
      </a>
      <Placeholder name="ScrollStory" note="P3: pinned scroll-driven story, 5 scenes ending on the US map." tall />
      <section id="hero-end" aria-labelledby="hero-heading" className="scroll-mt-16 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h1 id="hero-heading" className="max-w-[16ch] text-5xl leading-[1.02] font-extrabold tracking-tight text-navy md:text-7xl">
            {c.headline}
          </h1>
          <p className="mt-6 max-w-[48ch] text-xl text-slate md:text-2xl">{c.subhead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#takeAction" className="btn-cta px-6 py-3 text-lg">
              {c.ctaPrimary}
            </a>
            <a href="#meetCompudopt" className="btn-ghost px-6 py-3 text-lg">
              {c.ctaSecondary}
            </a>
          </div>
          <div className="mt-14">
            <Placeholder name="StatCounter" note="P3: count-up stat bar from facts.compudoptCumulative." />
          </div>
        </div>
      </section>
    </div>
  )
}
