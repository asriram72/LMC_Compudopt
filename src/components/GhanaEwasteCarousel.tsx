import { useEffect, useState } from 'react'
import { copy } from '../content/copy'

const carousel = copy.transitions.waste

export function GhanaEwasteCarousel() {
  const [active, setActive] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const slide = carousel.slides[active]
  const total = carousel.slides.length

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReduceMotion(query.matches)
    query.addEventListener('change', updatePreference)
    return () => query.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    if (reduceMotion || isHovered || isFocused) return

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % total)
    }, 4500)

    return () => window.clearInterval(timer)
  }, [isFocused, isHovered, reduceMotion, total])

  const move = (direction: number) => {
    setActive((current) => (current + direction + total) % total)
  }

  return (
    <figure
      className="w-full text-white"
      aria-roledescription="carousel"
      aria-label={carousel.label}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false)
      }}
    >
      <div className="relative aspect-[16/7] w-full overflow-hidden">
        {carousel.slides.map((item, index) => {
          const position = (index - active + total) % total
          const placement =
            position === 0
              ? 'z-30 translate-x-0 scale-100 opacity-100'
              : position === 1
                ? 'z-20 translate-x-[24%] scale-[0.82] opacity-70'
                : 'z-10 -translate-x-[24%] scale-[0.82] opacity-70'

          return (
            <button
              key={item.src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`${carousel.goTo} ${index + 1}`}
              aria-current={position === 0 ? 'true' : undefined}
              className={`absolute top-[5%] left-[17%] h-[90%] w-[66%] overflow-hidden rounded-2xl bg-navy transition-[transform,opacity] duration-700 ease-in-out ${placement}`}
            >
              <img
                src={`${import.meta.env.BASE_URL}${item.src}`}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </button>
          )
        })}
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label={carousel.previous}
          className="absolute top-1/2 left-2 z-40 -translate-y-1/2 px-1 text-5xl leading-none font-bold text-white transition hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label={carousel.next}
          className="absolute top-1/2 right-2 z-40 -translate-y-1/2 px-1 text-5xl leading-none font-bold text-white transition hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <span aria-hidden="true">›</span>
        </button>
        <p className="absolute right-4 bottom-4 z-40 rounded-full bg-navy/90 px-3 py-1 text-sm font-bold text-white">
          {active + 1} / {total}
        </p>
      </div>

      <figcaption className="px-4 pt-3 text-center md:px-5">
        <p className="font-bold text-white">{slide.caption}</p>
        <p className="mt-1 text-sm text-white/75">
          Photo:{' '}
          <a href={slide.source} target="_blank" rel="noopener">
            {slide.credit}
          </a>
          {' · '}
          <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">
            {carousel.license}
          </a>
        </p>
        <div className="mt-2 flex justify-center gap-2" aria-label={carousel.label}>
          {carousel.slides.map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`${carousel.goTo} ${index + 1}`}
              aria-current={index === active ? 'true' : undefined}
              className={`size-3 rounded-full border-2 border-navy transition ${
                index === active ? 'bg-navy' : 'bg-transparent hover:bg-navy/25'
              }`}
            />
          ))}
        </div>
      </figcaption>
    </figure>
  )
}
