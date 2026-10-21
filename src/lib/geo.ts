// Shared US map geometry for the hero's final scene and UsProgramMap (P4).
// us-atlas's states-albers-10m is pre-projected to 975×610 with
// geoAlbersUsa().scale(1300).translate([487.5, 305]), so we use the same
// projection for hub coordinates.
import { geoAlbersUsa, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { GeometryCollection, Topology } from 'topojson-specification'
import statesTopo from 'us-atlas/states-albers-10m.json'
import { facts } from '../data/types'

export const US_WIDTH = 975
export const US_HEIGHT = 610

const projection = geoAlbersUsa().scale(1300).translate([487.5, 305])
const path = geoPath()

const FIPS: Record<string, string> = {
  AL: '01', AK: '02', AZ: '04', AR: '05', CA: '06', CO: '08', CT: '09', DE: '10', DC: '11', FL: '12',
  GA: '13', HI: '15', ID: '16', IL: '17', IN: '18', IA: '19', KS: '20', KY: '21', LA: '22', ME: '23',
  MD: '24', MA: '25', MI: '26', MN: '27', MS: '28', MO: '29', MT: '30', NE: '31', NV: '32', NH: '33',
  NJ: '34', NM: '35', NY: '36', NC: '37', ND: '38', OH: '39', OK: '40', OR: '41', PA: '42', RI: '44',
  SC: '45', SD: '46', TN: '47', TX: '48', UT: '49', VT: '50', VA: '51', WA: '53', WV: '54', WI: '55', WY: '56',
}
const POSTAL = Object.fromEntries(Object.entries(FIPS).map(([k, v]) => [v, k]))

export interface UsState {
  fips: string
  postal: string
  name: string
  d: string
  centroid: [number, number]
  served: boolean
}

export interface Hub {
  city: string
  state: string
  x: number
  y: number
}

export interface Arc {
  postal: string
  hub: string
  d: string
}

const topo = statesTopo as unknown as Topology<{ states: GeometryCollection<{ name: string }> }>
const served = new Set(facts.programStates.states)

export const US_STATES: UsState[] = feature(topo, topo.objects.states).features.map((f) => {
  const fips = String(f.id)
  const postal = POSTAL[fips] ?? fips
  return {
    fips,
    postal,
    name: f.properties.name,
    d: path(f) ?? '',
    centroid: path.centroid(f) as [number, number],
    served: served.has(postal),
  }
})

export const HUBS: Hub[] = facts.programStates.hubs.map((h) => {
  const [x, y] = projection([h.lon, h.lat]) ?? [0, 0]
  return { city: h.city, state: h.state, x, y }
})

export const ATLANTA = HUBS.find((h) => h.city === 'Atlanta')!

/** Curved arc from the nearest hub to each served state's centroid. Illustrative only. */
export const ARCS: Arc[] = US_STATES.filter((s) => s.served)
  .map((s) => {
    const [x2, y2] = s.centroid
    const hub = HUBS.reduce((best, h) =>
      Math.hypot(h.x - x2, h.y - y2) < Math.hypot(best.x - x2, best.y - y2) ? h : best,
    )
    const dx = x2 - hub.x
    const dy = y2 - hub.y
    const len = Math.hypot(dx, dy)
    if (len < 40) return null // the hub's own state
    // Bow the curve upward, perpendicular to the line, by 20% of its length.
    let nx = -dy / len
    let ny = dx / len
    if (ny > 0) [nx, ny] = [-nx, -ny]
    const cx = (hub.x + x2) / 2 + nx * len * 0.2
    const cy = (hub.y + y2) / 2 + ny * len * 0.2
    return { postal: s.postal, hub: hub.city, d: `M${hub.x},${hub.y} Q${cx},${cy} ${x2},${y2}` }
  })
  .filter((a): a is Arc => a !== null)
