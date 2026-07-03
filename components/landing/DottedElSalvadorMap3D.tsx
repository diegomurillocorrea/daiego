'use client'

import dynamic from 'next/dynamic'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import type { FeatureCollection } from 'geojson'
import { HeroMapLoader } from '@/components/landing/HeroMapLoader'
import { useMotionSafe } from '@/components/motion'
import { easeOutExpo } from '@/lib/motion'
import { cn } from '@/lib/utils'

const ElSalvador3DScene = dynamic(
  () =>
    import('@/components/landing/ElSalvador3DScene').then((module) => module.ElSalvador3DScene),
  {
    ssr: false,
    loading: () => null,
  },
)

const HERO_LOADER_MIN_MS = 5200

interface DottedElSalvadorMap3DProps {
  className?: string
  showInteractionHint?: boolean
  showBackgroundGlow?: boolean
  variant?: 'default' | 'hero'
}

export function DottedElSalvadorMap3D({
  className,
  showInteractionHint = false,
  showBackgroundGlow = true,
  variant = 'default',
}: DottedElSalvadorMap3DProps) {
  const reduceMotion = useMotionSafe()
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null)
  const [hasError, setHasError] = useState(false)
  const [isSceneReady, setIsSceneReady] = useState(false)
  const [isFormationComplete, setIsFormationComplete] = useState(variant !== 'hero' || reduceMotion)
  const [isRevealed, setIsRevealed] = useState(variant !== 'hero' || reduceMotion)
  const [loadStartedAt] = useState(() => Date.now())

  const handleSceneReady = useCallback(() => {
    setIsSceneReady(true)
  }, [])

  const handleFormationComplete = useCallback(() => {
    setIsFormationComplete(true)
  }, [])

  useEffect(() => {
    let isMounted = true

    const loadGeoJson = async () => {
      try {
        const response = await fetch('/maps/el-salvador.geojson')

        if (!response.ok) {
          throw new Error('No se pudo cargar el GeoJSON de El Salvador')
        }

        const data = (await response.json()) as FeatureCollection

        if (isMounted) {
          setGeojson(data)
        }
      } catch {
        if (isMounted) {
          setHasError(true)
        }
      }
    }

    loadGeoJson()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (
      variant !== 'hero' ||
      hasError ||
      !geojson ||
      !isSceneReady ||
      !isFormationComplete ||
      reduceMotion
    ) {
      return
    }

    const elapsed = Date.now() - loadStartedAt
    const remaining = Math.max(0, HERO_LOADER_MIN_MS - elapsed)
    const timer = window.setTimeout(() => setIsRevealed(true), remaining)

    return () => window.clearTimeout(timer)
  }, [
    variant,
    hasError,
    geojson,
    isSceneReady,
    isFormationComplete,
    loadStartedAt,
    reduceMotion,
  ])

  const showHeroLoader = variant === 'hero' && !isRevealed && !hasError

  return (
    <div
      className={cn(
        'relative h-full w-full min-h-[360px] overflow-visible',
        variant === 'hero' && 'min-h-0',
        className,
      )}
      role="img"
      aria-label="Mapa 3D interactivo de El Salvador hecho por puntos, con la ubicación de DAIEGO"
    >
      {showBackgroundGlow ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,188,125,0.18),rgba(0,0,0,0)_65%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(34,230,163,0.08),transparent_62%)]"
            aria-hidden
          />
        </>
      ) : null}

      <div className="relative z-10 h-full w-full overflow-visible">
        <AnimatePresence mode="wait">
          {showHeroLoader ? (
            <motion.div
              key="hero-map-loader"
              className="absolute inset-0 z-20"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.01, filter: 'blur(4px)' }}
              transition={{ duration: 1.1, ease: easeOutExpo }}
            >
              <HeroMapLoader
                className="h-full w-full"
                geojson={geojson}
                onFormationComplete={handleFormationComplete}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        {hasError ? (
          <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm text-foreground/60">
            No se pudo cargar la visualización 3D. Intenta recargar la página.
          </div>
        ) : geojson ? (
          <div className={cn('h-full w-full', variant === 'hero' && !isRevealed && 'invisible')}>
            <motion.div
              className="h-full w-full"
              initial={
                variant === 'hero' && !reduceMotion
                  ? { opacity: 0, scale: 0.96, filter: 'blur(8px)' }
                  : false
              }
              animate={
                isRevealed
                  ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
                  : variant === 'hero' && !reduceMotion
                    ? { opacity: 0, scale: 0.96, filter: 'blur(8px)' }
                    : { opacity: 1, scale: 1, filter: 'blur(0px)' }
              }
              transition={{ duration: reduceMotion ? 0 : 1.15, ease: easeOutExpo }}
            >
              <ElSalvador3DScene
                geojson={geojson}
                showInteractionHint={showInteractionHint}
                variant={variant}
                onReady={variant === 'hero' ? handleSceneReady : undefined}
              />
            </motion.div>
          </div>
        ) : variant === 'hero' ? null : (
          <div
            className="flex h-full w-full items-center justify-center"
            role="status"
            aria-label="Cargando visualización 3D"
          >
            <div className="h-10 w-10 animate-pulse rounded-full bg-primary/30" />
          </div>
        )}
      </div>
    </div>
  )
}
