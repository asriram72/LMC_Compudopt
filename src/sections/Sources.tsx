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
    <section id="sources" aria-labelledby="sources-heading" className="scroll-mt-16 bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <h2 id="sources-heading" className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
          Sources
        </h2>
        <ol className="mt-8 max-w-[80ch] space-y-3 text-base leading-relaxed">
          {entries.map((p) => {
            const { text, url } = referenceText(p, labels.get(p.ref.id) ?? p.year)
            return (
              <li key={p.ref.id} id={`ref-${p.ref.id}`} className="scroll-mt-20 pl-8 -indent-8 break-words target:bg-green/20">
                <Italics text={text} />
                {url && (
                  <>
                    {' '}
                    <a href={url} target="_blank" rel="noopener">
                      {url}
                    </a>
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
