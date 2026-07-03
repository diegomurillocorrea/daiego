'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { FeatureCollection } from 'geojson'
import { useMotionSafe } from '@/components/motion'
import { buildMapFormationPoints } from '@/lib/el-salvador-geo'
import { easeOutExpo } from '@/lib/motion'
import { cn } from '@/lib/utils'

const MIN_SCATTER_MS = 900
const OUTLINE_STAGGER_MS = 14
const FILL_STAGGER_MS = 5
const FILL_PHASE_OFFSET_MS = 1100
const PARTICLE_TRAVEL_MS = 1600
const FORMED_HOLD_MS = 1400

type LoaderPhase = 'scatter' | 'outline' | 'fill' | 'formed'

interface HeroMapLoaderProps {
  className?: string
  geojson?: FeatureCollection | null
  onFormationComplete?: () => void
}

interface Particle {
  startX: number
  startY: number
  targetX: number
  targetY: number
  x: number
  y: number
  size: number
  opacity: number
  startOpacity: number
  targetOpacity: number
  startTime: number
  isEdge: boolean
}

const hash = (seed: number) => {
  const value = Math.sin(seed * 127.1) * 43758.5453123
  return value - Math.floor(value)
}

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2

const scatterFromTarget = (
  targetX: number,
  targetY: number,
  seed: number,
): { x: number; y: number } => {
  const distance = Math.hypot(targetX, targetY)
  const angle = distance > 0.001 ? Math.atan2(targetY, targetX) : hash(seed) * Math.PI * 2
  const angleJitter = (hash(seed + 1.3) - 0.5) * 0.28
  const spread = 1.55 + hash(seed + 2.7) * 0.45
  const finalAngle = angle + angleJitter

  return {
    x: Math.cos(finalAngle) * spread,
    y: Math.sin(finalAngle) * spread,
  }
}

const buildParticles = (geojson: FeatureCollection): Particle[] => {
  const formationPoints = buildMapFormationPoints(geojson, 380)
  let edgeIndex = 0
  let fillIndex = 0

  return formationPoints.map((target, index) => {
    const seed = index * 0.6180339887 + 0.17
    const scatter = scatterFromTarget(target.x, target.y, seed)
    const isEdge = target.isEdge
    const startTime = isEdge
      ? edgeIndex++ * OUTLINE_STAGGER_MS
      : fillIndex++ * FILL_STAGGER_MS

    return {
      startX: scatter.x,
      startY: scatter.y,
      targetX: target.x,
      targetY: target.y,
      x: scatter.x,
      y: scatter.y,
      size: isEdge ? 2.1 + hash(seed) * 0.7 : 1.35 + hash(seed + 0.5) * 0.45,
      opacity: 0,
      startOpacity: 0.15 + hash(seed + 3.1) * 0.12,
      targetOpacity: isEdge ? 0.95 : 0.42 + hash(seed + 4.2) * 0.22,
      startTime,
      isEdge,
    }
  })
}

const getTotalDuration = (particles: Particle[]) => {
  const edgeCount = particles.filter((particle) => particle.isEdge).length
  const fillCount = particles.length - edgeCount
  const lastEdgeStart = Math.max(0, edgeCount - 1) * OUTLINE_STAGGER_MS
  const lastFillStart = FILL_PHASE_OFFSET_MS + Math.max(0, fillCount - 1) * FILL_STAGGER_MS
  const lastMotionStart = Math.max(lastEdgeStart, lastFillStart)

  return MIN_SCATTER_MS + lastMotionStart + PARTICLE_TRAVEL_MS + FORMED_HOLD_MS
}

const getPhaseFromElapsed = (elapsed: number): LoaderPhase => {
  if (elapsed < MIN_SCATTER_MS) {
    return 'scatter'
  }

  if (elapsed < FILL_PHASE_OFFSET_MS + 180) {
    return 'outline'
  }

  return 'fill'
}

const PHASE_COPY: Record<LoaderPhase, { title: string; subtitle: string }> = {
  scatter: {
    title: 'Puntos en movimiento',
    subtitle: 'Los datos se dispersan antes de tomar forma',
  },
  outline: {
    title: 'Dibujando el territorio',
    subtitle: 'Cada punto encuentra su lugar en el mapa',
  },
  fill: {
    title: 'Construyendo El Salvador',
    subtitle: 'La silueta del país emerge punto por punto',
  },
  formed: {
    title: 'El Salvador',
    subtitle: 'Presencia estratégica, lista para explorar',
  },
}

