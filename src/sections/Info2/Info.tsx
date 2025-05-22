import { navigation } from 'lib/utils'
import { AnimationSlideY } from 'components/Animations/AnimationSlideY'
import { Button } from 'components/ui/button'
import Link from 'next/link'

export const Info = () => {
  return (
    <section
      id={navigation.info}
      className={'bg-primary text-primary-foreground p-12 md:p-6'}
    >
      <div className={'container-max-width hidden md:grid'}>
        <h3 className={'text-sm text-center mb-12'}>
          Обучение профессиональной татуировке
        </h3>
        <h2 className={'text-3xl font-bold text-center'}>
          Академия тату-мастеров ADT
        </h2>
      </div>
      <div className="container-max-width grid gap-12 content-start md:py-6">
        <div className={'gap-2 grid md:grid-cols-2'}>
          <AnimationSlideY>
            <h2 className={'text-2xl font-semibold'}>ЦЕЛЬ КУРСА</h2>
          </AnimationSlideY>
          <AnimationSlideY>
            <p className={'pl-5'}>
              Главная цель нашей команды – научить вас наносить безопасные,
              грамотно расположенные и правильно выполненные татуировки. Мы
              готовы помочь избежать ошибок и сделать твой первый шаг в
              профессию интересным, веселым и максимально информативным.
            </p>
          </AnimationSlideY>
          <AnimationSlideY className={'md:col-start-2 md:col-end-2'}>
            <p className={'pl-5'}>
              Смело записывайся, даже если вообще не умеешь рисовать — научим.
            </p>
          </AnimationSlideY>
        </div>
        <div className={'gap-2 grid md:grid-cols-2'}>
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
        <div className={'grid justify-center'}>
          <Button asChild variant={'secondary'} size={'xxxl'}>
            <Link href={`#${navigation.result}`}>Работы учеников</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
