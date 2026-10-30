// "2025 by the numbers" from Compudopt's 2025 annual report.
import { copy } from '../../content/copy'
import { facts } from '../../data/types'
import { Prose } from '../Cite'
import { StatCounter } from '../StatCounter'

const c = copy.meetCompudopt.numbers
const n = facts.compudopt2025
const FEATURED_STATS = [
  { value: n.computersDistributed, label: c.computers, accent: 'border-green' },
  { value: n.ewastePounds, label: c.ewaste, accent: 'border-waste' },
]
const SUPPORTING_STATS = [
  { value: n.distributionEvents, label: c.events },
  { value: n.householdsConnected, label: c.households },
  { value: n.cities, label: c.cities },
]

export function StatGrid() {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        {FEATURED_STATS.map((s) => (
          <div key={s.label} className={`rounded-3xl border-t-8 bg-white p-6 shadow-sm md:p-8 ${s.accent}`}>
            <StatCounter value={s.value} label={s.label} size="featured" />
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {SUPPORTING_STATS.map((s) => (
          <div key={s.label} className="rounded-2xl border border-navy/10 bg-white/70 p-5 md:p-6">
            <StatCounter value={s.value} label={s.label} size="supporting" />
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-slate">
        <Prose text={c.cite} />
      </p>
    </div>
  )
}
