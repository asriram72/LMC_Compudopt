// Tracks which references are cited on the page, so Sources can hide the rest
// and same-author/same-year suffixes stay consistent between <Cite> and Sources.
import { useSyncExternalStore } from 'react'

const cited = new Set<string>()
let snapshot: ReadonlySet<string> = new Set()
const listeners = new Set<() => void>()

export function registerCitations(ids: string[]) {
  let changed = false
  for (const id of ids) {
    if (!cited.has(id)) {
      cited.add(id)
      changed = true
    }
  }
  if (changed) {
    snapshot = new Set(cited)
    listeners.forEach((l) => l())
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useCitedIds(): ReadonlySet<string> {
  return useSyncExternalStore(subscribe, () => snapshot)
}
