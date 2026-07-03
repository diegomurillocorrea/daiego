import { geoBounds, geoMercator } from 'd3-geo'
import type { FeatureCollection, GeoJsonObject, MultiPolygon, Polygon, Position } from 'geojson'
import * as THREE from 'three'

export const COMPANY_COORDINATES: [number, number] = [
  -89.34813865660982,
  13.719246633471878,
]

const PROJECTION_FIT_SIZE = 100

export const MAP_PRIMARY_COLOR = '#00bc7d'
export const MAP_BRIGHT_COLOR = '#22e6a3'
export const MAP_MID_COLOR = '#2ef0b0'
export const MAP_DEPTH_COLOR = '#00a876'
export const MAP_ACCENT_COLOR = '#4fffc1'

const FILL_SPACING = 0.88
const EDGE_SPACING = 0.42
const DEPTH_LAYERS = 3
const LAYER_HEIGHT = 0.008
const HEIGHT_JITTER = 0.012
export const MAP_SURFACE_HEIGHT = (DEPTH_LAYERS - 1) * LAYER_HEIGHT + HEIGHT_JITTER

export interface PointInstanceData {
  position: THREE.Vector3
  scale: number
  color: THREE.Color
  isEdge: boolean
}

export interface SceneProjection {
  projectToScene: (lng: number, lat: number) => [number, number]
}

const TARGET_MAP_SPAN = 6

export interface MapSceneAssets {
  points: PointInstanceData[]
  boundingBox: THREE.Box3
  rawCenter: THREE.Vector3
  worldScale: number
  projectToScene: (lng: number, lat: number) => [number, number]
  surfaceHeight: number
}

const ringToPoints = (
  ring: Position[],
  projectToScene: (lng: number, lat: number) => [number, number],
): THREE.Vector2[] =>
  ring.map(([lng, lat]) => {
    const [x, y] = projectToScene(lng, lat)
    return new THREE.Vector2(x, y)
  })

const polygonToShape = (
  polygon: Position[][],
  projectToScene: (lng: number, lat: number) => [number, number],
): THREE.Shape => {
  const outerRing = ringToPoints(polygon[0], projectToScene)
  const shape = new THREE.Shape(outerRing)

  for (let holeIndex = 1; holeIndex < polygon.length; holeIndex += 1) {
    const holePoints = ringToPoints(polygon[holeIndex], projectToScene)
    shape.holes.push(new THREE.Path(holePoints))
  }

  return shape
}

export const createSceneProjection = (geojson: GeoJsonObject): SceneProjection => {
  const projection = geoMercator().fitSize(
    [PROJECTION_FIT_SIZE, PROJECTION_FIT_SIZE],
    geojson,
  )

  const [[minLng, minLat], [maxLng, maxLat]] = geoBounds(geojson)
  const centerLng = (minLng + maxLng) / 2
  const centerLat = (minLat + maxLat) / 2
  const centerProjected = projection([centerLng, centerLat])

  if (!centerProjected) {
    throw new Error('No se pudo proyectar el centro del mapa de El Salvador')
  }

  const projectToScene = (lng: number, lat: number): [number, number] => {
    const projected = projection([lng, lat])

    if (!projected) {
      return [0, 0]
    }

    const x = projected[0] - centerProjected[0]
    const y = -(projected[1] - centerProjected[1])

    return [x, y]
  }

  return { projectToScene }
}

export const geoJsonToShapes = (
  geojson: FeatureCollection,
  projectToScene: (lng: number, lat: number) => [number, number],
): THREE.Shape[] => {
  const shapes: THREE.Shape[] = []

  for (const feature of geojson.features) {
    const geometry = feature.geometry

    if (!geometry) {
      continue
    }

    if (geometry.type === 'Polygon') {
      shapes.push(polygonToShape((geometry as Polygon).coordinates, projectToScene))
      continue
    }

    if (geometry.type === 'MultiPolygon') {
      for (const polygon of (geometry as MultiPolygon).coordinates) {
        shapes.push(polygonToShape(polygon, projectToScene))
      }
    }
  }

  return shapes
}

const getShapeBoundingBox = (shape: THREE.Shape): THREE.Box2 => {
  const points = shape.getPoints(24)
  const box = new THREE.Box2()

  for (const point of points) {
    box.expandByPoint(point)
  }

  return box
}

const pointInRing = (point: THREE.Vector2, ring: THREE.Vector2[]): boolean => {
  let isInside = false

  for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index, index += 1) {
    const current = ring[index]
    const prior = ring[previous]
    const intersects =
      current.y > point.y !== prior.y > point.y &&
      point.x <
        ((prior.x - current.x) * (point.y - current.y)) / (prior.y - current.y) + current.x

    if (intersects) {
      isInside = !isInside
    }
  }

  return isInside
}

