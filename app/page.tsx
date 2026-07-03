import { Hero } from '@/components/hero'
import { LanguageSwitcher } from '@/components/i18n/language-switcher'
import { PixelBlastBackground } from '@/components/landing/pixel-blast-background'

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <PixelBlastBackground />
      <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
        <LanguageSwitcher />
      </div>
      <div className="relative z-10">
        <Hero />
      </div>
    </div>
  )
}
