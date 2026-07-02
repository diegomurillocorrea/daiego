import type { Metadata } from 'next'
import { SocialMedia } from '@/components/social-media'

export const metadata: Metadata = {
  title: 'Redes sociales — DAIEGO',
  description:
    'Sigue a DAIEGO en TikTok, Facebook, Instagram y WhatsApp. Canal oficial, catálogo y mensaje directo.',
}

export default function RedesSocialesPage() {
  return <SocialMedia />
}
