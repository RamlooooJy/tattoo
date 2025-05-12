'use client'

export const isMobileDeviceBySize = (sm: number): boolean | null => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    // Эта функция не должна вызываться на сервере!
    return null
  }

  const isMobileDevice =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  const { innerWidth, innerHeight } = window

  if (innerHeight > innerWidth) {
    return sm > innerWidth
  }

  if (!isMobileDevice) return false

  return isTouchDevice && sm >= innerHeight
}
