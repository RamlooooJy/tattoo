import type { Response, ResponseWithData } from 'app/api/types'
import type { Reservation } from 'prisma/index'

export type CreateReservationResponse = Response
export type CreateReservationParams = Pick<
  Reservation,
  'userId' | 'from' | 'to' | 'message'
>
export type CreateReservationRequest = Omit<CreateReservationParams, 'userId'>

/************************************************************************************************************/

export type GetReservationsResponse = ResponseWithData<{
  reservations: Reservation[]
}>
export type GetReservationsParams = {
  date: Date
}

export type GetReservationsRequest = GetReservationsParams
/************************************************************************************************************/

export type DeleteReservationResponse = Response
export type DeleteReservationParams = {
  id: Reservation['id']
}

export type DeleteReservationRequest = DeleteReservationParams
/************************************************************************************************************/

export type DeleteManyReservationResponse = Response
export type DeleteManyReservationParams = {
  date: Date
}

export type DeleteManyReservationRequest = DeleteManyReservationParams
