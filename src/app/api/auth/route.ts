import { NextResponse } from 'next/server'
import { responses } from 'app/api/types'
import type {
  AuthenticationRequest,
  AuthenticationResponse,
} from 'app/api/auth/identification/types'
import { logger } from '../../../backend/logger'
import { userService } from 'app/api/auth/create/service'
import bcrypt from 'bcrypt'
import { RolesMap } from 'lib/http/types/user.types'
import jwt from 'jsonwebtoken'
import { getSecret } from 'app/api/helpers'

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
export async function POST(
  request: Request,
): Promise<NextResponse<AuthenticationResponse>> {
  try {
    const { login, password } = (await request.json()) as AuthenticationRequest

    if (!login || !password) {
      logger.error('Ошибка входа, нет пароля или логина', { login, password })
      return NextResponse.json(responses.ForbiddenError)
    }

    const user = await userService.find({ login })
    if (!user) {
      logger.error('Ошибка входа, нет логина', { login, password })
      return NextResponse.json(
        { ...responses.ForbiddenError, message: 'Неверный логин' },
        { status: 401 },
      )
    }

    if (RolesMap.ADMIN !== user.roleId || !user.password) {
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

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword)
      return NextResponse.json(
        { ...responses.ForbiddenError, message: 'Неверный пароль' },
        { status: 401 },
      )

    const token = jwt.sign(
      { userId: user.id, username: user.phone },
      getSecret(),
      // { expiresIn: '' }, // todo expiration after refresh if needed
    )

    return NextResponse.json({ ...responses.Ok, accessToken: token })
  } catch (error) {
    logger.error('auth: Ошибка входа ', error)
    return NextResponse.json(
      { ...responses.InternalError, message: JSON.stringify(error) },
      responses.InternalError,
    )
  }
}
