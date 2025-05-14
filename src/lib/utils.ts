import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getBackgroundImage = (src: string) => {
  const style = {
    '--local-background': `url(${src})`,
  } as React.CSSProperties

  return { style, backgroundImageClassName: 'background-container' }
}

export const navigation = {
  main: 'main',
  info: 'info',
  course: 'course',
  program: 'program',
  result: 'result',
  price: 'price',
  afterCourse: 'afterCourse',
  diploma: 'diploma',
  reviews: 'reviews',
  reserve: 'reserve',
  about: 'about',
  questions: 'questions',
  contacts: 'contacts',
}
export type NavigationKey = keyof typeof navigation
export type NavigationAnchor = (typeof navigation)[NavigationKey]
export const navigationNames: Record<NavigationAnchor, string> = {
  [navigation.main]: 'Главная',
  [navigation.info]: 'Информация',
  [navigation.course]: 'Курс',
  [navigation.program]: 'Программа',
  [navigation.result]: 'Результаты',
  [navigation.price]: 'Стоимость',
  [navigation.afterCourse]: 'После курса',
  [navigation.diploma]: 'Диплом',
  [navigation.reviews]: 'Отзывы',
  [navigation.reserve]: 'Бронирование',
  [navigation.about]: 'О нас',
  [navigation.questions]: 'Вопросы',
  [navigation.contacts]: 'Контакты',
}

export const FormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Имя должно содержать минимум 2 символа',
    })
    .regex(/^[a-zA-Zа-яА-ЯёЁ]+( [a-zA-Zа-яА-ЯёЁ]+)*$/, {
      message:
        'Имя должно содержать только буквы, без пробелов и спецсимволов. Например: Оля, Оля Ивановна',
    }),
  phone: z.string().refine((val) => val.replaceAll(/\D/g, '').length >= 11, {
    message: 'Номер телефона должен содержать 11 цифр',
  }),
  question: z.string().optional(),
  login: z.string().regex(/^(\+7\s?\(\d{3}\)\s?\d{3}-?\d{2}-?\d{2}|7\d{10})$/, {
    message: 'Номер телефона неполный +7 (999) 555 22 33',
  }),
  loginOrPhone: z
    .string()
    .regex(
      /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\+7 \(\d{3}\) \d{3}-\d{2}-\d{2})$/,
      {
        message: 'Логин вида login@domain или +7 (999) 555 22 33',
      },
    )
    .optional(),
  password: z.string().min(4, {
    message: 'Короткий пароль',
  }),
  course: z.string().optional(),
  agreement: z.boolean().refine((val) => val, {
    message: 'Согласитесь с политикой, чтобы продолжить',
  }),
})

export type FormType = z.infer<typeof FormSchema>

export const getDefaultOrigin = () => process.env.NEXT_PUBLIC_SITE_URL
