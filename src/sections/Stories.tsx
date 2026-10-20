import { copy } from '../content/copy'
import { Placeholder } from '../components/Placeholder'
import { Block, P, Section } from '../components/Section'

const c = copy.stories

export function Stories() {
  return (
    <Section id="stories" headline={c.headline} takeaway={c.takeaway}>
      <div className="grid gap-10 md:grid-cols-[2fr_3fr] md:items-center">
        <Block heading={c.video.heading}>
          <p>{c.video.intro}</p>
        </Block>
        <Placeholder name="YouTube" note={`P7: "${c.video.title}" click-to-load embed.`} />
      </div>

      <figure className="mt-20 border-l-4 border-green pl-6 md:pl-10">
        <blockquote className="font-serif text-3xl leading-snug font-bold text-navy md:text-5xl">
          “{c.quote.text}”
        </blockquote>
        <figcaption className="mt-4 max-w-[60ch] text-lg">
          <span className="font-semibold">{c.quote.attribution}.</span> <P text={c.quote.context} className="inline" />
        </figcaption>
      </figure>

      <h3 className="mt-20 text-2xl font-bold tracking-tight md:text-3xl">{c.casesHeading}</h3>
      <Placeholder name="CaseStudyCards" note="P7: 4 cards (CDC Foundation, Clayton County, App State, Chicago)." />
      <P text={c.outro} className="mt-10 max-w-[68ch] text-lg leading-relaxed" />
    </Section>
  )
}
