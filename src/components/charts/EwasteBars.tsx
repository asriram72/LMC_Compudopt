// Global e-waste: 62 Mt generated in 2022 with the 13.8 Mt (22.3%) documented-recycled
// share in green, against an 82 Mt projection for 2030 (ITU, 2024). Drawn on the navy band.
import { scaleLinear } from 'd3-scale'
import { motion } from 'motion/react'
import { copy } from '../../content/copy'
import { facts } from '../../data/types'
import { usePrefersReducedMotion } from '../../lib/motion'
import { useWidth } from '../../lib/useSize'
import { Prose } from '../Cite'
import { ChartTable } from './ChartTable'
import { hBar } from './shapes'
import { useChartTip } from './Tooltip'

const c = copy.problem.ewaste.chart
const g = facts.global
const GEN = g.ewasteGenerated2022Mt.value
const REC = g.ewasteRecycled2022Mt.value
const PCT = g.ewasteRecycled2022Pct.value
const PROJ = g.ewasteProjected2030Mt.value

const BAR = 24
const H = 176

export default function EwasteBars() {
  const [ref, width] = useWidth<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const { bind, node } = useChartTip(width)
  const x = scaleLinear().domain([0, PROJ]).range([0, Math.max(width - 64, 0)])
  const y1 = 26
  const y2 = 126
  const grow = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { scaleX: 0 },
          whileInView: { scaleX: 1 },
          viewport: { once: true, amount: 0.6 },
          transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
        }

  return (
    <figure>
      <div ref={ref} className="relative">
        {width > 0 && (
          <svg width={width} height={H} aria-hidden="true" className="overflow-visible text-white">
            <text x={0} y={y1 - 8} className="fill-white/85 text-sm">
              {c.generated}
            </text>
            <motion.g style={{ originX: 0 }} {...grow(0)}>
              <path d={hBar(0, y1, x(GEN), BAR)} fill="var(--color-waste-light)" {...bind(`${c.generated}: ${GEN} Mt`, x(GEN) / 2, y1)} />
              {/* 2px surface gap separates the recycled share from the rest */}
              <rect x={0} y={y1} width={x(REC)} height={BAR} fill="var(--color-green)" {...bind(`${c.recycled}: ${REC} Mt (${PCT}%)`, x(REC) / 2, y1)} />
              <rect x={x(REC)} y={y1} width={2} height={BAR} fill="var(--color-navy)" />
            </motion.g>
            <text x={x(GEN) + 8} y={y1 + 17} className="fill-white font-bold">
              {GEN} Mt
            </text>
            <line x1={x(REC) / 2} x2={x(REC) / 2} y1={y1 + BAR} y2={y1 + BAR + 14} stroke="var(--color-green)" strokeWidth={2} />
            <text x={0} y={y1 + BAR + 32} className="fill-white text-sm font-semibold">
              {c.recycled}: {REC} Mt ({PCT}%)
            </text>

            <text x={0} y={y2 - 8} className="fill-white/85 text-sm">
              {c.projected}
            </text>
            <motion.path
              d={hBar(1, y2, x(PROJ) - 2, BAR)}
              fill="none"
              stroke="var(--color-waste-light)"
              strokeWidth={2}
              strokeDasharray="6 5"
              style={{ originX: 0 }}
              {...grow(0.35)}
              {...bind(`${c.projected}: ${PROJ} Mt`, x(PROJ) / 2, y2)}
            />
            <text x={x(PROJ) + 8} y={y2 + 17} className="fill-white font-bold">
              {PROJ} Mt
            </text>
          </svg>
        )}
        {node}
      </div>
      <p className="mt-2 text-lg font-bold text-white">↗ {c.annotation}</p>
      <figcaption className="mt-1 text-sm text-white/80">
        <Prose text={c.caption} />
      </figcaption>
      <ChartTable
        caption={c.caption.replace(/\s*\{\{cite:[^}]+\}\}/, '')}
        head={['', c.unit]}
        rows={[
          [c.generated, GEN],
          [`${c.recycled} (${PCT}%)`, REC],
          [c.projected, PROJ],
        ]}
      />
    </figure>
  )
}
