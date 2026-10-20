// 10×10 waffle: 41 of 100 lower-income US adults have no computer; toggle to 43 with
// no home broadband (Vogels, 2021).
import { motion } from 'motion/react'
import { useState } from 'react'
import { copy } from '../../content/copy'
import { facts } from '../../data/types'
import { usePrefersReducedMotion } from '../../lib/motion'
import { Prose } from '../Cite'

const c = copy.problem.divide.waffle
const MODES = {
  computer: { n: facts.global.usLowIncomeNoComputerPct.value, label: c.computer, button: c.toggleComputer },
  broadband: { n: facts.global.usLowIncomeNoBroadbandPct.value, label: c.broadband, button: c.toggleBroadband },
}
type Mode = keyof typeof MODES

export default function Waffle() {
  const [mode, setMode] = useState<Mode>('computer')
  const reduced = usePrefersReducedMotion()
  const { n, label } = MODES[mode]

  return (
    <figure>
      <div role="group" aria-label={c.toggleLabel} className="mb-5 inline-flex rounded-full bg-white/10 p-1">
        {(Object.keys(MODES) as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => setMode(m)}
            className={`min-h-11 rounded-full px-4 text-sm font-bold transition-colors ${
              mode === m ? 'bg-white text-navy' : 'text-white hover:bg-white/10'
            }`}
          >
            {MODES[m].button}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="grid w-full max-w-[280px] grid-cols-10 gap-[3px]" role="img" aria-label={`${n} of 100 filled: ${label}`}>
          {Array.from({ length: 100 }, (_, i) => (
            <motion.span
              key={i}
              className="aspect-square rounded-[3px]"
              initial={false}
              animate={{ backgroundColor: i < n ? '#9CC9EE' : 'rgba(255,255,255,0.14)' }}
              transition={reduced ? { duration: 0 } : { duration: 0.25, delay: i < n ? i * 0.006 : 0 }}
            />
          ))}
        </div>
        <div aria-live="polite">
          <p className="text-6xl font-extrabold tracking-tight text-white tabular-nums">{n}%</p>
          <p className="mt-2 max-w-[28ch] text-lg text-white/90">{label}</p>
        </div>
      </div>
      <figcaption className="mt-4 text-sm text-white/80">
        <Prose text={c.caption} />
      </figcaption>
    </figure>
  )
}
