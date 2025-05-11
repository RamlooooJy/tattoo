import type { Course } from 'types/types'

type Cache = {
  courses: Course[]
}

const cache: Cache = {
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

export async function GET() {
  try {
    console.log('Fetching courses...')
    return Response.json(cache.courses)
  } catch (error) {
    console.error('Error fetching courses:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const body = await request.json()

  const newCourse: Course = {
    id: cache.courses.length + 1,
    title: body.title || 'Untitled Course',
    price: body.price || 'Free',
    description: body.description || '',
    backgroundStyle: body.backgroundStyle || 'bg-white',
    textStyle: body.textStyle || 'text-black',
    points: Array.isArray(body.points) ? body.points : [],
  }

  cache.courses.push(newCourse)

  return Response.json(newCourse, { status: 201 })
}
