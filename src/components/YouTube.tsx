import { useState } from 'react'

/**
 * Click-to-load YouTube facade: shows the thumbnail and a play button, and only
 * loads the (privacy-enhanced) youtube-nocookie player when clicked.
 */
export function YouTube({
  id,
  title,
  playLabel = 'Play video',
  fill = false,
}: {
  id: string
  title: string
  playLabel?: string
  /** On large screens, stretch to the height of the neighboring text. */
  fill?: boolean
}) {
  const [playing, setPlaying] = useState(false)
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl bg-ink shadow-lg ${fill ? 'aspect-video lg:absolute lg:inset-0 lg:aspect-auto' : 'aspect-video'}`}
    >
      {playing ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 size-full">
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="absolute inset-0 size-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-20 place-items-center rounded-full bg-green text-ink shadow-xl transition-transform group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="ml-1 size-9" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
          <span className="absolute inset-x-0 bottom-0 p-4 text-left text-lg font-bold text-white">
            {playLabel}: {title}
          </span>
        </button>
      )}
    </div>
  )
}
