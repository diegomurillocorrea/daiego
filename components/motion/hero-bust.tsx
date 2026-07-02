'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useMotionSafe } from './use-motion-safe'

type PointKind = 'body' | 'eye' | 'brow' | 'nose' | 'mouth'

interface BustPoint {
  x: number
  y: number
  z: number
  size: number
  isAccent: boolean
  twinkleOffset: number
  kind: PointKind
}

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))
const BODY_RGB = '64, 226, 165'
const FACE_RGB = '160, 255, 214'
const ACCENT_RGB = '236, 90, 87'
const MODEL_CENTER_Y = 0.62
const PERSPECTIVE = 4.2
const MAX_TILT_X = 0.55

const HEAD_RADIUS_X = 0.74
const HEAD_RADIUS_Y = 0.92
const HEAD_RADIUS_Z = 0.8
const HEAD_CENTER_Y = 1.5

/** Depth (z) of the head surface at a given x/y, so face features sit on the "skin" */
const headSurfaceZ = (x: number, y: number): number => {
  const nx = x / HEAD_RADIUS_X
  const ny = (y - HEAD_CENTER_Y) / HEAD_RADIUS_Y
  const inside = 1 - nx * nx - ny * ny
  return HEAD_RADIUS_Z * Math.sqrt(Math.max(0, inside))
}

const createEllipsoidPoints = (
  count: number,
  radiusX: number,
  radiusY: number,
  radiusZ: number,
  centerY: number,
): BustPoint[] => {
  const points: BustPoint[] = []

  for (let i = 0; i < count; i++) {
    const t = count > 1 ? i / (count - 1) : 0
    const y = 1 - t * 2
    const ringRadius = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = GOLDEN_ANGLE * i
    const jitter = 1 + (Math.random() - 0.5) * 0.05

    points.push({
      x: Math.cos(theta) * ringRadius * radiusX * jitter,
      y: y * radiusY * jitter + centerY,
      z: Math.sin(theta) * ringRadius * radiusZ * jitter,
      size: 1.7 + Math.random() * 1.6,
      isAccent: Math.random() < 0.05,
      twinkleOffset: Math.random() * Math.PI * 2,
      kind: 'body',
    })
  }

  return points
}

const createCylinderPoints = (
  count: number,
  radius: number,
  yBottom: number,
  yTop: number,
): BustPoint[] => {
  const points: BustPoint[] = []

  for (let i = 0; i < count; i++) {
    const theta = GOLDEN_ANGLE * i
    const y = yBottom + Math.random() * (yTop - yBottom)
    const jitter = 1 + (Math.random() - 0.5) * 0.08

    points.push({
      x: Math.cos(theta) * radius * jitter,
      y,
      z: Math.sin(theta) * radius * jitter,
      size: 1.7 + Math.random() * 1.4,
      isAccent: Math.random() < 0.04,
      twinkleOffset: Math.random() * Math.PI * 2,
      kind: 'body',
    })
  }

  return points
}

/** Almond-shaped cluster of points on the face — one human eye */
const createEyePoints = (centerX: number, centerY: number): BustPoint[] => {
  const points: BustPoint[] = []
  const count = 34

  for (let i = 0; i < count; i++) {
    const r = Math.sqrt(i / count)
    const theta = GOLDEN_ANGLE * i
    const x = centerX + Math.cos(theta) * r * 0.115
    const y = centerY + Math.sin(theta) * r * 0.048

    points.push({
      x,
      y,
      z: headSurfaceZ(x, y) + 0.03,
      size: 1.5 + Math.random() * 0.8,
      isAccent: false,
      twinkleOffset: Math.random() * Math.PI * 2,
      kind: 'eye',
    })
  }

  return points
}

/** Short arc of points above each eye — an eyebrow */
const createBrowPoints = (centerX: number, centerY: number): BustPoint[] => {
  const points: BustPoint[] = []
  const count = 9
  const halfWidth = 0.15

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1)
    const localX = -halfWidth + t * halfWidth * 2
    const x = centerX + localX
    const arc = 1 - (localX / halfWidth) ** 2
    const y = centerY + arc * 0.035

    points.push({
      x,
      y,
      z: headSurfaceZ(x, y) + 0.03,
      size: 1.5,
      isAccent: false,
      twinkleOffset: t * 1.4,
      kind: 'brow',
    })
  }

  return points
}

/** Vertical bridge plus nostril hints — a subtle nose */
const createNosePoints = (): BustPoint[] => {
  const points: BustPoint[] = []

  for (let i = 0; i < 6; i++) {
    const t = i / 5
    const y = 1.5 - t * 0.24
    points.push({
      x: 0,
      y,
      z: headSurfaceZ(0, y) + 0.04,
      size: 1.4,
      isAccent: false,
      twinkleOffset: t * 1.2,
      kind: 'nose',
    })
  }

  for (const side of [-1, 1]) {
    const x = side * 0.06
    const y = 1.23
    points.push({
      x,
      y,
      z: headSurfaceZ(x, y) + 0.035,
      size: 1.3,
      isAccent: false,
      twinkleOffset: side,
      kind: 'nose',
    })
  }

  return points
}

