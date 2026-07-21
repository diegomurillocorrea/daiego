'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { PixelBlastBackground } from '@/components/landing/pixel-blast-background'
import { useMotionSafe } from '@/components/motion/use-motion-safe'
import { GlassControls } from './glass-controls'
import './glass.css'

export const GlassShowcase = () => {
  const reduceMotion = useMotionSafe()

  return (
    <div className="relative min-h-screen overflow-x-clip text-white">
      <PixelBlastBackground />
      <div className="glass-atmosphere pointer-events-none fixed inset-0 z-0 opacity-90 mix-blend-normal" aria-hidden />
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.04) 0.7px, transparent 0.7px)',
          backgroundSize: '3px 3px',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 py-6 sm:px-6 sm:py-8">
        <motion.header
          className="mb-8 flex items-center justify-between gap-4 sm:mb-10"
          initial={reduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Home
          </Link>
          <p className="text-[0.65rem] font-semibold tracking-[0.28em] text-white/45 uppercase">
            Lab
          </p>
        </motion.header>

        <main className="flex flex-1 flex-col items-center">
          <motion.div
            className="mb-8 max-w-xl text-center sm:mb-10"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              DAIEGO
            </p>
            <h1 className="text-balance text-xl font-medium text-white/90 sm:text-2xl">
              Liquid glass controls
            </h1>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-white/55 sm:text-base">
              A dark, brand-tinted glass system — translucent depth, specular light, and tactile toggles.
            </p>
          </motion.div>

          <motion.div
            className="w-full"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassControls />
          </motion.div>
        </main>
      </div>
    </div>
  )
}
