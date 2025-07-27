'use client'

import { type FC, useRef, useState } from 'react'
import { Button } from 'components/ui/button'
import { ChevronLeft, SquareCheck } from 'lucide-react'
import { TimePicker } from '../TimePicker/TimePicker'
import type { TimeParams } from '../types'
import { Input } from 'components/ui/input'

type BookTimeProps = {
  onClose(): void
  onSelect(params: TimeParams): void
  selectedDate: Date
}

export const BookTime: FC<BookTimeProps> = ({
  onClose,
  onSelect,
  selectedDate,
}) => {
  const [timeFrom, setTimeFrom] = useState<Date | null>(null)
  const [timeTo, setTimeTo] = useState<Date | null>(null)
  const messageRef = useRef('')

  return (
    <div className={'flex flex-col gap-3'}>
      <TimePicker
        dateFrom={timeFrom}
        dateTo={timeTo}
        setTimeFromAction={setTimeFrom}
        setTimeToAction={setTimeTo}
        selectedDate={selectedDate}
      />
      <div
        className={
          'flex gap-4 justify-between items-center font-extrabold text-2xl'
        }
      >
        <Button
          variant={'outline'}
          className={'px-[5px]! hover:bg-site-primary'}
          onClick={onClose}
        >
          <ChevronLeft />
        </Button>
        <div className={'grid gap-1'}>
          <span className={'font-bold'}>
            {selectedDate.toLocaleDateString()}
          </span>
        </div>
        <Button
          variant={!timeFrom || !timeTo ? 'outline' : undefined}
          disabled={!timeFrom || !timeTo}
          onClick={() =>
            onSelect({
              dateTo: timeTo,
              dateFrom: timeFrom,
              message: messageRef.current,
            })
          }
        >
          <SquareCheck />
        </Button>
      </div>
      <Input
        onChange={(value) => {
          messageRef.current = value
        }}
        maxLength={30}
        placeholder={'Комментарий'}
      />
    </div>
  )
}
