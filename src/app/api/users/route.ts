import { NextResponse } from 'next/server'
import { responses } from 'app/api/types'
import type { AuthenticationResponse } from 'app/api/auth/identification/types'
import { logger } from '../../../backend/logger'
import { getUserIdFromRequest } from 'app/api/helpers'
import { userService } from 'app/api/services/user-service'

/**
 * Авторизация пользователя: проверяет логин и пароль, возвращает JWT токен.
 *
 * TODO:
 *  1) Сделать нормальный проброс ошибок (сейчас ошибки логируются, но не прокидываются наружу).
 *  2) Сделать рефреш токена для обновления сессии.
 *  3) Сделать авторизацию только по паролю, а логин сохранять в сторедже  (на клиенте, тут все так)
 *  4) Убрать ошибки текстом
 *
 * @param {string} login - Логин пользователя
 * @param {string} password - Пароль пользователя
 * @returns {Promise<string>} Возвращает JWT токен при успешной авторизации
 * @throws {Error} Бросает ошибку, если авторизация не удалась
 */
export async function GET(
  request: Request,
): Promise<NextResponse<AuthenticationResponse>> {
  try {
    const userId = getUserIdFromRequest(request)

    if (!userId) {
      logger.error(
        'auth: Ошибка входа, нет пароля или роль не админ или хуй знает',
        responses.ForbiddenError,
      )

      return NextResponse.json(
        {
          ...responses.ForbiddenError,
          message: 'Либо ты ошибся номером, либо хули ты тут делаешь',
        },
        { status: 401 },
      )
    }

    const users = await userService.getUsers()
    if (!users) {
      logger.warn('Нет пользователей')
      return NextResponse.json({ ...responses.Empty })
    }

    return NextResponse.json({
      ...responses.Ok,
      users,
    })
  } catch (error) {
    logger.error('auth: Ошибка поиска пользователей ', error)
    return NextResponse.json(
      { ...responses.InternalError, message: JSON.stringify(error) },
      responses.InternalError,
    )
  }
}
