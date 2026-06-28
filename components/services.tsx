'use client'

import {
  Bot,
  Boxes,
  LayoutDashboard,
  type LucideIcon,
  Plug,
  Sparkles,
  Users,
  Workflow,
  Wrench,
} from 'lucide-react'
import {
  AnimatedCard,
  PremiumButton,
  RevealHeading,
  StaggerContainer,
  StaggerItem,
  useMotionSafe,
} from '@/components/motion'
import { motion } from 'framer-motion'

interface StudioService {
  title: string
  icon: LucideIcon
}

const studioServices: StudioService[] = [
  { title: 'Custom web platforms', icon: Wrench },
  { title: 'AI-powered tools', icon: Sparkles },
  { title: 'Admin dashboards', icon: LayoutDashboard },
  { title: 'Internal business systems', icon: Boxes },
  { title: 'Inventory and POS systems', icon: Bot },
  { title: 'CRM and customer management', icon: Users },
  { title: 'Workflow automation', icon: Workflow },
  { title: 'API integrations', icon: Plug },
]

export function Services() {
  const reduceMotion = useMotionSafe()

  return (
    <section id="studio" className="border-t border-border bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <RevealHeading
            title="Build custom software with DAIEGO Studio"
            subtitle="We design and develop intelligent platforms, internal systems, dashboards and automations for companies that want to operate smarter."
          />
        </div>

        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {studioServices.map((service, idx) => {
            const Icon = service.icon
            return (
              <StaggerItem key={service.title}>
                <AnimatedCard
                  className="group flex items-center gap-4 rounded-xl border border-border bg-background p-5 transition-all duration-300 hover:border-primary/45 hover:shadow-[0_10px_36px_-12px_rgba(0,188,125,0.08),0_6px_28px_-10px_rgba(204,52,49,0.06)]"
                  shine={false}
                  delay={idx * 0.05}
                >
                  <motion.div
                    className={`inline-flex shrink-0 rounded-lg p-2.5 transition-colors ${
                      idx % 2 === 0
                        ? 'bg-primary/10 text-primary group-hover:bg-primary/20'
                        : 'bg-linear-to-br from-primary/10 to-accent/10 text-accent/90'
                    }`}
                    whileHover={reduceMotion ? undefined : { scale: 1.08 }}
                  >
                    <Icon size={20} aria-hidden />
                  </motion.div>
                  <span className="text-sm font-medium text-foreground">{service.title}</span>
                </AnimatedCard>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        <div className="mt-12 flex justify-center">
          <PremiumButton href="#contact">Start a project</PremiumButton>
        </div>
      </div>
    </section>
  )
}
