import { Button } from 'components/ui/button'
import { cn } from '../../lib/utils'

const Result = () => {
  return (
    <div
      className={cn(
        'py-6 bg-primary text-primary-foreground gap-4 grid content-start overflow-hidden',
      )}
    >
      <div className="block-wrapper">
        <h2 className="text-3xl font-semibold">Стоимость курса</h2>
      </div>
      {courses.map((course) => (
        <div
          key={course.id}
          className={cn(
            'grid justify-self-center w-full grid-cols-1 md:max-w-10/12',
            'overflow-hidden p-12 background-before var(--background-course)',
            course.textStyle,
            course.backgroundStyle,
          )}
        >
          <div className={'relative  grid gap-6'}>
            <h3 className={'text-2xl font-semibold'}>{course.title}</h3>
            <div className={'grid grid-cols-2'}>
              {course.points.map((point) => (
                <div key={point.title} className={'grid gap-2 label p-3'}>
                  <p className={'text-xs leading-tight'}>{point.title}</p>
                  <p className={'text-lg leading-tight'}>{point.text}</p>
                </div>
              ))}
            </div>
            <div className={'grid gap-3 px-3'}>
              <div className="price">
                <p className={'text-3xl'}>{course.price}</p>
                <p className={'text-xs'}>{course.description}</p>
              </div>
              <div>
                <Button size={'lg'} variant={'outline'}>
                  Оставить заявку
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const courses = [
  {
    id: 1,
    title: 'Базовый КУРС ТАТУ',
    price: '58 000р.',
    description: 'за курс обучения мастерству тату',
    backgroundStyle: 'hue-rotate-0',
    textStyle: 'text-accent-foreground',
    points: [
      {
        title: 'Длительность',
        text: '6 дней',
      },
      {
        title: 'Время обучения',
        text: '23 ЧАСА',
      },
      {
        title: 'Теория',
        text: '3 часа',
      },
      {
        title: 'Практические занятия',
        text: '20 часов',
      },
      {
        title: 'Практика',
        text: '5 моделей',
      },
      {
        title: 'Бонус',
        text: 'Стажировка 2 недели в салоне',
      },
    ],
  },
  {
    id: 2,
    title: 'РАСШИРЕННЫЙ КУРС ТАТУ-МАСТЕРА',
    price: '72 000р.',
    description: 'за курс обучения мастерству тату',
    backgroundStyle: 'hue-rotate-45',
    textStyle: 'text-accent-foreground',
    points: [
      {
        title: 'Длительность',
        text: '11 дней',
      },
      {
        title: 'Время обучения',
        text: '40 ЧАСОВ',
      },
      {
        title: 'Теория',
        text: '3 часа',
      },
      {
        title: 'Практические занятия',
        text: '28 часов + 9 часов рисунка',
      },
      {
        title: 'Практика',
        text: '7 моделей',
      },
      {
        title: 'Бонус',
        text: 'Стажировка 1 месяц в салоне',
      },
    ],
  },
  {
    id: 3,
    title: 'ПРОДВИНУТЫЙ КУРС ТАТУ-МАСТЕРА',
    price: '82 000р.',
    description: 'за курс обучения мастерству тату',
    backgroundStyle: 'hue-rotate-90',
    textStyle: 'text-accent-foreground',
    points: [
      {
        title: 'Длительность',
        text: '15 дней',
      },
      {
        title: 'Время обучения',
        text: '53 ЧАСА',
      },
      {
        title: 'Теория',
        text: '2 часа',
      },
      {
        title: 'Практические занятия',
        text: '36 часов + 15 часов рисунка',
      },
      {
        title: 'Практика',
        text: '9 моделей',
      },
      {
        title: 'Бонус',
        text: 'Практика в салоне',
      },
    ],
  },
  {
    id: 4,
    title: 'VIP КУРС ТАТУ-МАСТЕРА',
    price: '111 000р.',
    description: 'за курс обучения мастерству тату',
    backgroundStyle: 'hue-rotate-215',
    textStyle: 'text-accent-foreground',
    points: [
      {
        title: 'Длительность',
        text: '23 дня',
      },
      {
        title: 'Время обучения',
        text: '76 ЧАСОВ',
      },
      {
        title: 'Теория',
        text: '3 часа',
      },
      {
        title: 'Практические занятия',
        text: '52 часа + 21 час рисунка',
      },
      {
        title: 'Практика',
        text: '13 моделей',
      },
      {
        title: 'Бонус',
        text: 'Практика в салоне',
      },
    ],
  },
]

export default Result
