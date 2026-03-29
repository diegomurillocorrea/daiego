'use client'

import { useReducedMotion } from 'framer-motion'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { easeOutExpo, staggerContainer, staggerItem, viewport } from '@/lib/motion'
import { ArrowRight } from 'lucide-react'

/** Integer px heights only — avoids SSR/client float serialization mismatches */
const CHART_BAR_HEIGHTS_PX = [9, 14, 7, 16, 11, 13, 8, 15, 10, 12, 6, 14] as const

const blobTransition = {
  duration: 18,
  repeat: Infinity,
  repeatType: 'mirror' as const,
  ease: 'easeInOut' as const,
}

export function Hero() {
  const reduceMotion = useReducedMotion() === true

  return (
    <section className="min-h-screen bg-background pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none" aria-hidden>
        <motion.div
          className="absolute top-40 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1, 1.12, 1],
                  x: [0, 24, 0],
                  y: [0, -16, 0],
                }
          }
          transition={blobTransition}
        />
        <motion.div
          className="absolute bottom-40 left-0 w-96 h-96 bg-accent/[0.07] rounded-full blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1, 1.08, 1],
                  x: [0, -20, 0],
                  y: [0, 20, 0],
                }
          }
          transition={{ ...blobTransition, duration: 22 }}
        />
        <motion.div
          className="absolute top-[18%] right-[8%] w-72 h-72 bg-accent/[0.06] rounded-full blur-3xl md:right-[12%]"
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1, 1.06, 1],
                  opacity: [0.35, 0.55, 0.35],
                }
          }
          transition={{ ...blobTransition, duration: 20 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[min(90vw,42rem)] h-64 bg-primary/[0.03] rounded-full blur-3xl"
          animate={reduceMotion ? undefined : { opacity: [0.25, 0.45, 0.25], scale: [1, 1.05, 1] }}
          transition={{ ...blobTransition, duration: 14 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-6" variants={staggerItem}>
              <motion.p
                className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-primary/90 uppercase tracking-widest"
                variants={staggerItem}
              >
                <motion.span
                  className="h-px w-10 origin-left block bg-linear-to-r from-accent/70 to-primary/70"
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.2 }}
                  aria-hidden
                />
                Engineering hub
              </motion.p>
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.08] text-balance"
                variants={staggerItem}
              >
                The hub for{' '}
                <span className="text-primary">AI and scalable software</span>
                —structure, <span className="text-accent/85">precision</span>, and systems built to last
              </motion.h1>
              <p className="text-lg text-foreground/70 leading-relaxed text-balance max-w-xl">
                DAIEGO architects maintainable, high-performance platforms: AI integration, custom engineering,
                cloud infrastructure, and data pipelines—so today&apos;s codebase does not become tomorrow&apos;s
                technical debt.
              </p>
            </motion.div>

            <motion.div className="flex flex-col sm:flex-row gap-4" variants={staggerItem}>
              <motion.div whileHover={reduceMotion ? undefined : { scale: 1.02 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }}>
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg h-12 px-8 text-base font-medium"
                  asChild
                >
                  <a href="#contact">
                    Start a project <ArrowRight className="ml-2 w-5 h-5" aria-hidden />
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={reduceMotion ? undefined : { scale: 1.02 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border border-border text-foreground hover:bg-secondary rounded-lg h-12 px-8 text-base font-medium"
                  asChild
                >
                  <a href="#capabilities">Explore capabilities</a>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div className="flex flex-wrap gap-2 pt-2" variants={staggerItem}>
              {['AI & automation', 'Platform engineering', 'Cloud & reliability', 'Data & analytics'].map((badge, i) => (
                <motion.div
                  key={badge}
                  className="px-3 py-1.5 bg-secondary border border-border rounded-md text-xs font-mono text-foreground/80"
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 + i * 0.07, duration: 0.4, ease: easeOutExpo }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -2,
                          borderColor: i % 2 === 0 ? 'rgba(0, 188, 125, 0.42)' : 'rgba(204, 52, 49, 0.38)',
                        }
                  }
                >
                  {badge}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <div className="relative h-96 lg:h-full min-h-96">
            <div className="absolute inset-0 flex items-center justify-center">
              <HeroFloatCard
                className="absolute w-72 h-48 bg-secondary border border-border rounded-2xl p-6 shadow-2xl shadow-primary/10 top-0 left-0 z-30"
                delay={0}
                reduceMotion={reduceMotion}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-xs font-mono text-foreground/50 uppercase tracking-wide">Pipeline health</p>
                      <motion.p
                        className="text-2xl font-bold text-primary tabular-nums"
                        initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.45, ease: easeOutExpo }}
                      >
                        99.2%
                      </motion.p>
                    </div>
                    <motion.div
                      className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-sm font-mono"
                      animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      OK
                    </motion.div>
                  </div>
                  <div className="flex gap-1 items-end h-10">
                    {CHART_BAR_HEIGHTS_PX.map((h, i) => (
                      <motion.div
                        key={i}
                        className={cn(
                          'flex-1 min-h-px rounded-full self-end',
                          i % 3 === 0 ? 'bg-accent/75' : i % 2 === 0 ? 'bg-primary' : 'bg-primary/30',
                        )}
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: h, opacity: 1 }}
                        transition={{ delay: 0.5 + i * 0.04, duration: 0.55, ease: easeOutExpo }}
                      />
                    ))}
                  </div>
                </div>
              </HeroFloatCard>

              <HeroFloatCard
                className="absolute w-72 h-40 bg-secondary border border-border rounded-2xl p-6 shadow-2xl shadow-primary/10 bottom-0 right-0 z-20"
                delay={0.15}
                reduceMotion={reduceMotion}
              >
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Services', value: '12' },
                    { label: 'Regions', value: '3' },
                    { label: 'SLO', value: 'OK' },
                  ].map((cell, i) => (
                    <motion.div
                      key={cell.label}
                      className="space-y-2"
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.85 + i * 0.1, duration: 0.4 }}
                    >
                      <p className="text-xs font-mono text-foreground/50">{cell.label}</p>
                      <p className="text-xl font-bold text-primary">{cell.value}</p>
                    </motion.div>
                  ))}
                </div>
              </HeroFloatCard>

              <HeroFloatCard
                className="absolute w-64 bg-secondary border border-border rounded-2xl p-6 shadow-2xl shadow-primary/10 top-1/3 right-0 z-10"
                delay={0.3}
                reduceMotion={reduceMotion}
              >
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-foreground/50 uppercase">Secure access</p>
                    <p className="text-sm font-semibold text-foreground">SSO · RBAC</p>
                  </div>
                  <div className="space-y-3">
                    <motion.input
                      type="email"
                      placeholder="you@company.com"
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-foreground/40 font-mono"
                      readOnly
                      aria-label="Email preview"
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              borderColor: ['rgba(42,42,42,1)', 'rgba(0,188,125,0.55)', 'rgba(42,42,42,1)'],
                              boxShadow: [
                                '0 0 0 0 rgba(0,188,125,0)',
                                '0 0 0 1px rgba(0,188,125,0.25)',
                                '0 0 0 0 rgba(0,188,125,0)',
                              ],
                            }
                      }
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-foreground/40"
                      readOnly
                      aria-label="Password preview"
                    />
                    <motion.button
                      type="button"
                      className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90"
                      whileHover={reduceMotion ? undefined : { scale: 1.02, filter: 'brightness(1.08)' }}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    >
                      Sign in
                    </motion.button>
                  </div>
                </div>
              </HeroFloatCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroFloatCard({
  children,
  className,
  delay,
  reduceMotion,
}: {
  children: React.ReactNode
  className?: string
  delay: number
  reduceMotion: boolean
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.65, ease: easeOutExpo, delay }}
    >
      <motion.div
        className={className}
        animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
        transition={{
          duration: 5.5 + delay * 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={
          reduceMotion
            ? undefined
            : {
                scale: 1.02,
                boxShadow:
                  '0 25px 50px -12px rgba(0, 188, 125, 0.14), 0 18px 40px -16px rgba(204, 52, 49, 0.08)',
              }
        }
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
