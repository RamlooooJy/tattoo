import { NextResponse } from 'next/server'
import { responses } from 'app/api/types'
import type {
  AuthenticationRequest,
  AuthenticationResponse,
} from 'app/api/auth/identification/types'
import { logger } from '../../../backend/logger'
import jwt from 'jsonwebtoken'
import { getSecret, isRoleAdmin } from 'app/api/helpers'
import type { Roles } from 'prisma/index'
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
export async function POST(
  request: Request,
): Promise<NextResponse<AuthenticationResponse>> {
  try {
    // bcrypt
    //   .compare(
    //     'tmp_master',
    //     '$2b$04$60VHU2/nyEQ/23Mzbn3p2OYYSzsbRetbkpqnHiQVp3AHiPBqpH/mW',
    //   )
    //   .then((hash) => {
    //     console.log(hash, 123)
    //   })
    const { login, password } = (await request.json()) as AuthenticationRequest

    // console.log(
    //   bcrypt.compareSync(
    //     password,
    //     '$2b$04$60VHU2/nyEQ/23Mzbn3p2OYYSzsbRetbkpqnHiQVp3AHiPBqpH/mW',
    //   ),
    // )

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

    const role = await userService.getRoleById(user.roleId)

    if (!role || !isRoleAdmin(role) || !user.password) {
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

    const validPassword = await userService.checkPassword(
      password,
      user.password,
    )

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

    const res = NextResponse.json({
      ...responses.Ok,
      accessToken: token,
      userId: user.id,
      role: role.name as keyof typeof Roles,
    })

    // res.headers.append(
    //   'Set-Cookie',
    //   `token=${token}; Path=/; HttpOnly; Secure; SameSite=Lax;`,
    // )

    return res
  } catch (error) {
    logger.error('auth: Ошибка входа ', error)
    return NextResponse.json(
      { ...responses.InternalError, message: JSON.stringify(error) },
      responses.InternalError,
    )
  }
}
