import { navigation } from 'lib/utils'
import { AnimationSlideY } from 'components/Animations/AnimationSlideY'

export const Info = () => {
  return (
    <section
      id={navigation.info}
      className={'grid gap-4 content-start bg-primary text-primary-foreground'}
    >
      <div className={'p-12 gap-2 grid'}>
        <AnimationSlideY>
          <h2 className={'text-2xl font-semibold'}>ЦЕЛЬ КУРСА</h2>
        </AnimationSlideY>
        <AnimationSlideY>
          <p className={'pl-5'}>
            Главная цель нашей команды – научить вас наносить безопасные,
            грамотно расположенные и правильно выполненные татуировки. Мы готовы
            помочь избежать ошибок и сделать твой первый шаг в профессию
            интересным, веселым и максимально информативным.
          </p>
        </AnimationSlideY>
        <AnimationSlideY>
          <p className={'pl-5'}>
            Смело записывайся, даже если вообще не умеешь рисовать — научим.
          </p>
        </AnimationSlideY>
      </div>
      <div className={'p-12 gap-2 grid'}>
        <AnimationSlideY>
          <h2 className={'text-2xl font-semibold'}>для кого</h2>
        </AnimationSlideY>
        <AnimationSlideY>
          <p className={'pl-5'}>
            Менять жизнь в лучшую сторону можно и нужно в любом возрасте! Мы
            ждем тебя если тебе 14, мы ждем тебя если тебе 60. Найдем подход и
            будем развиваться вместе)
          </p>
        </AnimationSlideY>
      </div>
    </section>
  )
}
