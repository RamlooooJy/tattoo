import { responses } from 'app/api/types'
import type { DeleteManyReservationParams } from 'app/api/reservation/reservation.types'
import { getUserIdFromRequest } from 'app/api/helpers'
import { logger } from 'backend/logger'
import { reservationService } from 'app/api/reservation/reservation.service'

export async function POST(request: Request) {
  const userId = getUserIdFromRequest(request)

  if (!userId) {
    return Response.json(responses.ForbiddenError)
  }

  const { date } =
    (await request.json()) as unknown as DeleteManyReservationParams

  const result = await reservationService.deleteManyReservation(date)

  // if (!result) {
  //   return Response.json(responses.NotFoundError)
  // }

  logger.info('todo', date)

  return Response.json(responses.Ok)
}
