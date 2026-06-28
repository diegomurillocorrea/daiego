'use client'

import { motion } from 'framer-motion'
import {
  BarChart3,
  Blocks,
  Clock,
  ReceiptText,
  Sparkles,
  Store,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { easeOutExpo, viewport } from '@/lib/motion'
import { useMotionSafe } from './use-motion-safe'

interface FlowStep {
  id: string
  label: string
  detail: string
  icon: LucideIcon
  module: string
}

const flowSteps: FlowStep[] = [
  {
    id: 'sale',
    label: 'Sale',
    detail: 'A sale occurs in DAIEGO Toys',
    icon: Blocks,
    module: 'Toys',
  },
  {
    id: 'inventory',
    label: 'Inventory',
    detail: 'DAIEGO Store updates stock',
    icon: Store,
    module: 'Store',
  },
  {
    id: 'employee',
    label: 'Employee',
    detail: 'Clofi logs team activity',
    icon: Clock,
    module: 'Clofi',
  },
  {
    id: 'payment',
    label: 'Payment',
    detail: 'Receipts processes transaction',
    icon: ReceiptText,
    module: 'Receipts',
  },
  {
    id: 'report',
    label: 'Report',
    detail: 'Reports aggregates data',
    icon: BarChart3,
    module: 'Reports',
  },
  {
    id: 'ai',
    label: 'AI Decision',
    detail: 'AI generates recommendation',
    icon: Sparkles,
    module: 'AI',
  },
]

export function OperationsFlow() {
  const reduceMotion = useMotionSafe()

  return (
    <div className="relative mt-16">
      {/* Desktop horizontal flow */}
      <div className="hidden lg:block">
        <div className="relative flex items-start justify-between gap-2">
          {/* Connection line */}
          <motion.div
            className="absolute left-[8%] right-[8%] top-10 h-px bg-linear-to-r from-primary/0 via-primary/30 to-primary/0"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewport}
            transition={{ duration: 1.2, ease: easeOutExpo }}
            style={{ transformOrigin: 'left' }}
            aria-hidden
          />

          {flowSteps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.id}
                className="relative z-10 flex flex-1 flex-col items-center text-center"
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.5, ease: easeOutExpo }}
              >
                <motion.div
                  className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-secondary"
                  whileInView={
                    reduceMotion
                      ? undefined
                      : {
                          borderColor: ['rgba(42,42,42,1)', 'rgba(0,188,125,0.45)', 'rgba(42,42,42,1)'],
                        }
                  }
                  viewport={viewport}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <Icon size={22} className="text-primary" aria-hidden />
                    <span className="font-mono text-[8px] uppercase tracking-wider text-foreground/50">
                      {step.module}
                    </span>
                  </div>
                </motion.div>
                <h4 className="text-sm font-semibold text-foreground">{step.label}</h4>
                <p className="mt-1 max-w-[120px] text-xs text-foreground/50">{step.detail}</p>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Mobile vertical timeline */}
      <div className="space-y-0 lg:hidden">
        {flowSteps.map((step, i) => {
          const Icon = step.icon
          const isLast = i === flowSteps.length - 1
          return (
            <motion.div
              key={step.id}
              className="relative flex gap-4"
              initial={reduceMotion ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ delay: i * 0.1, duration: 0.45, ease: easeOutExpo }}
            >
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary">
                  <Icon size={20} className="text-primary" aria-hidden />
                </div>
                {!isLast ? (
                  <motion.div
                    className="my-1 w-px flex-1 min-h-8 bg-linear-to-b from-primary/40 to-primary/10"
                    initial={reduceMotion ? false : { scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={viewport}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                    style={{ transformOrigin: 'top' }}
                    aria-hidden
                  />
                ) : null}
              </div>
              <div className={cn('pb-8', isLast && 'pb-0')}>
                <p className="font-mono text-[10px] uppercase tracking-wider text-primary/80">
                  {step.module}
                </p>
                <h4 className="mt-0.5 text-sm font-semibold text-foreground">{step.label}</h4>
                <p className="mt-1 text-xs text-foreground/50">{step.detail}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
