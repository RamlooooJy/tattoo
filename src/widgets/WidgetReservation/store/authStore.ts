import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { appKey } from '../constants'
import { CustomEventType, eventBus } from 'lib/eventBus'
import { http, HTTPMethod } from 'lib/http'
import type {
  AuthenticationRequest,
  AuthenticationResponse,
  IdentificationRequest,
  IdentificationResponse,
} from 'app/api/auth/identification/types'
import type { Role } from 'types/enums'
import type { User } from 'prisma/client'
import type { ResponseWithData } from 'app/api/types'

type UserRole = {
  role: Role
  userId: AuthenticationResponse['userId']
}
type AuthStore = {
  users: User[]
  user: UserRole | null
  isFirstLoad: boolean
  isAdmin: boolean
  accessToken: string
  isLoggedIn(): boolean
  signIn(data: {
    login: string
    password: string
  }): Promise<boolean>
  identify(data: {
    phone: string
  }): Promise<boolean>
  getUsers(): Promise<Array<User>>
}
/**
 * todo
 *  1) types
 *  2) password
 *  3) db password
 *
 * */

const getUsersPatch = '/users'
const identificationPath = '/auth/identification'
const authPath = '/auth'

const authStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],
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
            set({
              accessToken: response?.accessToken,
            })

            eventBus.emit(CustomEventType.AccessTokenReceived, {
              accessToken: response?.accessToken,
            })

            if (response.role && response.userId) {
              set({ user: { role: response.role, userId: response.userId } })
            }

            set({ isAdmin: true })
            return true
          })
      },

      async getUsers() {
        return await http
          .makeRequestWithResponse<ResponseWithData<{ users: User[] }>, never>({
            config: {
              withCredentials: true,
            },
            method: HTTPMethod.GET,
            url: getUsersPatch,
          })
          .then(({ response }) => {
            const users = response?.users ?? []
            set({ users })
            return users
          })
      },

      async identify({ phone }) {
        return await http
          .makeRequestWithResponse<
            IdentificationResponse,
            IdentificationRequest
          >({
            method: HTTPMethod.POST,
            url: identificationPath,
            data: {
              login: phone,
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
      onRehydrateStorage: () => (state) => {
        if (state?.accessToken) {
          eventBus.emit(CustomEventType.AccessTokenReceived, {
            accessToken: state?.accessToken,
          })
        }
      },
    },
  ),
)

const useAccessToken = () => authStore((s) => s.accessToken)
const useIsAdmin = () => authStore((s) => s.isAdmin)
const useUser = () => authStore((s) => s.user)
const useIsFirstLoad = () => authStore((s) => s.isFirstLoad)
const userUsers = () => authStore((s) => s.users)

export const auth = {
  hooks: {
    useAccessToken,
    useIsAdmin,
    useUser,
    useIsFirstLoad,
    userUsers,
  },
  actions: {
    getUsers() {
      return authStore.getState().getUsers()
    },
    getAccessToken() {
      return authStore.getState().accessToken
    },
    signIn: authStore.getState().signIn,
    identify: authStore.getState().identify,
    setFirstLoad: () => authStore.setState({ isFirstLoad: false }),
    clearAuthentication: () => {
      auth.actions.setFirstLoad()
      eventBus.emit(CustomEventType.AuthenticationValidationReceived)
    },
  },
}
