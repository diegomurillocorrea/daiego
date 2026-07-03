'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { easeOutExpo, staggerItem } from '@/lib/motion'
import { useDictionary } from '@/components/i18n/locale-provider'
import {
  PremiumButton,
  StaggerContainerAnimate,
  StaggerItem,
  TextType,
  useMotionSafe,
} from '@/components/motion'
import { useIsClient } from '@/hooks/use-is-client'

const ElSalvadorDotMap = dynamic(
  () =>
    import('@/components/ElSalvadorDotMap').then((module) => module.ElSalvadorDotMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-full w-full items-center justify-center"
        role="status"
      >
        <div className="h-10 w-10 animate-pulse rounded-full bg-primary/30" />
      </div>
    ),
  },
)

const blobTransition = {
  duration: 18,
  repeat: Infinity,
  repeatType: 'mirror' as const,
  ease: 'easeInOut' as const,
}

export function Hero() {
  const dictionary = useDictionary()
  const isClient = useIsClient()
  const reduceMotion = useMotionSafe()
  const { hero } = dictionary

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-x-clip px-4 pt-24 pb-12 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40" aria-hidden>
        <motion.div
          className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : { scale: [1, 1.12, 1], x: [0, 16, 0], y: [0, -12, 0] }
          }
          transition={blobTransition}
        />
        <motion.div
          className="absolute top-[58%] left-1/3 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/7 blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : { scale: [1, 1.08, 1], x: [0, -16, 0], y: [0, 16, 0] }
          }
          transition={{ ...blobTransition, duration: 22 }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-[0.32] saturate-[0.45] blur-[1px]"
        aria-hidden
      >
        <div className="relative h-[min(78vh,640px)] w-full max-w-6xl scale-110">
          <ElSalvadorDotMap
            className="h-full w-full"
            dotRadius={1.8}
            dotSpacing={11}
            cursorRadius={0}
            bulgeStrength={0}
            glowRadius={0}
            sparkle={false}
            waveAmplitude={0.25}
            featuredNodeCount={0}
            gradientFrom="rgba(0, 188, 125, 0.55)"
            gradientTo="rgba(174, 44, 42, 0.38)"
            glowColor="rgba(0, 188, 125, 0)"
          />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-1 bg-linear-to-b from-background/40 via-background/15 to-background/45"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-7 text-center sm:gap-8 lg:gap-9">
        <StaggerContainerAnimate className="flex w-full flex-col items-center gap-7 sm:gap-8">
          <StaggerItem className="w-full">
            <motion.p
              className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-primary/90 sm:text-sm"
              variants={staggerItem}
            >
              <motion.span
                className="block h-px w-8 origin-right bg-linear-to-l from-accent/70 to-primary/70 sm:w-10"
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.2 }}
                aria-hidden
              />
              {hero.eyebrow}
              <motion.span
                className="block h-px w-8 origin-left bg-linear-to-r from-accent/70 to-primary/70 sm:w-10"
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.2 }}
                aria-hidden
              />
            </motion.p>
          </StaggerItem>

          <StaggerItem className="w-full">
            <motion.h1
              className="mx-auto max-w-3xl text-center text-4xl font-bold leading-[1.06] text-balance text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.05]"
              variants={staggerItem}
            >
              <span>
                <span className="text-primary">{hero.titlePrefix}</span> {hero.titleHighlight}
              </span>
              <br />
              {!isClient || reduceMotion ? (
                <span className="text-accent/85">{hero.typedPhrases[0]}</span>
              ) : (
                <TextType
                  key={hero.typedPhrases.join('|')}
                  as="span"
                  text={[...hero.typedPhrases]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor
                  cursorCharacter="|"
                  cursorClassName="text-accent/85"
                  className="text-accent/85"
                  startOnVisible
                />
              )}
            </motion.h1>
          </StaggerItem>

          <StaggerItem className="w-full">
            <p className="text-center font-mono text-sm leading-relaxed text-foreground/55">
              {hero.tagline}{' '}
              <span className="text-primary/90">{hero.taglineAccent}</span>
            </p>
          </StaggerItem>

          <StaggerItem className="w-full">
            <p className="mx-auto max-w-2xl text-center text-lg leading-[1.65] text-balance text-foreground/70">
              {hero.description}
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:gap-4">
              <PremiumButton sectionId="platform">{hero.explorePlatform}</PremiumButton>
              <PremiumButton sectionId="contact" variant="outline" showArrow={false}>
                {hero.buildWithDaiego}
              </PremiumButton>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {hero.badges.map((badge, i) => (
                <motion.div
                  key={badge}
                  className="rounded-md border border-border bg-secondary px-3 py-1.5 font-mono text-xs text-foreground/80"
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 + i * 0.07, duration: 0.4, ease: easeOutExpo }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -2,
                          borderColor:
                            i % 2 === 0 ? 'rgba(0, 188, 125, 0.42)' : 'rgba(204, 52, 49, 0.38)',
                        }
                  }
                >
                  {badge}
                </motion.div>
              ))}
            </div>
          </StaggerItem>
        </StaggerContainerAnimate>
      </div>
    </section>
  )
}
