export function getOpacityFromDate(dateString: string | Date): number {
  const now = new Date()
  const inputDate = new Date(dateString)

  now.setHours(0, 0, 0, 0)
  inputDate.setHours(0, 0, 0, 0)

  const msInDay = 24 * 60 * 60 * 1000
  const daysAgo = Math.floor((now.getTime() - inputDate.getTime()) / msInDay)

  if (daysAgo < 0) return 1

  const opacity = Math.max(0.1, 0.5 / 1.3 ** daysAgo)
  return +opacity.toFixed(3)
}

export function applyBackgrounds(): void {
  const boxes = document.querySelectorAll<HTMLElement>('.box')

  boxes.forEach((box) => {
    const dateAttr = box.dataset.date
    if (!dateAttr) return

    const opacity = getOpacityFromDate(dateAttr)

    // Мягкий голубой цвет (hsl с прозрачностью через hsla)
    const bgColor = `hsla(210, 60%, 85%, ${opacity})`

    box.style.backgroundColor = bgColor
  })
}
