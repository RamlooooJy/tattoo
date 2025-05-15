import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { appKey } from 'components/WidgetReservation/constants'
import { CustomEventType, eventBus } from 'lib/eventBus'

type AuthStore = {
  isFirstLoad: boolean
  isAdmin: boolean
  accessToken: string
  isLoggedIn(): boolean
  setAccessToken(token: string): void
  signIn(data: {
    login: string
    password: string
  }): Promise<void>
  authenticate(data: {
    login: string
  }): Promise<boolean>
}

const accepted = [79995232783, 79169071111]

const authStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isFirstLoad: true,
      isAdmin: false,
      accessToken: '',
      isLoggedIn: () => {
        return !!get().accessToken
      },
      setAccessToken: (token) => {
        set({ accessToken: token })
      },
      async signIn({ login, password }) {
        get().setAccessToken(`accessToken ${login} ${password}`)
      },
      async authenticate({ login }) {
        return new Promise((resolve) => {
          setTimeout(() => {
            const isAccepted = accepted.includes(Number(login))
            if (isAccepted) {
              set({ isAdmin: true })
            }
            resolve(isAccepted)
          }, 1000)
        })
      },
    }),
    {
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
    authenticate: authStore.getState().authenticate,
    setFirstLoad: () => authStore.setState({ isFirstLoad: false }),
    clearAuthentication: () => {
      auth.actions.setFirstLoad()
      eventBus.emit(CustomEventType.AuthenticationValidationReceived)
    },
  },
}
