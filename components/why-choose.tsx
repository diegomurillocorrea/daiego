'use client'

import { type LucideIcon, Settings2, Sparkles, TrendingUp } from 'lucide-react'
import {
  AnimatedCard,
  OperationsFlow,
  RevealHeading,
  StaggerContainer,
  StaggerItem,
} from '@/components/motion'

interface Pillar {
  number: string
  title: string
  description: string
  icon: LucideIcon
}

const pillars: Pillar[] = [
  {
    number: '01',
    title: 'Operate',
    description: 'Run sales, inventory, teams and services from connected modules.',
    icon: Settings2,
  },
  {
    number: '02',
    title: 'Automate',
    description: 'Use AI and workflows to reduce repetitive tasks and improve decisions.',
    icon: Sparkles,
  },
  {
    number: '03',
    title: 'Scale',
    description: 'Grow from one operation to multiple branches, products and digital ecosystems.',
    icon: TrendingUp,
  },
]

export function WhyChoose() {
  return (
    <section id="operations" className="border-t border-border bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <RevealHeading
            title="Built from real operations"
            subtitle="Every DAIEGO product is built from real operational needs: managing sales, tracking stock, controlling employee hours, processing payments, handling subscriptions and understanding business data."
          />
        </div>

        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <StaggerItem key={pillar.title}>
                <AnimatedCard
                  className="group relative flex flex-col rounded-2xl border border-border bg-secondary p-8 transition-all duration-300 hover:border-primary/45 hover:shadow-[0_10px_36px_-12px_rgba(0,188,125,0.08),0_6px_28px_-10px_rgba(204,52,49,0.06)]"
                  delay={idx * 0.08}
                >
                  <p
                    className={`absolute -top-2 right-4 text-7xl font-bold ${idx % 2 === 0 ? 'text-foreground/6' : 'text-accent/10'}`}
                    aria-hidden
                  >
                    {pillar.number}
                  </p>
                  <div className="relative z-10">
                    <div
                      className={`mb-6 inline-flex rounded-xl p-3 transition-colors ${
                        idx % 2 === 0
                          ? 'bg-primary/10 text-primary group-hover:bg-primary/20'
                          : 'bg-linear-to-br from-primary/10 to-accent/10 text-accent/90'
                      }`}
                    >
                      <Icon size={24} aria-hidden />
                    </div>
                    <h3 className="mb-3 text-2xl font-bold text-foreground">{pillar.title}</h3>
                    <p className="text-foreground/60">{pillar.description}</p>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        <OperationsFlow />
      </div>
    </section>
  )
}
