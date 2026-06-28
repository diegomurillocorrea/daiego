'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { staggerContainer, staggerItem, viewport } from '@/lib/motion'
import { useMotionSafe } from './use-motion-safe'

export function StaggerContainer({
  children,
  className,
  delayChildren = 0.08,
  ...props
}: HTMLMotionProps<'div'> & { delayChildren?: number }) {
  const reduceMotion = useMotionSafe()

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.085,
            delayChildren,
          },
        },
      }}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={viewport}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className, ...props }: HTMLMotionProps<'div'>) {
  const reduceMotion = useMotionSafe()

  return (
    <motion.div
      className={className}
      variants={staggerItem}
      initial={reduceMotion ? false : undefined}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainerAnimate({
  children,
  className,
  ...props
}: HTMLMotionProps<'div'>) {
  const reduceMotion = useMotionSafe()

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial={reduceMotion ? false : 'hidden'}
      animate="visible"
      {...props}
    >
      {children}
    </motion.div>
  )
}
