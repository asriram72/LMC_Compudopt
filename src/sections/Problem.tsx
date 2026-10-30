import { lazy, Suspense } from 'react'
import { copy } from '../content/copy'
import { GhanaEwasteCarousel } from '../components/GhanaEwasteCarousel'
import { RecyclingStats, WasteStats } from '../components/charts/ProblemStats'
import { Block, P, Section } from '../components/Section'

const EwasteWorldMap = lazy(() => import('../components/maps/EwasteWorldMap'))

const c = copy.problem

export function Problem() {
  return (
    <Section id="problem" tone="navy" headline={c.headline}>
      <div className="-mt-4 grid items-start gap-8 md:-mt-8 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="space-y-8">
          <div className="space-y-5">
            <P text={c.intro} className="text-lg leading-relaxed" />
            <P text={c.ewaste.body} className="text-lg leading-relaxed" />
          </div>
          <Block heading={c.divide.heading}>
            <P text={c.divide.body} />
          </Block>
        </div>
        <WasteStats />
      </div>

      <div className="mt-12">
        <GhanaEwasteCarousel />
        <div className="mt-8">
          <h3 className="text-2xl font-bold tracking-tight md:text-3xl">{c.worldMap.heading}</h3>
          <div className="mt-3 text-lg leading-relaxed">
            <P text={c.worldMap.body} />
          </div>
          <Suspense fallback={<div className="mt-4 aspect-[96/47] w-full" />}>
            <EwasteWorldMap />
          </Suspense>
        </div>
      </div>

      <div className="mt-12 space-y-6">
        <Block heading={c.reuse.heading}>
          <P text={c.reuse.body} />
        </Block>
        <RecyclingStats />
      </div>
    </Section>
  )
}
