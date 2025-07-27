import { create } from 'zustand'
import type { TimeParams } from '../types'
import { http, HTTPMethod } from 'lib/http'
import type {
  CreateReservationRequest,
  CreateReservationResponse,
  DeleteReservationParams,
  DeleteReservationRequest,
  DeleteReservationResponse,
  GetReservationsRequest,
  GetReservationsResponse,
} from 'app/api/reservation/reservation.types'
import type { Reservation } from 'prisma/index'

type ReservationState = {
  currentMonth: Date
  setCurrentMonth: (currentMonth: Date) => void
  reservations: null | Reservation[]

  reserve(params: TimeParams): void
  getReservations(): void
  deleteReservation(id: DeleteReservationParams['id'], selectedDate: Date): void
}

const createReservationPath = '/reservation/create'
const getReservationPath = '/reservation'
const deleteReservationPath = '/reservation/delete'

const reservationStore = create<ReservationState>()(
  // persist(
  (set, get) => ({
    reservations: null,
    currentMonth: new Date(),
    setCurrentMonth: (date) => {
      set({ currentMonth: date })
    },
    getReservations: () => {
      http
        .makeRequestWithResponse<
          GetReservationsResponse,
          GetReservationsRequest
        >({
          method: HTTPMethod.GET,
          url: getReservationPath,
          config: {},
        })
        .then(({ response }) => {
          set({
            reservations: response?.reservations.sort(
              (a, b) => new Date(a.from).getTime() - new Date(b.from).getTime(),
            ),
          })
        })
    },
    reserve({ dateFrom, dateTo, message }) {
      if (!dateFrom || !dateTo) return

      const fetchParams = {
        from: dateFrom,
        to: dateTo,
        message,
      }

      void http
        .makeRequestWithResponse<
          CreateReservationResponse,
          CreateReservationRequest
        >({
          config: {
            withCredentials: true,
          },
          method: HTTPMethod.POST,
          url: createReservationPath,
          data: fetchParams,
        })
        .then(() => {
          get().getReservations()
        })
    },
    deleteReservation(id) {
      if (!id) return

      const fetchParams = {
        id,
      }

      void http
        .makeRequestWithResponse<
          DeleteReservationResponse,
          DeleteReservationRequest
        >({
          config: {
            withCredentials: true,
          },
          method: HTTPMethod.POST,
          url: deleteReservationPath,
          data: fetchParams,
        })
        .then(() => {
          get().getReservations()
        })
    },
  }),
)

export const reservationsStore = {
  hooks: {
    useReservations: () => reservationStore((s) => s.reservations),
    useCurrentMonth: () => reservationStore((s) => s.currentMonth),
  },
  actions: {
    reserve: reservationStore.getState().reserve,
    setCurrentMonth: reservationStore.getState().setCurrentMonth,
    getReservations: reservationStore.getState().getReservations,
    deleteReservation: reservationStore.getState().deleteReservation,
  },
}
