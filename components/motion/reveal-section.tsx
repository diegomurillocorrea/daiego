'use client'

import { cn } from '@/lib/utils'
import { FadeIn } from './fade-in'
import { StaggerContainer, StaggerItem } from './stagger'

interface RevealSectionProps {
  children: React.ReactNode
  className?: string
  stagger?: boolean
}

export function RevealSection({ children, className, stagger = false }: RevealSectionProps) {
  if (stagger) {
    return <StaggerContainer className={className}>{children}</StaggerContainer>
  }

  return <FadeIn className={className}>{children}</FadeIn>
}

export function RevealHeading({
  title,
  subtitle,
  className,
}: {
  title: React.ReactNode
  subtitle?: React.ReactNode
  className?: string
}) {
  return (
    <StaggerContainer className={cn('text-center', className)}>
      <StaggerItem>
        <h2 className="section-heading-ruby-line text-4xl font-bold text-foreground lg:text-5xl">
          {title}
        </h2>
      </StaggerItem>
      {subtitle ? (
        <StaggerItem>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto mt-4">{subtitle}</p>
        </StaggerItem>
      ) : null}
    </StaggerContainer>
  )
}
