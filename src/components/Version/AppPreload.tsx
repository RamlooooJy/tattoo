'use client'
import { useEffect } from 'react'

export const AppPreload = () => {
  useEffect(() => {
    window.__APP_VERSION__ = process.env.__APP_VERSION__
  }, [])

  return null
}