const shapeContainsPoint = (shape: THREE.Shape, point: THREE.Vector2): boolean => {
  const outerRing = shape.getPoints(24)

  if (!pointInRing(point, outerRing)) {
    return false
  }

  for (const hole of shape.holes) {
    if (pointInRing(point, hole.getPoints(24))) {
      return false
    }
  }

  return true
}

const isNearShapeEdge = (shape: THREE.Shape, point: THREE.Vector2, spacing: number): boolean => {
  const probe = new THREE.Vector2()
  const offsets: [number, number][] = [
    [spacing, 0],
    [-spacing, 0],
    [0, spacing],
    [0, -spacing],
    [spacing * 0.7, spacing * 0.7],
    [-spacing * 0.7, spacing * 0.7],
    [spacing * 0.7, -spacing * 0.7],
    [-spacing * 0.7, -spacing * 0.7],
  ]

  for (const [dx, dy] of offsets) {
    probe.set(point.x + dx, point.y + dy)

    if (!shapeContainsPoint(shape, probe)) {
      return true
    }
  }

  return false
}

interface SurfaceSample {
  x: number
  y: number
  isEdge: boolean
}

const sampleShapeSurfacePoints = (shape: THREE.Shape, spacing: number): SurfaceSample[] => {
  const box = getShapeBoundingBox(shape)
  const samples: SurfaceSample[] = []
  const seen = new Set<string>()
  const probe = new THREE.Vector2()

  const addSample = (x: number, y: number, isEdge: boolean) => {
    const key = `${x.toFixed(2)}:${y.toFixed(2)}`

    if (seen.has(key)) {
      return
    }

    seen.add(key)
    samples.push({ x, y, isEdge })
  }

  for (let x = box.min.x; x <= box.max.x; x += spacing) {
    for (let y = box.min.y; y <= box.max.y; y += spacing) {
      probe.set(x, y)

      if (!shapeContainsPoint(shape, probe)) {
        continue
      }

      addSample(x, y, isNearShapeEdge(shape, probe, spacing))
    }
  }

  const contourPoints = shape.getPoints(Math.max(48, Math.ceil(shape.getLength() / EDGE_SPACING)))

  for (const contourPoint of contourPoints) {
    addSample(contourPoint.x, contourPoint.y, true)
  }

  const denseContour = shape.getPoints(Math.max(96, Math.ceil(shape.getLength() / (EDGE_SPACING * 0.5))))

  for (let index = 0; index < denseContour.length; index += 2) {
    const contourPoint = denseContour[index]
    addSample(contourPoint.x, contourPoint.y, true)
  }

  return samples
}

const lerpColor = (from: THREE.Color, to: THREE.Color, alpha: number): THREE.Color =>
  new THREE.Color().lerpColors(from, to, alpha)

const buildPointInstances = (shapes: THREE.Shape[]): PointInstanceData[] => {
  const surfaceSamples: SurfaceSample[] = []

  for (const shape of shapes) {
    surfaceSamples.push(...sampleShapeSurfacePoints(shape, FILL_SPACING))
  }

  const depthColor = new THREE.Color(MAP_DEPTH_COLOR)
  const baseColor = new THREE.Color(MAP_PRIMARY_COLOR)
  const midColor = new THREE.Color(MAP_MID_COLOR)
  const brightColor = new THREE.Color(MAP_BRIGHT_COLOR)
  const accentColor = new THREE.Color(MAP_ACCENT_COLOR)
  const instances: PointInstanceData[] = []

  for (const sample of surfaceSamples) {
    const { x, y, isEdge } = sample
    const tone = Math.sin(x * 0.17 + y * 0.23) * 0.5 + 0.5
    const edgeBoost = isEdge ? 1.32 : 1.04
    const sizeJitter = THREE.MathUtils.lerp(0.96, 1.1, tone)

    for (let layer = 0; layer < DEPTH_LAYERS; layer += 1) {
      const layerRatio = layer / Math.max(DEPTH_LAYERS - 1, 1)
      const height = layer * LAYER_HEIGHT
      const depthJitter =
        (Math.sin(x * 0.31 + y * 0.27 + layer * 1.7) * 0.5 + 0.5) * HEIGHT_JITTER

      let color: THREE.Color

      if (isEdge) {
        color = lerpColor(brightColor, accentColor, tone * 0.55 + layerRatio * 0.25)
      } else if (layerRatio > 0.5) {
        color = lerpColor(midColor, brightColor, tone * 0.6 + 0.28)
      } else if (layerRatio > 0) {
        color = lerpColor(baseColor, midColor, tone * 0.55 + layerRatio * 0.2)
      } else {
        color = lerpColor(depthColor, baseColor, tone * 0.45 + 0.28)
      }

      instances.push({
        position: new THREE.Vector3(x, height + depthJitter, -y),
        scale: sizeJitter * edgeBoost,
        color,
        isEdge,
      })
    }
  }

  return instances
}

const computeBoundingBox = (points: PointInstanceData[]): THREE.Box3 => {
  const box = new THREE.Box3()

  for (const point of points) {
    box.expandByPoint(point.position)
  }

  box.expandByScalar(0.55)
  return box
}

