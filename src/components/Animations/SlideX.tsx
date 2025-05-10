'use client'

import type { FC, PropsWithChildren } from 'react'
import { motion, type MotionProps } from 'framer-motion'
import type { ClassicComponent } from 'types/types'
import { getSettingsWithDelay } from 'components/Animations/settings'

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
  delay?: number
}
export const SlideX: FC<PropsWithChildren<ClassicComponent & Props>> = ({
  children,
  type = 'left',
  className,
  delay,
}) => {
  const styleProps = type === 'left' ? fromRightStyleProps : fromLeftStyleProps
  return (
    <motion.div
      {...styleProps}
      {...getSettingsWithDelay(delay)}
      className={className}
    >
      {children}
    </motion.div>
  )
}
