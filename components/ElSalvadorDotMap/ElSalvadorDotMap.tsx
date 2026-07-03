'use client'

import { useEffect, useRef, useCallback } from 'react'
import { EL_SALVADOR_PATH, EL_SALVADOR_VIEWBOX } from '@/lib/el-salvador-path'
import { cn } from '@/lib/utils'
import './ElSalvadorDotMap.css'

export interface ElSalvadorDotMapProps {
  className?: string
  dotRadius?: number
  dotSpacing?: number
  cursorRadius?: number
  bulgeStrength?: number
  glowRadius?: number
  sparkle?: boolean
  waveAmplitude?: number
  gradientFrom?: string
  gradientTo?: string
  glowColor?: string
  featuredNodeCount?: number
}

interface Dot {
  vx: number
  vy: number
  phase: number
  sparkleSeed: number
  isFeatured: boolean
  isContour: boolean
  featuredPhase: number
}

interface MapTransform {
  scale: number
  offsetX: number
  offsetY: number
}

interface RgbaColor {
  r: number
  g: number
  b: number
  a: number
}

interface PathBounds {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

const MAX_DPR = 2
const FEATURED_NODE_MIN_DISTANCE = 72

const DEFAULT_PROPS = {
  dotRadius: 2,
  dotSpacing: 10,
  cursorRadius: 260,
  bulgeStrength: 42,
  glowRadius: 180,
  sparkle: true,
  waveAmplitude: 0.6,
  gradientFrom: 'rgba(0, 188, 125, 0.95)',
  gradientTo: 'rgba(174, 44, 42, 0.75)',
  glowColor: 'rgba(0, 188, 125, 0.35)',
  featuredNodeCount: 7,
} as const

const parseRgba = (color: string): RgbaColor => {
  const match = color.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/,
  )

  if (!match) {
    return { r: 0, g: 188, b: 125, a: 0.95 }
  }

  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
    a: match[4] !== undefined ? Number(match[4]) : 1,
  }
}

const lerpRgba = (from: RgbaColor, to: RgbaColor, t: number, alphaBoost = 1): string => {
  const clamped = Math.max(0, Math.min(1, t))
  const r = Math.round(from.r + (to.r - from.r) * clamped)
  const g = Math.round(from.g + (to.g - from.g) * clamped)
  const b = Math.round(from.b + (to.b - from.b) * clamped)
  const a = Math.min(1, (from.a + (to.a - from.a) * clamped) * alphaBoost)

  return `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`
}

const getPathBounds = (pathData: string): PathBounds => {
  const coords = pathData.match(/-?[\d.]+/g)

  if (!coords || coords.length < 2) {
    return { minX: 0, minY: 0, maxX: EL_SALVADOR_VIEWBOX.width, maxY: EL_SALVADOR_VIEWBOX.height }
  }

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  for (let index = 0; index < coords.length - 1; index += 2) {
    const x = Number(coords[index])
    const y = Number(coords[index + 1])
    minX = Math.min(minX, x)
    minY = Math.min(minY, y)
    maxX = Math.max(maxX, x)
    maxY = Math.max(maxY, y)
  }

  return { minX, minY, maxX, maxY }
}

const getPadding = (width: number): number => {
  if (width < 480) return 24
  if (width < 768) return 32
  return 48
}

const getEffectiveSpacing = (baseSpacing: number, width: number): number => {
  if (width < 400) return baseSpacing * 2.2
  if (width < 640) return baseSpacing * 1.6
  if (width < 1024) return baseSpacing * 1.2
  return baseSpacing
}

const computeMapTransform = (width: number, height: number, padding: number): MapTransform => {
  const innerWidth = Math.max(width - padding * 2, 1)
  const innerHeight = Math.max(height - padding * 2, 1)
  const scale = Math.min(innerWidth / EL_SALVADOR_VIEWBOX.width, innerHeight / EL_SALVADOR_VIEWBOX.height)
  const mapWidth = EL_SALVADOR_VIEWBOX.width * scale
  const mapHeight = EL_SALVADOR_VIEWBOX.height * scale
  const offsetX = (width - mapWidth) / 2
  const offsetY = (height - mapHeight) / 2

  return { scale, offsetX, offsetY }
}

const viewToCanvas = (vx: number, vy: number, transform: MapTransform): [number, number] => [
  vx * transform.scale + transform.offsetX,
  vy * transform.scale + transform.offsetY,
]

