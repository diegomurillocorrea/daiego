'use client'

import { motion } from 'framer-motion'
import { useMotionSafe } from './use-motion-safe'

export function PremiumBackground() {
  const reduceMotion = useMotionSafe()

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Base gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-25%,rgba(204,52,49,0.07),transparent_55%),radial-gradient(ellipse_70%_45%_at_100%_20%,rgba(0,188,125,0.05),transparent_50%),radial-gradient(ellipse_50%_40%_at_0%_80%,rgba(204,52,49,0.04),transparent_45%)]" />

      {/* Animated grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,188,125,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,188,125,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
        animate={reduceMotion ? undefined : { backgroundPosition: ['0px 0px', '64px 64px'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />

      {/* Slow radial glows */}
      <motion.div
        className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-primary/8 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.08, 1],
                x: [0, 30, 0],
              }
        }
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 h-80 w-80 rounded-full bg-accent/6 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.25, 0.45, 0.25],
                scale: [1, 1.1, 1],
                x: [0, -24, 0],
              }
        }
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle connection dots */}
      {!reduceMotion ? (
        <svg className="absolute inset-0 h-full w-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dot-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="1" fill="rgba(0,188,125,0.8)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>
      ) : null}
    </div>
  )
}
