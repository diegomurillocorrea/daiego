'use client'

import { Compass, Palette, Code2, Rocket } from 'lucide-react'
import { AnimatedCard, RevealHeading, StaggerContainer, StaggerItem } from '@/components/motion'

const steps = [
  {
    number: '01',
    icon: Compass,
    title: 'Discover',
    description: 'We deeply understand your business, challenges, and goals through collaborative consultation',
  },
  {
    number: '02',
    icon: Palette,
    title: 'Design',
    description: 'Beautiful, functional interfaces that solve real problems and delight your team',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Build',
    description: 'Clean, scalable code using modern technologies and best practices',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch',
    description: 'Seamless deployment and ongoing support to keep your systems running smoothly',
  },
]

export function Process() {
  return (
    <section id="process" className="border-t border-border bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <RevealHeading
            title="Our Process"
            subtitle="A proven approach to delivering exceptional software solutions"
          />
        </div>

        <StaggerContainer className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute top-24 right-[12.5%] left-[12.5%] hidden h-0.5 bg-linear-to-r from-primary/0 via-accent/35 to-primary/0 lg:block" aria-hidden />

          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <StaggerItem key={step.number}>
                <AnimatedCard
                  className="relative flex h-full flex-col rounded-2xl border border-border bg-secondary p-8 transition-all duration-300 hover:border-primary/45 hover:shadow-[0_10px_36px_-12px_rgba(0,188,125,0.08),0_6px_28px_-10px_rgba(204,52,49,0.06)]"
                  delay={idx * 0.08}
                >
                  <div className="relative mb-6 space-y-4">
                    <div className="relative">
                      <div className="relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-primary/10">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <p
                        className={`absolute -top-6 -right-4 text-6xl font-bold ${idx % 2 === 0 ? 'text-foreground/10' : 'text-accent/12'}`}
                        aria-hidden
                      >
                        {step.number}
                      </p>
                    </div>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-foreground">{step.title}</h3>
                  <p className="flex-grow text-foreground/60">{step.description}</p>
                </AnimatedCard>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
