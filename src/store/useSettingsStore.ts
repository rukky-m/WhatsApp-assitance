import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface SettingsState {
  theme: 'light' | 'dark' | 'system'
  notifications: boolean
  language: string
  setTheme: (theme: SettingsState['theme']) => void
  setNotifications: (notifications: boolean) => void
  setLanguage: (language: string) => void
}

export const useSettingsStore = create<SettingsState>()(
  devtools((set) => ({
    theme: 'system',
    notifications: true,
    language: 'en',
    setTheme: (theme) => set({ theme }),
    setNotifications: (notifications) => set({ notifications }),
    setLanguage: (language) => set({ language }),
  }))
)
