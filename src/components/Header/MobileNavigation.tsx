'use client'
import {
  getSettingsWithDelay,
  settingsNavigationContainer,
  settingsNavigationItems,
} from 'components/Animations/settings'
import { AnimationSlideX } from 'components/Animations/AnimationSlideX'
import Link from 'next/link'
import Logo from 'components/Logo/Logo'
import { navigation, navigationNames } from 'lib/utils'
import { motion } from 'framer-motion'
import type { FC } from 'react'

type MobileNavigationProps = {
  onChange(state: boolean): void
}
export const MobileNavigation: FC<MobileNavigationProps> = ({ onChange }) => {
  return (
    <motion.nav
      className={
        'grid grid-cols-[1fr_max-content] gap-2 top-[var(--size-header)] p-4 z-10 fixed inset-0 bg-site-header-hover text-site-header-text'
      }
      {...settingsNavigationContainer}
    >
      <AnimationSlideX className={'relative'}>
        <Link
          onClick={() => {
            onChange(false)
          }}
          href={'/'}
          className={'logo'}
        >
          <Logo className={'object-contain'} />
        </Link>
      </AnimationSlideX>
      <div
        className={
          'grid gap-2 content-start justify-end sm:px-5 sm:overflow-auto'
        }
      >
        {Object.values(navigation)
          .slice(1)
          .map((value, idx) => (
            <motion.div
              key={value}
              {...getSettingsWithDelay(
                (0.1 * idx) / 5,
                settingsNavigationItems,
              )}
            >
              <Link
                onClick={() => {
                  onChange(false)
                }}
                className={
                  'text-foreground font-semibold cursor-pointer hover:text-chart-5 transition sm:text-sm'
                }
                key={value}
                href={`#${value}`}
              >
                {navigationNames[value]}
              </Link>
            </motion.div>
          ))}
      </div>
    </motion.nav>
  )
}
