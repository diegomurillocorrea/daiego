'use client'

import { Environment, OrbitControls, OrthographicCamera } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Suspense,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from 'react'
import * as THREE from 'three'
import type { FeatureCollection } from 'geojson'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { buildMapSceneAssets } from '@/lib/el-salvador-geo'
import { CompanyLogoMarker } from '@/components/landing/CompanyLogoMarker'
import { ElSalvadorPointCloud } from '@/components/landing/ElSalvadorPointCloud'
import { cn } from '@/lib/utils'

interface ElSalvador3DSceneProps {
  geojson: FeatureCollection
  showInteractionHint?: boolean
  variant?: 'default' | 'hero'
  onReady?: () => void
}

interface SceneContentProps {
  geojson: FeatureCollection
  onInteractingChange: (isInteracting: boolean) => void
  variant: 'default' | 'hero'
  onReady?: () => void
}

const HERO_VIEW = {
  azimuthAngle: 0,
  polarAngle: 0.84,
  mapRotationY: 0,
} as const

const DEFAULT_VIEW = {
  azimuthAngle: Math.PI * 0.18,
  polarAngle: 0.72,
  mapRotationY: 0,
} as const

const CAMERA_PADDING_BY_VARIANT = {
  default: 1.06,
  hero: 1.22,
} as const

const EXPOSURE_BY_VARIANT = {
  default: 1.38,
  hero: 1.4,
} as const
const BASE_CAMERA_DISTANCE = 8
const MAP_ORIGIN = new THREE.Vector3(0, 0, 0)

function SceneLighting({ variant }: { variant: 'default' | 'hero' }) {
  const boost = variant === 'hero' ? 1.05 : 1

  return (
    <>
      <ambientLight intensity={0.74 * boost} color="#e8fff5" />
      <hemisphereLight args={['#c8ffe8', '#0a1210', 0.82 * boost]} />
      <directionalLight intensity={1.28 * boost} position={[3, 6, 4]} color="#ffffff" />
      <directionalLight intensity={0.68 * boost} position={[-4, 2.5, -2]} color="#6bffd0" />
      <pointLight color="#22e6a3" intensity={1.15 * boost} position={[0, 2.5, 0]} distance={14} />
      <pointLight color="#00bc7d" intensity={0.62 * boost} position={[0, -1, 2]} distance={11} />
    </>
  )
}

function fitOrthographicCameraToBox({
  camera,
  box,
  viewportWidth,
  viewportHeight,
  padding = 1.06,
  variant = 'default',
}: {
  camera: THREE.OrthographicCamera
  box: THREE.Box3
  viewportWidth: number
  viewportHeight: number
  padding?: number
  variant?: 'default' | 'hero'
}) {
  if (viewportWidth <= 0 || viewportHeight <= 0 || box.isEmpty()) {
    return null
  }

  const center = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3())
  const aspect = viewportWidth / viewportHeight

  const paddedWidth = size.x * padding
  const paddedDepth = size.z * padding
  const paddedHeight = Math.max(size.y * padding * 2.4, paddedDepth * 0.35)

  let viewWidth = paddedWidth
  let viewHeight = paddedDepth

  if (viewWidth / viewHeight > aspect) {
    viewHeight = viewWidth / aspect
  } else {
    viewWidth = viewHeight * aspect
  }

  viewHeight = Math.max(viewHeight, paddedHeight)

  camera.left = -viewWidth / 2
  camera.right = viewWidth / 2
  camera.top = viewHeight / 2
  camera.bottom = -viewHeight / 2
  camera.zoom = 1
  camera.near = 0.1
  camera.far = Math.max(200, size.length() * 12)

  if (variant === 'hero') {
    camera.position.set(center.x, center.y + BASE_CAMERA_DISTANCE * 1.02, center.z + 0.45)
  } else {
    camera.position.set(
      center.x + BASE_CAMERA_DISTANCE * 0.65,
      center.y + BASE_CAMERA_DISTANCE * 0.75,
      center.z + BASE_CAMERA_DISTANCE * 0.65,
    )
  }

  camera.lookAt(center)
  camera.updateProjectionMatrix()

  return center
}

