import { NextResponse } from 'next/server'
import { responses } from 'app/api/types'
import { logger } from '../../../backend/logger'
import type { GetReservationsResponse } from 'app/api/reservation/reservation.types'
import { reservationService } from 'app/api/reservation/reservation.service'

/**
 * Бронирование
 * todo
 *  1) Get все брони
 *  2) Post бронь
 *  3) Post отмена брони
 *
 */
export async function GET(
  request: Request,
): Promise<NextResponse<GetReservationsResponse>> {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date') as unknown as Date
    const reservations = await reservationService.getReservations(date)

    return NextResponse.json({ ...responses.Ok, reservations })
  } catch (error) {
    logger.error('get reservations: Ошибка ', error)
    return NextResponse.json(
      {
        ...responses.InternalError,
        message: JSON.stringify(error),
        reservations: [],
      },
      responses.InternalError,
    )
  }
}
