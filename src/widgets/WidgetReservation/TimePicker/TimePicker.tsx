'use client'

import { type FC, useRef, useState } from 'react'
import { bookTimeList } from '../constants'
import { getZeroDate, isDateInRange, isTodayDate } from '../helpers'
import styles from './time-picker.module.scss'
import { CalendarCheck } from 'lucide-react'
import { Button } from 'components/ui/button'
import { TimeBlock } from '../TimeBlock/TimePicker'
import { reservationsStore } from '../store/reservationStore'
import { auth } from '../store/authStore'
import { Roles } from 'types/enums'

type Props = {
  selectedDate: Date
  dateFrom: Date | null
  dateTo: Date | null
  setTimeFromAction: (date: Date | null) => void
  setTimeToAction: (date: Date | null) => void
}

export const TimePicker: FC<Props> = ({
  selectedDate,
  setTimeFromAction,
  setTimeToAction,
  dateTo,
  dateFrom,
}) => {
  const [actionId, setActionId] = useState(-1)
  const reservations = reservationsStore.hooks.useReservations()
  console.log(reservations)
  const user = auth.hooks.useUser()
  const date = useRef(
    isTodayDate(selectedDate) ? new Date() : selectedDate,
  ).current

  const onAllButton = () => {
    const startHour = getZeroDate(
      selectedDate,
      isTodayDate(selectedDate) ? new Date().getHours() : bookTimeList[0],
    )
    const lastHour = getZeroDate(
      selectedDate,
      bookTimeList[bookTimeList.length - 1],
    )

    if (
      dateFrom?.getTime() === startHour.getTime() &&
      dateTo?.getTime() === lastHour.getTime()
    ) {
      setTimeToAction(null)
      setTimeFromAction(null)

      return
    }
    setTimeFromAction(startHour)

    setTimeToAction(lastHour)
  }

  const onChange = (time: number) => {
    const selected = getZeroDate(selectedDate, time)

    if (isReserved(time)) {
      setActionId(time)
      return
    }

    if (
      !dateFrom ||
      selected.getTime() < dateFrom.getTime() ||
      (dateFrom && dateTo)
    ) {
      setTimeFromAction(selected)
      setTimeToAction(null)
      return
    }

    if (!dateTo && dateFrom.getTime() !== selected.getTime()) {
      setTimeToAction(selected)
      return
    }

    setTimeFromAction(null)
    setTimeToAction(null)
  }

  const getActiveState = (time: number) => {
    const selected = getZeroDate(selectedDate, time)

    if (dateFrom !== null && dateTo !== null) {
      return selected >= dateFrom && dateTo >= selected
    }

    if (dateFrom !== null) {
      return selected.getTime() === dateFrom.getTime()
    }

    return false
  }

  const removeReservation = (time: number) => {
    const selected = isReserved(time)
    if (!selected) return

    setActionId(-1)
    reservationsStore.actions.deleteReservation(selected.id, selectedDate)
  }

  const isReserved = (time?: number) => {
    const current = getZeroDate(selectedDate, time)

    return reservations?.find((r) => isDateInRange(current, r.from, r.to))
  }

  const isDisabled = (time: number) => {
    const reservation = isReserved(time)
    if (!user || !reservation) return date.getHours() > time
    const isReservedByUser = user?.userId !== reservation?.userId
    const isModer = Roles.MODERATOR === user?.role

    return !isModer && isReservedByUser
  }

  const isFullDayReservationDisabled = () => {
    return reservations?.some(
      (r) =>
        getZeroDate(selectedDate).getTime() === getZeroDate(r.from).getTime(),
    )
  }

  return (
    <div className={'grid gap-1'}>
      <Button
        disabled={isFullDayReservationDisabled()}
        onClick={onAllButton}
        className={'w-full bg-transparent border border-neutral-100/20'}
      >
        <CalendarCheck /> Весь день
      </Button>
      <div className={styles.list}>
        {bookTimeList.map((time) => (
          <TimeBlock
            onClickOutside={() => setActionId(-1)}
            onRemove={() => removeReservation(time)}
            selected={getActiveState(time)}
            disabled={isDisabled(time)}
            reserved={isDisabled(time) ? false : Boolean(isReserved(time))}
            actionRemove={actionId === time}
            key={time}
            time={time}
            onClick={() => onChange(time)}
          />
        ))}
      </div>
    </div>
  )
}
