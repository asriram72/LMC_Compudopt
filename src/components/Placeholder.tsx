/** Labeled stand-in for a visual that a later phase builds. Remove once all are replaced. */
export function Placeholder({ name, note, tall = false }: { name: string; note?: string; tall?: boolean }) {
  return (
    <div
      role="img"
      aria-label={`${name} (coming soon)`}
      className={`placeholder flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center ${
        tall ? 'min-h-[60vh]' : 'min-h-56'
      }`}
    >
      <span className="font-mono text-sm font-semibold">&lt;{name} /&gt;</span>
      {note && <span className="mt-2 max-w-[40ch] text-sm opacity-80">{note}</span>}
    </div>
  )
}
