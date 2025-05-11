import { course } from 'assets/urls'
import { Button } from 'components/ui/button'
import { navigation } from 'lib/utils'
import type { FC } from 'react'
import { ContactFormTrigger } from 'components/ContactForm/ContactFormModal'
import { AnimationSlideY } from 'components/Animations/AnimationSlideY'

export const Course: FC = () => {
  return (
    <section
      id={navigation.course}
      className={'bg-accent text-accent-foreground gap-4 grid content-start'}
    >
      <AnimationSlideY>
        <h2 className={'text-2xl font-semibold p-12'}>Ты научишься</h2>
      </AnimationSlideY>
      <AnimationSlideY>
        <img
          src={course}
          className={'w-full max-h-80 object-contain'}
          alt={''}
        />
      </AnimationSlideY>
      <div className={'p-12 grid gap-3'}>
        <div className={'grid gap-2 text-lg'}>
          <AnimationSlideY>
            <p>
              Ты научишься бить классные татуировки! Ты станешь мастером! Тебе
              будут завидовать друзья!
            </p>
          </AnimationSlideY>
          <AnimationSlideY>
            <p>Не веришь? Приходи!</p>
          </AnimationSlideY>
        </div>
        <div>
          <ContactFormTrigger>
            <Button size={'lg'}>Хочу на курс</Button>
          </ContactFormTrigger>
        </div>
      </div>
    </section>
  )
}
