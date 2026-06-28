'use client'

import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { PremiumButton } from '@/components/motion'
import { useMotionSafe } from '@/components/motion/use-motion-safe'
import { cn } from '@/lib/utils'
import { easeOutExpo } from '@/lib/motion'

const navLinks = [
  { label: 'Platform', href: '#platform', id: 'platform' },
  { label: 'Apps', href: '#apps', id: 'apps' },
  { label: 'Ecosystems', href: '#ecosystems', id: 'ecosystems' },
  { label: 'Studio', href: '#studio', id: 'studio' },
  { label: 'Technologies', href: '#technologies', id: 'technologies' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const reduceMotion = useMotionSafe()

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20)

    const sections = navLinks.map((l) => l.id)
    const scrollPos = window.scrollY + 120

    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i])
      if (el && el.offsetTop <= scrollPos) {
        setActiveSection(sections[i])
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
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'border-b border-border/80 bg-background/75 shadow-[inset_0_-1px_0_0_rgba(204,52,49,0.12)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <motion.a
            href="#"
            className="block"
            whileHover={reduceMotion ? undefined : { filter: 'drop-shadow(0 0 8px rgba(0,188,125,0.4))' }}
            transition={{ duration: 0.2 }}
            aria-label="DAIEGO home"
          >
            <img src="/logos/daiego-white-black.svg" alt="DAIEGO" className="h-12 w-12" />
          </motion.a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  'relative inline-block px-4 py-2 text-sm transition-colors duration-200',
                  activeSection === link.id
                    ? 'text-primary'
                    : 'text-foreground/70 hover:text-primary',
                  'after:absolute after:inset-x-4 after:bottom-1.5 after:h-px after:origin-center after:rounded-full after:bg-accent/45 after:transition-transform',
                  activeSection === link.id ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100',
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden gap-3 md:flex">
          <PremiumButton href="#platform" variant="outline" showArrow={false}>
            Explore platform
          </PremiumButton>
          <PremiumButton href="#contact">Build with DAIEGO</PremiumButton>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-foreground transition-colors hover:bg-secondary md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="block rounded-lg px-4 py-2 text-foreground/70 transition-colors hover:bg-accent/7 hover:text-primary"
                  onClick={() => setIsOpen(false)}
                  initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="space-y-2 pt-3">
                <PremiumButton href="#platform" variant="outline" showArrow={false} className="w-full">
                  Explore platform
                </PremiumButton>
                <PremiumButton href="#contact" className="w-full">
                  Build with DAIEGO
                </PremiumButton>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
