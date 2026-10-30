// Cumulative computers distributed: 65K (Mar 2023) → 160K (Nov 2025) → 200K (Oct 2026).
// Each point comes from its own dated source, cited in the list under the chart.
import { scaleLinear, scaleTime } from 'd3-scale'
import { area, line } from 'd3-shape'
import { motion } from 'motion/react'
import { copy } from '../../content/copy'
import { facts } from '../../data/types'
import { usePrefersReducedMotion } from '../../lib/motion'
import { useWidth } from '../../lib/useSize'
import { Prose } from '../Cite'
import { ChartTable } from './ChartTable'
import { useChartTip } from './Tooltip'

const c = copy.meetCompudopt.growth
const POINTS = facts.compudoptGrowth.computers.map((p) => ({ ...p, d: new Date(`${p.date}-01T00:00:00`) }))
const H = 240
const M = { top: 34, right: 28, bottom: 30, left: 44 }
const month = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' })
const year = new Intl.DateTimeFormat('en-US', { year: 'numeric' })
const compact = (v: number) => (v === 0 ? '0' : `${v / 1000}K`)

export default function GrowthLine() {
  const [ref, width] = useWidth<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const { bind, node } = useChartTip(width)
  const x = scaleTime()
    .domain([POINTS[0].d, POINTS[POINTS.length - 1].d])
    .range([M.left + 8, Math.max(width - M.right, M.left + 9)])
  const y = scaleLinear().domain([0, 200000]).range([H - M.bottom, M.top])
  const lineD = line<(typeof POINTS)[number]>()
    .x((p) => x(p.d))
    .y((p) => y(p.value))(POINTS)!
  const areaD = area<(typeof POINTS)[number]>()
    .x((p) => x(p.d))
    .y0(y(0))
    .y1((p) => y(p.value))(POINTS)!
  const draw = reduced
    ? {}
    : { initial: { pathLength: 0 }, whileInView: { pathLength: 1 }, viewport: { once: true, amount: 0.6 }, transition: { duration: 1.2, ease: 'easeInOut' as const } }

  return (
    <figure>
      <div ref={ref} className="relative">
        {width > 0 && (
          <svg width={width} height={H} aria-hidden="true" className="overflow-visible">
            {[0, 100000, 200000].map((t) => (
              <g key={t}>
                <line x1={M.left} x2={width - M.right} y1={y(t)} y2={y(t)} stroke="#D5DCE4" strokeWidth={1} />
                <text x={M.left - 8} y={y(t) + 4} textAnchor="end" className="fill-slate text-xs">
                  {compact(t)}
                </text>
              </g>
            ))}
            <path d={areaD} fill="var(--color-green-mark)" opacity={0.1} />
            <motion.path d={lineD} fill="none" stroke="var(--color-green-mark)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...draw} />
            {POINTS.map((p, i) => {
              const px = x(p.d)
              const py = y(p.value)
              const anchor = i === 0 ? 'start' : i === POINTS.length - 1 ? 'end' : 'middle'
              return (
                <g key={p.date}>
                  <circle
                    cx={px}
                    cy={py}
                    r={6}
                    fill="var(--color-green-mark)"
                    stroke="var(--color-mist)"
                    strokeWidth={2}
                    {...bind(`${month.format(p.d)}: ${p.value.toLocaleString('en-US')}`, px, py - 8)}
                  />
                  <text x={px} y={py - 14} textAnchor={anchor} className="fill-ink text-sm font-bold">
                    {compact(p.value)}
                  </text>
                  <text x={px} y={H - 8} textAnchor={anchor} className="fill-slate text-xs">
                    {(width < 420 ? year : month).format(p.d)}
                  </text>
                </g>
              )
            })}
          </svg>
        )}
        {node}
      </div>
      <figcaption className="mt-3 text-sm text-slate">
        <p>{c.caption}</p>
        <ul className="mt-1 space-y-0.5">
          {c.points.map((t) => (
            <li key={t}>
              <Prose text={t} />
            </li>
          ))}
        </ul>
      </figcaption>
      <ChartTable caption={c.caption} head={['Date', 'Computers']} rows={POINTS.map((p) => [month.format(p.d), p.value.toLocaleString('en-US')])} />
    </figure>
  )
}
