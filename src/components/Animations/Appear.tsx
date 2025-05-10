'use client'

import type { FC, PropsWithChildren } from 'react'
import { motion } from 'framer-motion'
import { settingStraight } from 'components/Animations/settings'
import type { ClassicComponent } from 'types/types'

export const styleProps = {
  initial: { opacity: 0, scale: 0.4, borderRadius: '1000px' },
  whileInView: { opacity: 1, scale: 1, borderRadius: 0 },
  ...settingStraight,
}

export const Appear: FC<PropsWithChildren<ClassicComponent>> = ({
  children,
  className,
}) => {
  return (
    <motion.div {...styleProps} className={className}>
      {children}
    </motion.div>
  )
}
