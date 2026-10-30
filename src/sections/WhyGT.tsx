import { facts } from '../data/types'
import { copy } from '../content/copy'
import { Cite, Prose } from '../components/Cite'
import { Block, P, Section } from '../components/Section'

const c = copy.whyGT
const b = c.bridge
const highlighted = new Set(['Institute Operations', 'Living Learning Campus'])
const priorities = facts.georgiaTech.sustainabilityNextPriorities.items
const targets = [
  { id: facts.sdg9.primaryTarget.id, name: b.accessName, text: facts.sdg9.primaryTarget.short, tone: 'text-link-dark' },
  { id: facts.sdg9.secondaryTarget.id, name: b.efficiencyName, text: facts.sdg9.secondaryTarget.short, tone: 'text-green' },
]

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
        <h3 className="text-2xl font-bold tracking-tight md:text-3xl">{b.heading}</h3>
        <p className="mt-3 max-w-[48ch] text-lg leading-relaxed">
          <Prose text={b.intro} />
        </p>

        <div className="mt-8 grid items-stretch gap-4 lg:grid-cols-2">
          <article className="tone-dark flex flex-col rounded-3xl bg-navy p-6 text-white md:p-8">
            <p className="text-sm font-semibold tracking-widest text-white/70 uppercase">{b.unKicker}</p>
            <p className="mt-3 font-serif text-7xl leading-none font-bold text-green" aria-hidden="true">
              9
            </p>
            <h4 className="mt-3 text-2xl font-extrabold">{b.sdgTitle}</h4>
            <p className="mt-2 text-white/85">
              {facts.sdg9.goal} <Cite ids="un-sdg9" />.
            </p>
            <ul className="mt-6 space-y-3">
              {targets.map((t) => (
                <li key={t.id} className="rounded-xl bg-white/10 p-4">
                  <p className={`font-extrabold ${t.tone}`}>
                    {t.id} · {t.name}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-white/85">{t.text}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="flex flex-col rounded-3xl bg-mist p-6 md:p-8">
            <p className="text-sm font-semibold tracking-widest text-slate uppercase">{b.gtKicker}</p>
            <p className="mt-3 font-serif text-7xl leading-none font-bold text-navy" aria-hidden="true">
              {facts.georgiaTech.zeroWasteGoal.year}
            </p>
            <h4 className="mt-3 text-2xl font-extrabold text-navy">{b.gtTitle}</h4>
            <p className="mt-2 text-lg leading-relaxed">
              <span className="font-semibold text-navy">{b.zeroName}. </span>
              <Prose text={b.zeroQuote} />
            </p>
            <p className="mt-3 text-slate">
              <Prose text={b.gtNote} />
            </p>
            <ul className="mt-5 grid gap-2" aria-label="Sustainability Next priorities this project fits">
              {priorities.filter((item) => highlighted.has(item)).map((item) => (
                <li key={item} className="rounded-xl bg-green px-4 py-3 font-extrabold text-ink">
                  {item}
                </li>
              ))}
            </ul>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Other Sustainability Next priorities">
              {priorities.filter((item) => !highlighted.has(item)).map((item) => (
                <li key={item} className="rounded-full border border-slate/30 px-3 py-1 text-sm text-slate">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <h4 className="mt-8 text-sm font-bold tracking-widest text-slate uppercase">{b.meet}</h4>
        <ul className="mt-3 grid gap-3 md:grid-cols-2">
          {[
            { id: facts.sdg9.primaryTarget.id, to: 'Institute Operations', text: b.pairAccess },
            { id: facts.sdg9.secondaryTarget.id, to: 'Living Learning Campus', text: b.pairReuse },
          ].map((pair) => (
            <li key={pair.id} className="rounded-2xl border-2 border-navy/10 p-5">
              <div className="flex flex-wrap items-center gap-2 text-sm font-extrabold">
                <span className="rounded-md bg-navy px-2.5 py-1 text-white">{pair.id}</span>
                <span aria-hidden="true" className="text-lg text-green-mark">
                  →
                </span>
                <span className="rounded-md bg-green px-2.5 py-1 text-ink">{pair.to}</span>
              </div>
              <p className="mt-3 leading-relaxed">
                <Prose text={pair.text} />
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-slate">
          {b.alsoLabel}: {facts.sdg9.alsoTouches.join(' · ')}
        </p>
      </div>

      <P text={c.atlanta} className="mt-16 max-w-[40ch] font-sans text-2xl leading-snug font-bold text-navy md:text-3xl" />
    </Section>
  )
}
