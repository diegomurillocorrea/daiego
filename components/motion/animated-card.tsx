'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { easeOutExpo, viewport } from '@/lib/motion'
import { useMotionSafe } from './use-motion-safe'

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  shine?: boolean
}

export function AnimatedCard({ children, className, delay = 0, shine = true }: AnimatedCardProps) {
  const reduceMotion = useMotionSafe()

  return (
    <motion.div
      className={cn('group relative overflow-hidden', className)}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.55, ease: easeOutExpo, delay }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -4,
              transition: { duration: 0.25, ease: easeOutExpo },
            }
      }
    >
      {shine && !reduceMotion ? (
        <span
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden
        >
          <span className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />
        </span>
      ) : null}
      {children}
    </motion.div>
  )
}
