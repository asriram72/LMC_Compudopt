import { Fragment, useLayoutEffect, useMemo, type ReactNode } from 'react'
import { referencesById } from '../data/types'
import { parse, yearLabels } from '../lib/apa'
import { registerCitations, useCitedIds } from '../lib/citations'

/** In-text APA citation, e.g. "(Vogels, 2021)", linking to its Sources entry. */
export function Cite({ ids }: { ids: string | string[] }) {
  const list = useMemo(() => (Array.isArray(ids) ? ids : [ids]), [ids])
  const missing = list.filter((id) => !referencesById[id])
  if (missing.length) throw new Error(`Unknown reference id: ${missing.join(', ')}`)

  useLayoutEffect(() => registerCitations(list), [list])
  const cited = useCitedIds()
  const labels = yearLabels(new Set([...cited, ...list]))

  // APA orders multiple works in one parenthetical alphabetically by author.
  const parts = list
    .map((id) => parse(referencesById[id]))
    .sort((a, b) => a.inTextAuthor.localeCompare(b.inTextAuthor))

  return (
    <span className="cite text-[0.85em]">
      (
      {parts.map((p, i) => (
        <Fragment key={p.ref.id}>
          {i > 0 && '; '}
          <a href={`#ref-${p.ref.id}`}>
            {p.inTextAuthor}, <span className="whitespace-nowrap">{labels.get(p.ref.id) ?? p.year}</span>
          </a>
        </Fragment>
      ))}
      )
    </span>
  )
}

const TOKEN = /\s*\{\{cite:([^}]+)\}\}/g

/**
 * Renders a copy.ts string, turning {{cite:id}} tokens into <Cite>.
 * APA puts the parenthetical before the sentence's punctuation, so a token written
 * after "." or "," is moved in front of it: "recycling. {{cite:x}}" → "recycling (X, 2024)."
 */
export function Prose({ text }: { text: string }) {
  const out: ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(TOKEN)) {
    const before = text.slice(last, m.index)
    const punct = /[.,;:]$/.test(before) ? before.slice(-1) : ''
    const cite = <Cite key={m.index} ids={m[1].split(',').map((s) => s.trim())} />
    out.push(punct ? before.slice(0, -1) : before, ' ', cite, punct)
    last = m.index! + m[0].length
  }
  out.push(text.slice(last))
  return <>{out}</>
}
