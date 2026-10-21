import { copy } from '../content/copy'
import { Placeholder } from '../components/Placeholder'
import { Block, P, Section } from '../components/Section'

const c = copy.meetCompudopt

export function MeetCompudopt() {
  return (
    <Section id="meetCompudopt" tone="mist" headline={c.headline} takeaway={c.takeaway}>
      <P text={c.intro} className="max-w-[68ch] text-lg leading-relaxed" />
      <div className="mt-16 space-y-6">
        <h3 className="text-2xl font-bold tracking-tight md:text-3xl">{c.journey.heading}</h3>
        <Placeholder name="DeviceJourney" note="P6: 4-step stepper from copy.meetCompudopt.journey.steps." />
      </div>
      <div className="mt-16 space-y-6">
        <h3 className="text-2xl font-bold tracking-tight md:text-3xl">{c.numbers.heading}</h3>
        <Placeholder name="StatGrid" note="P5: 2025 by the numbers." />
      </div>
      <div className="mt-16 space-y-6">
        <Block heading={c.map.heading}>
          <p>{c.map.hint}</p>
        </Block>
        <Placeholder name="UsProgramMap" note="P4: clickable map + Atlanta spotlight panel." tall />
      </div>
      <div className="mt-16 grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold tracking-tight">{c.growth.heading}</h3>
          <Placeholder name="GrowthLine" />
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold tracking-tight">{c.outcomes.heading}</h3>
          <Placeholder name="OutcomeRings" />
        </div>
      </div>
    </Section>
  )
}
