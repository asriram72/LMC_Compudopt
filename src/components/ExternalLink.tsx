import type { ReactNode } from 'react'
import { copy } from '../content/copy'

/** Link that opens in a new tab and says so to screen readers. */
export function ExternalLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener" className={className}>
      {children}
      <span className="sr-only"> {copy.takeAction.volunteer.newTab}</span>
    </a>
  )
}
