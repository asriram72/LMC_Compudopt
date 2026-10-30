// Tracks which references are cited on the page, so Sources can hide the rest
// and same-author/same-year suffixes stay consistent between <Cite> and Sources.
import { useSyncExternalStore } from 'react'
import { copy } from '../content/copy'

const cited = new Set<string>()
let snapshot: ReadonlySet<string> = new Set()
const listeners = new Set<() => void>()

function collectCiteIds(value: unknown) {
  if (typeof value === 'string') {
    for (const match of value.matchAll(/\{\{cite:([^}]+)\}\}/g)) {
      for (const id of match[1].split(',')) cited.add(id.trim())
    }
    return
  }
  if (Array.isArray(value)) {
    value.forEach(collectCiteIds)
    return
  }
  if (value && typeof value === 'object') Object.values(value).forEach(collectCiteIds)
}

// Every citation token in the page copy is registered up front, so source
// numbers do not shift as sections mount.
collectCiteIds(copy)
snapshot = new Set(cited)

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
