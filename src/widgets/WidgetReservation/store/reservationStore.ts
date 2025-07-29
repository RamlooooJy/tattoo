import { create } from 'zustand'
import type { TimeParams } from '../types'
import { http, HTTPMethod } from 'lib/http'
import type {
  CreateReservationRequest,
  CreateReservationResponse,
  DeleteManyReservationRequest,
  DeleteManyReservationResponse,
  DeleteReservationParams,
  DeleteReservationRequest,
  DeleteReservationResponse,
  GetReservationsRequest,
  GetReservationsResponse,
} from 'app/api/reservation/reservation.types'
import type { Reservation } from 'prisma/index'
import { startPolling } from 'utils/interval'

type ReservationState = {
  currentMonth: Date
  setCurrentMonth: (currentMonth: Date) => void
  reservations: null | Reservation[]

  reserve(params: TimeParams): void
  getReservations(): void
  deleteReservation(id: DeleteReservationParams['id'], selectedDate: Date): void
  deleteReservationBefore(date?: Date): void
}

const createReservationPath = '/reservation/create'
const getReservationPath = '/reservation'
const deleteReservationPath = '/reservation/delete'
const deleteManyReservationPath = '/reservation/deleteMany'

const reservationStore = create<ReservationState>()(
  // persist(
  (set, get) => ({
    reservations: null,
    currentMonth: new Date(),
    setCurrentMonth: (date) => {
      set({ currentMonth: date })
    },
    getReservations: () => {
      startPolling(
        () => {
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
                  (a, b) =>
                    new Date(b.created).getTime() -
                    new Date(a.created).getTime(),
                ),
              })
            })
        },
        getReservationPath,
        15_000,
      )
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
    deleteReservationBefore(date) {
      const deleteBeforeDate =
        date ?? new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)

      void http.makeRequestWithResponse<
        DeleteManyReservationResponse,
        DeleteManyReservationRequest
      >({
        config: {
          withCredentials: true,
        },
        method: HTTPMethod.POST,
        url: deleteManyReservationPath,
        data: {
          date: deleteBeforeDate,
        },
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
    deleteReservationBefore:
      reservationStore.getState().deleteReservationBefore,
    reserve: reservationStore.getState().reserve,
    setCurrentMonth: reservationStore.getState().setCurrentMonth,
    getReservations: reservationStore.getState().getReservations,
    deleteReservation: reservationStore.getState().deleteReservation,
  },
}
