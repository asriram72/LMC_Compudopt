import { Fragment, useLayoutEffect, useMemo, type ReactNode } from 'react'
import { referencesById } from '../data/types'
import { citedEntries } from '../lib/apa'
import { registerCitations, useCitedIds } from '../lib/citations'

/** In-text source number, linking to that entry in the Sources list. */
export function Cite({ ids }: { ids: string | string[] }) {
  const list = useMemo(() => (Array.isArray(ids) ? ids : [ids]), [ids])
  const missing = list.filter((id) => !referencesById[id])
  if (missing.length) throw new Error(`Unknown reference id: ${missing.join(', ')}`)

  useLayoutEffect(() => registerCitations(list), [list])
  const cited = useCitedIds()
  const numbers = useMemo(() => {
    const entries = citedEntries(new Set([...cited, ...list]))
    return new Map(entries.map((p, i) => [p.ref.id, i + 1]))
  }, [cited, list])

  const ordered = [...list].sort((a, b) => (numbers.get(a) ?? 0) - (numbers.get(b) ?? 0))

  return (
    <span className="cite">
      {'['}{ordered.map((id, i) => (
        <Fragment key={id}>
          {i > 0 && ', '}
          <a href={`#ref-${id}`} aria-label={`Source ${numbers.get(id)}`}>
            {numbers.get(id)}
          </a>
        </Fragment>
      ))}{']'}
    </span>
  )
}

const TOKEN = /\s*\{\{cite:([^}]+)\}\}/g

/**
 * Renders a copy.ts string, turning {{cite:id}} tokens into <Cite>.
 * A token written after "." or "," is moved in front of it:
 * "recycling. {{cite:x}}" → "recycling [1]."
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
