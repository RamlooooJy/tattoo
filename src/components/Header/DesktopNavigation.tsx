'use client'
import { navigation, navigationNames } from 'lib/utils'
import { type FC, useContext } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'components/ui/tooltip'
import { AnimationSlideX } from 'components/Animations/AnimationSlideX'
import { Button } from 'components/ui/button'
import { User } from 'lucide-react'
import { auth } from '../../widgets/WidgetReservation/store/authStore'
import { MainContext } from '../../contexts/mainProvider'
import { ScrollToLink } from 'components/ScrollToButton'

type DesktopNavigationProps = {
  onChange(state: boolean): void
}

const mainNavigation = Object.values(navigation).filter((value) =>
  [navigation.contacts, navigation.price, navigation.reserve].includes(value),
)
const secondaryNavigation = Object.values(navigation)
  .filter((value) => value !== navigation.main)
  .filter((value) => !mainNavigation.includes(value))

export const DesktopNavigation: FC<DesktopNavigationProps> = ({ onChange }) => {
  const { isAdmin } = useContext(MainContext)
  return (
    <div className={'flex items-center gap-2 p-4'}>
      {mainNavigation.map((value) => (
        <ScrollToLink
          element={value}
          key={value}
          onClick={() => {
            onChange(false)
          }}
          className={'desktop-link'}
        >
          {navigationNames[value]}
        </ScrollToLink>
      ))}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className={'desktop-link'}>Ещё</span>
          </TooltipTrigger>
          {!isAdmin ? (
            <AnimationSlideX
              className={'justify-self-center'}
              whileInViewEnabled={false}
              delay={0.5}
            >
              <Button
                onClick={() => {
                  auth.actions.clearAuthentication()
                }}
                className={'size-6'}
                size={'inherit'}
                variant={'profile'}
              >
                <User className={'size-auto'} size={12} />
              </Button>
            </AnimationSlideX>
          ) : null}
          <TooltipContent>
            {secondaryNavigation.map((value) => (
              <div key={value}>
                <ScrollToLink
                  onClick={() => {
                    onChange(false)
                  }}
                  element={value}
                  className={
                    'text-sm text-sidebar-primary-foreground font-semibold cursor-pointer hover:text-chart-5 transition'
                  }
                  key={value}
                >
                  {navigationNames[value]}
                </ScrollToLink>
              </div>
            ))}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
