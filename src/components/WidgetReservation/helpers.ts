import {
  reservedTime,
  workingHours,
} from 'components/WidgetReservation/constants'

const roundToNearestHalfHour = (minutes: number) => {
  return minutes < 30 ? 0 : 30
}

export const isTodayDate = (date: Date) => {
  return new Date().setHours(0, 0, 0, 0) === new Date(date).setHours(0, 0, 0, 0)
}

export const getCurrentDateString = (date: Date) => {
  const isToday = isTodayDate(date)

  const currentHour = date.getHours()
  const currentMinutes = roundToNearestHalfHour(date.getMinutes())

  if (isToday) {
    // Если рабочий день начался, но еще не закончился
    if (currentHour >= workingHours.from && currentHour < workingHours.till) {
      const remainingTime = `${currentHour}:${currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}`
      return `C ${remainingTime} до ${workingHours.till}:00` // текущее время в формате "от часов"
    }
    if (currentHour < workingHours.from) {
      return `C ${workingHours.from}:00` // рабочий день еще не начался
    }
    return 'Рабочий день завершен'
  }
  return `C ${workingHours.from}:00 до ${workingHours.till}:00`
}

export const getWorkTimeFrom = (selectedDate: Date) => {
  const currentHour = selectedDate.getHours()
  let currentMinutes = selectedDate.getMinutes()

  currentMinutes = roundToNearestHalfHour(currentMinutes)

  if (currentHour >= workingHours.from && currentHour < workingHours.till) {
    return currentHour + currentMinutes / 60
  }

  if (currentHour < workingHours.from) {
    return workingHours.from
  }

  return null
}
export const isActiveTime = (time: Date) => {
  if (
    time.getHours() > workingHours.from &&
    time.getHours() < workingHours.till
  ) {
    return false
  }
  return !reservedTime.some((date) => date.getHours() === time.getHours())
}

export const getToday = () => new Date(new Date().setHours(0, 0, 0, 0))
