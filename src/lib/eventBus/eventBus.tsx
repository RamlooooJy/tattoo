import type {
  CustomEventPayload,
  EventBusListener,
  EventBusListenerArgs,
  Unsubscribe,
} from './types'
import { useEffect, useRef } from 'react'

export const CustomEventType = {
  AuthenticationValidationReceived: 'AuthenticationValidationReceived',
} as const

export type CustomEventType =
  (typeof CustomEventType)[keyof typeof CustomEventType]

class EventBus extends EventTarget {
  #addListener<TInput extends CustomEventPayload['type']>(
    type: CustomEventType,
    listener: EventBusListener<TInput>,
  ): Unsubscribe {
    const listenerWithDetails = (event: Event) => {
      listener((event as CustomEvent).detail as EventBusListenerArgs<TInput>)
    }

    this.addEventListener(type, listenerWithDetails, { passive: true })

    return () => {
      this.removeEventListener(type, listenerWithDetails)
    }
  }

  on<TInput extends CustomEventPayload['type']>(
    type: TInput,
    listener: EventBusListener<TInput>,
  ): Unsubscribe {
    return this.#addListener(type, listener)
  }

  onEach<TInput extends CustomEventPayload['type']>(
    types: Array<TInput>,
    listener: EventBusListener<TInput>,
  ): Unsubscribe[] {
    return types.map((type) => this.#addListener(type, listener))
  }

  once(type: CustomEventType, listener: () => void): void {
    this.addEventListener(type, listener, { once: true, passive: true })
  }

  emit<Type extends CustomEventPayload['type']>(
    ...args: Extract<CustomEventPayload, { type: Type }> extends {
      payload: infer TPayload
    }
      ? [type: Type, payload: TPayload]
      : [type: Type]
  ): void {
    const [type, payload] = args
    const event = new CustomEvent(type, { detail: payload })

    this.dispatchEvent(event)
  }
}

export const eventBus = new EventBus()

export const useEventBus = <TInput extends CustomEventPayload['type']>(
  type: TInput,
  listener?: EventBusListener<TInput>,
) => {
  const cb = useRef(listener)
  const typesRef = useRef(type)

  useEffect(() => {
    const unsub = eventBus.on(typesRef.current, (data) => cb.current?.(data))

    return () => unsub()
  }, [])

  return null
}
