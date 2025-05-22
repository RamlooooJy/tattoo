import type { Course } from 'types/types'

type Cache = {
  courses: Course[]
}

export const cache: Cache = {
  courses: [
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
  ],
}
