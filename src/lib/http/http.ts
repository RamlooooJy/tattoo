import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import {
  ErrorCodes,
  type HTTPClientConfig,
  HTTPMethod,
  type MakeRequestParams,
  type MakeRequestWithResponseParams,
  type MakeRequestWithResponseReturn,
  type PollParams,
  type Response,
} from './types'
import { CustomEventType, eventBus } from 'lib/eventBus'

export class HTTPClient {
  public http: AxiosInstance
  public abortControllers: AbortController[] = []
  private accessToken = ''
  private pollingMap: Map<string, typeof setTimeout> = new Map()
  private options: AxiosRequestConfig = {
    validateStatus: (status) => status >= 200 && status < 400,
  }

  constructor(httpClientConfig: HTTPClientConfig) {
    eventBus.on(CustomEventType.AccessTokenReceived, ({ accessToken }) => {
      this.accessToken = accessToken
    })
    const { options, handleErrorResponse } = httpClientConfig

    this.http = axios.create({
      ...this.options,
      ...options,
    })
    this.handleErrorResponse = handleErrorResponse ?? this.handleErrorResponse
  }

  public get = async <ResponseData>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<Response<ResponseData>> => {
    const controller = new AbortController()

    this.abortControllers.push(controller)
    const result = await this.http.get<ResponseData>(url, {
      ...this.options,
      ...{
        ...config,
        headers: {
          ...config?.headers,
          ...this.getAuthHeader(config?.withCredentials),
        },
      },
      signal: config?.signal || controller.signal,
    })

    return result
  }

  public post = async <ResponseData, RequestData>(
    url: string,
    data?: RequestData,
    config?: AxiosRequestConfig,
  ): Promise<Response<ResponseData>> => {
    const controller = new AbortController()
    const { withCredentials } = config ?? {}

    this.abortControllers.push(controller)
    const result = await this.http.post<
      ResponseData,
      Response<ResponseData>,
      RequestData
    >(url, data, {
      ...this.options,
      ...{
        ...config,
        headers: {
          ...config?.headers,
          ...this.getAuthHeader(withCredentials),
        },
      },
      signal: config?.signal || controller.signal,
    })

    return result
  }

  public put = async <ResponseData, RequestData>(
    url: string,
    data?: RequestData,
    config?: AxiosRequestConfig,
  ): Promise<Response<ResponseData>> => {
    const controller = new AbortController()

    this.abortControllers.push(controller)
    const result = await this.http.put<
      ResponseData,
      Response<ResponseData>,
      RequestData
    >(url, data, {
      ...this.options,
      ...config,
      signal: config?.signal || controller.signal,
    })

    return result
  }

  public delete = async <ResponseData>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<Response<ResponseData>> => {
    const controller = new AbortController()

    this.abortControllers.push(controller)
    const result = await this.http.get<ResponseData>(url, {
      ...this.options,
      ...config,
      signal: config?.signal || controller.signal,
    })

    return result
  }

  private request = async <ResponseData, RequestData = undefined>(
    method: HTTPMethod,
    url: string,
    config?: AxiosRequestConfig,
    data?: RequestData,
  ): Promise<Response<ResponseData>> => {
    switch (method) {
      case HTTPMethod.GET:
      case HTTPMethod.DELETE:
        return this[method]<ResponseData>(url, {
          ...config,
        })
      case HTTPMethod.POST:
      case HTTPMethod.PUT:
        return this[method]<ResponseData, RequestData>(url, data, config)
      default:
        throw new Error(`Unsupported method: ${method}`)
    }
  }

  public makeRequest = async <ResponseData, RequestData = undefined>({
    method,
    url,
    data,
    config = {},
    onSuccess,
    onLoading,
    onError,
  }: MakeRequestParams<ResponseData, RequestData>): Promise<void> => {
    try {
      onLoading?.(true)
      const response = await this.request<ResponseData, RequestData>(
        method,
        url,
        config,
        data,
      )

      onSuccess?.(response)
    } catch (error) {
      const isRequestCanceled =
        axios.isAxiosError(error) && error.code === ErrorCodes.CanceledError

      if (isRequestCanceled) return
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onError?.(error) ?? this.handleErrorResponse(error)
    } finally {
      onLoading?.(false)
    }
  }

  private getAuthHeader = (withCredentials: boolean | undefined) => {
    if (!withCredentials) return {}

    return {
      Authorization: `Bearer ${this.accessToken}`,
    }
  }

  public makeRequestWithResponse = async <
    ResponseData,
    RequestData = undefined,
  >({
    method,
    url,
    data,
    config = {},
    disableErrorHandling = false,
  }: MakeRequestWithResponseParams<RequestData>): MakeRequestWithResponseReturn<ResponseData> => {
    try {
      const response = await this.request<ResponseData, RequestData>(
        method,
        url,
        config,
        data,
      )
      return { response: response.data, headers: response.headers, error: null } // Ensure response is the data property of AxiosResponse
    } catch (error) {
      const isRequestCanceled =
        axios.isAxiosError(error) && error.code === ErrorCodes.CanceledError

      // if request was aborted or error handling was disabled by us we don't need to handle this error
      if (!isRequestCanceled && !disableErrorHandling)
        this.handleErrorResponse(error)

      return { response: null, error } // Return error as is, could be an AxiosError or custom error
    }
  }

  public poll = ({ fn, validate, interval, maxAttempts }: PollParams) => {
    let attempts = 0

    const executePoll = async (
      resolve: <T>(result: T) => void,
      reject: <T>(reason?: T) => void,
    ) => {
      const result = await fn()

      attempts++

      if (validate?.(result)) {
        return resolve(result)
      }
      if (maxAttempts && attempts === maxAttempts) {
        return reject(new Error('Exceeded max attempts'))
      }
      setTimeout(executePoll, interval, resolve, reject)
    }

    return new Promise(executePoll)
  }

  public setOptions = (options: AxiosRequestConfig) => {
    this.options = {
      ...this.options,
      ...options,
    }
  }

  public abortAllRequests = () => {
    this.abortControllers.forEach((controller) => {
      if (controller.signal.aborted) return

      controller.abort()
    })
    this.abortControllers = []
  }

  public handleErrorResponse = <T>(error: T) => {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.Error.Message)
    } else if (error instanceof Error) {
      console.log(error.message)
    } else {
      console.log(error)
    }
  }
}
