import { $Enums, type User } from 'prisma/index'
import Roles = $Enums.Roles

export const RolesMap = {
  [Roles.ADMIN]: 1,
  [Roles.USER]: 2,
  [Roles.MODERATOR]: 3,
}

export type UserCreatePayload = Pick<User, 'name' | 'phone' | 'email'>
