// "2025 by the numbers" from Compudopt's 2025 annual report.
import { copy } from '../../content/copy'
import { facts } from '../../data/types'
import { Prose } from '../Cite'
import { StatCounter } from '../StatCounter'

const c = copy.meetCompudopt.numbers
const n = facts.compudopt2025
const STATS = [
  { value: n.computersDistributed, label: c.computers },
  { value: n.distributionEvents, label: c.events },
  { value: n.householdsConnected, label: c.households },
  { value: n.ewastePounds, label: c.ewaste },
  { value: n.cities, label: c.cities },
]

export function StatGrid() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
        {STATS.map((s) => (
          <StatCounter key={s.label} value={s.value} label={s.label} />
        ))}
      </div>
      <p className="mt-4 text-sm text-slate">
        <Prose text={c.cite} />
      </p>
    </div>
  )
}
