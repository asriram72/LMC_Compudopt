import { useEffect, useState } from 'react'
import { copy } from '../content/copy'

const SECTIONS = ['problem', 'whyGT', 'meetCompudopt', 'stories', 'takeAction', 'sources'] as const

/** Sticky top nav: wordmark, section links that highlight on scroll, Donate button. */
export function Nav() {
  const [active, setActive] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const links = SECTIONS.map((id) => (
    <li key={id}>
      <a
        href={`#${id}`}
        onClick={() => setOpen(false)}
        aria-current={active === id ? 'location' : undefined}
        className={`block rounded-md px-3 py-2 text-base font-semibold text-navy no-underline hover:bg-mist hover:no-underline md:py-1.5 md:text-sm ${
          active === id ? 'bg-mist' : ''
        }`}
      >
        {copy.nav.links[id]}
      </a>
    </li>
  ))

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-white/95 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 md:px-8">
        <a href="#top" className="mr-auto text-lg font-extrabold tracking-tight whitespace-nowrap text-navy no-underline hover:no-underline md:text-xl">
          compudopt <span className="text-link">×</span> GT
        </a>

        <ul className="hidden items-center gap-1 lg:flex">{links}</ul>

        <a href="#takeAction" className="btn-cta px-4 py-2 text-sm whitespace-nowrap">
          <span className="sm:hidden">Donate</span>
          <span className="hidden sm:inline">{copy.nav.donate}</span>
        </a>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-md text-navy hover:bg-mist lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t border-navy/10 bg-white px-4 py-3 lg:hidden">
          {links}
        </ul>
      )}
    </header>
  )
}
