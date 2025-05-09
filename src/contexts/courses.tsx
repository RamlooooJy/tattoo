'use client'

import { createContext, type FC, type PropsWithChildren } from 'react'
import type { Courses } from 'types/types'

export const CoursesContext = createContext<Courses | null>(null)
export const CoursesProvider: FC<PropsWithChildren<Courses>> = ({
  children,
  courses,
}) => {
  return (
    <CoursesContext.Provider value={{ courses }}>
      {children}
    </CoursesContext.Provider>
  )
}
