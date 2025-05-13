'use client'
import {
  createContext,
  type FC,
  type PropsWithChildren,
  useLayoutEffect,
  useState,
} from 'react'
import { isMobileDeviceBySize } from 'lib/dimension'

export const MainContext = createContext<{
  isMobile: boolean | null
  isHydrated: boolean
}>({
  isMobile: false,
  isHydrated: false,
})

const mobileBreakpoint = 640

export const MainProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isMobile, setIsMobile] = useState<null | boolean>(null)
  const [isHydrated, setIsHydrated] = useState<boolean>(false)

  useLayoutEffect(() => {
    const handler = () => setIsMobile(isMobileDeviceBySize(mobileBreakpoint))
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

  return (
    // <ParallaxProvider>
    <MainContext.Provider
      value={{
        isMobile,
        isHydrated,
      }}
    >
      {children}
    </MainContext.Provider>
    // </ParallaxProvider>
  )
}
