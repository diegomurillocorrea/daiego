'use client'

import { useLocale } from '@/components/i18n/locale-provider'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/i18n/types'

const OPTIONS: Array<{ locale: Locale; label: string }> = [
  { locale: 'en', label: 'EN' },
  { locale: 'es', label: 'ES' },
]

interface LanguageSwitcherProps {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { locale, setLocale, dictionary } = useLocale()

  return (
    <div
      role="group"
      aria-label={dictionary.common.languageSwitcherLabel}
      className={cn(
        'inline-flex items-center rounded-lg border border-border bg-secondary/80 p-0.5',
        className,
      )}
    >
      {OPTIONS.map((option) => {
        const isActive = locale === option.locale

        return (
          <button
            key={option.locale}
            type="button"
            onClick={() => setLocale(option.locale)}
            aria-pressed={isActive}
            aria-label={option.locale === 'en' ? 'English' : 'Español'}
            className={cn(
              'min-h-9 min-w-9 rounded-md px-2.5 font-mono text-xs font-semibold tracking-wide transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
              isActive
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-foreground/60 hover:bg-background/60 hover:text-foreground',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
