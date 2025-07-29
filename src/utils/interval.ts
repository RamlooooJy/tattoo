// todo need make polling request or smth
const intervals: Record<string, ReturnType<typeof setInterval>> = {}

export const startPolling = <T extends () => void>(
  fc: T,
  id: string,
  interval: number,
) => {
  stopPolling(id)
  fc()

  intervals[id] = setInterval(fc, interval)
}

export const stopPolling = (id: string) => {
  clearInterval(intervals[id])
}