/** Gently smiling curve of points — human lips */
const createMouthPoints = (): BustPoint[] => {
  const points: BustPoint[] = []
  const count = 13
  const halfWidth = 0.24

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1)
    const x = -halfWidth + t * halfWidth * 2
    const smile = (x / halfWidth) ** 2
    const y = 1.06 + smile * 0.05

    points.push({
      x,
      y,
      z: headSurfaceZ(x, y) + 0.03,
      size: 1.7,
      isAccent: false,
      twinkleOffset: t * 2,
      kind: 'mouth',
    })

    // Thinner lower lip just under the smile line
    if (i % 2 === 0 && Math.abs(x) < halfWidth * 0.7) {
      points.push({
        x,
        y: y - 0.055,
        z: headSurfaceZ(x, y - 0.055) + 0.03,
        size: 1.4,
        isAccent: false,
        twinkleOffset: t * 2 + 0.5,
        kind: 'mouth',
      })
    }
  }

  return points
}

/** Extra density on the top and back of the skull — suggests hair */
const createHairPoints = (count: number): BustPoint[] => {
  const points: BustPoint[] = []
  let placed = 0
  let i = 0

  while (placed < count && i < count * 20) {
    i++
    const t = Math.random()
    const y = 1 - t * 2
    const ringRadius = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = Math.random() * Math.PI * 2
    const px = Math.cos(theta) * ringRadius * HEAD_RADIUS_X
    const pz = Math.sin(theta) * ringRadius * HEAD_RADIUS_Z
    const py = y * HEAD_RADIUS_Y + HEAD_CENTER_Y

    const isTop = py > HEAD_CENTER_Y + 0.42
    const isBack = pz < -0.25 && py > HEAD_CENTER_Y - 0.1
    if (!isTop && !isBack) continue

    const shell = 1.04 + Math.random() * 0.05
    points.push({
      x: px * shell,
      y: HEAD_CENTER_Y + (py - HEAD_CENTER_Y) * shell,
      z: pz * shell,
      size: 1.4 + Math.random() * 1,
      isAccent: false,
      twinkleOffset: Math.random() * Math.PI * 2,
      kind: 'body',
    })
    placed++
  }

  return points
}

const createAmbientPoints = (count: number): BustPoint[] => {
  const points: BustPoint[] = []

  for (let i = 0; i < count; i++) {
    points.push({
      x: (Math.random() - 0.5) * 4.6,
      y: (Math.random() - 0.5) * 4.4 + MODEL_CENTER_Y,
      z: (Math.random() - 0.5) * 3,
      size: 0.7 + Math.random() * 0.9,
      isAccent: Math.random() < 0.12,
      twinkleOffset: Math.random() * Math.PI * 2,
      kind: 'body',
    })
  }

  return points
}

const createBustPoints = (): { bust: BustPoint[]; ambient: BustPoint[] } => {
  const isInFaceZone = (point: BustPoint) =>
    point.z > 0.5 && Math.abs(point.x) < 0.5 && point.y > 0.9 && point.y < 1.9

  // Thin out the front of the head so the facial features read clearly
  const head = createEllipsoidPoints(760, HEAD_RADIUS_X, HEAD_RADIUS_Y, HEAD_RADIUS_Z, HEAD_CENTER_Y).filter(
    (point) => !isInFaceZone(point) || Math.random() < 0.28,
  )
  const neck = createCylinderPoints(140, 0.3, 0.18, 0.78)
  const torso = createEllipsoidPoints(620, 1.5, 0.98, 0.62, -0.6).filter(
    (point) => point.y > -1.25,
  )

  return {
    bust: [
      ...head,
      ...createHairPoints(240),
      ...neck,
      ...torso,
      ...createEyePoints(-0.27, 1.55),
      ...createEyePoints(0.27, 1.55),
      ...createBrowPoints(-0.28, 1.7),
      ...createBrowPoints(0.28, 1.7),
      ...createNosePoints(),
      ...createMouthPoints(),
    ],
    ambient: createAmbientPoints(70),
  }
}

/** Brief periodic dip in eye brightness — a natural blink */
const blinkFactor = (time: number): number => {
  const cycle = time % 4.6
  if (cycle < 4.2) return 1
  const t = (cycle - 4.2) / 0.4
  return 0.2 + 0.8 * Math.abs(1 - t * 2)
}

