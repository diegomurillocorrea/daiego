'use client'

import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { LanguageSwitcher } from '@/components/i18n/language-switcher'
import { useDictionary, useLocale } from '@/components/i18n/locale-provider'
import { GooeyNav, PremiumButton } from '@/components/motion'
import { SectionLink } from '@/components/section-link'
import { useMotionSafe } from '@/components/motion/use-motion-safe'
import { scrollToTop } from '@/lib/scroll-to-section'
import { cn } from '@/lib/utils'
import { easeOutExpo } from '@/lib/motion'

const NAV_IDS = [
  'platform',
  'apps',
  'ecosystems',
  'studio',
  'technologies',
  'contact',
] as const

export function Header() {
  const { locale } = useLocale()
  const dictionary = useDictionary()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const reduceMotion = useMotionSafe()

  const navLinks = useMemo(
    () => [
      { label: dictionary.nav.platform, id: 'platform' },
      { label: dictionary.nav.apps, id: 'apps' },
      { label: dictionary.nav.ecosystems, id: 'ecosystems' },
      { label: dictionary.nav.studio, id: 'studio' },
      { label: dictionary.nav.technologies, id: 'technologies' },
      { label: dictionary.nav.contact, id: 'contact' },
    ],
    [dictionary],
  )

  const gooeyNavItems = useMemo(
    () =>
      navLinks.map((link) => ({
        label: link.label,
        sectionId: link.id,
      })),
    [navLinks],
  )

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20)

    const scrollPos = window.scrollY + 120

    for (let i = NAV_IDS.length - 1; i >= 0; i--) {
      const el = document.getElementById(NAV_IDS[i])
      if (el && el.offsetTop <= scrollPos) {
        setActiveSection(NAV_IDS[i])
        return
      }
    }
    setActiveSection('')
  }, [])

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full overflow-visible transition-all duration-300',
        isScrolled
          ? 'border-b border-border/80 bg-background/75 shadow-[inset_0_-1px_0_0_rgba(204,52,49,0.12)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <motion.button
            type="button"
            className="block"
            whileHover={reduceMotion ? undefined : { filter: 'drop-shadow(0 0 8px rgba(0,188,125,0.4))' }}
            transition={{ duration: 0.2 }}
            aria-label={dictionary.common.homeAriaLabel}
            onClick={scrollToTop}
          >
            <img src="/logos/daiego-white-black.svg" alt="DAIEGO" className="h-12 w-12" />
          </motion.button>

          <div className="hidden md:block">
            <GooeyNav
              key={locale}
              items={gooeyNavItems}
              activeIndex={navLinks.findIndex((link) => link.id === activeSection)}
              particleCount={15}
              particleDistances={[90, 10]}
              particleR={100}
              animationTime={600}
              timeVariance={300}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <PremiumButton sectionId="platform" variant="outline" showArrow={false}>
            {dictionary.header.explorePlatform}
          </PremiumButton>
          <PremiumButton sectionId="contact">{dictionary.header.buildWithDaiego}</PremiumButton>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="rounded-lg p-2 text-foreground transition-colors hover:bg-secondary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? dictionary.common.closeMenu : dictionary.common.openMenu}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="border-t border-border bg-secondary/95 backdrop-blur-xl md:hidden"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: easeOutExpo }}
          >
            <div className="space-y-3 px-4 py-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <SectionLink
                    sectionId={link.id}
                    onNavigate={() => setIsOpen(false)}
                    className="block w-full rounded-lg px-4 py-2 text-foreground/70 transition-colors hover:bg-accent/7 hover:text-primary"
                  >
                    {link.label}
                  </SectionLink>
                </motion.div>
              ))}
              <div className="space-y-2 pt-3">
                <PremiumButton sectionId="platform" variant="outline" showArrow={false} className="w-full">
                  {dictionary.header.explorePlatform}
                </PremiumButton>
                <PremiumButton sectionId="contact" className="w-full">
                  {dictionary.header.buildWithDaiego}
                </PremiumButton>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
