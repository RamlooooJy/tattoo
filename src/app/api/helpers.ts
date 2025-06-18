import jwt from 'jsonwebtoken'
import { logger } from '../../backend/logger'

export const getSecret = () => {
  const SECRET = process.env.JWT_SECRET
  if (!SECRET) {
    throw new Error('JWT_SECRET is required, please use JWT_SECRET variable')
  }

  return SECRET
}

export function getUserIdFromRequest(request: Request): string {
  const authHeader = request.headers.get('authorization')

  console.log(JSON.stringify(request.headers))

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger.error('Нет токена авторизации')
    throw new Error('Нет токена авторизации')
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, getSecret()) as { userId: string }

    if (!payload.userId) {
      logger.error('userId отсутствует в токене')
      throw new Error('userId отсутствует в токене')
    }

    return payload.userId
  } catch {
    logger.error('Невалидный токен')
    throw new Error('Невалидный токен ')
  }
}
