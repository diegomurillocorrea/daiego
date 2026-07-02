'use client'

import { ArrowUpRight, MessageCircle, Megaphone, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import {
  AnimatedCard,
  PremiumBackground,
  StaggerContainerAnimate,
  StaggerItem,
  useMotionSafe,
} from '@/components/motion'
import { easeOutExpo } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface SocialLink {
  id: string
  name: string
  description: string
  href: string
  icon: IconType
  accent: string
  iconBg: string
  glow: string
}

const socialLinks: SocialLink[] = [
  {
    id: 'tiktok',
    name: 'TikTok',
    description: 'Videos, novedades y contenido detrás de escena de DAIEGO.',
    href: 'https://www.tiktok.com/@daiego.sv',
    icon: FaTiktok,
    accent: 'group-hover:text-white',
    iconBg: 'bg-zinc-800 text-white group-hover:bg-zinc-700',
    glow: 'group-hover:shadow-[0_12px_40px_-12px_rgba(255,255,255,0.25)]',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    description: 'Comunidad, anuncios y actualizaciones oficiales.',
    href: 'https://www.facebook.com/daiego.sv',
    icon: FaFacebook,
    accent: 'group-hover:text-[#1877F2]',
    iconBg: 'bg-[#1877F2]/15 text-[#1877F2] group-hover:bg-[#1877F2]/25',
    glow: 'group-hover:shadow-[0_12px_40px_-12px_rgba(24,119,242,0.45)]',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Fotos, historias y el día a día del ecosistema DAIEGO.',
    href: 'https://www.instagram.com/daiego.sv',
    icon: FaInstagram,
    accent: 'group-hover:text-[#E4405F]',
    iconBg: 'bg-linear-to-br from-[#F58529]/20 via-[#DD2A7B]/20 to-[#8134AF]/20 text-[#E4405F] group-hover:from-[#F58529]/30 group-hover:via-[#DD2A7B]/30 group-hover:to-[#8134AF]/30',
    glow: 'group-hover:shadow-[0_12px_40px_-12px_rgba(228,64,95,0.4)]',
  },
  {
    id: 'whatsapp-channel',
    name: 'Canal de WhatsApp',
    description: 'Sigue el canal oficial: Toys, Receipts, Streaming y más.',
    href: 'https://whatsapp.com/channel/0029Vb6pbgsDJ6H4WXkz7Z3o',
    icon: Megaphone,
    accent: 'group-hover:text-[#25D366]',
    iconBg: 'bg-[#25D366]/15 text-[#25D366] group-hover:bg-[#25D366]/25',
    glow: 'group-hover:shadow-[0_12px_40px_-12px_rgba(37,211,102,0.45)]',
  },
  {
    id: 'whatsapp-catalog',
    name: 'Catálogo de WhatsApp',
    description: 'Explora productos y servicios disponibles en el catálogo.',
    href: 'https://wa.me/c/50375287675',
    icon: ShoppingBag,
    accent: 'group-hover:text-[#25D366]',
    iconBg: 'bg-[#25D366]/15 text-[#25D366] group-hover:bg-[#25D366]/25',
    glow: 'group-hover:shadow-[0_12px_40px_-12px_rgba(37,211,102,0.45)]',
  },
  {
    id: 'whatsapp-direct',
    name: 'Mensaje directo',
    description: 'Escríbenos por WhatsApp y te atendemos directamente.',
    href: 'https://wa.me/50375287675',
    icon: MessageCircle,
    accent: 'group-hover:text-[#25D366]',
    iconBg: 'bg-[#25D366]/15 text-[#25D366] group-hover:bg-[#25D366]/25',
    glow: 'group-hover:shadow-[0_12px_40px_-12px_rgba(37,211,102,0.45)]',
  },
]

function SocialIcon({ link }: { link: SocialLink }) {
  const Icon = link.icon
  const isLucide = link.id.startsWith('whatsapp-')

  return (
    <div
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-xl p-3 transition-all duration-300',
        link.iconBg,
      )}
    >
      {isLucide ? (
        <Icon size={22} aria-hidden />
      ) : (
        <Icon className="h-[22px] w-[22px]" aria-hidden />
      )}
    </div>
  )
}

function SocialCard({ link, index }: { link: SocialLink; index: number }) {
  const reduceMotion = useMotionSafe()

  return (
    <AnimatedCard delay={index * 0.08} className="h-full">
      <motion.a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'group flex h-full flex-col gap-4 rounded-2xl border border-border bg-background/80 p-6 backdrop-blur-sm transition-all duration-300',
          'hover:border-primary/40 hover:bg-background',
          link.glow,
        )}
        whileHover={reduceMotion ? undefined : { scale: 1.02 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        aria-label={`Abrir ${link.name} en una nueva pestaña`}
      >
        <div className="flex items-start justify-between gap-3">
          <SocialIcon link={link} />
          <motion.span
            className="text-foreground/40 transition-colors group-hover:text-primary"
            whileHover={reduceMotion ? undefined : { x: 2, y: -2 }}
          >
            <ArrowUpRight size={20} aria-hidden />
          </motion.span>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <h3
            className={cn(
              'text-lg font-semibold text-foreground transition-colors duration-300',
              link.accent,
            )}
          >
            {link.name}
          </h3>
          <p className="text-sm leading-relaxed text-foreground/60">{link.description}</p>
        </div>

        <span className="text-xs font-medium uppercase tracking-wider text-primary/80">
          Visitar →
        </span>
      </motion.a>
    </AnimatedCard>
  )
}

export function SocialMedia() {
  const reduceMotion = useMotionSafe()

  return (
    <div className="relative min-h-screen bg-background">
      <PremiumBackground />

      <motion.div
        className="pointer-events-none absolute left-1/2 top-32 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.65, 0.4],
              }
        }
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <StaggerContainerAnimate className="mx-auto mb-16 max-w-3xl text-center">
          <StaggerItem>
            <a href="/" aria-label="DAIEGO home" className="mb-8 inline-block">
              <img
                src="/logos/daiego-white-black.svg"
                alt="DAIEGO"
                className="h-20 w-20 sm:h-24 sm:w-24"
              />
            </a>
          </StaggerItem>

          <StaggerItem>
            <h1 className="section-heading-ruby-line text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
              Nuestras redes sociales
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-foreground/60">
              Síguenos, descubre novedades y contáctanos directamente. Todo el ecosistema DAIEGO en un
              solo lugar.
            </p>
          </StaggerItem>
        </StaggerContainerAnimate>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {socialLinks.map((link, index) => (
            <SocialCard key={link.id} link={link} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: easeOutExpo }}
        >
          <p className="text-sm text-foreground/50">
            ¿Prefieres volver al sitio principal?{' '}
            <a
              href="/"
              className="font-medium text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
            >
              Ir al inicio
            </a>
          </p>
        </motion.div>
      </main>
    </div>
  )
}
