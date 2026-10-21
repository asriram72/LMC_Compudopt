import type { ReactNode } from 'react'
import { Prose } from './Cite'

type Tone = 'white' | 'mist' | 'navy'

const tones: Record<Tone, string> = {
  white: 'bg-white text-ink',
  mist: 'bg-mist text-ink',
  navy: 'tone-dark bg-navy text-white',
}

interface SectionProps {
  id: string
  tone?: Tone
  headline: string
  takeaway?: string
  children?: ReactNode
}

/** A full-width page section with a headline and one-line takeaway. */
export function Section({ id, tone = 'white', headline, takeaway, children }: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className={`scroll-mt-16 py-20 md:py-28 ${tones[tone]}`}>
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <h2 id={headingId} className="max-w-[20ch] text-4xl leading-[1.05] font-extrabold tracking-tight md:text-6xl">
          {headline}
        </h2>
        {takeaway && (
          <p className="lede mt-5 max-w-[48ch] text-xl leading-snug md:text-2xl">
            <Prose text={takeaway} />
          </p>
        )}
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  )
}

/** A text block: optional subheading plus paragraphs, capped at 68ch. */
export function Block({ heading, children }: { heading?: string; children: ReactNode }) {
  return (
    <div className="max-w-[68ch]">
      {heading && <h3 className="text-2xl font-bold tracking-tight md:text-3xl">{heading}</h3>}
      <div className="mt-3 space-y-4 text-lg leading-relaxed">{children}</div>
    </div>
  )
}

/** Paragraph from copy.ts with citation tokens resolved. */
export function P({ text, className = '' }: { text: string; className?: string }) {
  return (
    <p className={className}>
      <Prose text={text} />
    </p>
  )
}
