'use client'

import { Calendar } from 'components/ui/calendar'
import { useEffect, useState } from 'react'
import { BookTime } from '../BookTimeList/BookTime'
import { getZeroDate } from '../helpers'
import type { TimeParams } from '../types'
import { reservationsStore } from '../store/reservationStore'
import { ru } from 'date-fns/locale'

export const Book = () => {
  const [date, setDate] = useState<Date | null>(null)
  const reservations = reservationsStore.hooks.useReservations()
  const month = reservationsStore.hooks.useCurrentMonth()

  useEffect(() => {
    reservationsStore.actions.getReservations()
  }, [])

  const onSelect = (data: TimeParams) => {
    reservationsStore.actions.reserve(data)
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
      fromMonth={new Date()}
      month={month}
      onMonthChange={reservationsStore.actions.setCurrentMonth}
      locale={ru}
      onDayClick={setDate}
      modifiers={{
        highlight: (day) =>
          Boolean(
            reservations?.some(
              (r) =>
                getZeroDate(r.from).getTime() === getZeroDate(day).getTime(),
            ),
          ),
      }}
      disabled={(date) => {
        return date < getZeroDate()
      }}
      mode="single"
      onSelect={(date) => date && setDate(date)}
      className="rounded-md border"
      modifiersClassNames={{
        highlight: 'bg-blue-500 text-white font-bold hover:!bg-blue-600',
      }}
    />
  )
}
