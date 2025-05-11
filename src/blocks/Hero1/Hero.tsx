import { Button } from 'components/ui/button'
import { cn, getBackgroundImage, navigation } from 'lib/utils'
import type { FC } from 'react'
import { ContactFormTrigger } from 'components/ContactForm'
import { AnimationSlideX } from 'components/Animations/AnimationSlideX'

export const Hero: FC = () => {
  const { backgroundImageClassName } = getBackgroundImage('')

  return (
    <section
      id={navigation.main}
      style={
        {
          '--local-background': 'var(--background-hero)',
        } as React.CSSProperties
      }
      className={cn(
        backgroundImageClassName,
        'screenHeight grid items-center p-4 overflow-hidden',
      )}
    >
      <div className={'grid gap-4 '}>
        <div className={'grid gap-3'}>
          <AnimationSlideX type={'right'} delay={0.2}>
            <h2 className={'text-3xl font-bold'}>
              Запишитесь на{' '}
              <span className={'text-chart-4'}>бесплатно пробное</span> занятие
            </h2>
          </AnimationSlideX>
          <AnimationSlideX type={'left'} delay={0.6}>
            <h2 className={'font-bold text-3xl'}>
              ПРАКТИКУМ ПРОХОДИТ В Москве
            </h2>
          </AnimationSlideX>
          <AnimationSlideX type={'right'} delay={1}>
            <p className={'text-base'}>
              Набейте свою первую татуировку под руководством мастеров taurus
              tattoo academy
            </p>
          </AnimationSlideX>
        </div>
        <AnimationSlideX type={'left'} delay={1}>
          <ContactFormTrigger>
            <Button size={'lg'}>Записаться</Button>
          </ContactFormTrigger>
        </AnimationSlideX>
      </div>
    </section>
  )
}
