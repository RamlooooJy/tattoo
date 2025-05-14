'use client'

import { Calendar } from 'components/ui/calendar'
import { useState } from 'react'
import { disabledDates } from 'components/WidgetReservation/constants'
import { BookTime } from 'components/WidgetReservation/BookTimeList/BookTime'
import { getToday } from 'components/WidgetReservation/helpers'
import type { TimeParams } from 'components/WidgetReservation/types'
import { reservations } from 'components/WidgetReservation/store/reservationStore'
import { ru } from 'date-fns/locale'

const isDate = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}

export const Book = () => {
  const [date, setDate] = useState<Date | null>(null)

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
        if (date < getToday()) return true

        return disabledDates.some((disabled) => isDate(disabled, date))
      }}
      mode="single"
      onSelect={(date) => date && setDate(date)}
      className="rounded-md border"
    />
  )
}
