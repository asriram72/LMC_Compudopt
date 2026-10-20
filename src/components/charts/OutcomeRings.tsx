// Four radial progress rings from Compudopt's 2025 outcome surveys.
import { motion } from 'motion/react'
import { copy } from '../../content/copy'
import { facts } from '../../data/types'
import { usePrefersReducedMotion } from '../../lib/motion'
import { Prose } from '../Cite'

const c = copy.meetCompudopt.outcomes
const R = 42

export default function OutcomeRings() {
  const reduced = usePrefersReducedMotion()
  return (
    <figure>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-6">
        {facts.compudopt2025.outcomes.map((o, i) => (
          <li key={o.label} className="flex flex-col items-start gap-2">
            <div className="relative size-24">
              <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden="true">
                <circle cx={50} cy={50} r={R} fill="none" stroke="#DCE3EA" strokeWidth={9} />
                <motion.circle
                  cx={50}
                  cy={50}
                  r={R}
                  fill="none"
                  stroke="var(--color-green-mark)"
                  strokeWidth={9}
                  strokeLinecap="round"
                  initial={reduced ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: o.pct / 100 }}
                  animate={reduced ? { pathLength: o.pct / 100 } : undefined}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1, delay: i * 0.12, ease: 'easeOut' }}
                />
              </svg>
              <span aria-hidden="true" className="absolute inset-0 grid place-items-center text-xl font-extrabold text-navy tabular-nums">
                {o.pct}%
              </span>
            </div>
            <p className="text-sm leading-snug text-ink">
              <span className="sr-only">{o.pct}% </span>
              {o.label}
            </p>
          </li>
        ))}
      </ul>
      <figcaption className="mt-4 text-sm text-slate">
        <Prose text={c.caption} />
      </figcaption>
    </figure>
  )
}
