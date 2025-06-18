import { responses } from 'app/api/types'
import type { DeleteReservationParams } from 'app/api/reservation/reservation.types'
import { reservationService } from 'app/api/reservation/reservation.service'
import { getUserIdFromRequest } from 'app/api/helpers'

export async function POST(request: Request) {
  const userId = getUserIdFromRequest(request)

  if (!userId) {
    return Response.json(responses.ForbiddenError)
  }

  const { id } = (await request.json()) as unknown as DeleteReservationParams

  const result = await reservationService.deleteReservation(id)

  if (!result) {
    return Response.json(responses.NotFoundError)
  }

  return Response.json(responses.Ok)
}
