// "What happens to your laptop": a 4-step stepper. One laptop changes at each step:
// drop-off box → NIST 800-88 wipe → refurbish (or recycle via R2 / e-Stewards) → handed to a student.
// Chips, Next/Back, arrow keys and swipe all move it; it auto-plays once on first view
// (not with reduced motion) and stops as soon as someone interacts.
import { AnimatePresence, motion, useInView } from 'motion/react'
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { copy } from '../../content/copy'
import { usePrefersReducedMotion } from '../../lib/motion'
import { Prose } from '../Cite'
import { Laptop } from '../illustrations/Laptop'

const c = copy.meetCompudopt.journey
const STEPS = c.steps
const C = { navy: '#193460', blue: '#1D76BB', green: '#8EC441', greenMark: '#5E8F1F', waste: '#8A8178', dark: '#3D3833', mist: '#F1F4F7' }

// Laptop pose per step, in the 400×260 stage.
const POSE = [
  { x: 200, y: 92, scale: 0.8 },
  { x: 200, y: 120, scale: 1 },
  { x: 170, y: 120, scale: 0.95 },
  { x: 160, y: 150, scale: 0.75 },
]

function Stage({ step, reduced }: { step: number; reduced: boolean }) {
  const t = reduced ? { duration: 0 } : { type: 'spring' as const, stiffness: 200, damping: 26 }
  const fade = reduced
    ? {}
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3 } }
  const refurbished = step >= 2
  return (
    <svg viewBox="0 0 400 260" className="h-auto w-full" aria-hidden="true">
      <AnimatePresence>
        {step === 0 && (
          <motion.g key="box" {...fade}>
            <path d="M120,150 L280,150 L268,236 L132,236 Z" fill="#C9A27A" />
            <path d="M120,150 L96,128 L176,128 L200,150 Z M280,150 L304,128 L224,128 L200,150 Z" fill="#B68B60" />
          </motion.g>
        )}
        {step === 2 && (
          <motion.g key="recycle" {...fade}>
            <path d="M262,118 C300,118 312,96 330,80" fill="none" stroke={C.waste} strokeWidth={3} strokeDasharray="6 5" />
            <circle cx={340} cy={72} r={22} fill={C.mist} stroke={C.waste} strokeWidth={2} />
            <path d="M331,76 l9,-14 l9,14 z" fill="none" stroke={C.navy} strokeWidth={2.5} strokeLinejoin="round" />
            <text x={340} y={114} textAnchor="middle" fontSize={13} fontWeight={700} fill={C.navy}>
              R2 / e-Stewards
            </text>
          </motion.g>
        )}
        {step === 3 && (
          <motion.g key="person" {...fade}>
            <rect x={232} y={130} width={90} height={130} rx={40} fill={C.blue} />
            <circle cx={277} cy={98} r={30} fill={C.navy} />
            <path d="M265,106 Q277,118 289,106" fill="none" stroke="#fff" strokeWidth={4} strokeLinecap="round" />
            <path d="M244,160 Q220,182 214,196" fill="none" stroke={C.blue} strokeWidth={16} strokeLinecap="round" />
          </motion.g>
        )}
      </AnimatePresence>

      <g transform="translate(0 0)">
        <motion.g initial={false} animate={POSE[step]} transition={t}>
          <Laptop lid={refurbished ? C.green : C.waste} screen={step >= 1 ? C.blue : C.dark} base={refurbished ? C.navy : '#6E665E'} />
          {step === 1 && (
            <motion.rect
              key="wipe"
              x={-70}
              y={-53}
              width={6}
              height={86}
              fill="#fff"
              initial={reduced ? false : { x: -70, opacity: 1 }}
              animate={{ x: 64, opacity: [1, 1, 0] }}
              transition={reduced ? { duration: 0 } : { duration: 1.4, ease: 'easeInOut' }}
            />
          )}
          {step >= 1 && (
            <path d="M-26,-10 L-8,10 L28,-26" fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
          )}
        </motion.g>
      </g>

      {step === 1 && (
        <text x={200} y={214} textAnchor="middle" fontSize={16} fontWeight={800} fill={C.navy}>
          NIST 800-88
        </text>
      )}
      {step === 2 && (
        <g fill={C.greenMark}>
          <path d="M96,66 l4,10 l10,4 l-10,4 l-4,10 l-4,-10 l-10,-4 l10,-4 z" />
          <path d="M250,190 l3,7 l7,3 l-7,3 l-3,7 l-3,-7 l-7,-3 l7,-3 z" />
        </g>
      )}
    </svg>
  )
}

