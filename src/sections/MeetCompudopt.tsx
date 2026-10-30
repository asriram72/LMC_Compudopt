import { lazy, Suspense } from 'react'
import { copy } from '../content/copy'
import { DeviceJourney } from '../components/interactive/DeviceJourney'
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
        <DeviceJourney />
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
      <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <h3 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">{c.growth.heading}</h3>
          <div className="mt-6 min-w-0 flex-1">
            <Suspense fallback={<div className="min-h-60" />}>
              <GrowthLine />
            </Suspense>
          </div>
        </div>
        <div className="flex min-w-0 flex-col rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <h3 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">{c.outcomes.heading}</h3>
          <div className="mt-6 min-w-0 flex-1">
            <Suspense fallback={<div className="min-h-60" />}>
              <OutcomeRings />
            </Suspense>
          </div>
        </div>
      </div>
    </Section>
  )
}