function MapCameraRig({
  boundingBox,
  controlsRef,
  variant,
}: {
  boundingBox: THREE.Box3
  controlsRef: RefObject<OrbitControlsImpl | null>
  variant: 'default' | 'hero'
}) {
  const { camera, size, invalidate } = useThree()
  const cameraPadding = CAMERA_PADDING_BY_VARIANT[variant]

  const fitCamera = useCallback(() => {
    if (!(camera instanceof THREE.OrthographicCamera)) {
      return
    }

    const center = fitOrthographicCameraToBox({
      camera,
      box: boundingBox,
      viewportWidth: size.width,
      viewportHeight: size.height,
      padding: cameraPadding,
      variant,
    })

    if (!center) {
      return
    }

    const controls = controlsRef.current

    if (controls) {
      controls.target.copy(MAP_ORIGIN)
      controls.minZoom = variant === 'hero' ? 0.72 : 0.6
      controls.maxZoom = variant === 'hero' ? 2.05 : 1.9
      controls.update()
    }

    invalidate()
  }, [boundingBox, camera, cameraPadding, controlsRef, invalidate, size.height, size.width, variant])

  useLayoutEffect(() => {
    fitCamera()

    const frameId = requestAnimationFrame(() => {
      requestAnimationFrame(fitCamera)
    })

    return () => cancelAnimationFrame(frameId)
  }, [fitCamera])

  return null
}

function InitialOrbitSetup({
  controlsRef,
  variant,
}: {
  controlsRef: RefObject<OrbitControlsImpl | null>
  variant: 'default' | 'hero'
}) {
  const view = variant === 'hero' ? HERO_VIEW : DEFAULT_VIEW

  useLayoutEffect(() => {
    const applyInitialView = () => {
      const controls = controlsRef.current

      if (!controls) {
        return false
      }

      controls.azimuthAngle = view.azimuthAngle
      controls.polarAngle = view.polarAngle
      controls.update()
      return true
    }

    if (applyInitialView()) {
      return
    }

    const frameId = requestAnimationFrame(() => {
      applyInitialView()
    })

    return () => cancelAnimationFrame(frameId)
  }, [controlsRef, view.azimuthAngle, view.polarAngle])

  return null
}

function applyHeroView(controls: OrbitControlsImpl, camera?: THREE.Camera) {
  controls.azimuthAngle = HERO_VIEW.azimuthAngle
  controls.polarAngle = HERO_VIEW.polarAngle

  if (camera instanceof THREE.OrthographicCamera) {
    camera.zoom = 1
    camera.updateProjectionMatrix()
  }

  controls.update()
}

function HeroViewReadyNotifier({
  onReady,
  controlsRef,
  variant,
}: {
  onReady?: () => void
  controlsRef: RefObject<OrbitControlsImpl | null>
  variant: 'default' | 'hero'
}) {
  const frameCountRef = useRef(0)
  const hasNotifiedRef = useRef(false)

  useFrame(() => {
    if (hasNotifiedRef.current || !onReady) {
      return
    }

    frameCountRef.current += 1
    const controls = controlsRef.current

    if (!controls || frameCountRef.current < 2) {
      return
    }

    if (variant === 'hero') {
      applyHeroView(controls, controls.object)
    }

    if (frameCountRef.current < 5) {
      return
    }

    hasNotifiedRef.current = true
    onReady()
  })

  return null
}

function UnifiedMapGroup({
  mapAssets,
  isInteracting,
  variant,
}: {
  mapAssets: ReturnType<typeof buildMapSceneAssets>
  isInteracting: boolean
  variant: 'default' | 'hero'
}) {
  const mapRootRef = useRef<THREE.Group>(null)
  const baseRotationY = variant === 'hero' ? HERO_VIEW.mapRotationY : DEFAULT_VIEW.mapRotationY

  useLayoutEffect(() => {
    if (!mapRootRef.current) {
      return
    }

    mapRootRef.current.rotation.y = baseRotationY
  }, [baseRotationY])

  useFrame((state) => {
    if (!mapRootRef.current || isInteracting) {
      return
    }

    const elapsed = state.clock.elapsedTime
    const idleRotation =
      variant === 'hero' ? Math.sin(elapsed * 0.1) * 0.012 : Math.sin(elapsed * 0.1) * 0.04

    mapRootRef.current.rotation.y = baseRotationY + idleRotation
    mapRootRef.current.position.y = Math.sin(elapsed * 0.32) * 0.008
  })

  return (
    <group ref={mapRootRef}>
      <ElSalvadorPointCloud mapAssets={mapAssets} variant={variant} />
      <CompanyLogoMarker mapAssets={mapAssets} />
    </group>
  )
}

