'use client'
import Link from 'next/link'
import { navigation, navigationNames } from 'lib/utils'
import type { FC } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'components/ui/tooltip'

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
  return (
    <div className={'flex items-center gap-2 p-4'}>
      {mainNavigation.map((value) => (
        <Link
          onClick={() => {
            onChange(false)
          }}
          className={'desktop-link'}
          key={value}
          href={`#${value}`}
        >
          {navigationNames[value]}
        </Link>
      ))}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className={'desktop-link'}>Ещё</span>
          </TooltipTrigger>
          <TooltipContent>
            {secondaryNavigation.map((value) => (
              <div key={value}>
                <Link
                  onClick={() => {
                    onChange(false)
                  }}
                  className={
                    'text-sm text-sidebar-primary-foreground font-semibold cursor-pointer hover:text-chart-5 transition'
                  }
                  key={value}
                  href={`#${value}`}
                >
                  {navigationNames[value]}
                </Link>
              </div>
            ))}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
