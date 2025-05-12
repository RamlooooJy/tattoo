'use client'
import { useContext, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { MainContext } from '../../contexts/mainProvider'
import { settingStraight } from 'components/Animations/settings'

export const AppPreload = () => {
  const { isHydrated } = useContext(MainContext)
  useEffect(() => {
    window.__APP_VERSION__ = process.env.__APP_VERSION__
  }, [])

  /**
   * todo сомнительно
   */

  return (
    <AnimatePresence>
      {!isHydrated ? (
        <motion.div
          transition={{
            ...settingStraight,
          }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-sidebar z-50 flex flex-col justify-center items-center"
        >
          <Loader2 className={'animate-spin'} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
