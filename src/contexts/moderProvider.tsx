'use client'

import { auth } from 'widgets/WidgetReservation/store/authStore'
import type { FC, PropsWithChildren } from 'react'

export const ModeratorProvider: FC<PropsWithChildren> = ({ children }) => {
  const isModer = auth.hooks.useIsModerator()

  if (!isModer)
    return (
      <div
        className={
          'grid justify-center items-center h-screen text-red-400 font-bold text-4xl italic animate-bounce'
        }
      >
        че?
      </div>
    )

  return children
}
