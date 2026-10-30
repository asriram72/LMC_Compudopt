import { copy } from '../content/copy'

const photo = copy.transitions.access

/** The "after" counterpart to the Ghana e-waste carousel: a real recipient with a refurbished device. */
export function AccessPhoto() {
  return (
    <figure className="w-full text-white">
      <div className="overflow-hidden rounded-2xl">
        <img
          src={`${import.meta.env.BASE_URL}${photo.src}`}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          className="aspect-[16/7] w-full object-cover"
        />
      </div>
      <figcaption className="px-4 pt-3 text-center md:px-5">
        <p className="font-bold text-white">{photo.caption}</p>
        <p className="mt-1 text-sm text-white/75">
          Photo:{' '}
          <a href={photo.source} target="_blank" rel="noopener">
            {photo.credit}
          </a>
        </p>
      </figcaption>
    </figure>
  )
}
