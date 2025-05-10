import type { MotionProps } from 'framer-motion'
import { produce } from 'immer'

const duration = 0.8
const durationFast = 0.4

export const settingsSpring: Required<
  Pick<MotionProps, 'transition' | 'viewport'>
> = {
  transition: {
    delay: 0,
    type: 'spring',
    bounce: 0.4,
    duration,
  },
  viewport: {
    amount: 0.2, // 👈 элемент считается "вошедшим", когда 20% его видны
  },
}

export const settingStraight: Pick<MotionProps, 'transition'> = {
  transition: {
    duration: durationFast,
    ease: 'easeIn',
  },
}

export const getSettingsWithDelay = (delay = 0) => {
  return produce(settingsSpring, (draft) => {
    draft.transition.delay = delay
  })
}