const isInsidePath = (
  hitCtx: CanvasRenderingContext2D,
  mapPath: Path2D,
  vx: number,
  vy: number,
): boolean => hitCtx.isPointInPath(mapPath, vx, vy)

const isNearEdge = (
  hitCtx: CanvasRenderingContext2D,
  mapPath: Path2D,
  vx: number,
  vy: number,
  probe: number,
): boolean => {
  const offsets: [number, number][] = [
    [probe, 0],
    [-probe, 0],
    [0, probe],
    [0, -probe],
  ]

  for (const [dx, dy] of offsets) {
    if (!hitCtx.isPointInPath(mapPath, vx + dx, vy + dy)) {
      return true
    }
  }

  return false
}

const sampleContourDots = (spacing: number): { vx: number; vy: number }[] => {
  if (typeof document === 'undefined') return []

  const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  pathEl.setAttribute('d', EL_SALVADOR_PATH)
  const totalLength = pathEl.getTotalLength()
  const step = Math.max(spacing * 0.55, 3)
  const samples: { vx: number; vy: number }[] = []
  const seen = new Set<string>()

  for (let distance = 0; distance <= totalLength; distance += step) {
    const point = pathEl.getPointAtLength(distance)
    const key = `${point.x.toFixed(1)}:${point.y.toFixed(1)}`

    if (seen.has(key)) continue

    seen.add(key)
    samples.push({ vx: point.x, vy: point.y })
  }

  return samples
}

const pickFeaturedIndices = (dots: Dot[], count: number): Set<number> => {
  const interiorIndices: number[] = []

  for (let index = 0; index < dots.length; index += 1) {
    if (!dots[index].isContour) {
      interiorIndices.push(index)
    }
  }

  const selected = new Set<number>()
  const minDistSq = FEATURED_NODE_MIN_DISTANCE * FEATURED_NODE_MIN_DISTANCE
  const shuffled = [...interiorIndices].sort(() => Math.random() - 0.5)

  for (const index of shuffled) {
    if (selected.size >= count) break

    const { vx: cx, vy: cy } = dots[index]
    let tooClose = false

    for (const picked of selected) {
      const dx = cx - dots[picked].vx
      const dy = cy - dots[picked].vy

      if (dx * dx + dy * dy < minDistSq) {
        tooClose = true
        break
      }
    }

    if (!tooClose) {
      selected.add(index)
    }
  }

  return selected
}

