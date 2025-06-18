import type { CustomEventType } from './eventBus'

export type CustomEventPayload =
  | {
      type: typeof CustomEventType.AuthenticationValidationReceived
      payload?: {
        id: number
      }
    }
  | {
      type: typeof CustomEventType.AccessTokenReceived
      payload: {
        accessToken: string
      }
    }

// type ExtractArgType<T, K extends keyof T> = NonNullable<T[K]> extends (
//   ...args: infer P
// ) => unknown
//   ? P[0]
//   : never

export type Unsubscribe = () => void

export type EventBusListenerArgs<TInput extends CustomEventPayload['type']> =
  Extract<CustomEventPayload, { type: TInput }> extends {
    payload: infer TPayload
  }
    ? TPayload
    : never

export type EventBusListener<TInput extends CustomEventPayload['type']> = (
  data: EventBusListenerArgs<TInput>,
) => void
