'use client'

import type { navigation } from 'lib/utils'
import type { FC } from 'react'
import { Button } from 'components/ui/button'
import type { allNavigation } from 'lib/utils'
import Link from 'next/link'

export const scrollTo = (
  root: (typeof allNavigation)[keyof typeof allNavigation],
) => {
  window.document
    .querySelector(`#${root}`)
    ?.scrollIntoView({ behavior: 'smooth' })
}

type ButtonProps = {
  element: (typeof navigation)[keyof typeof navigation]
} & React.ComponentProps<typeof Button>

export const ScrollToButton: FC<ButtonProps> = ({
  element,
  onClick,
  ...props
}) => (
  <Button
    onClick={(e) => {
      onClick?.(e)
      scrollTo(element)
    }}
    {...props}
  />
)

type LinkProps = {
  element: (typeof navigation)[keyof typeof navigation]
} & Omit<React.ComponentProps<typeof Link>, 'href'>

export const ScrollToLink: FC<LinkProps> = ({ element, onClick, ...props }) => (
  <Link
    href={''}
    onClick={(e) => {
      e.preventDefault()
      e.stopPropagation()
      onClick?.(e)
      scrollTo(element)
    }}
    {...props}
  />
)
