'use client'

import { PixelBlast } from '@/components/motion/pixel-blast'
import { useIsClient } from '@/hooks/use-is-client'
import { useMotionSafe } from '@/components/motion/use-motion-safe'

function PixelBlastFallback() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-background overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-25%,rgba(204,52,49,0.07),transparent_55%),radial-gradient(ellipse_70%_45%_at_100%_20%,rgba(0,188,125,0.05),transparent_50%),radial-gradient(ellipse_50%_40%_at_0%_80%,rgba(204,52,49,0.04),transparent_45%)]" />
    </div>
  )
}

export function PixelBlastBackground() {
  const isClient = useIsClient()
  const reduceMotion = useMotionSafe()

  if (!isClient) {
    return <div className="fixed inset-0 z-0 bg-background" aria-hidden />
  }

  if (reduceMotion) {
    return <PixelBlastFallback />
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background" aria-hidden>
      <PixelBlast
        variant="circle"
        pixelSize={4}
        color="#00BC7D"
        patternScale={2.2}
        patternDensity={1.65}
        pixelSizeJitter={0.35}
        enableRipples
        rippleSpeed={0.4}
        rippleThickness={0.12}
        rippleIntensityScale={2}
        liquid={false}
        speed={0.6}
        edgeFade={0.12}
        transparent
        autoPauseOffscreen={false}
        className="h-full w-full"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(0,188,125,0.06),transparent_60%),radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(204,52,49,0.05),transparent_55%)]" />
    </div>
  )
}
