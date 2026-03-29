import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Products } from '@/components/products';
import { Trust } from '@/components/trust';
import { TechStack } from '@/components/tech-stack';
import { Services } from '@/components/services';
import { WhyChoose } from '@/components/why-choose';
import { Process } from '@/components/process';
import { Showcase } from '@/components/showcase';
import { CTA } from '@/components/cta';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_100%_60%_at_50%_-25%,rgba(204,52,49,0.07),transparent_55%),radial-gradient(ellipse_70%_45%_at_100%_20%,rgba(0,188,125,0.05),transparent_50%),radial-gradient(ellipse_50%_40%_at_0%_80%,rgba(204,52,49,0.04),transparent_45%)]"
        aria-hidden
      />
      <Header />
      <Hero />
      <Products />
      <Trust />
      <TechStack />
      <Services />
      <WhyChoose />
      <Process />
      <Showcase />
      <CTA />
      <Footer />
    </div>
  );
}
