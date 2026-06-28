'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { easeOutExpo, viewport } from '@/lib/motion'
import { useMotionSafe } from './use-motion-safe'

interface Card3DProps {
  children: React.ReactNode
  className?: string
  delay?: number
  glowColor?: 'primary' | 'accent'
}

export function Card3D({ children, className, delay = 0, glowColor = 'primary' }: Card3DProps) {
  const reduceMotion = useMotionSafe()
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    x.set(px)
    y.set(py)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  const glowClass =
    glowColor === 'accent'
      ? 'group-hover:shadow-[0_20px_50px_-15px_rgba(204,52,49,0.15),0_12px_40px_-12px_rgba(0,188,125,0.1)]'
      : 'group-hover:shadow-[0_20px_50px_-15px_rgba(0,188,125,0.15),0_12px_40px_-12px_rgba(204,52,49,0.08)]'

  return (
    <motion.div
      ref={ref}
      className={cn('group relative', className)}
      style={
        reduceMotion
          ? undefined
          : {
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              perspective: 1000,
            }
      }
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, ease: easeOutExpo, delay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={cn(
          'relative h-full overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300',
          glowClass,
          isHovered && !reduceMotion && 'border-primary/45',
        )}
      >
        <span
          className={cn(
            'pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent transition-opacity duration-300',
            glowColor === 'accent' ? 'via-accent/40' : 'via-primary/40',
            isHovered ? 'opacity-100' : 'opacity-0',
          )}
          aria-hidden
        />
        {children}
      </div>
    </motion.div>
  )
}
