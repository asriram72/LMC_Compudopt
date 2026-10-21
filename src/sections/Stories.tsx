import { facts, referencesById } from '../data/types'
import { copy } from '../content/copy'
import { ExternalLink } from '../components/ExternalLink'
import { Block, P, Section } from '../components/Section'
import { YouTube } from '../components/YouTube'

const c = copy.stories
const carlos = facts.stories.find((s) => s.name === 'Carlos')!

/** First reference with a URL among a string's {{cite:…}} tokens, for "Read more". */
function readMoreUrl(text: string): string | null {
  const ids = [...text.matchAll(/\{\{cite:([^}]+)\}\}/g)].flatMap((m) => m[1].split(',').map((s) => s.trim()))
  return ids.map((id) => referencesById[id]?.url).find((u): u is string => !!u) ?? null
}

export function Stories() {
  return (
    <Section id="stories" headline={c.headline} takeaway={c.takeaway}>
      <div className="grid gap-10 md:grid-cols-[2fr_3fr] md:items-center">
        <Block heading={c.video.heading}>
          <P text={c.video.intro} />
        </Block>
        <YouTube id={carlos.youtubeId!} title={c.video.title} playLabel={c.video.play} />
      </div>

      <figure className="mt-20 border-l-4 border-green pl-6 md:pl-10">
        <blockquote className="font-serif text-3xl leading-snug font-bold text-navy md:text-5xl">“{c.quote.text}”</blockquote>
        <figcaption className="mt-4 max-w-[60ch] text-lg">
          <span className="font-semibold">{c.quote.attribution}.</span> <P text={c.quote.context} className="inline" />
        </figcaption>
      </figure>

      <h3 className="mt-20 text-2xl font-bold tracking-tight md:text-3xl">{c.casesHeading}</h3>
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {c.cases.map((k) => {
          const url = readMoreUrl(k.body)
          const bridge = 'kicker' in k
          return (
            <li key={k.key} className={`flex flex-col rounded-3xl p-6 md:p-8 ${bridge ? 'bg-navy text-white tone-dark' : 'bg-mist'}`}>
              <p className={`self-start rounded-full px-3 py-1 text-sm font-bold ${bridge ? 'bg-green text-ink' : 'bg-white text-navy'}`}>{k.badge}</p>
              <h4 className="mt-4 text-2xl font-extrabold tracking-tight">{k.title}</h4>
              <P text={k.body} className="mt-3 text-lg leading-relaxed" />
              {bridge && (
                <p className="mt-4 text-2xl font-extrabold">
                  {k.kicker}{' '}
                  <a href="#takeAction" className="text-base font-bold whitespace-nowrap">
                    {c.bridge} →
                  </a>
                </p>
              )}
              {url && (
                <ExternalLink href={url} className="mt-auto pt-4 font-semibold">
                  {c.readMore} ↗
                </ExternalLink>
              )}
            </li>
          )
        })}
      </ul>
      <P text={c.outro} className="mt-12 max-w-[68ch] text-lg leading-relaxed" />
    </Section>
  )
}
