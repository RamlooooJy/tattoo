import { create } from 'zustand'
import type { GetReservationParams } from './reservationTypes'
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
import { produce } from 'immer'

type ReservationState = {
  reservations: null | Reservation[]

  reserve(params: TimeParams): void
  getReservations(date: GetReservationParams['date']): void
  deleteReservation(id: DeleteReservationParams['id'], selectedDate: Date): void
}

const createReservationPath = '/reservation/create'
const getReservationPath = '/reservation'
const deleteReservationPath = '/reservation/delete'

const reservationStore = create<ReservationState>()(
  // persist(
  (set, get) => ({
    reservations: null,
    getReservations: (date) => {
      http
        .makeRequestWithResponse<
          GetReservationsResponse,
          GetReservationsRequest
        >({
          method: HTTPMethod.GET,
          url: getReservationPath,
          config: { params: { date: date.toISOString() } },
        })
        .then(({ response }) => {
          set({
            reservations: response?.reservations.map((reservation) =>
              produce(reservation, (draft) => {
                draft.from = new Date(draft.from)
                draft.to = new Date(draft.to)
              }),
            ),
          })
        })
    },
    reserve({ dateFrom, dateTo, message }) {
      if (!dateFrom) return

      const fetchParams = {
        from: dateFrom,
        to: dateTo ?? dateFrom,
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
          get().getReservations(dateFrom)
          //   todo alert
        })
    },
    deleteReservation(id, selectedDate) {
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
          get().getReservations(selectedDate)
          //   todo alert
        })
    },
  }),
)

export const reservations = {
  hooks: {
    useReservations: () => reservationStore((s) => s.reservations),
  },
  actions: {
    reserve: reservationStore.getState().reserve,
    getReservations: reservationStore.getState().getReservations,
    deleteReservation: reservationStore.getState().deleteReservation,
  },
}
