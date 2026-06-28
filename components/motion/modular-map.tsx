'use client'

import { useState } from 'react'
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
import { easeOutExpo, viewport } from '@/lib/motion'
import { useMotionSafe } from './use-motion-safe'

interface HubModule {
  id: string
  label: string
  icon: LucideIcon
  angle: number
}

const hubModules: HubModule[] = [
  { id: 'store', label: 'Store', icon: Store, angle: 0 },
  { id: 'clofi', label: 'Clofi', icon: Clock, angle: 45 },
  { id: 'receipts', label: 'Receipts', icon: ReceiptText, angle: 90 },
  { id: 'streaming', label: 'Streaming', icon: MonitorPlay, angle: 135 },
  { id: 'toys', label: 'Toys', icon: Blocks, angle: 180 },
  { id: 'studio', label: 'Studio', icon: Wrench, angle: 225 },
  { id: 'ai', label: 'AI Automation', icon: Sparkles, angle: 270 },
  { id: 'reports', label: 'Reports', icon: BarChart3, angle: 315 },
]

const CENTER = 200
const RADIUS = 140

function getPosition(angle: number, radius: number) {
  const rad = (angle - 90) * (Math.PI / 180)
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  }
}

function getSvgCoords(angle: number, radius: number) {
  const pos = getPosition(angle, radius)
  return { x: CENTER + pos.x, y: CENTER + pos.y }
}

export function ModularMap() {
  const reduceMotion = useMotionSafe()
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="relative mx-auto hidden aspect-square max-h-[420px] w-full md:block">
        <motion.div
          className="absolute left-1/2 top-1/2 z-20 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-primary/40 bg-secondary shadow-[0_0_40px_-8px_rgba(0,188,125,0.4)]"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{ duration: 0.6, ease: easeOutExpo }}
        >
          <div className="text-center">
            <p className="text-lg font-bold text-primary">DAIEGO</p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-foreground/50">Core OS</p>
          </div>
        </motion.div>

        <motion.div
          className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/50"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{ delay: 0.3, duration: 0.8, ease: easeOutExpo }}
          aria-hidden
        />

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          {hubModules.map((mod, i) => {
            const end = getSvgCoords(mod.angle, RADIUS)
            const isActive = activeId === mod.id
            return (
              <motion.line
                key={mod.id}
                x1={CENTER}
                y1={CENTER}
                x2={end.x}
                y2={end.y}
                stroke={isActive ? 'rgba(0,188,125,0.6)' : 'rgba(0,188,125,0.15)'}
                strokeWidth={isActive ? 1.5 : 1}
                initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={viewport}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease: easeOutExpo }}
              />
            )
          })}
        </svg>

        {hubModules.map((mod, i) => {
          const pos = getPosition(mod.angle, RADIUS)
          const Icon = mod.icon
          const isActive = activeId === mod.id

          return (
            <motion.button
              key={mod.id}
              type="button"
              className={cn(
                'absolute z-10 flex flex-col items-center gap-1.5 rounded-xl border bg-secondary px-3 py-2.5 transition-colors duration-300',
                isActive
                  ? 'border-primary/50 shadow-[0_0_20px_-4px_rgba(0,188,125,0.35)]'
                  : 'border-border hover:border-primary/35',
              )}
              style={{
                left: `calc(50% + ${pos.x}px)`,
                top: `calc(50% + ${pos.y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewport}
              transition={{ delay: 0.7 + i * 0.08, duration: 0.45, ease: easeOutExpo }}
              onMouseEnter={() => setActiveId(mod.id)}
              onMouseLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(mod.id)}
              onBlur={() => setActiveId(null)}
              aria-label={`${mod.label} module`}
            >
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
                  isActive ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary',
                )}
              >
                <Icon size={16} aria-hidden />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/70">
                {mod.label}
              </span>
            </motion.button>
          )
        })}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:hidden">
        <motion.div
          className="col-span-2 flex items-center justify-center rounded-2xl border border-primary/40 bg-secondary p-4"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, ease: easeOutExpo }}
        >
          <p className="text-xl font-bold text-primary">DAIEGO</p>
        </motion.div>
        {hubModules.map((mod, i) => {
          const Icon = mod.icon
          return (
            <motion.div
              key={mod.id}
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-secondary p-3"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.45, ease: easeOutExpo }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon size={16} aria-hidden />
              </div>
              <span className="text-center font-mono text-[9px] uppercase tracking-wider text-foreground/70">
                {mod.label}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
