'use client'

import { type FC, useContext, useRef } from 'react'
import styles from './widget.module.scss'
import { Auth } from 'components/WidgetReservation/Auth/Auth'
import { Book } from './Book/Book'
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover'
import { Button } from 'components/ui/button'
import { NotebookPen } from 'lucide-react'
import { MainContext } from '../../contexts/mainProvider'
import { cn } from 'lib/utils'

type WidgetReservationType = {
  message?: string
}
export const WidgetReservation: FC<WidgetReservationType> = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const { isAdmin, isAuthorized, isPortrait } = useContext(MainContext)

  if (!isAdmin) {
    return null
  }

  return (
    <Popover>
      <PopoverTrigger asChild className={'fixed bottom-3 right-3 z-50'}>
        <Button className={'p-3 rounded-2xl'}>
          <NotebookPen className={'size-8'} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        side={isPortrait ? 'top' : 'left'}
        className={cn(styles.popover, 'z-50')}
        asChild
      >
        <div ref={ref} className={styles.container}>
          {isAuthorized ? <Book /> : <Auth />}
        </div>
      </PopoverContent>
    </Popover>
  )
}
