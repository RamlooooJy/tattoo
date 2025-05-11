'use client'

import type { FC, PropsWithChildren } from 'react'
import { motion, type MotionProps } from 'framer-motion'
import {
  getSettingsWithDelay,
  settingsSpring,
} from 'components/Animations/settings'
import type { ClassicComponent } from 'types/types'
import type { AnimationProps } from 'components/Animations/types'

export const styleProps: MotionProps = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  ...settingsSpring,
}

export const AnimationSlideY: FC<
  PropsWithChildren<ClassicComponent & AnimationProps>
> = ({ children, className, delay = 0 }) => {
  return (
    <motion.div
      {...getSettingsWithDelay(delay, styleProps)}
      className={className}
    >
      {children}
    </motion.div>
  )
}
