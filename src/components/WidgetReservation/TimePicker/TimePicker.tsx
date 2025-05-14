'use client'

import { type FC, useRef } from 'react'
import { bookTimeList } from 'components/WidgetReservation/constants'
import { isTodayDate } from 'components/WidgetReservation/helpers'
import styles from './time-picker.module.scss'
import { CalendarCheck } from 'lucide-react'
import { Button } from 'components/ui/button'
import { TimeBlock } from 'components/WidgetReservation/TimeBlock/TimePicker'

type Props = {
  selectedDate: Date
  timeFrom: number | null
  setTimeFromAction: (date: number | null) => void
  timeTo: number | null
  setTimeToAction: (date: number | null) => void
}

export const TimePicker: FC<Props> = ({
  selectedDate,
  setTimeFromAction,
  setTimeToAction,
  timeTo,
  timeFrom,
}) => {
  const date = useRef(
    isTodayDate(selectedDate) ? new Date() : selectedDate,
  ).current

  const onAllButton = () => {
    if (
      timeFrom === date.getHours() &&
      timeTo === bookTimeList[bookTimeList.length - 1]
    ) {
      setTimeToAction(null)
      setTimeFromAction(null)

      return
    }
    setTimeFromAction(date.getHours())
    setTimeToAction(bookTimeList[bookTimeList.length - 1])
  }

  const onChange = (time: number) => {
    if (!timeFrom || time < timeFrom || (timeFrom && timeTo)) {
      setTimeFromAction(time)
      setTimeToAction(null)
      return
    }

    if (!timeTo) {
      setTimeToAction(time)
      return
    }

    setTimeFromAction(null)
    setTimeToAction(null)
  }

  const getActiveState = (time: number) => {
    if (timeFrom !== null && timeTo !== null) {
      return time >= timeFrom && timeTo >= time
    }

    if (timeFrom !== null) {
      return time === timeFrom
    }

    return false
  }

  return (
    <div className={'grid gap-1'}>
      <Button
        onClick={onAllButton}
        className={'w-full bg-transparent border border-neutral-100/20'}
      >
        <CalendarCheck /> Весь день
      </Button>
      <div className={styles.list}>
        {bookTimeList.map((time) => (
          <TimeBlock
            disabled={date.getHours() > time}
            selected={getActiveState(time)}
            key={time}
            time={time}
            onClick={() => onChange(time)}
          />
        ))}
      </div>
    </div>
  )
}
