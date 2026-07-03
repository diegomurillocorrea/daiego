'use client'

import { useCallback, useRef } from 'react'
import {
  playGooeyBurst,
  positionGooeyEffect,
  type GooeyParticleOptions,
} from './gooey-particles'
import { useMotionSafe } from './use-motion-safe'
import './gooey-effect.css'

export function useGooeyBurst(options: GooeyParticleOptions = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const effectRef = useRef<HTMLSpanElement | null>(null)
  const optionsRef = useRef(options)
  const reduceMotion = useMotionSafe()

  optionsRef.current = options

  const play = useCallback((anchor?: HTMLElement | null) => {
    const container = containerRef.current
    const effect = effectRef.current
    if (!container || !effect || reduceMotion) return

    const target = anchor ?? container
    positionGooeyEffect(container, effect, target)
    playGooeyBurst(effect, optionsRef.current)
  }, [reduceMotion])

  return { containerRef, effectRef, play, reduceMotion }
}
