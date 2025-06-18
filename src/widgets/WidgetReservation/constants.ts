export const appKey = process.env.NEXT_PUBLIC_STORAGE_KEY ?? 'key'

export const mobileBreakpoint = 640

export const workingHours = {
  from: 8,
  till: 23,
}

// todo store
export const disabledDates = []
export const reservedTime = []

export const bookTimeList = [
  ...new Array(workingHours.till - workingHours.from + 1),
].map((_, idx) => workingHours.from + idx)
