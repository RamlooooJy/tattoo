'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { type FC, useContext, useState } from 'react'
import Link from 'next/link'
import Logo from 'components/Logo/Logo'
import { MainContext } from '../../contexts/mainProvider'
import { MobileNavigation } from 'components/Header/MobileNavigation'
import { DesktopNavigation } from 'components/Header/DesktopNavigation'
import { cn } from 'lib/utils'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isMobile, isHydrated } = useContext(MainContext)

  const onChange = (value: boolean) => {
    setIsOpen(value)
    document.body.style.overflow = value ? 'hidden' : ''
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 z-20 w-full bg-site-header text-site-header-text transition hover:bg-site-header-hover',
          isOpen ? 'bg-site-header-hover' : 'bg-site-header',
        )}
      >
        <div
          className={
            'flex justify-between h-[var(--size-header)] items-center container-max-width'
          }
        >
          <Link href={'/'} className={'logo-link h-full aspect-square'}>
            <Logo className={'h-full'} />
          </Link>
          {isHydrated && !isMobile ? (
            <DesktopNavigation onChange={onChange} />
          ) : null}
          {isHydrated && isMobile ? (
            <MenuToggle isOpen={isOpen} onChange={onChange} size={'32'} />
          ) : null}
        </div>
      </header>
      <AnimatePresence>
        {isOpen && isMobile && isHydrated ? (
          <MobileNavigation onChange={onChange} />
        ) : null}
      </AnimatePresence>
    </>
  )
}

const MenuToggle: FC<{
  size: string
  isOpen: boolean
  onChange: (state: boolean) => void
}> = ({ size, isOpen, onChange }) => {
  const toggle = () => onChange(!isOpen)

  return (
    <button onClick={toggle} className="relative w-10 h-10 cursor-pointer">
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.div
            key="x"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 180, scale: 0.3 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <X size={size} />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -180, scale: 0.3 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Menu size={size} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}
