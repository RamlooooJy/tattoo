import type { User } from 'prisma/index'

export type UserCreatePayload = Pick<User, 'name' | 'phone' | 'email'> &
  Partial<Pick<User, 'password'>>
