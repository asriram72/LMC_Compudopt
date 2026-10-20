import { copy } from '../content/copy'
import { course, team } from '../content/team'

export function Footer() {
  return (
    <footer className="tone-dark bg-ink py-12 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-end md:justify-between md:px-8">
        <div className="max-w-[52ch]">
          <p className="text-xl font-extrabold tracking-tight">
            compudopt <span className="text-green">×</span> GT
          </p>
          <p className="mt-3 text-white/85">{copy.footer.disclaimer}</p>
          <p className="mt-3">
            <a href="https://www.compudopt.org/" target="_blank" rel="noopener">
              {copy.footer.visit}
            </a>
          </p>
        </div>
        <div className="text-sm text-white/85">
          <p className="font-semibold text-white">
            {copy.footer.madeBy} · {course}
          </p>
          <ul className="mt-2 space-y-1">
            {team.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
