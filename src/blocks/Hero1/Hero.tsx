import { Button } from 'components/ui/button'
import { cn, getBackgroundImage, navigation } from 'lib/utils'
import type { FC } from 'react'
import { ContactFormTrigger } from 'components/ContactForm'

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
        'screenHeight grid items-center p-4',
      )}
    >
      <div className={'grid gap-4 '}>
        <div className={'grid gap-3'}>
          <h2 className={'text-3xl font-bold'}>
            Запишитесь на{' '}
            <span className={'text-chart-4'}>бесплатно пробное</span> занятие
          </h2>
          <h2 className={'font-bold text-3xl'}>ПРАКТИКУМ ПРОХОДИТ В Москве</h2>
          <p className={'text-base'}>
            Набейте свою первую татуировку под руководством мастеров taurus
            tattoo academy
          </p>
        </div>
        <div>
          <ContactFormTrigger>
            <Button size={'lg'}>Записаться</Button>
          </ContactFormTrigger>
        </div>
      </div>
    </section>
  )
}
