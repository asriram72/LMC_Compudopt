import { animate, useInView } from 'motion/react'
import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../lib/motion'

const fmt = new Intl.NumberFormat('en-US')
const sizeClasses = {
  default: 'text-4xl md:text-5xl',
  featured: 'text-5xl md:text-6xl',
  supporting: 'text-3xl md:text-4xl',
}

/** A number that counts up once when it first scrolls into view. */
export function StatCounter({
  value,
  suffix = '',
  label,
  size = 'default',
}: {
  value: number
  suffix?: string
  label: string
  size?: keyof typeof sizeClasses
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !inView || reduced) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = fmt.format(Math.round(v)) + suffix),
    })
    return () => controls.stop()
  }, [inView, reduced, value, suffix])

  return (
    <div>
      {/* Screen readers get the final value; the animated digits are visual only. */}
      <span className="sr-only">
        {fmt.format(value)}
        {suffix} {label}
      </span>
      <span
        aria-hidden="true"
        className={`block font-serif font-black text-navy tabular-nums ${sizeClasses[size]}`}
      >
        <span ref={ref}>
          {reduced || inView ? fmt.format(value) + suffix : '0' + suffix}
        </span>
      </span>
      <span aria-hidden="true" className="mt-1 block text-base text-slate">
        {label}
      </span>
    </div>
  )
}
