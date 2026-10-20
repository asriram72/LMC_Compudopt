import { useReducedMotion } from 'motion/react'

/** `?motion=reduce` forces reduced motion, for testing in browsers that can't emulate it. */
export const FORCE_REDUCED_MOTION =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('motion') === 'reduce'

export function usePrefersReducedMotion(): boolean {
  const system = useReducedMotion()
  return FORCE_REDUCED_MOTION || !!system
}
