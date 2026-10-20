// The hero's SVG scene, driven entirely by a 0→1 progress value.
// Storyboard (PLAN.md §2): pile-up → rescue → refurbish → hand-off → zoom out to the US map.
// Only transforms, opacity and pathLength change, so it stays smooth.
import { motion, useTransform, type MotionValue } from 'motion/react'
import { useId, useLayoutEffect, useRef } from 'react'
import { ARCS, ATLANTA, HUBS, US_STATES, US_WIDTH } from '../../lib/geo'

const C = {
  navy: '#193460',
  blue: '#1D76BB',
  green: '#8EC441',
  waste: '#8A8178',
  wasteDark: '#6E665E',
  wasteLight: '#A39B92',
  screenOff: '#3D3833',
  land: '#E3E8EE',
  served: '#D3E8B0',
}

// Map placement inside the 1000×1000 scene: top of the frame, leaving room for the headline.
const MAP_SCALE = 0.86
const MAP_X = (1000 - US_WIDTH * MAP_SCALE) / 2
const MAP_Y = 20
const AX = MAP_X + ATLANTA.x * MAP_SCALE
const AY = MAP_Y + ATLANTA.y * MAP_SCALE

/**
 * Binds an SVG `transform` attribute to a motion value. motion/react swallows a
 * `transform` prop given as a MotionValue, so we write the attribute ourselves.
 */
function useSvgTransform<T extends SVGElement>(value: MotionValue<string>) {
  const ref = useRef<T>(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const set = (v: string) => el.setAttribute('transform', v)
    set(value.get())
    return value.on('change', set)
  }, [value])
  return ref
}

// Laptop drawn around its own center: lid -62…43, base 43…55.
function Laptop({ lid, screen, base }: { lid: string; screen: string; base: string }) {
  return (
    <>
      <rect x={-80} y={-62} width={160} height={105} rx={8} fill={lid} />
      <rect x={-70} y={-53} width={140} height={86} rx={3} fill={screen} />
      <rect x={-95} y={43} width={190} height={12} rx={6} fill={base} />
    </>
  )
}

// Pile: 4 + 3 + 1, bottoms resting on the ground line at y = 760.
const PILE = [
  { x: 230, y: 705, r: -5 },
  { x: 410, y: 705, r: 3 },
  { x: 590, y: 705, r: -2 },
  { x: 770, y: 705, r: 5 },
  { x: 320, y: 610, r: 7 },
  { x: 500, y: 612, r: -4 },
  { x: 680, y: 610, r: 3 },
  { x: 420, y: 515, r: -9 },
]

function PileLaptop({ progress, i }: { progress: MotionValue<number>; i: number }) {
  const { x, y, r } = PILE[i]
  // The first two are already down at progress 0, so the opening frame isn't empty.
  const start = i < 2 ? -1 : (i - 2) * 0.022
  const range = [start, start + 0.04]
  const dy = useTransform(progress, range, [-900, 0])
  const opacity = useTransform(progress, range, [0, 1])
  const transform = useTransform(() => `translate(${x} ${y + dy.get()}) rotate(${r})`)
  const ref = useSvgTransform<SVGGElement>(transform)
  return (
    <motion.g ref={ref} style={{ opacity }}>
      <Laptop lid={i % 2 ? C.waste : C.wasteLight} screen={C.wasteDark} base={C.wasteDark} />
    </motion.g>
  )
}

function HeroLaptop({ progress, glowId }: { progress: MotionValue<number>; glowId: string }) {
  // Drop onto the pile → lift and glow → hold for refurbish → into the student's hands.
  const x = useTransform(progress, [0.2, 0.34, 0.6, 0.72], [580, 500, 500, 640])
  const y = useTransform(progress, [0.15, 0.19, 0.2, 0.34, 0.6, 0.72], [-350, 515, 515, 420, 420, 640])
  const s = useTransform(progress, [0.2, 0.34, 0.6, 0.72], [1, 1.7, 1.7, 1.15])
  const r = useTransform(progress, [0.2, 0.34], [6, 0])
  const transform = useTransform(() => `translate(${x.get()} ${y.get()}) rotate(${r.get()}) scale(${s.get()})`)
  const opacity = useTransform(progress, [0.15, 0.16], [0, 1])

  const glow = useTransform(progress, [0.22, 0.32], [0, 0.85])
  const greenLid = useTransform(progress, [0.24, 0.34], [0, 1])
  const wipe = useTransform(progress, [0.42, 0.54], [0, 1])
  const wipeTransform = useTransform(() => `translate(-70 0) scale(${Math.max(wipe.get(), 0.001)} 1)`)
  const barTransform = useTransform(() => `translate(${-70 + 140 * wipe.get()} 0)`)
  const barOpacity = useTransform(progress, [0.41, 0.42, 0.54, 0.56], [0, 1, 1, 0])
  const check = useTransform(progress, [0.54, 0.6], [0, 1])
  const checkOpacity = useTransform(progress, [0.54, 0.55], [0, 1])
  const ref = useSvgTransform<SVGGElement>(transform)
  const wipeRef = useSvgTransform<SVGRectElement>(wipeTransform)
  const barRef = useSvgTransform<SVGRectElement>(barTransform)

  return (
    <motion.g ref={ref} style={{ opacity }}>
      <motion.rect x={-120} y={-95} width={240} height={180} rx={50} fill={C.green} filter={`url(#${glowId})`} style={{ opacity: glow }} />
      <Laptop lid={C.waste} screen={C.screenOff} base={C.wasteDark} />
      <motion.g style={{ opacity: greenLid }}>
        <rect x={-80} y={-62} width={160} height={105} rx={8} fill={C.green} />
        <rect x={-70} y={-53} width={140} height={86} rx={3} fill={C.screenOff} />
        <rect x={-95} y={43} width={190} height={12} rx={6} fill={C.navy} />
      </motion.g>
      <motion.rect x={0} y={-53} width={140} height={86} rx={3} fill={C.blue} ref={wipeRef} />
      <motion.rect x={-3} y={-53} width={6} height={86} fill="#fff" ref={barRef} style={{ opacity: barOpacity }} />
      <motion.path
        d="M-28,-10 L-8,12 L30,-28"
        fill="none"
        stroke="#fff"
        strokeWidth={9}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength: check, opacity: checkOpacity }}
      />
    </motion.g>
  )
}

