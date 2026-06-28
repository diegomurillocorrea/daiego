'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Blocks,
  Clock,
  MonitorPlay,
  ReceiptText,
  Sparkles,
  Store,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { easeOutExpo } from '@/lib/motion'
import { useMotionSafe } from './use-motion-safe'

interface EcosystemModule {
  label: string
  icon: LucideIcon
  position: string
  delay: number
  floatDuration: number
}

const modules: EcosystemModule[] = [
  { label: 'Store', icon: Store, position: 'top-[8%] left-[5%]', delay: 0.3, floatDuration: 6 },
  { label: 'Clofi', icon: Clock, position: 'top-[12%] right-[8%]', delay: 0.45, floatDuration: 7 },
  { label: 'Receipts', icon: ReceiptText, position: 'bottom-[18%] left-[2%]', delay: 0.55, floatDuration: 6.5 },
  { label: 'Streaming', icon: MonitorPlay, position: 'bottom-[12%] right-[5%]', delay: 0.65, floatDuration: 7.5 },
  { label: 'Toys', icon: Blocks, position: 'top-[42%] left-[-2%]', delay: 0.75, floatDuration: 8 },
  { label: 'Studio', icon: Wrench, position: 'top-[38%] right-[-1%]', delay: 0.85, floatDuration: 7 },
  { label: 'AI', icon: Sparkles, position: 'bottom-[42%] left-[12%]', delay: 0.95, floatDuration: 6.8 },
  { label: 'Reports', icon: BarChart3, position: 'bottom-[38%] right-[10%]', delay: 1.05, floatDuration: 7.2 },
]

function ModuleCard({
  module,
  reduceMotion,
}: {
  module: EcosystemModule
  reduceMotion: boolean
}) {
  const Icon = module.icon

  return (
    <motion.div
      className={cn('absolute z-0 hidden lg:block', module.position)}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: module.delay, duration: 0.5, ease: easeOutExpo }}
    >
      <motion.div
        className="flex items-center gap-2 rounded-xl border border-border/60 bg-secondary/60 px-3 py-2 shadow-lg backdrop-blur-md"
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={{
          duration: module.floatDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={
          reduceMotion
            ? undefined
            : {
                scale: 1.05,
                borderColor: 'rgba(0, 188, 125, 0.45)',
                boxShadow: '0 8px 24px -8px rgba(0, 188, 125, 0.25)',
              }
        }
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 text-primary">
          <Icon size={14} aria-hidden />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/70">
          {module.label}
        </span>
      </motion.div>
    </motion.div>
  )
}

export function HeroEcosystem({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  const reduceMotion = useMotionSafe()
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (reduceMotion) return
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12
      const y = (e.clientY / window.innerHeight - 0.5) * 12
      setMouse({ x, y })
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [reduceMotion])

  return (
    <div className={cn('relative', className)}>
      {/* Connector lines — desktop only */}
      {!reduceMotion ? (
        <svg
          className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
          aria-hidden
        >
          <motion.line
            x1="50%"
            y1="50%"
            x2="15%"
            y2="20%"
            stroke="rgba(0,188,125,0.15)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.2, ease: easeOutExpo }}
          />
          <motion.line
            x1="50%"
            y1="50%"
            x2="85%"
            y2="22%"
            stroke="rgba(0,188,125,0.12)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 1.35, duration: 1.2, ease: easeOutExpo }}
          />
          <motion.line
            x1="50%"
            y1="50%"
            x2="12%"
            y2="75%"
            stroke="rgba(204,52,49,0.12)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.2, ease: easeOutExpo }}
          />
          <motion.line
            x1="50%"
            y1="50%"
            x2="88%"
            y2="78%"
            stroke="rgba(0,188,125,0.1)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 1.65, duration: 1.2, ease: easeOutExpo }}
          />
        </svg>
      ) : null}

      {/* Center hub glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-2xl"
        animate={reduceMotion ? undefined : { opacity: [0.4, 0.7, 0.4], scale: [1, 1.15, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={
          reduceMotion
            ? undefined
            : { transform: `translate(calc(-50% + ${mouse.x}px), calc(-50% + ${mouse.y}px))` }
        }
        aria-hidden
      />

      {modules.map((mod) => (
        <ModuleCard key={mod.label} module={mod} reduceMotion={reduceMotion} />
      ))}

      {children ? <div className="relative z-10 h-full w-full">{children}</div> : null}
    </div>
  )
}
