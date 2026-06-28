'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { fadeIn, viewport } from '@/lib/motion'
import { useMotionSafe } from './use-motion-safe'

interface FadeInProps extends HTMLMotionProps<'div'> {
  delay?: number
  direction?: 'up' | 'down' | 'none'
  amount?: number
}

export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  amount = 22,
  className,
  ...props
}: FadeInProps) {
  const reduceMotion = useMotionSafe()

  const y = direction === 'up' ? amount : direction === 'down' ? -amount : 0

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function FadeInInstant({
  children,
  className,
  ...props
}: HTMLMotionProps<'div'>) {
  const reduceMotion = useMotionSafe()

  return (
    <motion.div
      className={className}
      variants={fadeIn}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={viewport}
      {...props}
    >
      {children}
    </motion.div>
  )
}
