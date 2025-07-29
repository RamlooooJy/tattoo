'use client'

import { type FC, Fragment, useEffect } from 'react'
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
import { isTodayDate } from '../../widgets/WidgetReservation/helpers'
import { Button } from 'components/ui/button'
import NewMaster from 'components/NewMaster/NewMaster'

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
        <>
          <h3>{user.name}</h3>
          <a className={'text-red-300'} href={`tel:+${user.phone}`}>
            {user.phone}
          </a>
        </>
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

  const isNextFromNextDay = (current: Reservation, next: Reservation) => {
    const createdDate = new Date(current.created)
    const nextCreatedDate = new Date(next.created)

    if (createdDate.getDate() !== nextCreatedDate.getDate()) {
      return true
    }
  }

  return (
    <div className={'relative w-full h-full gap-2 grid'}>
      <div className={'flex justify-between'}>
        <NewMaster />
        <Button
          variant={'destructive'}
          onClick={() =>
            confirm(
              'точно? удалятся все завершенные записи начиная с прошлого месяца',
            )
              ? reservationsStore.actions.deleteReservationBefore()
              : null
          }
        >
          Удалить прошедшие даты
        </Button>
      </div>
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
          {reservations?.map((r, idx) => (
            <Fragment key={r.id}>
              {isTodayDate(r.created) &&
              isNextFromNextDay(r, reservations[idx + 1]) ? (
                <TableRow>
                  <TableCell colSpan={3}>
                    <br />
                    Ранее забронировавшие
                  </TableCell>
                </TableRow>
              ) : null}
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
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ReservationTable
