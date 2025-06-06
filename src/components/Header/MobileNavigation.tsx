'use client'
import { settingsNavigationContainer } from 'components/Animations/settings'
import { AnimationSlideX } from 'components/Animations/AnimationSlideX'
import Logo from 'components/Logo/Logo'
import { navigation, navigationNames } from 'lib/utils'
import { motion } from 'framer-motion'
import { type FC, useContext } from 'react'
import { Button } from 'components/ui/button'
import { auth } from '../../widgets/WidgetReservation/store/authStore'
import { User } from 'lucide-react'
import { MainContext } from '../../contexts/mainProvider'
import { ScrollToLink } from 'components/ScrollToButton'

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
        <ScrollToLink element={navigation.main} className={'logo'}>
          <Logo className={'object-contain'} />
        </ScrollToLink>
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
              <ScrollToLink
                onClick={() => {
                  onChange(false)
                }}
                element={value}
                className={
                  'text-foreground font-semibold cursor-pointer hover:text-chart-5 transition sm:text-sm'
                }
                key={value}
              >
                {navigationNames[value]}
              </ScrollToLink>
            </AnimationSlideX>
          ))}
        {!isAdmin ? (
          <AnimationSlideX
            className={'h-full aspect-square'}
            whileInViewEnabled={false}
            delay={0.5}
          >
            <Button
              onClick={() => {
                auth.actions.clearAuthentication()
              }}
              className={'h-full w-full'}
              size={'inherit'}
              variant={'profile'}
            >
              <User className={'size-auto'} size={20} />
            </Button>
          </AnimationSlideX>
        ) : null}
      </div>
    </motion.nav>
  )
}
