'use client'
import type { FC } from 'react'
import { cn } from 'lib/utils'
import styles from './time-block.module.scss'

type TimeBlockProps = {
  time: number
  disabled: boolean
  selected: boolean
  onClick(): void
}
export const TimeBlock: FC<TimeBlockProps> = ({
  time,
  disabled,
  selected,
  onClick,
}) => {
  return (
    <div
      data-disabled={disabled}
      data-selected={selected}
      className={cn(styles.timeBlock)}
      onClick={onClick}
    >
      {time.toString().padStart(2, '0')} : 00
    </div>
  )
}
