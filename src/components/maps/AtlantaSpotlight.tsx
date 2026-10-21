// Atlanta spotlight: a side panel over the map on desktop, a bottom sheet on phones.
// Focus moves in on open; Escape, the close button or the backdrop closes it.
import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { copy } from '../../content/copy'
import { facts } from '../../data/types'
import { Prose } from '../Cite'

const c = copy.meetCompudopt.spotlight

export function AtlantaSpotlight({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      // Keep Tab inside the panel while it's open.
      if (e.key === 'Tab' && panelRef.current) {
        const items = panelRef.current.querySelectorAll<HTMLElement>('a, button')
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 z-40 bg-ink/40 md:hidden"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="spotlight-heading"
        className="spotlight fixed inset-x-0 bottom-0 z-50 max-h-[85svh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl md:absolute md:inset-x-auto md:top-0 md:right-0 md:bottom-auto md:max-h-full md:w-[min(420px,100%)] md:rounded-3xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 id="spotlight-heading" className="text-2xl font-extrabold tracking-tight text-navy">
            {c.heading}
          </h3>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-mist text-navy hover:bg-navy hover:text-white"
          >
            <span className="sr-only">{c.close}</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <ul className="mt-5 space-y-4 text-base leading-relaxed">
          {[c.computers, c.santander, c.cdc, c.need].map((t) => (
            <li key={t} className="border-l-4 border-green pl-4">
              <Prose text={t} />
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm font-semibold text-navy">
          <Prose text={c.partnersLabel} />
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5 text-sm">
          {facts.atlanta.partners2025.map((p) => (
            <li key={p} className="rounded-full bg-mist px-3 py-1 text-ink">
              {p}
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  )
}
