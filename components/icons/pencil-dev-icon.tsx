'use client'

import { useId } from 'react'

interface PencilDevIconProps {
  className?: string
}

/**
 * Pencil.dev logomark (icon slice from official light SVG).
 * Source: https://docs.pencil.dev/pencil-logo-new-light.svg
 */
export function PencilDevIcon({ className }: PencilDevIconProps) {
  const rawId = useId()
  const id = rawId.replace(/:/g, '')

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="308.891 -0.506927 57.6 72"
      className={className}
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient
          id={`${id}-p0`}
          x1="308.891"
          y1="71.4931"
          x2="366.491"
          y2="42.6931"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CCCCCC" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id={`${id}-p1`}
          x1="352.091"
          y1="57.0927"
          x2="323.291"
          y2="71.4927"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#141414" />
          <stop offset="1" stopColor="#3D3D3D" />
        </linearGradient>
        <linearGradient
          id={`${id}-p2`}
          x1="308.891"
          y1="42.6931"
          x2="366.491"
          y2="-0.506932"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFA600" />
          <stop offset="1" stopColor="#FFD900" />
        </linearGradient>
      </defs>
      <path
        d="M308.891 42.6931H366.491L337.691 71.4931L308.891 42.6931Z"
        fill={`url(#${id}-p0)`}
      />
      <path
        d="M323.291 57.0927H352.091L337.691 71.4927L323.291 57.0927Z"
        fill={`url(#${id}-p1)`}
      />
      <rect
        x="308.891"
        y="-0.506927"
        width="57.6"
        height="43.2"
        fill={`url(#${id}-p2)`}
      />
    </svg>
  )
}
