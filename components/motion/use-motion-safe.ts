'use client'

import { useReducedMotion } from 'framer-motion'
import { useIsClient } from '@/hooks/use-is-client'

export const useMotionSafe = () => {
  const isClient = useIsClient()
  const reducedMotion = useReducedMotion()

  if (!isClient) return false

  return reducedMotion === true
}
