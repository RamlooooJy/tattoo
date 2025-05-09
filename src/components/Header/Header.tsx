'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { type FC, useState } from 'react'
import Link from 'next/link'
import { navigation, navigationNames } from 'lib/utils'
import Logo from 'components/Logo/Logo'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const onChange = (value: boolean) => {
    setIsOpen(value)
    document.body.style.overflow = document.body.style.overflow ? '' : 'hidden'
  }

  return (
    <header className={'sticky top-0 z-10'}>
      <div
        className={
          'flex justify-between h-[var(--size-header)] items-center p-3 bg-sidebar text-sidebar-foreground'
        }
      >
        <Link href={'/'} className={'logo'}>
          <Logo size={'64px'} />
        </Link>
        <MenuToggle isOpen={isOpen} onChange={onChange} size={'32'} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            key={String(isOpen)}
            transition={{
              duration: 0.1,
              ease: [0, 0.31, 0.7, 1.01],
            }}
            initial={{
              opacity: 0,
              x: '100%',
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: '100%',
            }}
            className={
              'grid gap-2 fixed bg-sidebar-primary text-sidebar-primary-foreground w-full h-full content-start justify-end p-4'
            }
          >
            {Object.values(navigation).map((value, idx) => (
              <motion.div
                key={`${value}+${isOpen}`}
                transition={{
                  delay: (0.1 * idx) / 5,
                  type: 'spring',
                  stiffness: 100,
                  damping: 10,
                  duration: 0.3,
                }}
                initial={{
                  opacity: 0,
                  x: '100%',
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: '100%',
                }}
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
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
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
