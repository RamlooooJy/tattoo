import { type Response, responses } from 'app/api/types'
import { getUserIdFromRequest } from 'app/api/helpers'
import { reservationService } from 'app/api/reservation/reservation.service'
import type { CreateReservationRequest } from 'app/api/reservation/reservation.types'
import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse<Response>> {
  const userId = getUserIdFromRequest(request)
  const body = (await request.json()) as CreateReservationRequest

  await reservationService.createReservation({ ...body, userId })

  return NextResponse.json(responses.Ok)
}
