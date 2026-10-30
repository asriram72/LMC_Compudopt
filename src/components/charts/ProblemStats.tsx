import { copy } from '../../content/copy'
import { facts } from '../../data/types'
import { Cite } from '../Cite'

const c = copy.problem.stats
const g = facts.global

function Stat({
  value,
  label,
  source,
  accent = 'text-white',
}: {
  value: string
  label: string
  source: string
  accent?: string
}) {
  return (
    <div>
      <p className={`text-3xl font-extrabold tracking-tight md:text-4xl ${accent}`}>{value}</p>
      <p className="mt-1 max-w-[24ch] text-sm leading-snug text-white/80">{label}</p>
      <p className="mt-2 text-xs text-white/60">
        <Cite ids={source} />
      </p>
    </div>
  )
}

export function WasteStats() {
  const recycled = g.ewasteRecycled2022Pct.value

  return (
    <figure className="w-fit rounded-2xl border border-white/20 bg-white/6 px-6 py-5">
      <figcaption className="text-sm font-bold tracking-wide text-white/80">{c.ewaste.label}</figcaption>
      <div className="mt-4 flex items-center gap-5">
        <div
          className="relative size-40 shrink-0"
          role="img"
          aria-label={`${g.ewasteGenerated2022Mt.value} million tonnes of global e-waste; ${recycled}% documented as recycled`}
        >
          <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden="true">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="12" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="var(--color-green)"
              strokeWidth="12"
              pathLength="100"
              strokeDasharray={`${recycled} ${100 - recycled}`}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center text-3xl font-extrabold">
            {g.ewasteGenerated2022Mt.value} Mt
          </span>
        </div>
        <div>
          <p className="text-4xl font-extrabold text-green">{recycled}%</p>
          <p className="mt-1 text-sm text-white/80">{c.ewaste.recycled}</p>
          <p className="mt-2 text-xs text-white/60">
            <Cite ids="itu-2024" />
          </p>
        </div>
      </div>
      <div className="mt-5 border-t border-white/15 pt-4">
        <p className="text-sm font-bold tracking-wide text-white/80">{c.access.note}</p>
        <div className="mt-4 grid grid-cols-2 gap-5">
          <Stat
            value={`${g.usLowIncomeNoComputerPct.value}%`}
            label={c.access.computer}
            source="pew-2021"
            accent="text-link-dark"
          />
          <Stat
            value={`${g.usLowIncomeNoBroadbandPct.value}%`}
            label={c.access.broadband}
            source="pew-2021"
            accent="text-link-dark"
          />
        </div>
      </div>
    </figure>
  )
}

export function RecyclingStats() {
  const { low, high } = g.laptopProductionCarbonShare
  const years = g.laptopUsefulLifetimeYears.value

  return (
    <figure className="w-full">
      <div
        className="w-full"
        role="img"
        aria-label={`${low} to ${high} percent of a laptop's lifetime carbon footprint comes from manufacturing it, calculated over a ${years}-year useful lifetime.`}
      >
        <div className="flex h-3 w-full overflow-hidden rounded-full bg-white/15 lg:h-4" aria-hidden="true">
          <div className="h-full bg-green" style={{ width: `${low}%` }} />
          <div
            className="h-full"
            style={{
              width: `${high - low}%`,
              backgroundImage:
                'repeating-linear-gradient(45deg, var(--color-green) 0 3px, #d7efb0 3px 6px)',
            }}
          />
        </div>
        <div className="relative mt-2 h-5 text-sm font-bold text-white/80" aria-hidden="true">
          <span className="absolute -translate-x-1/2 text-green" style={{ left: `${(low + high) / 2}%` }}>
            {low}–{high}%
          </span>
          <span className="absolute right-0">{years} years</span>
        </div>
      </div>
      <figcaption className="mt-4 max-w-[68ch] text-lg leading-relaxed">
        <span className="font-extrabold text-green">
          {low}–{high}%
        </span>{' '}
        {c.reuse.footprint} <Cite ids="prakash-2012" />
        <span className="mt-1 block text-sm text-white/70">
          {c.reuse.lifetime} <Cite ids="prakash-2012" />
        </span>
      </figcaption>
    </figure>
  )
}
