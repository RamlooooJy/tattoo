import { NextResponse } from 'next/server'
import { responses } from 'app/api/types'
import { userService } from 'app/api/auth/create/service'
import { logger } from '../../../../backend/logger'
import type {
  IdentificationRequest,
  IdentificationResponse,
} from 'app/api/auth/identification/types'
import { $Enums } from 'prisma/index'
import Roles = $Enums.Roles

/**
 * Обрабатывает POST-запрос на идентификацию пользователя.
 *
 * Если пользователь с указанным логином найден — возвращает объект с информацией,
 * включая флаг isAdmin в зависимости от роли.
 * Если пользователя нет — создаёт нового с пустыми данными, возвращает, что он новый.
 *
 * @param {Request} request — HTTP-запрос с JSON телом, содержащим поле `login`.
 *
 * @returns {Promise<Response>} JSON-ответ с результатом операции:
 *  - 200 OK с { isAdmin: boolean } если успешно
 *  - 403 Forbidden с сообщением "Введите логин", если логин не передан
 *  - 500 Internal Server Error в случае ошибки сервера
 *
 * @throws {Error} В случае непредвиденных ошибок во время выполнения
 *
 * @todo Реализовать генерацию типа Roles автоматически
 * @todo Добавить защиту от атак - ddos
 * @todo Настроить нормальный флоу ошибок
 */

export async function POST(
  request: Request,
): Promise<NextResponse<IdentificationResponse>> {
  try {
    const { login } = (await request.json()) as IdentificationRequest

    if (!login) {
      logger.error('Такого не должно было быть, зашли без логина')
      return NextResponse.json(
        {
          ...responses.ForbiddenError,
        },
        {},
      )
    }

    let user = await userService.find({ login })

    if (!user) {
      user = await userService.create({
        phone: login,
        name: null,
        email: null,
      })

      logger.warn('Новый юзер', JSON.stringify(user))
    }

    if (!user) {
      logger.warn(
        'Идентификация: Ошибка создания пользователя',
        JSON.stringify(user),
      )
      throw new Error('Идентификация: Ошибка создания пользователя')
    }

    const role = await userService.getRoleById(user.roleId)

    const isAdmin = Roles.ADMIN === role?.name

    logger.warn(
      isAdmin ? 'Вход админа' : 'Повторный вход',
      JSON.stringify({ user }),
    )

    return NextResponse.json({
      isAdmin,
      ...responses.Ok,
    })
  } catch (error) {
    logger.error(`identification error: ${error}`)

    return NextResponse.json(
      {
        ...responses.InternalError,
        message: JSON.stringify(error),
      },
      responses.InternalError,
    )
  }
}
