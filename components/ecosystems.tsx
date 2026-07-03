'use client'

import { Blocks, Boxes, ClipboardList, ShoppingBag, Store, TrendingUp } from 'lucide-react'
import { useMemo } from 'react'
import { useDictionary } from '@/components/i18n/locale-provider'
import { AnimatedCard, FadeIn, RevealHeading, StaggerContainer, StaggerItem } from '@/components/motion'

const BULLET_ICONS = [Blocks, Boxes, ShoppingBag, Store, ClipboardList, TrendingUp]
const TOOL_ICONS = [Store, ClipboardList, TrendingUp]

export function Ecosystems() {
  const { ecosystems } = useDictionary()

  const toysBullets = useMemo(
    () =>
      ecosystems.bullets.map((label, index) => ({
        label,
        icon: BULLET_ICONS[index],
      })),
    [ecosystems.bullets],
  )

  const tools = useMemo(
    () =>
      ecosystems.tools.map((tool, index) => ({
        ...tool,
        icon: TOOL_ICONS[index],
      })),
    [ecosystems.tools],
  )

  return (
    <section id="ecosystems" className="border-t border-border py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <RevealHeading title={ecosystems.title} subtitle={ecosystems.subtitle} />
        </div>

        <FadeIn>
          <div className="overflow-hidden rounded-3xl border border-border bg-secondary shadow-[inset_0_1px_0_0_rgba(204,52,49,0.1)]">
            <div className="grid gap-0 lg:grid-cols-2">
              <div className="flex flex-col justify-center gap-6 p-8 lg:p-12">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary/90 transition-colors hover:border-primary/40">
                  {ecosystems.badge}
                </span>
                <h3 className="text-3xl font-bold text-foreground">{ecosystems.toysTitle}</h3>
                <p className="leading-relaxed text-foreground/65">{ecosystems.toysDescription}</p>
                <StaggerContainer className="grid gap-3 sm:grid-cols-2">
                  {toysBullets.map((bullet, idx) => {
                    const Icon = bullet.icon
                    return (
                      <StaggerItem key={bullet.label}>
                        <div className="flex items-center gap-3">
                          <div
                            className={`inline-flex shrink-0 rounded-lg p-2 ${
                              idx % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent/90'
                            }`}
                          >
                            <Icon size={16} aria-hidden />
                          </div>
                          <span className="text-sm text-foreground/75">{bullet.label}</span>
                        </div>
                      </StaggerItem>
                    )
                  })}
                </StaggerContainer>
              </div>

              <div className="relative flex items-center justify-center border-t border-border bg-background p-8 lg:border-t-0 lg:border-l lg:p-12">
                <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
                  <div className="absolute right-0 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
                  <div className="absolute bottom-1/4 left-0 h-56 w-56 rounded-full bg-accent/8 blur-3xl" />
                </div>
                <StaggerContainer className="relative z-10 w-full max-w-sm space-y-4">
                  {tools.map((row, i) => {
                    const Icon = row.icon
                    return (
                      <StaggerItem key={row.tool}>
                        <AnimatedCard
                          className="flex items-center gap-4 rounded-2xl border border-border bg-secondary p-4 transition-colors hover:border-primary/40"
                          delay={i * 0.08}
                          shine={false}
                        >
                          <div className="inline-flex rounded-xl bg-primary/10 p-2.5 text-primary">
                            <Icon size={20} aria-hidden />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{row.tool}</p>
                            <p className="text-xs text-foreground/50">{row.detail}</p>
                          </div>
                        </AnimatedCard>
                      </StaggerItem>
                    )
                  })}
                </StaggerContainer>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
