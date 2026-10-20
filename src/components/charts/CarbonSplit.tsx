// One 100% bar: manufacturing is 35–56% of a laptop's lifetime footprint (Prakash et al., 2012).
// The uncertain 35–56 range is a hatched band; the rest is the use phase.
import { motion } from 'motion/react'
import { copy } from '../../content/copy'
import { facts } from '../../data/types'
import { usePrefersReducedMotion } from '../../lib/motion'
import { Prose } from '../Cite'
import { ChartTable } from './ChartTable'

const c = copy.problem.reuse
const { low, high } = facts.global.laptopProductionCarbonShare

export default function CarbonSplit() {
  const reduced = usePrefersReducedMotion()
  const reveal = reduced
    ? {}
    : { initial: { opacity: 0, y: 8 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.6 }, transition: { duration: 0.6 } }

  return (
    <motion.figure {...reveal}>
      <div className="flex justify-between gap-4 text-sm font-semibold text-white">
        <span>{c.making}</span>
        <span className="text-right text-white/85">{c.using}</span>
      </div>
      <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="mt-2 h-10 w-full" aria-hidden="true">
        <defs>
          <pattern id="carbon-hatch" width="2" height="2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="2" height="2" fill="var(--color-navy)" />
            <rect width="1" height="2" fill="var(--color-waste-light)" />
          </pattern>
        </defs>
        <rect x={0} y={0} width={low} height={10} fill="var(--color-waste-light)" />
        <rect x={low} y={0} width={high - low} height={10} fill="url(#carbon-hatch)" />
        <rect x={high + 0.4} y={0} width={100 - high - 0.4} height={10} fill="rgba(255,255,255,0.18)" />
      </svg>
      <div className="relative mt-1 h-5 text-xs text-white/80" aria-hidden="true">
        <span className="absolute -translate-x-1/2" style={{ left: `${low}%` }}>
          {low}%
        </span>
        <span className="absolute -translate-x-1/2" style={{ left: `${high}%` }}>
          {high}%
        </span>
      </div>
      <p className="mt-4 text-lg font-semibold text-white">{c.chartLabel}</p>
      <figcaption className="mt-1 text-sm text-white/80">
        <Prose text={c.caption} />
      </figcaption>
      <ChartTable
        caption="Share of a laptop's lifetime carbon footprint"
        head={['Phase', 'Share']}
        rows={[
          ['Manufacturing', `${low}–${high}%`],
          ['Use', `${100 - high}–${100 - low}%`],
        ]}
      />
    </motion.figure>
  )
}
