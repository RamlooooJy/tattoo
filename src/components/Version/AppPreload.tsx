'use client'
import { useContext } from 'react'
import { Loader2 } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { MainContext } from '../../contexts/mainProvider'
import { settingStraight } from 'components/Animations/settings'
import { Greetings } from 'components/Greatings/Greatings'
import { WidgetReservation } from 'widgets/WidgetReservation'

export const AppPreload = () => {
  const { isHydrated } = useContext(MainContext)

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
      ) : (
        <>
          <Greetings />
          <WidgetReservation />
        </>
      )}
    </AnimatePresence>
  )
}
