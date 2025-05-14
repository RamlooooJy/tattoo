import { type RefObject, useEffect } from 'react'
import { useScroll, useTransform } from 'framer-motion'

export const useInScrollSlideUp = (ref: RefObject<HTMLElement | null>) => {
  // Отслеживаем скролл внутри элемента
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'], // когда элемент входит и выходит из области видимости
  })

  // Преобразуем scrollYProgress в движение и прозрачность
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]) // от +50px до -50px
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]) // от 0 до 1

  return {
    y,
    opacity,
  }
}

export const useOutside = (ref: RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        event.target &&
        !ref.current.contains(event.target as Node)
      ) {
        alert('You clicked outside of me!')
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}
