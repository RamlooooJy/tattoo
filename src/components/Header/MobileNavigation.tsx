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
      // key={String(isOpen)}
      className={
        'flex gap-2 top-[var(--size-header)] p-4 z-10 fixed inset-0 bg-sidebar-primary text-sidebar-primary-foreground'
      }
      {...settingsNavigationContainer}
    >
      <AnimationSlideX>
        <Link
          onClick={() => {
            onChange(false)
          }}
          href={'/'}
          className={'logo'}
        >
          <Logo className={'object-cover'} />
        </Link>
      </AnimationSlideX>
      <div className={'grid gap-2 content-start justify-end'}>
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
                  'text-foreground font-semibold cursor-pointer hover:text-chart-5 transition'
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
