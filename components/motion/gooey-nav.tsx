'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useMotionSafe } from '@/components/motion/use-motion-safe'
import { scrollToSection } from '@/lib/scroll-to-section'
import { cn } from '@/lib/utils'
import {
  playGooeyBurst,
  positionGooeyEffect,
  type GooeyParticleOptions,
} from './gooey-particles'
import './gooey-effect.css'
import './gooey-nav.css'

export interface GooeyNavItem {
  label: string
  href?: string
  sectionId?: string
}

interface GooeyNavProps extends GooeyParticleOptions {
  items: GooeyNavItem[]
  initialActiveIndex?: number
  activeIndex?: number
  onItemClick?: (item: GooeyNavItem, index: number) => void
  className?: string
}

export function GooeyNav({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
  activeIndex: controlledActiveIndex,
  onItemClick,
  className,
}: GooeyNavProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLUListElement>(null)
  const filterRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const reduceMotion = useMotionSafe()
  const [activeIndex, setActiveIndex] = useState(
    controlledActiveIndex ?? initialActiveIndex,
  )

  useEffect(() => {
    if (controlledActiveIndex === undefined) return
    setActiveIndex(controlledActiveIndex)
  }, [controlledActiveIndex])

  const updateEffectPosition = useCallback((element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return

    positionGooeyEffect(containerRef.current, filterRef.current, element)
    positionGooeyEffect(containerRef.current, textRef.current, element)
    textRef.current.innerText = element.innerText
  }, [])

  const playTransition = useCallback(
    (liEl: HTMLElement) => {
      updateEffectPosition(liEl)

      if (textRef.current) {
        textRef.current.classList.remove('is-active')
        void textRef.current.offsetWidth
        textRef.current.classList.add('is-active')
      }

      if (reduceMotion || !filterRef.current) return

      playGooeyBurst(filterRef.current, {
        animationTime,
        particleCount,
        particleDistances,
        particleR,
        timeVariance,
        colors,
        showPill: false,
      })
    },
    [
      animationTime,
      colors,
      particleCount,
      particleDistances,
      particleR,
      reduceMotion,
      timeVariance,
      updateEffectPosition,
    ],
  )

  const handleClick = (event: React.MouseEvent<HTMLLIElement>, index: number) => {
    const liEl = event.currentTarget
    const item = items[index]
    if (!item) return

    if (activeIndex !== index) {
      setActiveIndex(index)
      playTransition(liEl)
    }

    if (item.sectionId) {
      scrollToSection(item.sectionId)
    }

    onItemClick?.(item, index)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== 'Enter' && event.key !== ' ') return

    event.preventDefault()
    const liEl = event.currentTarget.parentElement
    if (!liEl) return

    handleClick({ currentTarget: liEl } as React.MouseEvent<HTMLLIElement>, index)
  }

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return

    if (activeIndex < 0) {
      textRef.current?.classList.remove('is-active')
      filterRef.current?.classList.remove('is-active')
      return
    }

    const activeLi = navRef.current.querySelectorAll('li')[activeIndex]
    if (!activeLi) return

    updateEffectPosition(activeLi)
    textRef.current?.classList.add('is-active')

    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex]
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi)
      }
    })

    resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [activeIndex, updateEffectPosition])

  return (
    <div className={cn('gooey-nav-container gooey-burst', className)} ref={containerRef}>
      <div className="gooey-nav-container__list-wrap">
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li
              key={item.sectionId ?? item.href ?? item.label}
              className={activeIndex === index ? 'active' : ''}
              onClick={(event) => handleClick(event, index)}
            >
              <button
                type="button"
                onKeyDown={(event) => handleKeyDown(event, index)}
                aria-current={activeIndex === index ? 'true' : undefined}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <span className="gooey-burst__effect" ref={filterRef} aria-hidden="true" />
      <span className="effect-text" ref={textRef} aria-hidden="true" />
    </div>
  )
}
