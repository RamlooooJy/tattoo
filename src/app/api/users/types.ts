import type { ResponseWithData } from 'app/api/types'
import { $Enums } from 'prisma/index'
import Roles = $Enums.Roles

export type GetUsersResponse = ResponseWithData<{
  isAdmin?: boolean
}>

export type AuthenticationResponse = ResponseWithData<{
  accessToken?: string
  role?: Roles
  userId?: string
}>
