'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { easeOutExpo, staggerContainer, staggerItem, viewport } from '@/lib/motion'
import {
  HeroEcosystem,
  PremiumButton,
  StaggerContainerAnimate,
  StaggerItem,
  useMotionSafe,
} from '@/components/motion'

const CHART_BAR_HEIGHTS_PX = [9, 14, 7, 16, 11, 13, 8, 15, 10, 12, 6, 14] as const

const blobTransition = {
  duration: 18,
  repeat: Infinity,
  repeatType: 'mirror' as const,
  ease: 'easeInOut' as const,
}

export function Hero() {
  const reduceMotion = useMotionSafe()

  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-32 pb-20">
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <motion.div
          className="absolute top-40 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : { scale: [1, 1.12, 1], x: [0, 24, 0], y: [0, -16, 0] }
          }
          transition={blobTransition}
        />
        <motion.div
          className="absolute bottom-40 left-0 h-96 w-96 rounded-full bg-accent/7 blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : { scale: [1, 1.08, 1], x: [0, -20, 0], y: [0, 20, 0] }
          }
          transition={{ ...blobTransition, duration: 22 }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <StaggerContainerAnimate className="space-y-8">
            <StaggerItem>
              <div className="space-y-6">
                <motion.p
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary/90 sm:text-sm"
                  variants={staggerItem}
                >
                  <motion.span
                    className="block h-px w-10 origin-left bg-linear-to-r from-accent/70 to-primary/70"
                    initial={reduceMotion ? false : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.2 }}
                    aria-hidden
                  />
                  AI Business Operating System
                </motion.p>
                <motion.h1
                  className="text-4xl font-bold leading-[1.08] text-balance text-foreground sm:text-5xl lg:text-6xl"
                  variants={staggerItem}
                >
                  <span className="text-primary">AI-powered</span> business{' '}
                  <span className="text-accent/85">operating system</span>
                </motion.h1>
                <p className="max-w-xl text-lg leading-relaxed text-balance text-foreground/70">
                  DAIEGO builds modular software, automation tools and intelligent platforms to manage sales,
                  inventory, employees, payments, subscriptions and digital operations.
                </p>
                <p className="font-mono text-sm text-foreground/55">
                  One platform. Multiple modules.{' '}
                  <span className="text-primary/90">Connected by AI.</span>
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-col gap-4 sm:flex-row">
                <PremiumButton href="#platform">Explore the platform</PremiumButton>
                <PremiumButton href="#contact" variant="outline" showArrow={false}>
                  Build with DAIEGO
                </PremiumButton>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-wrap gap-2 pt-2">
                {['Sales & inventory', 'Employees & payments', 'Subscriptions & CRM', 'AI automation'].map(
                  (badge, i) => (
                    <motion.div
                      key={badge}
                      className="rounded-md border border-border bg-secondary px-3 py-1.5 font-mono text-xs text-foreground/80"
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 + i * 0.07, duration: 0.4, ease: easeOutExpo }}
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              y: -2,
                              borderColor:
                                i % 2 === 0 ? 'rgba(0, 188, 125, 0.42)' : 'rgba(204, 52, 49, 0.38)',
                            }
                      }
                    >
                      {badge}
                    </motion.div>
                  ),
                )}
              </div>
            </StaggerItem>
          </StaggerContainerAnimate>

          <div className="relative min-h-96 h-96 lg:h-full">
            <HeroEcosystem className="absolute inset-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <HeroFloatCard
                  className="absolute top-0 left-0 z-30 h-48 w-72 rounded-2xl border border-border bg-secondary/80 p-6 shadow-2xl shadow-primary/10 backdrop-blur-sm"
                  delay={0}
                  reduceMotion={reduceMotion}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="font-mono text-xs uppercase tracking-wide text-foreground/50">
                          Pipeline health
                        </p>
                        <motion.p
                          className="text-2xl font-bold tabular-nums text-primary"
                          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6, duration: 0.45, ease: easeOutExpo }}
                        >
                          99.2%
                        </motion.p>
                      </div>
                      <motion.div
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm text-primary"
                        animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        OK
                      </motion.div>
                    </div>
                    <div className="flex h-10 items-end gap-1">
                      {CHART_BAR_HEIGHTS_PX.map((h, i) => (
                        <motion.div
                          key={i}
                          className={cn(
                            'min-h-px flex-1 self-end rounded-full',
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
                  className="absolute bottom-0 right-0 z-20 h-40 w-72 rounded-2xl border border-border bg-secondary/80 p-6 shadow-2xl shadow-primary/10 backdrop-blur-sm"
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
                        <p className="font-mono text-xs text-foreground/50">{cell.label}</p>
                        <p className="text-xl font-bold text-primary">{cell.value}</p>
                      </motion.div>
                    ))}
                  </div>
                </HeroFloatCard>

                <HeroFloatCard
                  className="absolute top-1/3 right-0 z-10 w-64 rounded-2xl border border-border bg-secondary/80 p-6 shadow-2xl shadow-primary/10 backdrop-blur-sm"
                  delay={0.3}
                  reduceMotion={reduceMotion}
                >
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="font-mono text-xs uppercase text-foreground/50">Secure access</p>
                      <p className="text-sm font-semibold text-foreground">SSO · RBAC</p>
                    </div>
                    <div className="space-y-3">
                      <motion.input
                        type="email"
                        placeholder="you@company.com"
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm text-foreground placeholder:text-foreground/40"
                        readOnly
                        aria-label="Email preview"
                        animate={
                          reduceMotion
                            ? undefined
                            : {
                                borderColor: [
                                  'rgba(42,42,42,1)',
                                  'rgba(0,188,125,0.55)',
                                  'rgba(42,42,42,1)',
                                ],
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
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/40"
                        readOnly
                        aria-label="Password preview"
                      />
                      <motion.button
                        type="button"
                        className="w-full rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                        whileHover={reduceMotion ? undefined : { scale: 1.02, filter: 'brightness(1.08)' }}
                        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                      >
                        Sign in
                      </motion.button>
                    </div>
                  </div>
                </HeroFloatCard>
              </div>
            </HeroEcosystem>
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
        transition={{ duration: 5.5 + delay * 2, repeat: Infinity, ease: 'easeInOut' }}
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