export function HeroBust({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const reduceMotion = useMotionSafe()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { bust, ambient } = createBustPoints()

    let width = 0
    let height = 0
    let animationFrameId = 0

    // Drag-to-rotate state
    let isDragging = false
    let lastPointerX = 0
    let lastPointerY = 0
    let userRotY = 0
    let userRotX = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const drawFrame = (timeMs: number) => {
      const time = timeMs / 1000
      ctx.clearRect(0, 0, width, height)

      userRotX = Math.max(-MAX_TILT_X, Math.min(MAX_TILT_X, userRotX))

      const sway = reduceMotion || isDragging ? 0 : Math.sin(time * 0.4) * 0.14
      const rotY = sway + userRotY
      const rotX = -0.06 + userRotX

      const breathe = reduceMotion ? 1 : 1 + Math.sin(time * 0.9) * 0.012
      const scale = (Math.min(width, height) / 3.5) * breathe
      const centerX = width / 2
      const centerY = height / 2

      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)
      const blink = reduceMotion ? 1 : blinkFactor(time)

      const drawPoints = (points: BustPoint[], baseAlpha: number, driftAmp: number) => {
        for (const point of points) {
          const isFaceFeature = point.kind !== 'body'
          const drift =
            reduceMotion || isFaceFeature
              ? 0
              : Math.sin(time * 0.8 + point.twinkleOffset) * driftAmp

          const modelY = point.y - MODEL_CENTER_Y + drift

          const rotatedX = point.x * cosY + point.z * sinY
          const rotatedZ = -point.x * sinY + point.z * cosY
          const rotatedY = modelY * cosX - rotatedZ * sinX
          // Camera sits at +z: positive depth means closer to the viewer
          const depthZ = -(modelY * sinX) + rotatedZ * cosX

          const perspective = PERSPECTIVE / (PERSPECTIVE - depthZ)
          const screenX = centerX + rotatedX * perspective * scale
          const screenY = centerY - rotatedY * perspective * scale

          const depthFade = Math.min(1, Math.max(0.4, (depthZ + 1.7) / 2.2))
          const twinkle = reduceMotion
            ? 1
            : 0.85 + Math.sin(time * 1.6 + point.twinkleOffset) * 0.15

          let alpha = baseAlpha * depthFade * twinkle
          let rgb = point.isAccent ? ACCENT_RGB : BODY_RGB
          let radius = point.size * perspective

          if (point.kind === 'eye') {
            rgb = FACE_RGB
            alpha = Math.min(1, baseAlpha * 1.25 * depthFade) * blink
            radius = point.size * perspective
          } else if (isFaceFeature) {
            rgb = FACE_RGB
            alpha = Math.min(1, baseAlpha * 1.1 * depthFade) * twinkle
            radius = point.size * perspective
          }

          // Soft halo behind the facial features so the face reads at a glance
          if (isFaceFeature) {
            ctx.beginPath()
            ctx.arc(screenX, screenY, radius * 2.2, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${rgb}, ${alpha * 0.13})`
            ctx.fill()
          }

          ctx.beginPath()
          ctx.arc(screenX, screenY, radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${rgb}, ${alpha})`
          ctx.fill()
        }
      }

      drawPoints(ambient, 0.45, 0.06)
      drawPoints(bust, 1, 0.015)
    }

    const loop = (timeMs: number) => {
      drawFrame(timeMs)
      animationFrameId = window.requestAnimationFrame(loop)
    }

    const handlePointerDown = (event: PointerEvent) => {
      isDragging = true
      lastPointerX = event.clientX
      lastPointerY = event.clientY
      canvas.setPointerCapture(event.pointerId)
      canvas.style.cursor = 'grabbing'
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging) return
      const deltaX = event.clientX - lastPointerX
      const deltaY = event.clientY - lastPointerY
      lastPointerX = event.clientX
      lastPointerY = event.clientY

      userRotY += deltaX * 0.008
      userRotX += deltaY * 0.005

      if (reduceMotion) drawFrame(performance.now())
    }

    const handlePointerUp = (event: PointerEvent) => {
      isDragging = false
      canvas.releasePointerCapture(event.pointerId)
      canvas.style.cursor = 'grab'
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    canvas.addEventListener('pointerdown', handlePointerDown)
    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerup', handlePointerUp)
    canvas.addEventListener('pointercancel', handlePointerUp)

    if (reduceMotion) {
      drawFrame(0)
    } else {
      animationFrameId = window.requestAnimationFrame(loop)
    }

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointerdown', handlePointerDown)
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerup', handlePointerUp)
      canvas.removeEventListener('pointercancel', handlePointerUp)
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [reduceMotion])

  return (
    <div className={cn('relative', className)}>
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl"
        aria-hidden
      />
      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-grab touch-none select-none"
        role="img"
        aria-label="Interactive 3D human bust made of glowing dots — drag to rotate"
      />
    </div>
  )
}
