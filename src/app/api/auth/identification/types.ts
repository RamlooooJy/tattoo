import type { ResponseWithData } from 'app/api/types'

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
}>
