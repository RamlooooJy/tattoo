'use client'

import { type FC, useEffect } from 'react'
import type { ClassicComponent } from 'types/types'
import { reservationsStore } from '../../widgets/WidgetReservation/store/reservationStore'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'components/ui/table'
import type { Reservation, User } from 'prisma/client'
import { auth } from '../../widgets/WidgetReservation/store/authStore'
import { getOpacityFromDate } from 'utils/style.utils'

type ReservationTableProps = {
  users?: User[]
} & ClassicComponent

const tableSorting: (keyof Reservation)[] = [
  'userId',
  'from',
  'to',
  'created',
  'message',
  'id',
]

const tableCellNames: Record<(typeof tableSorting)[number], string> = {
  id: 'Id',
  userId: 'Мастер',
  from: 'Начало',
  to: 'Конец',
  created: 'Забронировано',
  message: 'Сообщение',
}

const ReservationTable: FC<ReservationTableProps> = () => {
  const reservations = reservationsStore.hooks.useReservations()
  const users = auth.hooks.userUsers()

  function getData<T>(value: T, key?: string) {
    if (!value) return <>&#128405;</>

    if (key === 'userId') {
      const user = users.find((u) => u.id === value)
      if (!user) return 'не мастер'

      return (
        <a className={'text-red-300'} href={`tel:+${user.phone}`}>
          {user.name} {user.phone}
        </a>
      )
    }

    if (
      typeof value === 'string' &&
      !Number.isNaN(new Date(value as string).getTime())
    ) {
      const date = new Date(value)
      return new Intl.DateTimeFormat('ru', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(date)
    }
    return String(value)
  }

  useEffect(() => {
    auth.actions.getUsers()
    reservationsStore.actions.getReservations()
  }, [])

  return (
    <div className={'relative w-full h-full'}>
      <Table>
        <TableHeader>
          <TableRow>
            {tableSorting.map((t) => (
              <TableHead key={t} className="w-[100px]">
                {tableCellNames[t]}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations?.map((r) => (
            <TableRow
              style={{
                background: `rgba(30, 144, 255, ${getOpacityFromDate(r.created)})`,
              }}
              key={r.id}
            >
              {tableSorting.map((key) => (
                <TableCell key={key}>{getData(r[key], key)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ReservationTable
