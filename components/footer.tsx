'use client'

import { Linkedin } from 'lucide-react'
import { useMemo } from 'react'
import { useDictionary } from '@/components/i18n/locale-provider'
import { SectionLink } from '@/components/section-link'

export function Footer() {
  const dictionary = useDictionary()
  const { footer, nav } = dictionary

  const platformLinks = useMemo(
    () => [
      { label: nav.platform, sectionId: 'platform' },
      { label: nav.apps, sectionId: 'apps' },
      { label: nav.ecosystems, sectionId: 'ecosystems' },
      { label: nav.studio, sectionId: 'studio' },
    ],
    [nav],
  )

  const appLinks = useMemo(
    () => [
      { label: 'DAIEGO Store', sectionId: 'apps' },
      { label: 'DAIEGO Clofi', sectionId: 'apps' },
      { label: 'DAIEGO Receipts', sectionId: 'apps' },
      { label: 'DAIEGO Streaming', sectionId: 'apps' },
    ],
    [],
  )

  const ecosystemLinks = useMemo(
    () => [
      { label: 'DAIEGO Toys', sectionId: 'ecosystems' },
      { label: 'DAIEGO Studio', sectionId: 'studio' },
      { label: nav.contact, sectionId: 'contact' },
    ],
    [nav.contact],
  )

  return (
    <footer className="border-t border-border bg-secondary/35 shadow-[inset_0_1px_0_0_rgba(204,52,49,0.1)] backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="bg-linear-to-r from-primary to-accent/90 bg-clip-text text-2xl font-bold text-transparent">
              DAIEGO
            </h3>
            <p className="text-sm font-medium text-foreground/70">{footer.tagline}</p>
            <p className="text-foreground/60 text-sm leading-relaxed">{footer.description}</p>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                className="inline-flex rounded-lg border border-border bg-background p-2 text-foreground/60 transition-all duration-200 hover:border-accent/35 hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{footer.platform}</h4>
            <ul className="space-y-2">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <SectionLink
                    sectionId={link.sectionId}
                    className="text-sm text-foreground/60 transition-colors hover:text-accent/90"
                  >
                    {link.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{footer.apps}</h4>
            <ul className="space-y-2">
              {appLinks.map((link) => (
                <li key={link.label}>
                  <SectionLink
                    sectionId={link.sectionId}
                    className="text-sm text-foreground/60 transition-colors hover:text-accent/90"
                  >
                    {link.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{footer.ecosystems}</h4>
            <ul className="space-y-2">
              {ecosystemLinks.map((link) => (
                <li key={link.label}>
                  <SectionLink
                    sectionId={link.sectionId}
                    className="text-sm text-foreground/60 transition-colors hover:text-accent/90"
                  >
                    {link.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mb-8"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-foreground/50 text-sm">{footer.rights}</p>
          <div className="flex gap-6">
            <button
              type="button"
              className="text-sm text-foreground/50 transition-colors hover:text-accent/85"
            >
              {footer.privacy}
            </button>
            <button
              type="button"
              className="text-sm text-foreground/50 transition-colors hover:text-accent/85"
            >
              {footer.terms}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
