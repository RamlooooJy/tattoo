import type { ResponseWithData } from 'app/api/types'
import { $Enums } from 'prisma/index'
import Roles = $Enums.Roles

export type IdentificationRequest = {
  login: string
}

export type IdentificationResponse = ResponseWithData<{
  isAdmin?: boolean
}>

export type AuthenticationRequest = {
  login: string
  password: string
}

export type AuthenticationResponse = ResponseWithData<{
  accessToken?: string
  role?: Roles
  userId?: string
}>
