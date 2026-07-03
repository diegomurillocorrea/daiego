'use client'

import {
  BarChart3,
  Boxes,
  CalendarClock,
  CreditCard,
  LineChart,
  type LucideIcon,
  RefreshCw,
  ScanLine,
  Sparkles,
  Users,
  Wallet,
} from 'lucide-react'
import { useMemo } from 'react'
import { useDictionary } from '@/components/i18n/locale-provider'
import {
  AnimatedCard,
  ModularMap,
  RevealHeading,
  StaggerContainer,
  StaggerItem,
} from '@/components/motion'

const MODULE_ICONS: LucideIcon[] = [
  LineChart,
  Boxes,
  ScanLine,
  Users,
  CalendarClock,
  CreditCard,
  RefreshCw,
  Wallet,
  BarChart3,
  Sparkles,
]

export function Platform() {
  const { platform } = useDictionary()

  const modules = useMemo(
    () =>
      platform.modules.map((label, index) => ({
        label,
        icon: MODULE_ICONS[index],
      })),
    [platform.modules],
  )

  return (
    <section id="platform" className="border-t border-border py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <RevealHeading title={platform.title} subtitle={platform.subtitle} />
        </div>

        <div className="mb-16">
          <ModularMap />
        </div>

        <StaggerContainer className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
          {modules.map((module, idx) => {
            const Icon = module.icon
            const isAccent = idx % 2 !== 0
            return (
              <StaggerItem key={module.label}>
                <AnimatedCard
                  className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-secondary p-6 text-center transition-colors duration-300 hover:border-primary/45 hover:shadow-[0_10px_36px_-12px_rgba(0,188,125,0.1),0_6px_28px_-10px_rgba(204,52,49,0.06)]"
                  shine={false}
                >
                  <div
                    className={`inline-flex rounded-xl p-3 transition-colors ${
                      isAccent
                        ? 'bg-linear-to-br from-primary/10 to-accent/10 text-accent/90 group-hover:from-primary/14 group-hover:to-accent/14'
                        : 'bg-primary/10 text-primary group-hover:bg-primary/20'
                    }`}
                  >
                    <Icon size={22} aria-hidden />
                  </div>
                  <span className="text-sm font-medium text-foreground">{module.label}</span>
                </AnimatedCard>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        <p className="mt-10 text-center font-mono text-sm text-foreground/50">
          {platform.footerLine}
        </p>
      </div>
    </section>
  )
}
