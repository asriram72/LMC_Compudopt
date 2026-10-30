// Where dumped e-waste goes: flow lines from North America and Europe to
// Agbogbloshie in Accra, Ghana. Shaw (2019) says the trash comes largely from
// those regions. This map is only about dumped devices; Compudopt's own work
// is US-only (see UsProgramMap).
import { geoEqualEarth, geoPath } from 'd3-geo'
import type { Feature, FeatureCollection, Geometry, LineString } from 'geojson'
import { motion } from 'motion/react'
import { feature } from 'topojson-client'
import type { GeometryCollection, Topology } from 'topojson-specification'
import world from 'world-atlas/countries-110m.json'
import { copy } from '../../content/copy'
import { usePrefersReducedMotion } from '../../lib/motion'
import { useWidth } from '../../lib/useSize'

const c = copy.problem.worldMap
const W = 960
const H = 470

const topo = world as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>
const countries = feature(topo, topo.objects.countries) as FeatureCollection<Geometry, { name: string }>
const shown: FeatureCollection<Geometry, { name: string }> = {
  ...countries,
  features: countries.features.filter((f) => f.properties.name !== 'Antarctica'),
}
const projection = geoEqualEarth().fitSize([W, H], shown)
const path = geoPath(projection)

const ACCRA: [number, number] = [-0.19, 5.6]
const ORIGINS = [
  { key: 'us', at: [-92, 38] as [number, number], label: c.labels.us },
  { key: 'europe', at: [4, 49] as [number, number], label: c.labels.europe },
]

const line = (from: [number, number]): Feature<LineString> => ({
  type: 'Feature',
  properties: {},
  geometry: { type: 'LineString', coordinates: [from, ACCRA] },
})

const FLOWS = ORIGINS.map((o) => ({ ...o, d: path(line(o.at)) ?? '', xy: projection(o.at)! }))
const [AX, AY] = projection(ACCRA)!
const HIGHLIGHT = new Set([
  'United States of America',
  'Canada',
  'Mexico',
  'France',
  'Germany',
  'United Kingdom',
  'Belgium',
  'Netherlands',
  'Spain',
  'Italy',
  'Portugal',
  'Ireland',
  'Switzerland',
  'Austria',
  'Poland',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Greece',
  'Czechia',
  'Romania',
  'Hungary',
])

export default function EwasteWorldMap() {
  const [ref, width] = useWidth<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const fs = 13 / ((width || W) / W) // ~13px on screen at any width

  return (
    <figure>
      <div ref={ref}>
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={c.alt}>
          {shown.features.map((f, i) => (
            <path
              key={i}
              d={path(f) ?? ''}
              fill={HIGHLIGHT.has(f.properties.name) ? '#3A5482' : '#2A4573'}
              stroke="var(--color-navy)"
              strokeWidth={0.5}
            />
          ))}
          {FLOWS.map((f, i) => (
            <g key={f.key}>
              <motion.path
                d={f.d}
                fill="none"
                stroke="#B8AFA6"
                strokeWidth={3}
                strokeLinecap="round"
                initial={reduced ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.6, delay: 0.3 + i * 0.4, ease: 'easeInOut' }}
              />
              {/* Slow dashes moving toward Accra; stopped by reduced motion. */}
              <path d={f.d} fill="none" stroke="var(--color-navy)" strokeWidth={3} strokeDasharray="3 14" className="flow-dash" />
              <circle cx={f.xy[0]} cy={f.xy[1]} r={5} fill="#B8AFA6" />
              <text x={f.xy[0]} y={f.xy[1] - 12} textAnchor="middle" fontSize={fs} className="map-label">
                {f.label}
              </text>
            </g>
          ))}
          <circle className="pulse" cx={AX} cy={AY} r={8} fill="var(--color-waste)" />
          <circle cx={AX} cy={AY} r={7} fill="#B8AFA6" stroke="#fff" strokeWidth={2} />
          <text x={AX + 14} y={AY + 24} fontSize={fs} className="map-label font-bold">
            {c.labels.accra}
          </text>
        </svg>
      </div>
    </figure>
  )
}
