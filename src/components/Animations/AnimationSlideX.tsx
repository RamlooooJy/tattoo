'use client'

import type { FC, PropsWithChildren } from 'react'
import { motion, type MotionProps } from 'framer-motion'
import type { ClassicComponent } from 'types/types'
import {
  getSettingsWithDelay,
  settingsSpring,
} from 'components/Animations/settings'
import type { AnimationProps } from 'components/Animations/types'

const fromRightStyleProps: MotionProps = {
  initial: { opacity: 0, x: 150 },
  whileInView: { opacity: 1, x: 0 },
}

const fromLeftStyleProps = {
  initial: { opacity: 0, x: -150 },
  whileInView: { opacity: 1, x: 0 },
}

type Props = {
  type?: 'left' | 'right'
} & AnimationProps
export const AnimationSlideX: FC<
  PropsWithChildren<ClassicComponent & Props>
> = ({ children, className, type = 'left', delay = 0 }) => {
  const styleProps = type === 'left' ? fromRightStyleProps : fromLeftStyleProps
  return (
    <motion.div
      {...styleProps}
      {...getSettingsWithDelay(delay, settingsSpring)}
      className={className}
    >
      {children}
    </motion.div>
  )
}
