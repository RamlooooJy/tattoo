'use client'

import { Calendar } from 'components/ui/calendar'
import { useEffect, useState } from 'react'
import { BookTime } from '../BookTimeList/BookTime'
import { getZeroDate } from '../helpers'
import type { TimeParams } from '../types'
import { reservations } from '../store/reservationStore'
import { ru } from 'date-fns/locale'

export const Book = () => {
  const [date, setDate] = useState<Date | null>(null)

  useEffect(() => {
    if (date) {
      reservations.actions.getReservations(date)
    }
  }, [date])

  const onSelect = (data: TimeParams) => {
    reservations.actions.reserve(data)
    setDate(null)
  }

  return date ? (
    <BookTime
      onSelect={onSelect}
      selectedDate={date}
      onClose={() => setDate(null)}
    />
  ) : (
    <Calendar
      locale={ru}
      onDayClick={setDate}
      disabled={(date) => {
        return date < getZeroDate()
        // return disabledDates.some((disabled) => isDate(disabled, date))
      }}
      mode="single"
      onSelect={(date) => date && setDate(date)}
      className="rounded-md border"
    />
  )
}
