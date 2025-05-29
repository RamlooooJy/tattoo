import { Button } from 'components/ui/button'
import { cn, navigation } from 'lib/utils'
import type { FC } from 'react'
import { ContactFormTrigger } from 'components/ContactForm/ContactFormModal'
import { AnimationSlideY } from 'components/Animations/AnimationSlideY'
import Image from 'next/image'
import img from 'assets/course.png'

export const Course: FC = () => {
  return (
    <section
      id={navigation.course}
      className={'bg-primary text-primary-foreground overflow-hidden'}
    >
      <div
        className={
          'container-max-width py-12 gap-4 grid content-start relative'
        }
      >
        <div
          className={
            'absolute size-full top-[5%] left-[20%] bg-blue-100/5 pointer-events-none hidden xl:block'
          }
        />

        <AnimationSlideY>
          <h2 className={'text-3xl font-semibold p-12'}>Ты научишься</h2>
        </AnimationSlideY>
        <AnimationSlideY>
          <div className={'w-full aspect-video relative'}>
            <Image
              src={img.src}
              className={cn('logo-image object-cover')}
              alt={''}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </AnimationSlideY>
        <div className={'p-12 grid gap-3 justify-end'}>
          <div
            className={'grid gap-2 text-lg xl:text-2xl font-medium max-w-2xl'}
          >
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
              <Button size={'xxxl'} className={'w-full'}>
                Хочу на курс
              </Button>
            </ContactFormTrigger>
          </div>
        </div>
      </div>
    </section>
  )
}
