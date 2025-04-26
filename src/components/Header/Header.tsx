'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { type FC, useState } from 'react'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className={'sticky top-0 z-10'}>
      <div
        className={
          'flex justify-between h-[var(--size-header)] items-center p-3 bg-secondary text-secondary-foreground'
        }
      >
        <a href={'/'} className={'logo'}>
          logo
        </a>
        <MenuToggle isOpen={isOpen} onChange={setIsOpen} size={'32'} />
      </div>
      {isOpen && (
        <nav className={'grid gap-2 fixed bg-background w-full h-full'}>
          todo
        </nav>
      )}
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
    <button onClick={toggle} className="relative w-10 h-10">
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
