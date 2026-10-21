import { lazy, Suspense } from 'react'
import { copy } from '../content/copy'
import { Placeholder } from '../components/Placeholder'
import { StatGrid } from '../components/charts/StatGrid'
import { P, Section } from '../components/Section'

const UsProgramMap = lazy(() => import('../components/maps/UsProgramMap'))
const GrowthLine = lazy(() => import('../components/charts/GrowthLine'))
const OutcomeRings = lazy(() => import('../components/charts/OutcomeRings'))

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
        <StatGrid />
      </div>
      <div className="mt-16 space-y-6">
        <h3 className="text-2xl font-bold tracking-tight md:text-3xl">{c.map.heading}</h3>
        <Suspense fallback={<div className="aspect-[975/610] w-full" />}>
          <UsProgramMap />
        </Suspense>
      </div>
      <div className="mt-16 grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold tracking-tight">{c.growth.heading}</h3>
          <Suspense fallback={<div className="min-h-60" />}>
            <GrowthLine />
          </Suspense>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold tracking-tight">{c.outcomes.heading}</h3>
          <Suspense fallback={<div className="min-h-60" />}>
            <OutcomeRings />
          </Suspense>
        </div>
      </div>
    </Section>
  )
}
