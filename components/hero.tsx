'use client'

import { motion } from 'framer-motion'
import { easeOutExpo, staggerItem } from '@/lib/motion'
import {
  HeroBust,
  PremiumButton,
  StaggerContainerAnimate,
  StaggerItem,
  useMotionSafe,
} from '@/components/motion'

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

          <motion.div
            className="relative min-h-96 h-96 lg:h-144"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: easeOutExpo, delay: 0.3 }}
          >
            <HeroBust className="absolute inset-0" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
