import { Roles as UserRoles } from 'prisma/client'

export type TimeParams = {
  dateFrom: Date | null
  dateTo: Date | null
  message: string | null
}

export { UserRoles }
