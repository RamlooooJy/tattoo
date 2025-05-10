'use client'

import type { FC, PropsWithChildren } from 'react'
import { motion } from 'framer-motion'
import { settingsSpring } from 'components/Animations/settings'
import type { ClassicComponent } from 'types/types'

export const styleProps = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  ...settingsSpring,
}

export const SlideY: FC<PropsWithChildren<ClassicComponent>> = ({
  children,
  className,
}) => {
  return (
    <motion.div {...styleProps} className={className}>
      {children}
    </motion.div>
  )
}
