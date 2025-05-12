'use client'

import type { FC, PropsWithChildren } from 'react'
import { Parallax, type ParallaxProps } from 'react-scroll-parallax'

export const ParallaxWrapper: FC<PropsWithChildren<ParallaxProps>> = ({
  children,
  ...props
}) => {
  return <Parallax {...props}>{children}</Parallax>
}

export default ParallaxWrapper
