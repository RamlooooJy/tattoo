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

const animate: MotionProps['animate'] = {
  opacity: 1,
  y: 0,
}

export const AnimationSlideY: FC<
  PropsWithChildren<ClassicComponent & AnimationProps>
> = ({ children, className, delay = 0, whileInViewEnabled = true }) => {
  const { whileInView, ...settings } = styleProps
  return (
    <motion.div
      {...getSettingsWithDelay(delay, settings)}
      {...(whileInViewEnabled ? { whileInView } : { animate })}
      className={className}
    >
      {children}
    </motion.div>
  )
}