export function ElSalvadorDotMap({
  className,
  dotRadius = DEFAULT_PROPS.dotRadius,
  dotSpacing = DEFAULT_PROPS.dotSpacing,
  cursorRadius = DEFAULT_PROPS.cursorRadius,
  bulgeStrength = DEFAULT_PROPS.bulgeStrength,
  glowRadius = DEFAULT_PROPS.glowRadius,
  sparkle = DEFAULT_PROPS.sparkle,
  waveAmplitude = DEFAULT_PROPS.waveAmplitude,
  gradientFrom = DEFAULT_PROPS.gradientFrom,
  gradientTo = DEFAULT_PROPS.gradientTo,
  glowColor = DEFAULT_PROPS.glowColor,
  featuredNodeCount = DEFAULT_PROPS.featuredNodeCount,
}: ElSalvadorDotMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glowRef = useRef<SVGCircleElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const mapPathRef = useRef<Path2D | null>(null)
  const hitCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const transformRef = useRef<MapTransform>({ scale: 1, offsetX: 0, offsetY: 0 })
  const pathBoundsRef = useRef<PathBounds>(getPathBounds(EL_SALVADOR_PATH))
  const cursorRef = useRef({ x: -9999, y: -9999, active: false })
  const rafRef = useRef<number>(0)
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 })
  const colorFromRef = useRef(parseRgba(gradientFrom))
  const colorToRef = useRef(parseRgba(gradientTo))

  const buildDots = useCallback(
    (width: number) => {
      const hitCanvas = hitCanvasRef.current
      const mapPath = mapPathRef.current

      if (!hitCanvas || !mapPath) return

      const hitCtx = hitCanvas.getContext('2d')

      if (!hitCtx) return

      const bounds = pathBoundsRef.current
      const spacing = getEffectiveSpacing(dotSpacing, width)
      const edgeProbe = spacing * 0.85
      const dots: Dot[] = []
      const seen = new Set<string>()

      const addDot = (vx: number, vy: number, isContour: boolean) => {
        const key = `${vx.toFixed(1)}:${vy.toFixed(1)}`

        if (seen.has(key)) return

        seen.add(key)
        dots.push({
          vx,
          vy,
          phase: Math.random() * Math.PI * 2,
          sparkleSeed: Math.random(),
          isFeatured: false,
          isContour,
          featuredPhase: Math.random() * Math.PI * 2,
        })
      }

      for (let vx = bounds.minX; vx <= bounds.maxX; vx += spacing) {
        for (let vy = bounds.minY; vy <= bounds.maxY; vy += spacing) {
          if (!isInsidePath(hitCtx, mapPath, vx, vy)) continue
          if (isNearEdge(hitCtx, mapPath, vx, vy, edgeProbe)) continue

          addDot(vx, vy, false)
        }
      }

      for (const sample of sampleContourDots(spacing)) {
        if (!isInsidePath(hitCtx, mapPath, sample.vx, sample.vy)) continue

        addDot(sample.vx, sample.vy, true)
      }

      const featured = pickFeaturedIndices(dots, featuredNodeCount)

      for (const index of featured) {
        dots[index].isFeatured = true
      }

      dotsRef.current = dots
    },
    [dotSpacing, featuredNodeCount],
  )

  const resize = useCallback(() => {
    const container = containerRef.current
    const canvas = canvasRef.current

    if (!container || !canvas) return

    const rect = container.getBoundingClientRect()
    const width = Math.max(rect.width, 1)
    const height = Math.max(rect.height, 1)
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)

    sizeRef.current = { width, height, dpr }
    transformRef.current = computeMapTransform(width, height, getPadding(width))

    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const ctx = canvas.getContext('2d')

    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    if (!mapPathRef.current) {
      mapPathRef.current = new Path2D(EL_SALVADOR_PATH)
    }

    if (!hitCanvasRef.current) {
      hitCanvasRef.current = document.createElement('canvas')
    }

    hitCanvasRef.current.width = EL_SALVADOR_VIEWBOX.width
    hitCanvasRef.current.height = EL_SALVADOR_VIEWBOX.height

    buildDots(width)
  }, [buildDots])

  const drawFrame = useCallback(
    (time: number) => {
      const canvas = canvasRef.current
      const dots = dotsRef.current
      const transform = transformRef.current
      const { width, height } = sizeRef.current
      const cursor = cursorRef.current
      const mapPath = mapPathRef.current

      if (!canvas || dots.length === 0) {
        rafRef.current = requestAnimationFrame(drawFrame)
        return
      }

      const ctx = canvas.getContext('2d')

      if (!ctx) {
        rafRef.current = requestAnimationFrame(drawFrame)
        return
      }

      const from = colorFromRef.current
      const to = colorToRef.current
      const waveTime = time * 0.001
      const bounds = pathBoundsRef.current
      const boundsSpan = Math.max(bounds.maxX - bounds.minX, 1)

      ctx.clearRect(0, 0, width, height)

      if (mapPath) {
        ctx.save()
        ctx.translate(transform.offsetX, transform.offsetY)
        ctx.scale(transform.scale, transform.scale)
        ctx.strokeStyle = 'rgba(0, 188, 125, 0.12)'
        ctx.lineWidth = 2.5 / transform.scale
        ctx.shadowColor = 'rgba(0, 188, 125, 0.28)'
        ctx.shadowBlur = 14 / transform.scale
        ctx.stroke(mapPath)
        ctx.shadowBlur = 0
        ctx.restore()
      }

      for (const dot of dots) {
        const [baseX, baseY] = viewToCanvas(dot.vx, dot.vy, transform)

        let x = baseX
        let y = baseY

        if (waveAmplitude > 0) {
          const wave =
            Math.sin(waveTime * 1.4 + dot.phase) * waveAmplitude +
            Math.sin(waveTime * 2.1 + dot.phase * 1.7) * waveAmplitude * 0.35
          y += wave
        }

        if (cursor.active) {
          const dx = x - cursor.x
          const dy = y - cursor.y
          const dist = Math.hypot(dx, dy)

          if (dist < cursorRadius && dist > 0.001) {
            const influence = 1 - dist / cursorRadius
            const eased = influence * influence
            const push = eased * bulgeStrength
            x += (dx / dist) * push
            y += (dy / dist) * push
          }
        }

        const gradientT = (dot.vx - bounds.minX) / boundsSpan
        let alphaBoost = 1.12

        if (cursor.active) {
          const dist = Math.hypot(x - cursor.x, y - cursor.y)

          if (dist < cursorRadius) {
            alphaBoost += (1 - dist / cursorRadius) * 0.45
          }
        }

        let radius = dot.isContour ? dotRadius * 1.08 : dotRadius

        if (dot.isFeatured) {
          const pulse = 0.5 + 0.5 * Math.sin(waveTime * 2.4 + dot.featuredPhase)
          radius = dotRadius * (1.55 + pulse * 0.35)
          alphaBoost += 0.25 + pulse * 0.2
        }

        if (sparkle && dot.sparkleSeed > 0.97) {
          const sparklePulse = 0.5 + 0.5 * Math.sin(waveTime * 5 + dot.phase * 3)
          alphaBoost += sparklePulse * 0.6
          radius += sparklePulse * 0.8
        }

        const fill = lerpRgba(from, to, gradientT, alphaBoost)

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = fill
        ctx.fill()

        if (dot.isFeatured) {
          ctx.beginPath()
          ctx.arc(x, y, radius * 2.2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(34, 230, 163, ${0.08 + 0.1 * Math.sin(waveTime * 2.4 + dot.featuredPhase)})`
          ctx.fill()
        }
      }

      rafRef.current = requestAnimationFrame(drawFrame)
    },
    [bulgeStrength, cursorRadius, dotRadius, sparkle, waveAmplitude],
  )

  const updateGlow = useCallback(() => {
    const glow = glowRef.current
    const cursor = cursorRef.current

    if (!glow) return

    if (!cursor.active) {
      glow.setAttribute('opacity', '0')
      return
    }

    glow.setAttribute('cx', String(cursor.x))
    glow.setAttribute('cy', String(cursor.y))
    glow.setAttribute('r', String(glowRadius))
    glow.setAttribute('opacity', '1')
  }, [glowRadius])

  const handlePointerMove = useCallback(
    (clientX: number, clientY: number) => {
      const container = containerRef.current

      if (!container) return

      const rect = container.getBoundingClientRect()
      cursorRef.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
        active: true,
      }
      updateGlow()
    },
    [updateGlow],
  )

  const handlePointerLeave = useCallback(() => {
    cursorRef.current = { x: -9999, y: -9999, active: false }
    updateGlow()
  }, [updateGlow])

  useEffect(() => {
    colorFromRef.current = parseRgba(gradientFrom)
    colorToRef.current = parseRgba(gradientTo)
  }, [gradientFrom, gradientTo])

  useEffect(() => {
    resize()
    rafRef.current = requestAnimationFrame(drawFrame)

    const container = containerRef.current

    if (!container) {
      return () => {
        cancelAnimationFrame(rafRef.current)
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
    })

    resizeObserver.observe(container)

    const onPointerMove = (event: PointerEvent) => {
      handlePointerMove(event.clientX, event.clientY)
    }

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0]

      if (touch) {
        handlePointerMove(touch.clientX, touch.clientY)
      }
    }

    container.addEventListener('pointermove', onPointerMove)
    container.addEventListener('pointerleave', handlePointerLeave)
    container.addEventListener('touchmove', onTouchMove, { passive: true })
    container.addEventListener('touchend', handlePointerLeave)

    return () => {
      cancelAnimationFrame(rafRef.current)
      resizeObserver.disconnect()
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerleave', handlePointerLeave)
      container.removeEventListener('touchmove', onTouchMove)
      container.removeEventListener('touchend', handlePointerLeave)
    }
  }, [drawFrame, handlePointerLeave, handlePointerMove, resize])

  return (
    <div
      ref={containerRef}
      className={cn('el-salvador-dot-map', className)}
      role="img"
      aria-label="Mapa interactivo de El Salvador formado por puntos"
    >
      <canvas ref={canvasRef} className="el-salvador-dot-map__canvas" />
      <svg className="el-salvador-dot-map__glow" aria-hidden>
        <defs>
          <radialGradient id="es-dot-map-glow-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={glowColor} stopOpacity="0.55" />
            <stop offset="45%" stopColor={glowColor} stopOpacity="0.18" />
            <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle
          ref={glowRef}
          className="el-salvador-dot-map__glow-circle"
          cx={0}
          cy={0}
          r={glowRadius}
          fill="url(#es-dot-map-glow-grad)"
          opacity={0}
        />
      </svg>
    </div>
  )
}
