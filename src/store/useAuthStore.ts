import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Role = 'user' | 'moderator' | 'admin' | 'super-admin'

interface User {
  id: string
  name: string
  email: string
  role: Role
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      login: (user, token) => set({ user, isAuthenticated: true, token }),
      logout: () => set({ user: null, isAuthenticated: false, token: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
// Development helper: auto‑login with a demo user when running locally and no user is stored.
if (import.meta.env.DEV) {
  const { isAuthenticated } = useAuthStore.getState()
  if (!isAuthenticated) {
    const demoUser = {
      id: 'dev1',
      name: 'Demo User',
      email: 'user@demo.com',
      role: 'user' as Role,
    }
    useAuthStore.getState().login(demoUser, 'dev-token')
    console.info('[Auth] Auto‑logged in dev demo user')
  }
}
