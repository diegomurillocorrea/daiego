'use client'

import { motion } from 'framer-motion'
import {
  Clock,
  Landmark,
  type LucideIcon,
  MonitorPlay,
  ReceiptText,
  Store,
} from 'lucide-react'
import {
  Card3D,
  RevealHeading,
  StaggerContainer,
  StaggerItem,
  useMotionSafe,
} from '@/components/motion'

interface App {
  name: string
  description: string
  icon: LucideIcon
  features: string[]
  comingSoon?: boolean
}

const apps: App[] = [
  {
    name: 'DAIEGO Store',
    description: 'Inventory, POS, sales and branch management for retail businesses.',
    icon: Store,
    features: ['Inventory control', 'Point of sale', 'Sales tracking', 'Branch management'],
  },
  {
    name: 'DAIEGO Clofi',
    description: 'Employee attendance, time tracking and workforce management for store teams.',
    icon: Clock,
    features: ['Clock in / clock out', 'Worked hours', 'Attendance records', 'Team management'],
  },
  {
    name: 'DAIEGO Receipts',
    description: 'Payments, receipts and service management for daily business operations.',
    icon: ReceiptText,
    features: ['Payment processing', 'Receipt management', 'Client services', 'Daily control'],
  },
  {
    name: 'DAIEGO Streaming',
    description: 'Subscription, profile, renewal and customer management for digital services.',
    icon: MonitorPlay,
    features: ['Subscription control', 'Profile management', 'Renewals', 'Customer tracking'],
  },
]

const upcomingApp: App = {
  name: 'DAIEGO Finance',
  description: 'Savings, loans and financial workflows—built on the DAIEGO platform.',
  icon: Landmark,
  features: ['Account control', 'Finance workflows', 'Risk assessment'],
  comingSoon: true,
}

function AppCard({ app, index }: { app: App; index: number }) {
  const Icon = app.icon
  const reduceMotion = useMotionSafe()

  return (
    <Card3D delay={index * 0.08} glowColor={index % 2 === 0 ? 'primary' : 'accent'}>
      <div className="flex h-full flex-col p-7">
        <motion.div
          className="mb-5 inline-flex w-fit rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary/20"
          whileHover={reduceMotion ? undefined : { rotate: [0, -4, 4, 0], scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <Icon size={24} aria-hidden />
        </motion.div>
        <h3 className="text-xl font-bold text-foreground">{app.name}</h3>
        <p className="mt-2 text-sm text-foreground/60">{app.description}</p>
        <div className="mt-6 space-y-2.5">
          {app.features.map((feature, idx) => (
            <div key={feature} className="flex items-center gap-2.5">
              <div
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${idx % 2 === 0 ? 'bg-primary' : 'bg-accent/80'}`}
              />
              <span className="text-sm text-foreground/70">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </Card3D>
  )
}

export function Products() {
  return (
    <section id="apps" className="border-t border-border bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <RevealHeading
            title="The DAIEGO Ecosystem"
            subtitle="Modular apps inside DAIEGO—each one a real software product, connected by the same platform and AI."
          />
        </div>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {apps.map((app, i) => (
            <StaggerItem key={app.name}>
              <AppCard app={app} index={i} />
            </StaggerItem>
          ))}
          <StaggerItem className="col-span-full">
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-border bg-background/40 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="inline-flex rounded-xl bg-secondary p-3 text-foreground/50">
                  <upcomingApp.icon size={22} aria-hidden />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground/80">{upcomingApp.name}</h3>
                    <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent/90">
                      Coming soon
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-foreground/50">{upcomingApp.description}</p>
                </div>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  )
}
