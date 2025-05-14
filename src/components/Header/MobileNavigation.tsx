'use client'
import { settingsNavigationContainer } from 'components/Animations/settings'
import { AnimationSlideX } from 'components/Animations/AnimationSlideX'
import Link from 'next/link'
import Logo from 'components/Logo/Logo'
import { navigation, navigationNames } from 'lib/utils'
import { motion } from 'framer-motion'
import { type FC, useContext } from 'react'
import { User } from 'lucide-react'
import { Button } from 'components/ui/button'
import { auth } from 'components/WidgetReservation/store/authStore'
import { MainContext } from '../../contexts/mainProvider'

type MobileNavigationProps = {
  onChange(state: boolean): void
}
export const MobileNavigation: FC<MobileNavigationProps> = ({ onChange }) => {
  const { isAdmin } = useContext(MainContext)
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
            <AnimationSlideX
              whileInViewEnabled={false}
              type={'left'}
              key={value}
              delay={(0.1 * idx) / 5}
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
            </AnimationSlideX>
          ))}
        {!isAdmin ? (
          <AnimationSlideX
            className={'justify-self-center'}
            whileInViewEnabled={false}
            delay={0.5}
          >
            <Button className={'size-16'} size={'inherit'} variant={'profile'}>
              <User
                className={'size-auto'}
                size={24}
                onClick={() => {
                  auth.actions.clearAuthentication()
                }}
              />
            </Button>
          </AnimationSlideX>
        ) : null}
      </div>
    </motion.nav>
  )
}
