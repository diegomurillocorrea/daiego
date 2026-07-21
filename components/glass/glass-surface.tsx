'use client'

import { useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useMotionSafe } from '@/components/motion/use-motion-safe'
import './glass.css'

interface GlassSurfaceProps {
  children: ReactNode
  className?: string
  tint?: 'neutral' | 'primary' | 'accent' | 'warm' | 'cool'
  active?: boolean
  asButton?: boolean
  ariaLabel?: string
  onClick?: () => void
  breathe?: boolean
}

const tintClass = {
  neutral: '',
  primary: 'glass-surface-primary',
  accent: 'glass-surface-accent',
  warm: 'glass-surface-warm',
  cool: 'glass-surface-cool',
} as const

export const GlassSurface = ({
  children,
  className,
  tint = 'neutral',
  active = false,
  asButton = false,
  ariaLabel,
  onClick,
  breathe = false,
}: GlassSurfaceProps) => {
  const reduceMotion = useMotionSafe()
  const ref = useRef<HTMLDivElement>(null)
  const [pointer, setPointer] = useState({ x: 30, y: 20 })

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 100
    const y = ((clientY - rect.top) / rect.height) * 100
    setPointer({ x, y })
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!asButton || !onClick) return
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    onClick()
  }

  const style = {
    '--pointer-x': `${pointer.x}%`,
    '--pointer-y': `${pointer.y}%`,
  } as CSSProperties

  return (
    <motion.div
      ref={ref}
      role={asButton ? 'button' : undefined}
      tabIndex={asButton ? 0 : undefined}
      aria-label={ariaLabel}
      aria-pressed={asButton ? active : undefined}
      onClick={asButton ? onClick : undefined}
      onKeyDown={handleKeyDown}
      onMouseMove={(event) => handlePointerMove(event.clientX, event.clientY)}
      onTouchMove={(event) => {
        const touch = event.touches[0]
        if (!touch) return
        handlePointerMove(touch.clientX, touch.clientY)
      }}
      className={cn(
        'glass-surface',
        tintClass[tint],
        active && 'glass-surface-active',
        breathe && !reduceMotion && 'glass-breathe',
        asButton && 'cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
        className,
      )}
      style={style}
      whileTap={asButton && !reduceMotion ? { scale: 0.96 } : undefined}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
    >
      <span className="glass-specular" aria-hidden />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
