import { getToday } from './helpers'

export const appKey = process.env.NEXT_PUBLIC_STORAGE_KEY ?? 'key'

export const mobileBreakpoint = 640

export const workingHours = {
  from: 8,
  till: 23,
}

export const disabledDates = [
  new Date(getToday().getTime() + 1000 * 60 * 60 * 24 * 2),
]
export const reservedTime = [
  new Date(getToday().setHours(15, 0, 0, 0)),
  new Date(getToday().setHours(16, 0, 0, 0)),
]
export const bookTimeList = [
  ...new Array(workingHours.till - workingHours.from + 1),
].map((_, idx) => workingHours.from + idx)
