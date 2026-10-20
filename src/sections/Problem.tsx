import { lazy, Suspense } from 'react'
import { copy } from '../content/copy'
import { Block, P, Section } from '../components/Section'

const EwasteWorldMap = lazy(() => import('../components/maps/EwasteWorldMap'))
const EwasteBars = lazy(() => import('../components/charts/EwasteBars'))
const Waffle = lazy(() => import('../components/charts/Waffle'))
const CarbonSplit = lazy(() => import('../components/charts/CarbonSplit'))

const c = copy.problem

export function Problem() {
  return (
    <Section id="problem" tone="navy" headline={c.headline} takeaway={c.takeaway}>
      <P text={c.intro} className="max-w-[68ch] text-lg leading-relaxed" />
      <div className="mt-16 grid gap-10 md:grid-cols-2 md:items-center">
        <Block heading={c.ewaste.heading}>
          <P text={c.ewaste.body} />
        </Block>
        <Suspense fallback={<div className="min-h-40" />}>
          <EwasteBars />
        </Suspense>
      </div>
      <div className="mt-20 space-y-6">
        <Block heading={c.worldMap.heading}>
          <P text={c.worldMap.body} />
          <p className="font-semibold">{c.worldMap.contrast}</p>
        </Block>
        <Suspense fallback={<div className="aspect-[96/47] w-full" />}>
          <EwasteWorldMap />
        </Suspense>
      </div>
      <div className="mt-20 grid gap-10 md:grid-cols-2 md:items-center">
        <Block heading={c.divide.heading}>
          <P text={c.divide.body} />
        </Block>
        <Suspense fallback={<div className="min-h-40" />}>
          <Waffle />
        </Suspense>
      </div>
      <div className="mt-20 space-y-6">
        <Block heading={c.reuse.heading}>
          <P text={c.reuse.body} />
        </Block>
        <Suspense fallback={<div className="min-h-40" />}>
          <CarbonSplit />
        </Suspense>
        <p className="font-serif text-3xl leading-snug font-bold md:text-4xl">{c.reuse.kicker}</p>
      </div>
    </Section>
  )
}
