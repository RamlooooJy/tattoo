import { type Response, responses } from 'app/api/types'
import { getUserIdFromRequest } from 'app/api/helpers'
import { reservationService } from 'app/api/reservation/reservation.service'
import type { CreateReservationRequest } from 'app/api/reservation/reservation.types'
import { NextResponse } from 'next/server'
import { sendMail } from 'app/api/contact/sendMail'
import { userService } from 'app/api/services/user-service'

export async function POST(request: Request): Promise<NextResponse<Response>> {
  const userId = getUserIdFromRequest(request)
  const user = await userService.getUserById(userId)
  const body = (await request.json()) as CreateReservationRequest

  await reservationService.createReservation({
    ...body,
    userId,
  })

  await sendMail(
    {
      url: String(request.headers.get('origin')),
      name: String(user.name ?? 'нет имени'),
      phone: String(user.phone ?? ''),
      from: body.from,
      to: body.to,
      message: body.message ?? '',
    },
    { type: 'new_reservation' },
  )

  return NextResponse.json(responses.Ok)
}
