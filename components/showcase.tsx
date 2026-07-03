'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useDictionary } from '@/components/i18n/locale-provider'
import { FadeIn, RevealHeading, useMotionSafe } from '@/components/motion'
import { easeOutExpo, viewport } from '@/lib/motion'

function useCountUp(target: number, duration = 1.2, enabled = true) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!enabled) {
      setValue(target)
      return
    }
    let start = 0
    const startTime = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(start + (target - start) * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration, enabled])

  return value
}

function AnimatedMetric({
  label,
  value,
  suffix = '',
  prefix = '',
  delay = 0,
}: {
  label: string
  value: number
  suffix?: string
  prefix?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const reduceMotion = useMotionSafe()
  const display = useCountUp(value, 1.2, isInView && !reduceMotion)

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl border border-border bg-secondary p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ delay, duration: 0.5, ease: easeOutExpo }}
    >
      <p className="mb-2 text-xs text-foreground/50">{label}</p>
      <p className="text-2xl font-bold tabular-nums text-primary">
        {prefix}
        {isInView ? display.toLocaleString() : '0'}
        {suffix}
      </p>
    </motion.div>
  )
}

export function Showcase() {
  const { showcase } = useDictionary()
  const reduceMotion = useMotionSafe()

  const barData = useMemo(
    () => [
      { width: 78, color: '#00BC7D' },
      { width: 62, color: '#CC3431' },
      { width: 91, color: '#00BC7D' },
      { width: 55, color: '#CC3431' },
    ],
    [],
  )

  const tableRows = useMemo(
    () => [
      { id: 'TX-1042', type: showcase.activityTypes.sale, amount: '$248.00' },
      { id: 'TX-1043', type: showcase.activityTypes.inventory, amount: '-12 units' },
      { id: 'TX-1044', type: showcase.activityTypes.subscription, amount: '$19.99' },
    ],
    [showcase.activityTypes],
  )

  return (
    <section className="relative overflow-hidden border-t border-border py-20">
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <RevealHeading title={showcase.title} subtitle={showcase.subtitle} />
        </div>

        <FadeIn>
          <div className="rounded-3xl border border-border bg-background p-8 shadow-[inset_0_1px_0_0_rgba(204,52,49,0.1)] lg:p-12">
            <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <AnimatedMetric label={showcase.metrics.salesToday} value={12847} prefix="$" delay={0} />
              <AnimatedMetric label={showcase.metrics.inventoryAlerts} value={3} delay={0.08} />
              <AnimatedMetric label={showcase.metrics.employeesActive} value={24} delay={0.16} />
              <AnimatedMetric label={showcase.metrics.subscriptionsDue} value={7} delay={0.24} />
              <AnimatedMetric label={showcase.metrics.aiRecommendations} value={5} delay={0.32} />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="space-y-6">
                <motion.div
                  className="rounded-2xl border border-border bg-secondary p-6"
                  initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewport}
                  transition={{ duration: 0.5, ease: easeOutExpo }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="font-semibold text-foreground">{showcase.adminPanel}</h4>
                    <motion.div
                      className="h-3 w-3 rounded-full bg-primary"
                      animate={reduceMotion ? undefined : { opacity: [1, 0.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div className="space-y-2">
                    {[100, 83, 66].map((w, i) => (
                      <motion.div
                        key={i}
                        className="h-2 rounded bg-primary/20"
                        initial={reduceMotion ? false : { width: 0 }}
                        whileInView={{ width: `${w}%` }}
                        viewport={viewport}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: easeOutExpo }}
                      />
                    ))}
                  </div>
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                  <AnimatedMetric label={showcase.metrics.totalUsers} value={2847} delay={0.2} />
                  <AnimatedMetric label={showcase.metrics.active} value={1294} delay={0.28} />
                </div>
              </div>

              <motion.div
                className="rounded-2xl border border-border bg-secondary p-8"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.55, ease: easeOutExpo }}
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-xs text-foreground/50">{showcase.dashboard}</p>
                    <p className="text-2xl font-bold text-foreground">{showcase.performance}</p>
                  </div>
                  <div className="space-y-3">
                    {barData.map((bar, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <motion.div
                          className="h-2 flex-grow rounded-full"
                          style={{ backgroundColor: bar.color }}
                          initial={reduceMotion ? false : { width: 0 }}
                          whileInView={{ width: `${bar.width}%` }}
                          viewport={viewport}
                          transition={{ delay: 0.4 + i * 0.12, duration: 0.7, ease: easeOutExpo }}
                        />
                        <span className="w-8 text-right text-xs text-foreground/50">{bar.width}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <div className="space-y-6">
                <motion.div
                  className="rounded-2xl border border-border bg-secondary p-6"
                  initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewport}
                  transition={{ duration: 0.5, ease: easeOutExpo }}
                >
                  <p className="mb-3 text-xs text-foreground/50">{showcase.recentActivity}</p>
                  <div className="space-y-2">
                    {tableRows.map((row, i) => (
                      <motion.div
                        key={row.id}
                        className="flex items-center justify-between rounded-lg border border-border/60 bg-background px-3 py-2"
                        initial={reduceMotion ? false : { opacity: 0, x: 12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={viewport}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.4, ease: easeOutExpo }}
                      >
                        <div>
                          <p className="font-mono text-xs text-foreground/70">{row.id}</p>
                          <p className="text-xs text-foreground/50">{row.type}</p>
                        </div>
                        <span className="text-sm font-medium text-primary">{row.amount}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-4"
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ delay: 0.7, duration: 0.5, ease: easeOutExpo }}
                >
                  <motion.div
                    animate={reduceMotion ? undefined : { rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Sparkles className="h-5 w-5 text-primary" aria-hidden />
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{showcase.aiAnalyzing}</p>
                    <p className="text-xs text-foreground/50">{showcase.restockReady}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
