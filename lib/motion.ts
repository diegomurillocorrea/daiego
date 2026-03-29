import type { Transition, Variants } from 'framer-motion'

export const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const viewport = {
  once: true,
  margin: '-70px 0px',
  amount: 0.15,
} as const

export const transitionFast: Transition = {
  duration: 0.45,
  ease: easeOutExpo,
}

export const transitionSpring: Transition = {
  type: 'spring',
  stiffness: 380,
  damping: 28,
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.085,
      delayChildren: 0.08,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionFast,
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitionSpring,
  },
}