export const getMapSurfaceHeight = (): number => MAP_SURFACE_HEIGHT

export const coordinatesToScenePosition = (
  coordinates: [number, number],
  projectToScene: (lng: number, lat: number) => [number, number],
  surfaceHeight = getMapSurfaceHeight(),
): [number, number, number] => {
  const [lng, lat] = coordinates
  const [x, shapeY] = projectToScene(lng, lat)

  return [x, surfaceHeight, -shapeY]
}

export const getMarkerWorldPosition = (
  coordinates: [number, number],
  mapAssets: MapSceneAssets,
): THREE.Vector3 => {
  const [x, y, z] = coordinatesToScenePosition(
    coordinates,
    mapAssets.projectToScene,
    mapAssets.surfaceHeight,
  )

  return new THREE.Vector3(x, y, z)
    .sub(mapAssets.rawCenter)
    .multiplyScalar(mapAssets.worldScale)
}

export interface FormationPoint {
  x: number
  y: number
  isEdge: boolean
  order: number
}

export const buildMapFormationPoints = (
  geojson: FeatureCollection,
  maxPoints = 400,
): FormationPoint[] => {
  const projection = createSceneProjection(geojson)
  const shapes = geoJsonToShapes(geojson, projection.projectToScene)
  const edgeSamples: SurfaceSample[] = []
  const fillSamples: SurfaceSample[] = []

  for (const shape of shapes) {
    const samples = sampleShapeSurfacePoints(shape, FILL_SPACING * 1.18)

    for (const sample of samples) {
      if (sample.isEdge) {
        edgeSamples.push(sample)
      } else {
        fillSamples.push(sample)
      }
    }
  }

  if (edgeSamples.length === 0 && fillSamples.length === 0) {
    return []
  }

  const allSamples = [...edgeSamples, ...fillSamples]

  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity

  for (const sample of allSamples) {
    minX = Math.min(minX, sample.x)
    maxX = Math.max(maxX, sample.x)
    minY = Math.min(minY, sample.y)
    maxY = Math.max(maxY, sample.y)
  }

  const centerX = (minX + maxX) / 2
  const centerY = (minY + maxY) / 2
  const span = Math.max(maxX - minX, maxY - minY, 0.001)

  const normalize = (sample: SurfaceSample) => ({
    x: ((sample.x - centerX) / span) * 0.88,
    y: ((sample.y - centerY) / span) * 0.88,
    isEdge: sample.isEdge,
  })

  const edgeTargetCount = Math.min(150, edgeSamples.length)
  const fillTargetCount = Math.max(0, maxPoints - edgeTargetCount)
  const edgeStep = Math.max(1, Math.ceil(edgeSamples.length / edgeTargetCount))
  const fillStep = Math.max(1, Math.ceil(fillSamples.length / Math.max(fillTargetCount, 1)))

  const normalizedEdges = edgeSamples
    .filter((_, index) => index % edgeStep === 0)
    .slice(0, edgeTargetCount)
    .map(normalize)
    .sort((a, b) => Math.atan2(a.y, a.x) - Math.atan2(b.y, b.x))

  const normalizedFill = fillSamples
    .filter((_, index) => index % fillStep === 0)
    .slice(0, fillTargetCount)
    .map(normalize)
    .sort((a, b) => Math.hypot(a.x, a.y) - Math.hypot(b.x, b.y))

  return [
    ...normalizedEdges.map((point, index) => ({ ...point, order: index })),
    ...normalizedFill.map((point, index) => ({
      ...point,
      order: normalizedEdges.length + index,
    })),
  ]
}

export const buildMapSceneAssets = (geojson: FeatureCollection): MapSceneAssets => {
  const projection = createSceneProjection(geojson)
  const shapes = geoJsonToShapes(geojson, projection.projectToScene)
  const rawPoints = buildPointInstances(shapes)
  const rawBoundingBox = computeBoundingBox(rawPoints)
  const rawCenter = new THREE.Vector3()
  rawBoundingBox.getCenter(rawCenter)

  const centeredSize = new THREE.Vector3()
  const centeredBox = new THREE.Box3()

  for (const point of rawPoints) {
    centeredBox.expandByPoint(point.position.clone().sub(rawCenter))
  }

  centeredBox.getSize(centeredSize)
  const maxAxis = Math.max(centeredSize.x, centeredSize.z, 0.001)
  const worldScale = TARGET_MAP_SPAN / maxAxis

  const points = rawPoints.map((point) => ({
    ...point,
    position: point.position.clone().sub(rawCenter).multiplyScalar(worldScale),
    scale: point.scale * worldScale,
  }))

  const boundingBox = computeBoundingBox(points)

  return {
    points,
    boundingBox,
    rawCenter,
    worldScale,
    projectToScene: projection.projectToScene,
    surfaceHeight: MAP_SURFACE_HEIGHT * worldScale,
  }
}
