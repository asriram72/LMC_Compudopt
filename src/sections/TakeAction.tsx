import { copy } from '../content/copy'
import { Placeholder } from '../components/Placeholder'
import { Block, P, Section } from '../components/Section'

const c = copy.takeAction

export function TakeAction() {
  return (
    <Section id="takeAction" tone="mist" headline={c.headline} takeaway={c.takeaway}>
      <p className="max-w-[68ch] text-lg">{c.intro}</p>
      <div className="mt-8">
        <Placeholder name="DonationChecker" note="P6: device → condition → result + checklist." tall />
      </div>
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 md:p-8">
          <Block heading={c.dropOff.heading}>
            <P text={c.dropOff.compudopt} />
            <P text={c.dropOff.microCenter} />
          </Block>
        </div>
        <div className="rounded-2xl bg-white p-6 md:p-8">
          <Block heading={c.volunteer.heading}>
            <P text={c.volunteer.body} />
          </Block>
        </div>
        <div className="rounded-2xl bg-white p-6 md:p-8">
          <Block heading={c.drive.heading}>
            <ol className="list-decimal space-y-2 pl-5">
              {c.drive.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </Block>
        </div>
        <div className="rounded-2xl bg-white p-6 md:p-8">
          <Block heading={c.need.heading}>
            <p>{c.need.body}</p>
          </Block>
        </div>
      </div>
    </Section>
  )
}
