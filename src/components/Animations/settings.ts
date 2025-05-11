import type { MotionProps } from 'framer-motion'
import { produce } from 'immer'

const duration = 0.8
const durationFast = 0.2

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
    // once: true,
    amount: 0.2, // 👈 элемент считается "вошедшим", когда 20% его видны
  },
}

export const settingStraight: Pick<MotionProps, 'transition'> = {
  transition: {
    duration: durationFast,
    ease: 'easeIn',
  },
}

export const settingsNavigationItems: MotionProps = {
  transition: {
    type: 'spring',
    stiffness: 100,
    damping: 10,
    duration: 0.3,
  },
  initial: {
    opacity: 0,
    x: '100%',
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: '100%',
  },
}

export const settingsNavigationContainer: MotionProps = {
  transition: {
    duration: 0.1,
    ease: [0, 0.31, 0.7, 1.01],
  },
  initial: {
    opacity: 0,
    x: '100%',
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: '100%',
  },
}

export const getSettingsWithDelay = (delay: number, settings: MotionProps) => {
  return produce(settings, (draft) => {
    if (draft.transition) {
      draft.transition.delay = delay
    }
  })
}
