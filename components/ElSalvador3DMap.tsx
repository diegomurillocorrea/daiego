"use client"

import { useEffect, useRef } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { cn } from "@/lib/utils"

const COMPANY_COORDS: [number, number] = [-89.34813865660982, 13.719246633471878]

/** Límites geográficos de El Salvador — solo el territorio nacional */
const EL_SALVADOR_BOUNDS: maplibregl.LngLatBoundsLike = [
  [-90.1, 13.15],
  [-87.69, 14.45],
]

const EL_SALVADOR_MAX_BOUNDS: maplibregl.LngLatBoundsLike = [
  [-90.28, 13.05],
  [-87.52, 14.55],
]

interface ElSalvador3DMapProps {
  className?: string
}

const createLogoMarkerElement = () => {
  const markerEl = document.createElement("div")
  markerEl.className = "flex items-center justify-center"
  markerEl.style.width = "64px"
  markerEl.style.height = "64px"

  const img = document.createElement("img")
  img.src = "/logo.png"
  img.alt = "DAIEGO"
  img.width = 64
  img.height = 64
  img.draggable = false
  img.style.width = "64px"
  img.style.height = "64px"
  img.style.objectFit = "contain"
  img.style.filter = "drop-shadow(0 6px 16px rgba(0, 0, 0, 0.4))"

  markerEl.appendChild(img)
  return markerEl
}

export function ElSalvador3DMap({ className }: ElSalvador3DMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)

  useEffect(() => {
    const container = mapContainerRef.current
    if (!container) return

    const maptilerKey = process.env.NEXT_PUBLIC_MAPTILER_KEY
    if (!maptilerKey) {
      return
    }

    const map = new maplibregl.Map({
      container,
      style: `https://api.maptiler.com/maps/basic-v2/style.json?key=${maptilerKey}`,
      bounds: EL_SALVADOR_BOUNDS,
      fitBoundsOptions: {
        padding: { top: 48, bottom: 48, left: 48, right: 48 },
      },
      maxBounds: EL_SALVADOR_MAX_BOUNDS,
      pitch: 58,
      bearing: -18,
      antialias: true,
      attributionControl: false,
    })

    mapRef.current = map

    const navigationControl = new maplibregl.NavigationControl({
      visualizePitch: true,
      showCompass: true,
    })
    map.addControl(navigationControl, "top-right")
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right")

    let marker: maplibregl.Marker | null = null

    const handleLoad = () => {
      if (!map.getSource("terrain")) {
        map.addSource("terrain", {
          type: "raster-dem",
          url: `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${maptilerKey}`,
          tileSize: 256,
        })
      }

      map.setTerrain({
        source: "terrain",
        exaggeration: 1.5,
      })

      map.fitBounds(EL_SALVADOR_BOUNDS, {
        padding: { top: 48, bottom: 48, left: 48, right: 48 },
        duration: 0,
      })

      map.setMinZoom(map.getZoom() - 0.15)

      map.easeTo({
        pitch: 58,
        bearing: -18,
        duration: 0,
      })

      marker = new maplibregl.Marker({
        element: createLogoMarkerElement(),
        anchor: "bottom",
      })
        .setLngLat(COMPANY_COORDS)
        .addTo(map)
    }

    map.on("load", handleLoad)

    const resizeObserver = new ResizeObserver(() => {
      map.resize()
    })
    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
      map.off("load", handleLoad)
      marker?.remove()
      map.remove()
      mapRef.current = null
    }
  }, [])

  const hasMaptilerKey = Boolean(process.env.NEXT_PUBLIC_MAPTILER_KEY)

  if (!hasMaptilerKey) {
    return (
      <div
        className={cn(
          "flex h-[420px] w-full items-center justify-center rounded-2xl border border-dashed border-border bg-secondary/40 px-6 text-center sm:h-[500px] lg:h-[600px]",
          className,
        )}
        role="status"
      >
        <p className="max-w-md text-sm text-foreground/60">
          Configura <code className="text-primary">NEXT_PUBLIC_MAPTILER_KEY</code> en tu archivo{" "}
          <code className="text-primary">.env.local</code> para mostrar el mapa 3D.
        </p>
      </div>
    )
  }

  return (
    <div
      ref={mapContainerRef}
      className={cn("h-[420px] w-full sm:h-[500px] lg:h-[600px]", className)}
      role="img"
      aria-label="Mapa 3D de El Salvador con la ubicación de DAIEGO"
    />
  )
}
