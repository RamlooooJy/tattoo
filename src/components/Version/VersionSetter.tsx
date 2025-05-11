'use client'
import { useEffect } from 'react'

export const VersionSetter = () => {
  useEffect(() => {
    window.__APP_VERSION__ = process.env.APP_VERSION
  }, [])

  return null
}
