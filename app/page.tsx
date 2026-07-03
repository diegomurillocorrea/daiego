import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { PixelBlastBackground } from '@/components/landing/pixel-blast-background'

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <PixelBlastBackground />
      <div className="relative z-10">
        <Header />
        <Hero />
      </div>
    </div>
  )
}
