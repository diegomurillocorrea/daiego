import type { Metadata } from 'next'
import { GlassShowcase } from '@/components/glass'

export const metadata: Metadata = {
  title: 'Glass — DAIEGO',
  description:
    'DAIEGO liquid glass lab: translucent controls, specular depth, and tactile toggles in the brand palette.',
}

export default function GlassPage() {
  return <GlassShowcase />
}
