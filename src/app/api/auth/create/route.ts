import { type Response, responses } from 'app/api/types'
import { getUserIdFromRequest } from 'app/api/helpers'
import type {
  SignUpRequest,
  SignUpResponse,
} from 'app/api/auth/identification/types'
import { userService } from 'app/api/services/user-service'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { logger } from 'backend/logger'

export async function POST(
  request: Request,
): Promise<NextResponse<SignUpResponse | Response>> {
  const { login, password, name } = (await request.json()) as SignUpRequest

  const id = getUserIdFromRequest(request)

  if (!id) {
    return NextResponse.json(
      {
        ...responses.ForbiddenError,
      },
      responses.InternalError,
    )
  }

  const created = await userService.find({ login })

  if (created) {
    return NextResponse.json(
      {
        ...responses.ExistError,
      },
      responses.ExistError,
    )
  }

  const newUser = await userService.create(
    {
      phone: login,
      password: bcrypt.hashSync(password, 2),
      email: null,
      name,
    },
    true,
  )

  if (!newUser) {
    return NextResponse.json(
      {
        ...responses.InternalError,
        message: 'чет не то, создание юзера упало',
      },
      responses.InternalError,
    )
  }

  logger.warn(password, 'стал', newUser)

  return NextResponse.json(
    {
      ...responses.Ok,
      name,
    },
    responses.Ok,
  )
}
