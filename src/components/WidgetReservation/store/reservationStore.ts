import { create } from 'zustand'
import type { Reservation } from 'components/WidgetReservation/store/reservationTypes'
import type { TimeParams } from 'components/WidgetReservation/types'
import { getToday } from 'components/WidgetReservation/helpers'

type ReservationState = {
  reservations: null | Reservation[]

  reserve(params: TimeParams): void
  fetchReservations(params: Reservation): void
}

const reservationStore = create<ReservationState>()(
  // persist(
  (set, get) => ({
    reservations: null,
    reserve({ timeFrom, timeTo, message }) {
      const res = { status: 200 } // 'await fetch'
      if (res.status !== 200 || !timeFrom || !timeTo) {
        console.log(res)
        return
      }

      const dateFrom = new Date(getToday().setHours(timeFrom))
      const dateTo = new Date(getToday().setHours(timeTo))

      get().fetchReservations({
        dateFrom,
        dateTo,
        message,
      })
    },
    fetchReservations() {
      const res = { data: [] } //  await fetch

      set({ reservations: res.data })
    },
  }),
  // {
  //   name: `${appKey}auth`,
  //   storage: createJSONStorage(() => sessionStorage),
  // },
  // ),
)

export const reservations = {
  hooks: {
    useReservations: () => reservationStore((s) => s.reservations),
  },
  actions: {
    reserve: reservationStore.getState().reserve,
    fetchReservations: reservationStore.getState().fetchReservations,
  },
}
