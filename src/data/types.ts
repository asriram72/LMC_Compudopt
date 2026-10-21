import factsJson from './facts.json'
import referencesJson from './references.json'

/** One APA 7 entry. Italics in `apa` are marked with *...*. */
export interface Reference {
  id: string
  apa: string
  url: string | null
  /** Newswire/newspaper database article (Access World News); APA allows no URL. */
  awn?: boolean
}

export type Facts = typeof factsJson
export type RefId = (typeof referencesJson)[number]['id']

export const facts: Facts = factsJson
export const references: Reference[] = referencesJson

export const referencesById: Record<string, Reference> = Object.fromEntries(
  references.map((r) => [r.id, r]),
)

/** A fact's `src` may be one id or several. */
export function srcIds(src: string | string[]): string[] {
  return Array.isArray(src) ? src : [src]
}
