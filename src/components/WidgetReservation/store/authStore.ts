import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { appKey } from 'components/WidgetReservation/constants'

type AuthStore = {
  isAuthenticated: boolean
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
  }): Promise<void>
}

const accepted = [79995232783, 79169071111]

const authStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
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
        set({ isAuthenticated: true })
        if (accepted.includes(Number(login))) {
          set({ isAdmin: true })
        }
      },
    }),
    {
      name: `${appKey}auth`,
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

const useAccessToken = () => authStore((s) => s.accessToken)
const useAuthentication = () => authStore((s) => s.isAuthenticated)
const useIsAdmin = () => authStore((s) => s.isAdmin)

export const auth = {
  hooks: {
    useAccessToken,
    useAuthentication,
    useIsAdmin,
  },
  actions: {
    signIn: authStore.getState().signIn,
    authenticate: authStore.getState().authenticate,
    clearAuthentication: () => authStore.setState({ isAuthenticated: false }),
  },
}