function SceneContent({ geojson, onInteractingChange, variant, onReady }: SceneContentProps) {
  const mapAssets = useMemo(() => buildMapSceneAssets(geojson), [geojson])
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const [isInteracting, setIsInteracting] = useState(false)
  const minZoom = variant === 'hero' ? 0.72 : 0.6
  const maxZoom = variant === 'hero' ? 2.05 : 1.9
  const heroPolarMin = 0.68
  const heroPolarMax = 0.98
  const defaultPolarMin = Math.PI / 5
  const defaultPolarMax = Math.PI / 2.25

  const handleInteractionStart = () => {
    setIsInteracting(true)
    onInteractingChange(true)
  }

  const handleInteractionEnd = () => {
    setIsInteracting(false)
    onInteractingChange(false)
  }

  return (
    <>
      <OrthographicCamera makeDefault near={0.1} far={200} />
      <MapCameraRig boundingBox={mapAssets.boundingBox} controlsRef={controlsRef} variant={variant} />
      <InitialOrbitSetup controlsRef={controlsRef} variant={variant} />
      <HeroViewReadyNotifier onReady={onReady} controlsRef={controlsRef} variant={variant} />

      <OrbitControls
        ref={controlsRef}
        target={MAP_ORIGIN}
        enablePan={false}
        enableZoom
        enableRotate
        minZoom={minZoom}
        maxZoom={maxZoom}
        minPolarAngle={variant === 'hero' ? heroPolarMin : defaultPolarMin}
        maxPolarAngle={variant === 'hero' ? heroPolarMax : defaultPolarMax}
        azimuthAngle={variant === 'hero' ? HERO_VIEW.azimuthAngle : undefined}
        polarAngle={variant === 'hero' ? HERO_VIEW.polarAngle : undefined}
        enableDamping
        dampingFactor={0.06}
        onStart={handleInteractionStart}
        onEnd={handleInteractionEnd}
      />

      <Suspense fallback={null}>
        <Environment preset="city" environmentIntensity={variant === 'hero' ? 0.38 : 0.42} />
      </Suspense>

      <SceneLighting variant={variant} />

      <UnifiedMapGroup mapAssets={mapAssets} isInteracting={isInteracting} variant={variant} />
    </>
  )
}

const handleCanvasCreated =
  (variant: 'default' | 'hero') =>
  ({ gl }: { gl: THREE.WebGLRenderer }) => {
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = EXPOSURE_BY_VARIANT[variant]
  }

export function ElSalvador3DScene({
  geojson,
  showInteractionHint = true,
  variant = 'default',
  onReady,
}: ElSalvador3DSceneProps) {
  const [isInteracting, setIsInteracting] = useState(false)

  return (
    <div className="relative h-full w-full overflow-visible">
      <Canvas
        dpr={[1, 1.75]}
        resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className={cn(
          'h-full w-full touch-none overflow-visible',
          isInteracting ? 'cursor-grabbing' : 'cursor-grab',
        )}
        onCreated={handleCanvasCreated(variant)}
      >
        <SceneContent
          geojson={geojson}
          onInteractingChange={setIsInteracting}
          variant={variant}
          onReady={onReady}
        />
      </Canvas>

      {showInteractionHint ? (
        <p
          className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-primary/25 bg-black/45 px-3 py-1 text-[10px] font-medium tracking-wide text-primary/55 backdrop-blur-sm sm:text-[11px]"
          aria-hidden
        >
          Arrastra para rotar · Scroll para zoom
        </p>
      ) : null}
    </div>
  )
}
