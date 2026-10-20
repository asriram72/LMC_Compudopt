import { facts } from '../data/types'
import { copy } from '../content/copy'
import { Block, P, Section } from '../components/Section'

const c = copy.whyGT
const highlighted = new Set(['Institute Operations', 'Living Learning Campus'])

export function WhyGT() {
  return (
    <Section id="whyGT" headline={c.headline} takeaway={c.takeaway}>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-mist p-6 md:p-8">
          <Block heading={c.windows10.heading}>
            <P text={c.windows10.body} />
          </Block>
        </div>
        <div className="rounded-2xl bg-mist p-6 md:p-8">
          <Block heading={c.surplus.heading}>
            <P text={c.surplus.body} />
          </Block>
        </div>
      </div>

      <div className="mt-16">
        <Block heading={c.sustainabilityNext.heading}>
          <P text={c.sustainabilityNext.body} />
        </Block>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Sustainability Next priorities">
          {facts.georgiaTech.sustainabilityNextPriorities.items.map((item) => (
            <li
              key={item}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                highlighted.has(item) ? 'bg-green text-ink' : 'border border-slate/30 text-slate'
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
        <P text={c.sustainabilityNext.zeroWaste} className="mt-6 max-w-[68ch] text-lg leading-relaxed" />
      </div>

      <div className="mt-16">
        <Block heading={c.sdg.heading}>
          <P text={c.sdg.intro} />
        </Block>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[c.sdg.target9c, c.sdg.target94].map((t) => (
            <div key={t} className="rounded-2xl border-2 border-blue/30 p-6">
              <p className="text-lg leading-relaxed">{t}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate">
          {c.sdg.alsoLabel}: {facts.sdg9.alsoTouches.join(' · ')}
        </p>
      </div>

      <P text={c.atlanta} className="mt-16 max-w-[40ch] font-serif text-2xl leading-snug font-bold text-navy md:text-3xl" />
    </Section>
  )
}
