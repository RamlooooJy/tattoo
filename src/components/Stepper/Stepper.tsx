'use client'

import type { FC } from 'react'

const Stepper: FC = () => {
  return (
    <div className="max-w-xl p-6 space-y-6 md:max-w-2/5">
      {steps.map((step, index) => (
        <div key={step.title}>
          <div className="flex items-start space-x-4">
            <div className="text-lg font-bold text-gray-700">{index + 1}</div>
            <div>
              <div className="font-semibold text-gray-900">{step.title}</div>
              <div className="text-sm text-gray-500">{step.description}</div>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className="border-b border-destructive mt-4" />
          )}
        </div>
      ))}
    </div>
  )
}

type CourseModule = {
  id: number
  title: string
  description: string
}

const steps: CourseModule[] = [
  {
    id: 1,
    title: 'БЕЗОПАСНОСТЬ',
    description:
      'Основы гигиены, нормы СанПиН, стерилизация и безопасная работа с инструментами.',
  },
  {
    id: 2,
    title: 'СТИЛИ ТАТУ',
    description:
      'Погружение в профессию: ключевые стили, их особенности и применение.',
  },
  {
    id: 3,
    title: 'ТЕХНИКА РУКИ',
    description:
      'Отработка базовых движений, тренировки на искусственной коже, выбор оборудования под себя.',
  },
  {
    id: 4,
    title: 'ОБОРУДОВАНИЕ',
    description:
      'Разновидности тату-машинок, их настройка и подготовка к работе.',
  },
  {
    id: 5,
    title: 'ЦВЕТ И ПИГМЕНТЫ',
    description:
      'Работа с цветами: смешивание, подбор оттенков и особенности тату-пигментов.',
  },
  {
    id: 6,
    title: 'ПРАКТИКА',
    description:
      'Тренировка на латексе и живых моделях. Оттачивание навыков и закрепление техники.',
  },
  {
    id: 7,
    title: 'УХОД ЗА ТАТУ',
    description:
      'Как ухаживать за татуировкой: рекомендации клиенту, мази, этапы заживления.',
  },
  {
    id: 8,
    title: 'КЛИЕНТСКАЯ БАЗА',
    description:
      'Как находить клиентов: создание портфолио, ведение соцсетей и общение с аудиторией.',
  },
]

export default Stepper
