'use client'

import { useDictionary } from '@/components/i18n/locale-provider'
import { FadeIn, PremiumButton, RevealHeading } from '@/components/motion'

export function CTA() {
  const { cta } = useDictionary()

  return (
    <section id="contact" className="relative overflow-hidden border-t border-border py-20">
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute inset-0 bg-linear-to-b from-primary/10 via-accent/6 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl space-y-8 px-4 text-center sm:px-6 lg:px-8">
        <RevealHeading title={cta.title} subtitle={cta.subtitle} />

        <FadeIn delay={0.2}>
          <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
            <PremiumButton sectionId="contact">{cta.startProject}</PremiumButton>
            <PremiumButton sectionId="contact" variant="outline" showArrow={false}>
              {cta.contact}
            </PremiumButton>
          </div>
        </FadeIn>

        <FadeIn delay={0.35}>
          <p className="pt-4 text-sm text-foreground/50">{cta.note}</p>
        </FadeIn>
      </div>
    </section>
  )
}
