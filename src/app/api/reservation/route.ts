import { NextResponse } from 'next/server'
import { responses } from 'app/api/types'
import type { AuthenticationRequest } from 'app/api/auth/identification/types'
import { logger } from '../../../backend/logger'
import type { ReservationResponse } from 'app/api/reservation/reservation.types'

/**
 * Бронирование
 * todo
 *  1) Get все брони
 *  2) Post бронь
 *  3) Post отмена брони
 *
 */
export async function POST(
  request: Request,
): Promise<NextResponse<ReservationResponse>> {
  try {
    const { login, password } = (await request.json()) as AuthenticationRequest

    if (!login || !password) {
      logger.error('Ошибка входа, нет пароля или логина', { login, password })
      return NextResponse.json(responses.ForbiddenError)
    }

    return NextResponse.json(responses.Ok)
  } catch (error) {
    logger.error('reservation: Ошибка ', error)
    return NextResponse.json(
      { ...responses.InternalError, message: JSON.stringify(error) },
      responses.InternalError,
    )
  }
}