function Student({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.6, 0.68], [0, 1])
  const dx = useTransform(progress, [0.6, 0.7], [70, 0])
  const transform = useTransform(() => `translate(${dx.get()} 0)`)
  const ref = useSvgTransform<SVGGElement>(transform)
  return (
    <motion.g ref={ref} style={{ opacity }}>
      <rect x={550} y={420} width={180} height={340} rx={80} fill={C.blue} />
      <circle cx={640} cy={340} r={62} fill={C.navy} />
    </motion.g>
  )
}

/** Arms, hands and smile go on top of the laptop so it looks held. */
function StudentFront({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.66, 0.72], [0, 1])
  const smile = useTransform(progress, [0.72, 0.78], [0, 1])
  return (
    <motion.g style={{ opacity }}>
      <path d="M572,470 Q540,600 540,690 M708,470 Q740,600 740,690" fill="none" stroke={C.blue} strokeWidth={26} strokeLinecap="round" />
      <circle cx={540} cy={694} r={15} fill={C.navy} />
      <circle cx={740} cy={694} r={15} fill={C.navy} />
      <circle cx={620} cy={330} r={6} fill="#fff" />
      <circle cx={660} cy={330} r={6} fill="#fff" />
      <motion.path d="M612,356 Q640,382 668,356" fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" style={{ pathLength: smile }} />
    </motion.g>
  )
}

function MapArc({ progress, d, i }: { progress: MotionValue<number>; d: string; i: number }) {
  const start = 0.86 + (i / ARCS.length) * 0.08
  const pathLength = useTransform(progress, [start, Math.min(start + 0.06, 1)], [0, 1])
  const opacity = useTransform(pathLength, [0, 0.01], [0, 1])
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={C.green}
      strokeWidth={2.5}
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      style={{ pathLength, opacity }}
    />
  )
}

function UsMapScene({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.82, 0.9], [0, 1])
  const zoom = useTransform(progress, [0.8, 0.94], [3, 1])
  const transform = useTransform(
    () => `translate(${AX} ${AY}) scale(${zoom.get()}) translate(${-AX} ${-AY}) translate(${MAP_X} ${MAP_Y}) scale(${MAP_SCALE})`,
  )
  const ref = useSvgTransform<SVGGElement>(transform)
  return (
    <motion.g ref={ref} style={{ opacity }}>
      {US_STATES.map((s) => (
        <path key={s.fips} d={s.d} fill={s.served ? C.served : C.land} stroke="#fff" strokeWidth={0.8} vectorEffect="non-scaling-stroke" />
      ))}
      {ARCS.map((a, i) => (
        <MapArc key={a.postal} progress={progress} d={a.d} i={i} />
      ))}
      {HUBS.map((h) => (
        <circle key={h.city} cx={h.x} cy={h.y} r={4.5} fill={C.navy} />
      ))}
      <circle className="pulse" cx={ATLANTA.x} cy={ATLANTA.y} r={7} fill={C.green} />
      <circle cx={ATLANTA.x} cy={ATLANTA.y} r={7} fill={C.green} stroke={C.navy} strokeWidth={2} />
    </motion.g>
  )
}

export function Scene({ progress, label }: { progress: MotionValue<number>; label: string }) {
  // Zoom out: the whole story shrinks into Atlanta on the map.
  const k = useTransform(progress, [0.8, 0.9], [0, 1])
  const s = useTransform(progress, [0.8, 0.9], [1, 0.06])
  const storyTransform = useTransform(
    () => `translate(${(AX - 640) * k.get()} ${(AY - 640) * k.get()}) translate(640 640) scale(${s.get()}) translate(-640 -640)`,
  )
  const storyOpacity = useTransform(progress, [0.84, 0.9], [1, 0])
  const pileOpacity = useTransform(progress, [0.2, 0.32, 0.6, 0.7], [1, 0.35, 0.35, 0])
  const groundOpacity = useTransform(progress, [0.6, 0.7], [1, 0])
  const storyRef = useSvgTransform<SVGGElement>(storyTransform)
  const glowId = `glow${useId().replace(/:/g, '')}`

  return (
    <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet" role="img" aria-label={label} className="h-full w-full">
      <defs>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>
      <UsMapScene progress={progress} />
      <motion.g ref={storyRef} style={{ opacity: storyOpacity }}>
        <motion.line x1={80} x2={920} y1={760} y2={760} stroke={C.waste} strokeWidth={3} strokeLinecap="round" style={{ opacity: groundOpacity }} />
        <motion.g style={{ opacity: pileOpacity }}>
          {PILE.map((_, i) => (
            <PileLaptop key={i} progress={progress} i={i} />
          ))}
        </motion.g>
        <Student progress={progress} />
        <HeroLaptop progress={progress} glowId={glowId} />
        <StudentFront progress={progress} />
      </motion.g>
    </svg>
  )
}
