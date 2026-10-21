// Counts words in every string value of src/content/copy.ts, per section and total.
// Citation tokens like {{cite:itu-2024}} are not counted. Target: 1,200–2,000 words.
import { copy } from '../src/content/copy.ts'

const MIN = 1200
const MAX = 2000

function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(strings)
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings)
  return []
}

function countWords(text: string): number {
  return text
    .replace(/\{\{cite:[^}]+\}\}/g, ' ')
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length
}

let total = 0
for (const [section, value] of Object.entries(copy)) {
  const n = strings(value).reduce((sum, s) => sum + countWords(s), 0)
  total += n
  console.log(`${section.padEnd(16)} ${String(n).padStart(5)}`)
}
console.log('-'.repeat(22))
const status = total < MIN ? `under ${MIN}` : total > MAX ? `over ${MAX}` : 'within limit'
console.log(`${'total'.padEnd(16)} ${String(total).padStart(5)}  (${status}: ${MIN}–${MAX})`)
