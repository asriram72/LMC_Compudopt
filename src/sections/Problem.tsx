import { lazy, Suspense } from 'react'
import { copy } from '../content/copy'
import { Block, P, Section } from '../components/Section'

const EwasteWorldMap = lazy(() => import('../components/maps/EwasteWorldMap'))
const EwasteBars = lazy(() => import('../components/charts/EwasteBars'))
const Waffle = lazy(() => import('../components/charts/Waffle'))
const CarbonSplit = lazy(() => import('../components/charts/CarbonSplit'))

const c = copy.problem
const wastePhoto = copy.transitions.waste

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
        <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(18rem,3fr)] md:items-center">
          <Block heading={c.worldMap.heading}>
            <P text={c.worldMap.body} />
            <p className="font-semibold">{c.worldMap.contrast}</p>
          </Block>
          <figure className="overflow-hidden rounded-3xl bg-white text-ink shadow-xl">
            <img
              src={`${import.meta.env.BASE_URL}images/ewaste-agbogbloshie.jpg`}
              alt={wastePhoto.alt}
              loading="lazy"
              decoding="async"
              className="aspect-video w-full object-cover"
            />
            <figcaption className="p-4 md:p-5">
              <p className="font-bold text-navy">{wastePhoto.caption}</p>
              <p className="mt-1 text-sm text-slate">
                Photo:{' '}
                <a
                  href="https://commons.wikimedia.org/wiki/File:Electronic_waste_at_Agbogbloshie,_Ghana.jpg"
                  target="_blank"
                  rel="noopener"
                >
                  {wastePhoto.credit}
                </a>
                {' · '}
                <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">
                  {wastePhoto.license}
                </a>
              </p>
            </figcaption>
          </figure>
        </div>
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
