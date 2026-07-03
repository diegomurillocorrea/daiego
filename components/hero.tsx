'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { staggerItem } from '@/lib/motion'
import { useDictionary } from '@/components/i18n/locale-provider'
import { ProfileCard } from '@/components/profile-card'
import {
  StaggerContainerAnimate,
  StaggerItem,
  TextType,
  useMotionSafe,
} from '@/components/motion'
import { useIsClient } from '@/hooks/use-is-client'

const DAIEGO_LOGO_URL = '/logos/daiego-white-black.svg?v=2'
const DAIEGO_INNER_GRADIENT =
  'linear-gradient(145deg, rgba(0, 188, 125, 0.45) 0%, rgba(204, 52, 49, 0.28) 100%)'
const DAIEGO_BEHIND_GLOW = 'rgba(0, 188, 125, 0.67)'

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
    <section className="relative flex min-h-screen items-center justify-center overflow-x-clip px-4 py-12 sm:px-6 lg:px-8">
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

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center text-center">
        <StaggerContainerAnimate className="flex w-full flex-col items-center gap-8 sm:gap-10">
          <StaggerItem className="flex w-full justify-center">
            <motion.div className="flex justify-center" variants={staggerItem}>
              <ProfileCard
                avatarUrl={DAIEGO_LOGO_URL}
                name="DAIEGO"
                logoMode
                showUserInfo={false}
                showDetails={false}
                enableTilt={!reduceMotion}
                enableMobileTilt={false}
                behindGlowEnabled
                behindGlowColor={DAIEGO_BEHIND_GLOW}
                behindGlowSize="55%"
                innerGradient={DAIEGO_INNER_GRADIENT}
              />
            </motion.div>
          </StaggerItem>

          <StaggerItem className="w-full">
            <motion.h1
              className="mx-auto max-w-5xl text-center text-5xl font-bold leading-[1.06] text-balance text-white sm:text-6xl lg:text-7xl lg:leading-[1.05]"
              variants={staggerItem}
            >
              <span>
                {hero.titlePrefix} {hero.titleHighlight}
              </span>
              <br />
              {!isClient || reduceMotion ? (
                <span>{hero.typedPhrases[0]}</span>
              ) : (
                <TextType
                  key={hero.typedPhrases.join('|')}
                  as="span"
                  text={[...hero.typedPhrases]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor
                  cursorCharacter="|"
                  cursorClassName="text-white"
                  className="text-white"
                  startOnVisible
                />
              )}
            </motion.h1>
          </StaggerItem>
        </StaggerContainerAnimate>
      </div>
    </section>
  )
}
