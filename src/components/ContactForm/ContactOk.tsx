'use client'
import type { FC } from 'react'
import { AnimationAppear } from 'components/Animations/AnimationAppear'

export const ContactOk: FC = () => {
  return (
    <AnimationAppear className="flex flex-col justify-center items-center absolute inset-0 backdrop-blur-sm bg-muted">
      <h2 className={'text-2xl font-semibold'}>Мы с вами свяжемся!</h2>
    </AnimationAppear>
  )
}
