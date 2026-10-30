import { Fragment } from 'react'
import { referencesById } from '../data/types'
import { compareRefs, parse, referenceText, yearLabels } from '../lib/apa'
import { useCitedIds } from '../lib/citations'

/** "*Title*" in references.json → <em>Title</em>. */
function Italics({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((part, i) =>
        part.startsWith('*') && part.endsWith('*') ? <em key={i}>{part.slice(1, -1)}</em> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  )
}

/** APA 7 reference list of every reference cited on the page, alphabetical, hanging indent. */
export function Sources() {
  const cited = useCitedIds()
  const labels = yearLabels(cited)
  const entries = [...cited]
    .filter((id) => referencesById[id])
    .map((id) => parse(referencesById[id]))
    .sort(compareRefs)

  return (
    <section id="sources" aria-labelledby="sources-heading" className="tone-dark scroll-mt-16 bg-navy py-16 text-white md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <h2 id="sources-heading" className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Sources
        </h2>
        <ol className="mt-8 w-full space-y-4 text-sm leading-6 md:text-base">
          {entries.map((p, index) => {
            const { text, url } = referenceText(p, labels.get(p.ref.id) ?? p.year)
            return (
              <li
                key={p.ref.id}
                id={`ref-${p.ref.id}`}
                className="grid scroll-mt-20 grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 target:bg-white/10"
              >
                <span className="font-semibold tabular-nums">{index + 1}.</span>
                <p className="break-words">
                  <Italics text={text} />
                  {url && (
                    <>
                      {' '}
                      <a href={url} target="_blank" rel="noopener">
                        {url.replace(/\//g, '/\u200b')}
                      </a>
                    </>
                  )}
                </p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
