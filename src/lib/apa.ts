// Turns the APA strings in references.json into in-text citations and
// reference-list entries. Handles "et al.", n.d. ordering, and same-author/same-year
// suffixes (2026a, n.d.-a) computed over the references actually cited on the page.
import { referencesById, type Reference } from '../data/types'

export interface ParsedRef {
  ref: Reference
  author: string // as written in the reference list
  inTextAuthor: string // "Vogels", "Prakash et al.", "Compudopt"
  year: string // "2024" or "n.d."
  title: string
}

const DATE = /\. \((\d{4}|n\.d\.)([^)]*)\)\. /

const strip = (s: string) => s.replace(/\*/g, '')

export function parse(ref: Reference): ParsedRef {
  const m = ref.apa.match(DATE)
  const author = m ? ref.apa.slice(0, m.index) : ref.apa
  const year = m ? m[1] : 'n.d.'
  const title = m ? strip(ref.apa.slice(m.index! + m[0].length)) : ''

  // Individual authors look like "Surname, A. B." Group authors don't.
  const people = [...`${author}.`.matchAll(/([A-Z][\p{L}'-]+), (?:[A-Z]\.\s?)+/gu)].map((p) => p[1])
  let inTextAuthor = author
  if (people.length >= 3) inTextAuthor = `${people[0]} et al.`
  else if (people.length === 2) inTextAuthor = `${people[0]} & ${people[1]}`
  else if (people.length === 1) inTextAuthor = people[0]

  return { ref, author, inTextAuthor, year, title }
}

/** Year label with a/b/c suffixes for same author + year among the cited set. */
export function yearLabels(citedIds: Iterable<string>): Map<string, string> {
  const groups = new Map<string, ParsedRef[]>()
  for (const id of citedIds) {
    const ref = referencesById[id]
    if (!ref) continue
    const p = parse(ref)
    const key = `${p.inTextAuthor}|${p.year}`
    groups.set(key, [...(groups.get(key) ?? []), p])
  }
  const labels = new Map<string, string>()
  for (const group of groups.values()) {
    group.sort((a, b) => a.title.localeCompare(b.title))
    group.forEach((p, i) => {
      const suffix = group.length > 1 ? String.fromCharCode(97 + i) : ''
      const label = p.year === 'n.d.' && suffix ? `n.d.-${suffix}` : `${p.year}${suffix}`
      labels.set(p.ref.id, label)
    })
  }
  return labels
}

/** Cited references in the same order as the Sources list. */
export function citedEntries(citedIds: Iterable<string>): ParsedRef[] {
  return [...citedIds]
    .filter((id) => referencesById[id])
    .map((id) => parse(referencesById[id]))
    .sort(compareRefs)
}

/** APA 7 reference-list order: author, then n.d. before dated works, then year, then title. */
export function compareRefs(a: ParsedRef, b: ParsedRef): number {
  const byAuthor = strip(a.author).localeCompare(strip(b.author), 'en', { sensitivity: 'base' })
  if (byAuthor) return byAuthor
  const ya = a.year === 'n.d.' ? -1 : Number(a.year)
  const yb = b.year === 'n.d.' ? -1 : Number(b.year)
  return ya - yb || a.title.localeCompare(b.title)
}

/** The reference-list string with the suffixed year and "Retrieved …, from <url>" applied. */
export function referenceText(p: ParsedRef, yearLabel: string): { text: string; url: string | null } {
  let text = p.ref.apa.replace(DATE, (_m, _y: string, rest: string) => `. (${yearLabel}${rest}). `)
  const url = p.ref.url
  if (url && /Retrieved [^.]+\.$/.test(text)) {
    text = text.replace(/\.$/, ', from')
  }
  return { text, url }
}
