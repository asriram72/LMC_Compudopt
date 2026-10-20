/** Horizontal bar path: square at the baseline, 4px rounded data-end. */
export function hBar(x: number, y: number, w: number, h: number, r = 4) {
  const rr = Math.min(r, w / 2, h / 2)
  if (w <= 0) return ''
  return `M${x},${y} H${x + w - rr} Q${x + w},${y} ${x + w},${y + rr} V${y + h - rr} Q${x + w},${y + h} ${x + w - rr},${y + h} H${x} Z`
}

/** Vertical column path: square at the baseline (bottom), 4px rounded top. */
export function vBar(x: number, y: number, w: number, h: number, r = 4) {
  const rr = Math.min(r, w / 2, h / 2)
  if (h <= 0) return ''
  return `M${x},${y + h} V${y + rr} Q${x},${y} ${x + rr},${y} H${x + w - rr} Q${x + w},${y} ${x + w},${y + rr} V${y + h} Z`
}
