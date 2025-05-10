import { navigation } from 'lib/utils'
import { SlideY } from 'components/Animations/SlideY'

export const Info = () => {
  return (
    <section
      id={navigation.info}
      className={
        'block-wrapper grid gap-4 content-start bg-primary text-primary-foreground'
      }
    >
      <div className={'p-12 gap-2 grid'}>
        <SlideY>
          <h2 className={'text-2xl font-medium'}>ЦЕЛЬ КУРСА</h2>
        </SlideY>
        <SlideY>
          <p className={'pl-5'}>
            Главная цель нашей команды – научить вас наносить безопасные,
            грамотно расположенные и правильно выполненные татуировки. Мы готовы
            помочь избежать ошибок и сделать твой первый шаг в профессию
            интересным, веселым и максимально информативным.
          </p>
        </SlideY>
        <SlideY>
          <p className={'pl-5'}>
            Смело записывайся, даже если вообще не умеешь рисовать — научим.
          </p>
        </SlideY>
      </div>
      <div className={'p-12 gap-2 grid'}>
        <SlideY>
          <h2 className={'text-2xl font-medium'}>для кого</h2>
        </SlideY>
        <SlideY>
          <p className={'pl-5'}>
            Менять жизнь в лучшую сторону можно и нужно в любом возрасте! Мы
            ждем тебя если тебе 14, мы ждем тебя если тебе 60. Найдем подход и
            будем развиваться вместе)
          </p>
        </SlideY>
      </div>
    </section>
  )
}
