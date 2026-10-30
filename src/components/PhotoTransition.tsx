interface PhotoTransitionProps {
  id: string
  image: string
  alt: string
  eyebrow: string
  headline: string
  credit: string
  sourceUrl: string
  license: string
  licenseUrl: string
  position?: string
}

/** Full-bleed photographic pause between information-heavy sections. */
export function PhotoTransition({
  id,
  image,
  alt,
  eyebrow,
  headline,
  credit,
  sourceUrl,
  license,
  licenseUrl,
  position = 'center',
}: PhotoTransitionProps) {
  const headingId = `${id}-heading`

  return (
    <section id={id} aria-labelledby={headingId} className="relative min-h-[70svh] overflow-hidden bg-navy text-white">
      <img
        src={`${import.meta.env.BASE_URL}images/${image}`}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover"
        style={{ objectPosition: position }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-black/10" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-[70svh] max-w-6xl items-end px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-bold tracking-[0.18em] text-white/85 uppercase">{eyebrow}</p>
          <h2 id={headingId} className="mt-3 max-w-[16ch] font-serif text-4xl leading-tight font-black text-white md:text-6xl">
            {headline}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-white/85">
            Photo:{' '}
            <a href={sourceUrl} target="_blank" rel="noopener" className="text-white">
              {credit}
            </a>
            {' · '}
            <a href={licenseUrl} target="_blank" rel="noopener" className="text-white">
              {license}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
