"use client"

import { ElSalvador3DMap } from "@/components/ElSalvador3DMap"
import { FadeIn } from "@/components/motion"

export function Location() {
  return (
    <section id="location" className="border-t border-border bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-secondary shadow-[0_24px_80px_-32px_rgba(0,188,125,0.18),0_16px_48px_-24px_rgba(0,0,0,0.45)]">
            <div
              className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-background/50 via-transparent to-primary/5"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-10 ring-1 ring-inset ring-white/5"
              aria-hidden
            />
            <ElSalvador3DMap className="relative z-0" />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
