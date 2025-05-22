'use client'
import {
  createContext,
  type FC,
  type PropsWithChildren,
  useLayoutEffect,
  useState,
} from 'react'
import { isMobileDeviceBySize } from 'lib/dimension'
import { mobileBreakpoint } from '../widgets/WidgetReservation/constants'
import { auth } from '../widgets/WidgetReservation/store/authStore'

export const MainContext = createContext<{
  isMobile: boolean | null
  isPortrait: boolean | null
  isAuthorized: boolean
  isAdmin: boolean
  isHydrated: boolean
}>({
  isMobile: null,
  isPortrait: null,
  isAuthorized: false,
  isAdmin: false,
  isHydrated: false,
})

export const MainProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isMobile, setIsMobile] = useState<null | boolean>(null)
  const [isPortrait, setIsPortrait] = useState<null | boolean>(null)
  const [isHydrated, setIsHydrated] = useState<boolean>(false)
  const isAuthorized = auth.hooks.useAccessToken()
  const isAdmin = auth.hooks.useIsAdmin()

  useLayoutEffect(() => {
    const handler = () => {
      const isMobile = isMobileDeviceBySize(mobileBreakpoint)
      setIsMobile(isMobile)
      setIsPortrait(isMobile && window.innerWidth < innerHeight)
    }

    window.addEventListener('resize', handler)
    setIsHydrated(true)
    handler()
    return () => window.removeEventListener('resize', handler)
  }, [])

  useLayoutEffect(() => {
    if (isMobile) {
      document.documentElement.classList.add('mobile')
      document.documentElement.classList.remove('desktop')
      return
    }
    document.documentElement.classList.remove('mobile')
    document.documentElement.classList.add('desktop')
  }, [isMobile])

  useLayoutEffect(() => {
    const setHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    setHeight()
  }, [isPortrait])

  return (
    <MainContext.Provider
      value={{
        isAdmin,
        isPortrait,
        isMobile,
        isHydrated,
        isAuthorized: Boolean(isAuthorized),
      }}
    >
      {children}
    </MainContext.Provider>
  )
}
