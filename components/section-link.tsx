'use client'

import type { ComponentPropsWithoutRef } from 'react'
import { useGooeyBurst } from '@/components/motion/use-gooey-burst'
import { scrollToSection } from '@/lib/scroll-to-section'
import { cn } from '@/lib/utils'

interface SectionLinkProps extends Omit<ComponentPropsWithoutRef<'button'>, 'type'> {
  sectionId: string
  onNavigate?: () => void
}

export function SectionLink({
  sectionId,
  onNavigate,
  className,
  onClick,
  children,
  ...props
}: SectionLinkProps) {
  const { containerRef, effectRef, play } = useGooeyBurst({
    particleCount: 12,
    particleDistances: [70, 10],
    particleR: 80,
    animationTime: 500,
    timeVariance: 250,
    colors: [1, 2, 3, 1, 2, 3, 1, 4],
  })

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    if (event.defaultPrevented) return

    play(containerRef.current)
    scrollToSection(sectionId)
    onNavigate?.()
  }

  const isFullWidth = className?.includes('w-full')

  return (
    <div
      ref={containerRef}
      className={cn('gooey-burst', isFullWidth && 'gooey-burst--block')}
    >
      <button
        type="button"
        className={cn('cursor-pointer bg-transparent p-0 text-left', className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
      <span className="gooey-burst__effect" ref={effectRef} aria-hidden="true" />
    </div>
  )
}
