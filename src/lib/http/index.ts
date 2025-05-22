import type { AxiosResponse } from 'axios'
import { HTTPClient } from 'lib/http/http'
import { getPath } from 'lib/utils'

export * from './http'

export {
  HTTPMethod,
  type MakeRequestWithResponseReturn,
  type ErrorResponse,
  type SuccessResponse,
  type CommonResponseResult,
} from './types'

export type Sb2boResponse<T> = {
  Data: T
  Error: null | {
    Message: string
    ErrorType: number
  }
  Success: boolean
}

export type ResponseWithAxios<T> = AxiosResponse<T>

export type Response<T> = ResponseWithAxios<Sb2boResponse<T>>

export const http = new HTTPClient({
  // baseURL: getPath(''),
  options: {
    baseURL: getPath('api'),
  },
  handleErrorResponse: <T>(error: T) => {
    // if (axios.isAxiosError(error)) {
    //   errorAlert({
    //     title: ALERT_TITLE.ERROR,
    //     message: error.response?.data?.Error?.Message,
    //   })
    // } else if (error instanceof Error) {
    //   errorAlert({ title: ALERT_TITLE.ERROR, message: error.message })
    // } else {
    console.error(error)
    // }
  },
})
