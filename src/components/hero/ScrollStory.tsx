// Scroll-driven hero: a pinned stage whose animation follows scroll position
// (forward on scroll down, rewind on scroll up). Never hijacks or locks scrolling.
// With reduced motion, the five scenes render as static frames instead.
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { useRef, useState } from 'react'
import { copy } from '../../content/copy'
import { usePrefersReducedMotion } from '../../lib/motion'
import { Prose } from '../Cite'
import { Scene } from './Scene'

const c = copy.hero
const SCENES = 5
// Where each scene's caption is fully shown, used by the step dots and static frames.
const SCENE_AT = [0.1, 0.3, 0.5, 0.7, 1]

function stripCites(text: string) {
  return text.replace(/\s*\{\{cite:[^}]+\}\}/g, '')
}

function Headline() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <h1 id="hero-heading" className="max-w-[16ch] text-4xl leading-[1.02] font-extrabold tracking-tight text-navy sm:text-5xl md:text-7xl">
        {c.headline}
      </h1>
      <p className="mt-4 max-w-[46ch] text-lg text-slate md:mt-5 md:text-2xl">{c.subhead}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href="#takeAction" className="btn-cta px-6 py-3 text-lg">
          {c.ctaPrimary}
        </a>
        <a href="#meetCompudopt" className="btn-ghost bg-white px-6 py-3 text-lg">
          {c.ctaSecondary}
        </a>
      </div>
    </div>
  )
}

function Caption({ progress, i }: { progress: MotionValue<number>; i: number }) {
  const a = i / SCENES
  const b = (i + 1) / SCENES
  const last = i === SCENES - 1
  // Scene 5's caption gives way to the headline at 0.9.
  const input = i === 0 ? [0, b - 0.03, b] : last ? [a, a + 0.03, 0.88, 0.9] : [a, a + 0.03, b - 0.03, b]
  const output = i === 0 ? [1, 1, 0] : [0, 1, 1, 0]
  const opacity = useTransform(progress, input, output)
  const visibility = useTransform(opacity, (o) => (o > 0.02 ? 'visible' : 'hidden'))
  const y = useTransform(opacity, [0, 1], [12, 0])
  return (
    <motion.p
      style={{ opacity, visibility, y }}
      className="[grid-area:1/1] mx-auto max-w-[26ch] self-end text-center text-2xl leading-tight font-bold text-navy md:max-w-[40ch] md:text-3xl"
    >
      <Prose text={c.scenes[i]} />
    </motion.p>
  )
}

function Pinned() {
  const track = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.0005 })
  const [scene, setScene] = useState(0)
  useMotionValueEvent(progress, 'change', (v) => setScene(Math.min(SCENES - 1, Math.floor(v * SCENES))))

  const hintOpacity = useTransform(scrollYProgress, [0, 0.03], [1, 0])
  const headOpacity = useTransform(progress, [0.9, 0.97], [0, 1])
  const headVisibility = useTransform(headOpacity, (o) => (o > 0.02 ? 'visible' : 'hidden'))
  const headY = useTransform(headOpacity, [0, 1], [20, 0])

  function goTo(i: number) {
    const el = track.current
    if (!el) return
    const stage = el.firstElementChild as HTMLElement
    const top = el.getBoundingClientRect().top + window.scrollY - 64
    window.scrollTo({ top: top + SCENE_AT[i] * (el.offsetHeight - stage.offsetHeight), behavior: 'smooth' })
  }

  return (
    <section ref={track} aria-labelledby="hero-heading" className="relative h-[300vh] md:h-[400vh]">
      <div className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden bg-gradient-to-b from-white to-mist">
        <div className="absolute inset-x-0 top-0 bottom-36 [mask-image:linear-gradient(to_bottom,black_88%,transparent)] sm:bottom-32 md:bottom-36">
          <Scene progress={progress} label={c.storyLabel} />
        </div>

        <ol className="sr-only">
          {c.scenes.map((s) => (
            <li key={s}>{stripCites(s)}</li>
          ))}
        </ol>

        <div className="absolute inset-x-0 bottom-0 grid px-4 pb-12 md:px-8 md:pb-14">
          {c.scenes.map((_, i) => (
            <Caption key={i} progress={progress} i={i} />
          ))}
          <motion.div style={{ opacity: headOpacity, visibility: headVisibility, y: headY }} className="[grid-area:1/1] self-end">
            <Headline />
          </motion.div>
        </div>

        <nav aria-label={c.progressLabel} className="absolute top-1/2 right-1 -translate-y-1/2 md:right-5">
          <ol className="flex flex-col">
            {SCENE_AT.map((_, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`${c.sceneButton} ${i + 1}: ${stripCites(c.scenes[i])}`}
                  aria-current={scene === i ? 'step' : undefined}
                  className="group grid size-11 place-items-center rounded-full"
                >
                  <span
                    className={`block rounded-full transition-all ${
                      scene === i ? 'size-3.5 bg-green ring-2 ring-navy' : 'size-2.5 bg-navy/30 group-hover:bg-navy/60'
                    }`}
                  />
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <motion.p
          aria-hidden="true"
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-sm font-semibold tracking-widest text-slate uppercase"
        >
          {c.scrollHint} ↓
        </motion.p>
      </div>
    </section>
  )
}

function StaticFrame({ at, caption }: { at: number; caption: string }) {
  const progress = useMotionValue(at)
  return (
    <li className="grid items-center gap-4 md:grid-cols-2">
      <div className="mx-auto aspect-square w-full max-w-sm">
        <Scene progress={progress} label={stripCites(caption)} />
      </div>
      <p className="text-2xl leading-tight font-bold text-navy md:text-3xl">
        <Prose text={caption} />
      </p>
    </li>
  )
}

function Static() {
  return (
    <section aria-labelledby="hero-heading" className="bg-white px-4 py-12 md:px-8">
      <ol className="mx-auto max-w-4xl space-y-10">
        {c.scenes.map((s, i) => (
          <StaticFrame key={i} at={SCENE_AT[i] === 1 ? 1 : (i + 1) / SCENES - 0.001} caption={s} />
        ))}
      </ol>
      <div className="mt-14">
        <Headline />
      </div>
    </section>
  )
}

export function ScrollStory() {
  return usePrefersReducedMotion() ? <Static /> : <Pinned />
}
