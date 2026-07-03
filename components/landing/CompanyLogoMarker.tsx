'use client'

import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import {
  COMPANY_COORDINATES,
  getMarkerWorldPosition,
  type MapSceneAssets,
} from '@/lib/el-salvador-geo'

interface CompanyLogoMarkerProps {
  mapAssets: MapSceneAssets
}

const PLATFORM_DOT_COUNT = 24
const PLATFORM_RADIUS = 0.28
const DOT_RADIUS = 0.022
const dummy = new THREE.Object3D()

export function CompanyLogoMarker({ mapAssets }: CompanyLogoMarkerProps) {
  const markerRef = useRef<THREE.Group>(null)
  const logoRef = useRef<THREE.Group>(null)
  const platformRef = useRef<THREE.InstancedMesh>(null)
  const pulseRingRef = useRef<THREE.Mesh>(null)

  const basePosition = useMemo(
    () => getMarkerWorldPosition(COMPANY_COORDINATES, mapAssets),
    [mapAssets],
  )

  const platformGeometry = useMemo(() => new THREE.SphereGeometry(DOT_RADIUS, 8, 8), [])
  const platformMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#22e6a3',
        emissive: '#00bc7d',
        emissiveIntensity: 1.05,
        roughness: 0.18,
        metalness: 0.45,
      }),
    [],
  )

  useLayoutEffect(() => {
    const platform = platformRef.current

    if (!platform) {
      return
    }

    for (let index = 0; index < PLATFORM_DOT_COUNT; index += 1) {
      const angle = (index / PLATFORM_DOT_COUNT) * Math.PI * 2
      const radius = PLATFORM_RADIUS * (0.9 + (index % 3) * 0.05)

      dummy.position.set(Math.cos(angle) * radius, 0.022, Math.sin(angle) * radius)
      dummy.scale.setScalar(index % 2 === 0 ? 1.1 : 0.9)
      dummy.updateMatrix()
      platform.setMatrixAt(index, dummy.matrix)
    }

    platform.instanceMatrix.needsUpdate = true
  }, [])

  useFrame(({ clock }) => {
    if (!logoRef.current) {
      return
    }

    const elapsed = clock.elapsedTime
    const floatOffset = Math.sin(elapsed * 1.1) * 0.022
    const pulseScale = 1 + Math.sin(elapsed * 1.5) * 0.018

    if (markerRef.current) {
      markerRef.current.position.y = floatOffset
      markerRef.current.scale.setScalar(pulseScale)
    }

    logoRef.current.position.y = 0.18 + Math.sin(elapsed * 1.35) * 0.012

    if (pulseRingRef.current) {
      const pulseMaterial = pulseRingRef.current.material as THREE.MeshBasicMaterial
      const ringPulse = 0.12 + Math.sin(elapsed * 1.2) * 0.04
      pulseRingRef.current.scale.setScalar(1 + Math.sin(elapsed * 1.2) * 0.06)
      pulseMaterial.opacity = ringPulse
    }
  })

  useLayoutEffect(
    () => () => {
      platformGeometry.dispose()
      platformMaterial.dispose()
    },
    [platformGeometry, platformMaterial],
  )

  return (
    <group ref={markerRef} position={basePosition}>
      <instancedMesh
        ref={platformRef}
        args={[platformGeometry, platformMaterial, PLATFORM_DOT_COUNT]}
      />

      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.12, 32]} />
        <meshBasicMaterial color="#22e6a3" transparent opacity={0.16} depthWrite={false} />
      </mesh>

      <mesh ref={pulseRingRef} position={[0, 0.014, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.14, 0.18, 40]} />
        <meshBasicMaterial color="#00bc7d" transparent opacity={0.18} depthWrite={false} />
      </mesh>

      <group ref={logoRef}>
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.014, 0.02, 0.07, 14]} />
          <meshStandardMaterial
            color="#00bc7d"
            roughness={0.2}
            metalness={0.35}
            emissive="#00bc7d"
            emissiveIntensity={0.35}
          />
        </mesh>

        <pointLight color="#22e6a3" intensity={0.48} position={[0, 0.12, 0]} distance={1.1} />

        <Html
          transform
          center
          distanceFactor={3.8}
          position={[0, 0.16, 0]}
          style={{ pointerEvents: 'none' }}
          zIndexRange={[100, 0]}
        >
          <div className="flex flex-col items-center">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-primary/45 bg-black/80 shadow-[0_0_12px_rgba(0,188,125,0.42),0_8px_20px_rgba(0,0,0,0.4)] backdrop-blur-md sm:h-16 sm:w-16">
              <img
                src="/logo.png"
                alt="DAIEGO"
                width={64}
                height={64}
                className="h-7 w-7 object-contain sm:h-11 sm:w-11"
                draggable={false}
              />
              <span
                className="pointer-events-none absolute -bottom-2 left-1/2 h-2 w-6 -translate-x-1/2 rounded-full bg-primary/30 blur-sm"
                aria-hidden
              />
            </div>
          </div>
        </Html>
      </group>
    </group>
  )
}