export function HeroMapLoader({
  className,
  geojson = null,
  onFormationComplete,
}: HeroMapLoaderProps) {
  const reduceMotion = useMotionSafe()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationStartedAtRef = useRef<number | null>(null)
  const formationCompleteRef = useRef(false)
  const phaseRef = useRef<LoaderPhase>('scatter')
  const [phase, setPhase] = useState<LoaderPhase>('scatter')

  useEffect(() => {
    if (!geojson || animationStartedAtRef.current !== null) {
      return
    }

    particlesRef.current = buildParticles(geojson)
    animationStartedAtRef.current = performance.now()

    if (reduceMotion) {
      for (const particle of particlesRef.current) {
        particle.x = particle.targetX
        particle.y = particle.targetY
        particle.opacity = particle.targetOpacity
      }

      formationCompleteRef.current = true
      phaseRef.current = 'formed'
      setPhase('formed')

      if (progressRef.current) {
        progressRef.current.style.width = '100%'
      }

      onFormationComplete?.()
    }
  }, [geojson, onFormationComplete, reduceMotion])

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d')

    if (!context) {
      return
    }

    let frameId = 0

    const resizeCanvas = () => {
      const parent = canvas.parentElement

      if (!parent) {
        return
      }

      const width = parent.clientWidth
      const height = parent.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const draw = (timestamp: number) => {
      const parent = canvas.parentElement
      const width = parent?.clientWidth ?? canvas.clientWidth
      const height = parent?.clientHeight ?? canvas.clientHeight
      const scale = Math.min(width, height) * 0.46
      const centerX = width / 2
      const centerY = height / 2
      const animationStartedAt = animationStartedAtRef.current
      const elapsed = animationStartedAt ? timestamp - animationStartedAt : 0
      const particles = particlesRef.current

      context.clearRect(0, 0, width, height)

      const ambientGlow = context.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        scale * 1.4,
      )
      ambientGlow.addColorStop(0, 'rgba(0, 188, 125, 0.1)')
      ambientGlow.addColorStop(0.5, 'rgba(34, 230, 163, 0.04)')
      ambientGlow.addColorStop(1, 'rgba(0, 0, 0, 0)')
      context.fillStyle = ambientGlow
      context.fillRect(0, 0, width, height)

      if (particles.length === 0) {
        for (let index = 0; index < 72; index += 1) {
          const seed = index * 0.73 + 0.2
          const angle = hash(seed) * Math.PI * 2
          const radius = 0.35 + hash(seed + 1) * 0.55
          const drift = Math.sin(timestamp * 0.0007 + seed * 5) * 0.04
          const x = centerX + (Math.cos(angle) * radius + drift) * scale
          const y = centerY + (Math.sin(angle) * radius * 0.78 - drift) * scale
          const alpha = 0.18 + hash(seed + 2) * 0.2

          context.fillStyle = `rgba(34, 230, 163, ${alpha})`
          context.beginPath()
          context.arc(x, y, 1.2 + hash(seed + 3) * 0.8, 0, Math.PI * 2)
          context.fill()
        }
      } else {
        const totalDuration = getTotalDuration(particles)
        const motionElapsed = Math.max(0, elapsed - MIN_SCATTER_MS)
        let nextPhase = getPhaseFromElapsed(elapsed)

        if (elapsed >= totalDuration - FORMED_HOLD_MS) {
          nextPhase = 'formed'
        }

        if (nextPhase !== phaseRef.current) {
          phaseRef.current = nextPhase
          setPhase(nextPhase)
        }

        if (progressRef.current) {
          progressRef.current.style.width = `${Math.min((elapsed / totalDuration) * 100, 100)}%`
        }

        for (const particle of particles) {
          const particleStart =
            MIN_SCATTER_MS + (particle.isEdge ? particle.startTime : FILL_PHASE_OFFSET_MS + particle.startTime)
          const localElapsed = Math.max(0, elapsed - particleStart)
          const travelProgress = Math.min(localElapsed / PARTICLE_TRAVEL_MS, 1)
          const eased = easeInOutCubic(travelProgress)

          if (elapsed < MIN_SCATTER_MS) {
            const scatterDrift = Math.sin(timestamp * 0.0008 + particle.startX * 8) * 0.03
            particle.x = particle.startX + scatterDrift
            particle.y = particle.startY - scatterDrift
            particle.opacity = particle.startOpacity
          } else if (elapsed < particleStart) {
            particle.x = particle.startX
            particle.y = particle.startY
            particle.opacity = particle.startOpacity
          } else {
            particle.x = particle.startX + (particle.targetX - particle.startX) * eased
            particle.y = particle.startY + (particle.targetY - particle.startY) * eased
            particle.opacity =
              particle.startOpacity +
              (particle.targetOpacity - particle.startOpacity) * eased
          }

          const isSettled = travelProgress >= 1 && motionElapsed > 0
          const breathe = isSettled
            ? 1 + Math.sin(timestamp * 0.0018 + particle.targetX * 12) * 0.04
            : 1

          const screenX = centerX + particle.x * scale
          const screenY = centerY + particle.y * scale
          const radius = particle.size * breathe

          context.fillStyle = particle.isEdge
            ? `rgba(79, 255, 193, ${particle.opacity})`
            : `rgba(0, 188, 125, ${particle.opacity})`
          context.beginPath()
          context.arc(screenX, screenY, radius, 0, Math.PI * 2)
          context.fill()

          if (particle.isEdge && travelProgress > 0.15 && travelProgress < 0.98) {
            context.fillStyle = `rgba(34, 230, 163, ${particle.opacity * 0.2})`
            context.beginPath()
            context.arc(screenX, screenY, radius * 2.6, 0, Math.PI * 2)
            context.fill()
          }
        }

        if (
          !formationCompleteRef.current &&
          animationStartedAt &&
          elapsed >= totalDuration
        ) {
          formationCompleteRef.current = true
          onFormationComplete?.()
        }
      }

      frameId = window.requestAnimationFrame(draw)
    }

    frameId = window.requestAnimationFrame(draw)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [onFormationComplete])

  const copy = PHASE_COPY[phase]

  return (
    <div
      className={cn('relative h-full w-full', className)}
      role="status"
      aria-live="polite"
      aria-label="Cargando mapa interactivo de El Salvador"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,188,125,0.07),transparent_68%)]"
        aria-hidden
      />

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />

      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center px-6 sm:bottom-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={copy.title}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: easeOutExpo }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary/80 sm:text-xs">
              {copy.title}
            </p>
            <p className="mt-2 max-w-xs text-center text-sm leading-relaxed text-foreground/55">
              {copy.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-5 h-0.5 w-36 overflow-hidden rounded-full bg-primary/10 sm:w-44">
          <div
            ref={progressRef}
            className="h-full w-0 rounded-full bg-linear-to-r from-primary/50 via-primary to-accent/80 transition-[width] duration-150 ease-out"
          />
        </div>
      </div>
    </div>
  )
}
