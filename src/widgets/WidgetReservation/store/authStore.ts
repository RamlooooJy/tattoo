import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { appKey } from '../constants'
import { CustomEventType, eventBus } from 'lib/eventBus'
import type { User } from 'prisma/index'
import { http, HTTPMethod } from 'lib/http'
import type {
  AuthenticationRequest,
  AuthenticationResponse,
  IdentificationRequest,
  IdentificationResponse,
} from 'app/api/auth/identification/types'

type AuthStore = {
  user: User | null
  isFirstLoad: boolean
  isAdmin: boolean
  accessToken: string
  isLoggedIn(): boolean
  signIn(data: {
    login: string
    password: string
  }): Promise<boolean>
  identify(data: {
    login: string
  }): Promise<boolean>
}
/**
 * todo
 *  1) types
 *  2) password
 *  3) db password
 *
 * */

const identificationPath = '/auth/identification'
const authPath = '/auth'

const authStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isFirstLoad: true,
      isAdmin: false,
      accessToken: '',

      isLoggedIn: () => {
        return !!get().accessToken
      },

      async signIn({ login, password }) {
        return await http
          .makeRequestWithResponse<
            AuthenticationResponse,
            AuthenticationRequest
          >({
            method: HTTPMethod.POST,
            url: authPath,
            data: {
              login,
              password,
            },
          })
          .then(({ response }) => {
            if (!response?.accessToken) {
              return false
            }
            set({ accessToken: response?.accessToken })
            set({ isAdmin: true })
            return true
          })
      },

      async identify({ login }) {
        return await http
          .makeRequestWithResponse<
            IdentificationResponse,
            IdentificationRequest
          >({
            method: HTTPMethod.POST,
            url: identificationPath,
            data: {
              login,
            },
          })
          .then(({ response }) => {
            const isAdmin = Boolean(response?.isAdmin)

            set({ isAdmin })

            return isAdmin
          })
      },
    }),
    {
      version: 1,
      name: `${appKey}auth`,
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

const useAccessToken = () => authStore((s) => s.accessToken)
const useIsAdmin = () => authStore((s) => s.isAdmin)
const useIsFirstLoad = () => authStore((s) => s.isFirstLoad)

export const auth = {
  hooks: {
    useAccessToken,
    useIsAdmin,
    useIsFirstLoad,
  },
  actions: {
    signIn: authStore.getState().signIn,
    identify: authStore.getState().identify,
    setFirstLoad: () => authStore.setState({ isFirstLoad: false }),
    clearAuthentication: () => {
      auth.actions.setFirstLoad()
      eventBus.emit(CustomEventType.AuthenticationValidationReceived)
    },
  },
}
