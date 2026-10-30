// Interactive map of states where Compudopt runs programs. Hover/tap/focus a state
// for its name; Georgia (Atlanta) opens the spotlight panel.
// Keyboard: the map is one Tab stop; arrow keys move between program states.
import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState, type KeyboardEvent } from 'react'
import { copy } from '../../content/copy'
import { ARCS, ATLANTA, HUBS, US_HEIGHT, US_STATES, US_WIDTH, type UsState } from '../../lib/geo'
import { usePrefersReducedMotion } from '../../lib/motion'
import { useWidth } from '../../lib/useSize'
import { Prose } from '../Cite'
import { AtlantaSpotlight } from './AtlantaSpotlight'

const c = copy.meetCompudopt.map
const SERVED = US_STATES.filter((s) => s.served).sort((a, b) => a.name.localeCompare(b.name))

interface Tip {
  state: UsState
  x: number
  y: number
}

export default function UsProgramMap() {
  const [wrapRef, width] = useWidth<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const [tip, setTip] = useState<Tip | null>(null)
  const [focusIdx, setFocusIdx] = useState(SERVED.findIndex((s) => s.postal === 'GA'))
  const [open, setOpen] = useState(false)
  const pathRefs = useRef(new Map<string, SVGPathElement>())

  const k = width / US_WIDTH || 1
  const showLabels = width >= 480

  function tipAtCentroid(state: UsState) {
    setTip({ state, x: state.centroid[0] * k, y: state.centroid[1] * k })
  }

  function activate(state: UsState) {
    if (state.postal === 'GA') setOpen(true)
    else tipAtCentroid(state)
  }

  function onKey(e: KeyboardEvent<SVGPathElement>, i: number) {
    const next = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: SERVED.length - 1 }[e.key]
    if (next !== undefined) {
      e.preventDefault()
      const j = (next + SERVED.length) % SERVED.length
      setFocusIdx(j)
      pathRefs.current.get(SERVED[j].postal)?.focus()
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      activate(SERVED[i])
    } else if (e.key === 'Escape') {
      setTip(null)
    }
  }

  function closeSpotlight() {
    setOpen(false)
    pathRefs.current.get('GA')?.focus()
  }

  return (
    <figure className="relative">
      <div ref={wrapRef} className="relative" onPointerLeave={(e) => e.pointerType === 'mouse' && setTip(null)}>
        <svg viewBox={`0 0 ${US_WIDTH} ${US_HEIGHT}`} className="h-auto w-full" role="group" aria-label={c.alt}>
          {US_STATES.map((s) => {
            const i = SERVED.indexOf(s)
            const isGA = s.postal === 'GA'
            return (
              <path
                key={s.fips}
                ref={(el) => {
                  if (el && s.served) pathRefs.current.set(s.postal, el)
                }}
                d={s.d}
                className={`us-state ${s.served ? 'served' : ''} ${isGA ? 'cursor-pointer' : ''}`}
                tabIndex={s.served ? (i === focusIdx ? 0 : -1) : undefined}
                role={s.served ? 'button' : undefined}
                aria-label={
                  s.served
                    ? `${s.name}: ${s.places.join(', ')}${isGA ? `. Select to ${c.openSpotlight}.` : ''}`
                    : undefined
                }
                aria-haspopup={isGA ? 'dialog' : undefined}
                aria-expanded={isGA ? open : undefined}
                onPointerMove={(e) => {
                  if (e.pointerType !== 'mouse') return
                  const r = e.currentTarget.ownerSVGElement!.getBoundingClientRect()
                  setTip({ state: s, x: e.clientX - r.left, y: e.clientY - r.top })
                }}
                onClick={() => (isGA ? setOpen(true) : tipAtCentroid(s))}
                onFocus={() => {
                  setFocusIdx(i)
                  tipAtCentroid(s)
                }}
                onBlur={() => setTip(null)}
                onKeyDown={s.served ? (e) => onKey(e, i) : undefined}
              />
            )
          })}

          <g aria-hidden="true" className="pointer-events-none">
            {ARCS.map((a, i) => (
              <motion.path
                key={a.postal}
                d={a.d}
                fill="none"
                stroke="var(--color-green)"
                strokeWidth={2.5}
                strokeLinecap="round"
                initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.04, ease: 'easeOut' }}
              />
            ))}
            {HUBS.map((h) => (
              <g key={h.city}>
                <circle cx={h.x} cy={h.y} r={6} fill="var(--color-navy)" stroke="#fff" strokeWidth={2} />
                {showLabels && (
                  <text x={h.x + 10} y={h.y - 8} className="hub-label" fontSize={12 / k}>
                    {h.city}
                  </text>
                )}
              </g>
            ))}
            <circle className="pulse" cx={ATLANTA.x} cy={ATLANTA.y} r={8} fill="var(--color-green)" />
          </g>
        </svg>

        {tip && (
          <div
            role="status"
            className={`pointer-events-none absolute z-10 w-max max-w-56 -translate-x-1/2 rounded-lg bg-navy px-3 py-2 text-sm text-white shadow-lg ${(wrapRef.current?.getBoundingClientRect().top ?? 0) + tip.y < 160 ? 'translate-y-3' : '-translate-y-[calc(100%+12px)]'}`}
            style={{ left: Math.min(Math.max(tip.x, 112), Math.max(112, width - 112)), top: tip.y }}
          >
            <span className="font-bold">{tip.state.name}</span>
            {tip.state.places.length > 0 && (
              <span className="mt-0.5 block text-white/85">{tip.state.places.join(', ')}</span>
            )}
          </div>
        )}
      </div>

      <figcaption className="mt-4 space-y-3 text-sm text-slate">
        <ul className="flex flex-wrap gap-x-5 gap-y-1" aria-hidden="true">
          <li className="flex items-center gap-2">
            <span className="size-3 rounded-sm bg-[#D3E8B0] ring-1 ring-green" /> {c.legendServed}
          </li>
          <li className="flex items-center gap-2">
            <span className="size-3 rounded-sm bg-[#E3E8EE] ring-1 ring-slate/30" /> {c.legendOther}
          </li>
          <li className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-navy" /> {c.legendHub}
            {!showLabels && `: ${HUBS.map((h) => h.city).join(', ')}`}
          </li>
        </ul>
        <p>
          <Prose text={c.caption} />
        </p>
        <p className="font-semibold text-navy">{c.hint}</p>
      </figcaption>

      <ul className="sr-only" aria-label={c.listLabel}>
        {SERVED.map((s) => (
          <li key={s.postal}>
            {s.name}
            {s.places.length > 0 ? `: ${s.places.join(', ')}` : ''}
          </li>
        ))}
      </ul>

      <AnimatePresence>{open && <AtlantaSpotlight onClose={closeSpotlight} />}</AnimatePresence>
    </figure>
  )
}
