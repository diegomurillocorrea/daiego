'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { scrollToSection } from '@/lib/scroll-to-section'
import { cn } from '@/lib/utils'
import { useGooeyBurst } from './use-gooey-burst'
import { useMotionSafe } from './use-motion-safe'

interface PremiumButtonProps {
  children: React.ReactNode
  href?: string
  sectionId?: string
  variant?: 'primary' | 'outline'
  className?: string
  showArrow?: boolean
  onClick?: () => void
}

export function PremiumButton({
  children,
  href,
  sectionId,
  variant = 'primary',
  className,
  showArrow = true,
  onClick,
}: PremiumButtonProps) {
  const reduceMotion = useMotionSafe()
  const { containerRef, effectRef, play } = useGooeyBurst({
    particleCount: 15,
    particleDistances: [90, 10],
    particleR: 100,
    animationTime: 600,
    timeVariance: 300,
    colors: [1, 2, 3, 1, 2, 3, 1, 4],
    showPill: false,
  })

  const handleClick = () => {
    play(containerRef.current)
    if (sectionId) scrollToSection(sectionId)
    onClick?.()
  }

  const isFullWidth = className?.includes('w-full')

  const baseClass =
    variant === 'primary'
      ? 'bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg h-12 px-8 text-base font-medium relative overflow-hidden'
      : 'border border-border text-foreground hover:bg-secondary rounded-lg h-12 px-8 text-base font-medium relative overflow-hidden'

  const content = (
    <>
      {!reduceMotion && variant === 'primary' ? (
        <motion.span
          className="pointer-events-none absolute inset-0 bg-linear-to-r from-primary via-emerald-400/30 to-primary opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          aria-hidden
        />
      ) : null}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        {showArrow ? (
          <motion.span
            className="inline-flex"
            initial={false}
            whileHover={reduceMotion ? undefined : { x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="w-5 h-5" aria-hidden />
          </motion.span>
        ) : null}
      </span>
    </>
  )

  return (
    <div
      ref={containerRef}
      className={cn('gooey-burst', isFullWidth && 'gooey-burst--block')}
    >
      <motion.div
        whileHover={
          reduceMotion
            ? undefined
            : {
                scale: 1.02,
                boxShadow:
                  variant === 'primary'
                    ? '0 0 28px -4px rgba(0, 188, 125, 0.45)'
                    : '0 0 20px -6px rgba(0, 188, 125, 0.2)',
              }
        }
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        className={cn('inline-block', isFullWidth && 'block w-full')}
      >
        <Button
          size="lg"
          variant={variant === 'outline' ? 'outline' : 'default'}
          className={cn(baseClass, className)}
          asChild={!!href}
          onClick={handleClick}
          type={sectionId || !href ? 'button' : undefined}
        >
          {href ? <a href={href}>{content}</a> : <span>{content}</span>}
        </Button>
      </motion.div>
      <span className="gooey-burst__effect" ref={effectRef} aria-hidden="true" />
    </div>
  )
}
