import { copy } from '../content/copy'
import { facts } from '../data/types'
import { P } from '../components/Section'
import { StatCounter } from '../components/StatCounter'
import { ScrollStory } from '../components/hero/ScrollStory'

const c = copy.hero
const k = facts.compudoptCumulative
const STATS = [k.livesImpacted, k.computersDistributed, k.householdsConnected, k.ewastePounds]

export function Hero() {
  return (
    <div id="top">
      <a href="#hero-end" className="skip-link">
        {c.skip}
      </a>
      <ScrollStory />
      <section id="hero-end" aria-label="Compudopt impact" className="scroll-mt-16 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <P text={c.statBarIntro} className="text-sm font-semibold tracking-widest text-slate uppercase" />
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
            {STATS.map((s) => (
              <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
