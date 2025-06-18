import { db } from '../../../../backend/db/init'
import type { Role, Roles } from 'prisma/index'
import type { UserCreatePayload } from 'lib/http/types/user.types'
import { logger } from '../../../../backend/logger'
import type { IdentificationRequest } from 'app/api/auth/identification/types'
import bcrypt from 'bcrypt'

class UserService {
  private roles: Role[] = []
  public async checkPassword(pass: string, userPassword: string) {
    return await bcrypt.compare(pass, userPassword)
  }
  private async getRoles() {
    if (this.roles.length === 0) {
      this.roles = await db.role.findMany()
    }

    return this.roles
  }
  async getRoleByName(name: Roles) {
    return (await this.getRoles()).find((r) => r.name === name)
  }
  async getRoleById(id: Role['id']) {
    return (await this.getRoles()).find((r) => r.id === id)
  }
  find(params: IdentificationRequest) {
    return db.user.findFirst({
      where: {
        phone: params.login,
      },
    })
  }
  async create(params: UserCreatePayload, isAdmin?: boolean) {
    try {
      const role = await this.getRoleByName(isAdmin ? 'ADMIN' : 'USER')
      if (!role) {
        logger.error('Ошибка создания пользователя: Нет ролей')
        return null
      }
      return db.user.create({
        data: {
          ...params,
          roleId: role.id,
        },
      })
    } catch (error) {
      logger.error('Ошибка создания пользователя', { error })
      throw error
    }
  }
}

export const userService = new UserService()
