import type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
  RawAxiosResponseHeaders,
} from 'axios'

export type HTTPClientConfig = {
  options?: AxiosRequestConfig
  handleErrorResponse?: <T>(error: T) => void
}

export type Response<T> = AxiosResponse<T>

export enum HTTPMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export type ExtraRequestConfig = {
  polling?: number
}

export type MakeRequestParamsBase<RequestData> = {
  method: HTTPMethod
  url: string
  data?: RequestData
  config?: AxiosRequestConfig & ExtraRequestConfig
}

export type MakeRequestParams<ResponseData, RequestData> =
  MakeRequestParamsBase<RequestData> & {
    onSuccess?: (response: AxiosResponse<ResponseData>) => void | Promise<void>
    onLoading?: (loading: boolean) => void | Promise<void>
    onError?: (error: unknown) => void | Promise<void>
  }

export type MakeRequestWithResponseParams<RequestData> =
  MakeRequestParamsBase<RequestData> & {
    disableErrorHandling?: boolean
  }

export type SuccessResponse<ResponseData> = {
  response: ResponseData
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders
  error: null
}

export type ErrorResponse = {
  response: null
  headers?: RawAxiosResponseHeaders | AxiosResponseHeaders
  error: unknown
}

export type CommonResponseResult<T> = ErrorResponse | SuccessResponse<T>

export type MakeRequestWithResponseReturn<ResponseData> = Promise<
  SuccessResponse<ResponseData> | ErrorResponse
>

export enum ErrorCodes {
  CanceledError = 'ERR_CANCELED',
}