export function DeviceJourney() {
  const [step, setStep] = useState(0)
  const [touched, setTouched] = useState(false)
  const reduced = usePrefersReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  const inView = useInView(root, { once: true, amount: 0.6 })
  const swipeStart = useRef<number | null>(null)

  // Auto-advance once through the steps on first view.
  useEffect(() => {
    if (!inView || reduced || touched) return
    const id = window.setInterval(() => {
      setStep((s) => {
        if (s >= STEPS.length - 1) {
          window.clearInterval(id)
          return s
        }
        return s + 1
      })
    }, 2600)
    return () => window.clearInterval(id)
  }, [inView, reduced, touched])

  const go = (i: number) => {
    setTouched(true)
    setStep(Math.max(0, Math.min(STEPS.length - 1, i)))
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(step + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(step - 1)
    }
  }

  function onPointerUp(e: PointerEvent) {
    if (swipeStart.current === null) return
    const dx = e.clientX - swipeStart.current
    swipeStart.current = null
    if (Math.abs(dx) > 40) go(step + (dx < 0 ? 1 : -1))
  }

  return (
    <div ref={root} onKeyDown={onKeyDown} className="rounded-3xl bg-white p-5 md:p-8">
      <ol aria-label={c.stepsLabel} className="grid gap-2 md:grid-cols-4">
        {STEPS.map((s, i) => (
          <li key={s.title}>
            <button
              type="button"
              onClick={() => go(i)}
              aria-current={step === i ? 'step' : undefined}
              className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2 text-left font-bold transition-colors ${
                step === i ? 'bg-navy text-white' : 'bg-mist text-navy hover:bg-navy/10'
              }`}
            >
              <span
                className={`grid size-7 shrink-0 place-items-center rounded-full text-sm ${
                  step === i ? 'bg-green text-ink' : i < step ? 'bg-green-mark text-white' : 'bg-white text-navy'
                }`}
              >
                {i + 1}
              </span>
              {s.title}
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-6 grid items-center gap-6 md:grid-cols-[3fr_2fr]">
        <div
          className="touch-pan-y select-none"
          onPointerDown={(e) => (swipeStart.current = e.clientX)}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (swipeStart.current = null)}
        >
          <Stage step={step} reduced={reduced} />
        </div>
        <div>
          <div aria-live="polite">
            <p className="text-sm font-semibold tracking-wide text-slate uppercase">
              {c.step} {step + 1} / {STEPS.length}
            </p>
            <h4 className="mt-1 text-2xl font-extrabold tracking-tight text-navy">{STEPS[step].title}</h4>
            <p className="mt-2 text-lg leading-relaxed">{STEPS[step].body}</p>
          </div>
          <p className="mt-2 text-sm text-slate">
            <Prose text={c.cite} />
          </p>
          <div className="mt-5 flex gap-3">
            <button type="button" onClick={() => go(step - 1)} disabled={step === 0} className="btn-ghost px-5 py-2 disabled:opacity-40">
              ← {c.back}
            </button>
            <button type="button" onClick={() => go(step + 1)} disabled={step === STEPS.length - 1} className="btn-cta px-5 py-2 disabled:opacity-40">
              {c.next} →
            </button>
          </div>
          <p className="mt-3 text-sm text-slate">{c.swipeHint}</p>
        </div>
      </div>
    </div>
  )
}
