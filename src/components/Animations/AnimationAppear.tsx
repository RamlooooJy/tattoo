'use client'

import type { FC, PropsWithChildren } from 'react'
import { motion } from 'framer-motion'
import {
  getSettingsWithDelay,
  settingStraight,
} from 'components/Animations/settings'
import type { ClassicComponent } from 'types/types'
import type { AnimationProps } from 'components/Animations/types'

export const styleProps = {
  initial: { opacity: 0, scale: 0.4, borderRadius: '1000px' },
  whileInView: { opacity: 1, scale: 1, borderRadius: 0 },
  ...settingStraight,
}

export const AnimationAppear: FC<
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
