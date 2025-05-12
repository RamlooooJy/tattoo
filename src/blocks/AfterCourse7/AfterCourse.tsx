import { cn, navigation } from 'lib/utils'
import img from '../../assets/after-course.jpg'
import { AnimationSlideY } from 'components/Animations/AnimationSlideY'

const AfterCourse = () => {
  return (
    <section id={navigation.afterCourse} className={cn('grid content-start')}>
      <div className={'relative'}>
        <div
          style={
            {
              '--local-background': `url(${img.src})`,
            } as React.CSSProperties
          }
          className={'background-before screenHeight'}
        />
        <AnimationSlideY
          className={
            'absolute left-0 bottom-12 right-12 justify-self-end container-max-width'
          }
        >
          <h2 className={'font-semibold text-4xl text-primary-foreground'}>
            Что будет после <br /> курса?
          </h2>
        </AnimationSlideY>
      </div>
      <div className={'bg-primary text-center px-4 py-12'}>
        <div
          className={
            'max-w-4/5 grid gap-12 justify-self-center container-max-width'
          }
        >
          {tips.map((tip) => (
            <AnimationSlideY key={tip} className={'text-primary-foreground'}>
              <p>{tip}</p>
            </AnimationSlideY>
          ))}
        </div>
      </div>
    </section>
  )
}

const tips = [
  'На последнем занятии вручается сертификат и Вы можете приступать к самостоятельной работе!',
  'Если вы успешно окончили любой курс начиная с "Базового" - можно принимать своих клиентов в студии под присмотром наставника.',
  'Вы всегда сможете обратиться за поддержкой\n' +
    'к своему преподавателю по тел., вайберу, вотсапу. Возникли вопросы по калористике или стилю?\n' +
    'Пишите!',
  'Вы окупите курс уже спустя 5 татуировок!',
]

export default AfterCourse
