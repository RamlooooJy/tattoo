import type { Response } from 'app/api/types'

export type ReservationRequest = {
  dateFrom: Date
  dateTo: Date
  // userId: User['id']
}
export type ReservationResponse = Response
