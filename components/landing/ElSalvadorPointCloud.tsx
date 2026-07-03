'use client'

import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { MapSceneAssets } from '@/lib/el-salvador-geo'

interface ElSalvadorPointCloudProps {
  mapAssets: MapSceneAssets
  variant?: 'default' | 'hero'
}

const BASE_SPHERE_RADIUS = 0.058
const dummy = new THREE.Object3D()

export function ElSalvadorPointCloud({ mapAssets, variant = 'default' }: ElSalvadorPointCloudProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null)

  const { geometry, material, count } = useMemo(() => {
    const sphereGeometry = new THREE.SphereGeometry(BASE_SPHERE_RADIUS, 10, 10)
    const isHero = variant === 'hero'
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: isHero ? '#f2fff9' : '#22e6a3',
      roughness: isHero ? 0.28 : 0.14,
      metalness: isHero ? 0.18 : 0.26,
      emissive: isHero ? '#22e6a3' : '#00bc7d',
      emissiveIntensity: isHero ? 0.58 : 1.18,
      vertexColors: true,
      toneMapped: true,
    })

    return {
      geometry: sphereGeometry,
      material: sphereMaterial,
      count: mapAssets.points.length,
    }
  }, [mapAssets.points.length, variant])

  useLayoutEffect(() => {
    const mesh = meshRef.current

    if (!mesh) {
      return
    }

    for (let index = 0; index < mapAssets.points.length; index += 1) {
      const { position, scale, color } = mapAssets.points[index]

      dummy.position.copy(position)
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      mesh.setMatrixAt(index, dummy.matrix)
      mesh.setColorAt(index, color)
    }

    mesh.instanceMatrix.needsUpdate = true

    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true
    }
  }, [mapAssets.points])

  useLayoutEffect(
    () => () => {
      geometry.dispose()
      material.dispose()
    },
    [geometry, material],
  )

  return <instancedMesh ref={meshRef} args={[geometry, material, count]} />
}
