import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Platform } from '@/components/platform'
import { Showcase } from '@/components/showcase'
import { Products } from '@/components/products'
import { Ecosystems } from '@/components/ecosystems'
import { WhyChoose } from '@/components/why-choose'
import { Services } from '@/components/services'
import { Process } from '@/components/process'
import { TechStack } from '@/components/tech-stack'
import { CTA } from '@/components/cta'
import { Footer } from '@/components/footer'
import { PremiumBackground } from '@/components/motion'

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      <PremiumBackground />
      <Header />
      <Hero />
      <Platform />
      <Showcase />
      <Products />
      <Ecosystems />
      <WhyChoose />
      <Services />
      <Process />
      <TechStack />
      <CTA />
      <Footer />
    </div>
  )
}
