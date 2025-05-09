import { navigation } from 'lib/utils'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export const Info = () => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)

  return (
    <section
      ref={ref}
      id={navigation.info}
      className={
        'block-wrapper grid gap-4 content-start bg-primary text-primary-foreground'
      }
    >
      <div className={'p-12 gap-2 grid'}>
        <motion.h2 className={'text-2xl font-medium'}>ЦЕЛЬ КУРСА</motion.h2>
        <p className={'pl-5'}>
          Главная цель нашей команды – научить вас наносить безопасные, грамотно
          расположенные и правильно выполненные татуировки. Мы готовы помочь
          избежать ошибок и сделать твой первый шаг в профессию интересным,
          веселым и максимально информативным.
        </p>
        <p className={'pl-5'}>
          Смело записывайся, даже если вообще не умеешь рисовать — научим.
        </p>
      </div>
      <div className={'p-12 gap-2 grid'}>
        <h2 className={'text-2xl font-medium'}>для кого</h2>
        <p className={'pl-5'}>
          Менять жизнь в лучшую сторону можно и нужно в любом возрасте! Мы ждем
          тебя если тебе 14, мы ждем тебя если тебе 60. Найдем подход и будем
          развиваться вместе)
        </p>
      </div>
    </section>
  )
}
