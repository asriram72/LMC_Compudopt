import { useState } from 'react'

export interface TipState {
  x: number
  y: number
  text: string
}

/** Hover/focus tooltip for chart marks. Pair with the chart's ChartTable for screen readers. */
/** `width` is the chart's width, used to keep the tooltip inside it near the edges. */
export function useChartTip(width: number) {
  const [tip, setTip] = useState<TipState | null>(null)
  const bind = (text: string, x: number, y: number) => ({
    tabIndex: 0,
    'aria-label': text,
    onPointerEnter: () => setTip({ x, y, text }),
    onPointerLeave: () => setTip(null),
    onFocus: () => setTip({ x, y, text }),
    onBlur: () => setTip(null),
  })
  const node = tip && (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 -translate-y-[calc(100%+8px)] rounded-md bg-ink px-2.5 py-1.5 text-sm font-semibold whitespace-nowrap text-white shadow-lg ${
        tip.x < 90 ? 'translate-x-0' : tip.x > width - 90 ? '-translate-x-full' : '-translate-x-1/2'
      }`}
      style={{ left: tip.x, top: tip.y }}
    >
      {tip.text}
    </div>
  )
  return { bind, node }
}
