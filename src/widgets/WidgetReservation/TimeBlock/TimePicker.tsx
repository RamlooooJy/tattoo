'use client'
import { type FC, useEffect, useRef } from 'react'
import { cn } from 'lib/utils'
import styles from './time-block.module.scss'
import { Trash2 } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

type TimeBlockProps = {
  time: number
  disabled: boolean
  reserved: boolean
  selected: boolean
  actionRemove: boolean
  onClick(): void
  onClickOutside(): void
  onRemove(): void
}
export const TimeBlock: FC<TimeBlockProps> = ({
  time,
  disabled,
  selected,
  reserved,
  actionRemove,
  onClick,
  onClickOutside,
  onRemove,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside()
      }
    }

    if (actionRemove) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [actionRemove, onClickOutside])

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileFocus={{ scale: 0.95 }}
      data-disabled={disabled}
      data-reserved={reserved}
      data-selected={selected}
      data-remove={actionRemove}
      onClick={onClick}
      className={cn(styles.timeBlock)}
    >
      <AnimatePresence mode="wait">
        {actionRemove ? (
          <motion.div
            key="trash"
            ref={ref}
            {...trashAnimation}
            className="flex items-center justify-center"
          >
            <Trash2
              onClick={(e) => {
                e.stopPropagation()
                onRemove?.()
              }}
              size={16}
            />
          </motion.div>
        ) : (
          <motion.span key="time" {...timeTextAnimation}>
            {time.toString().padStart(2, '0')} : 00
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export const trashAnimation = {
  initial: { opacity: 0, scale: 0.7 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.7 },
  transition: { duration: 0.2 },
}

export const timeTextAnimation = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.2 },
}
