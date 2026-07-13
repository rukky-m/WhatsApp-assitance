import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface Profile {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

interface ProfileState {
  profile: Profile | null
  loading: boolean
  setProfile: (p: Profile) => void
  updateProfile: (updates: Partial<Profile>) => void
  setLoading: (l: boolean) => void
}

export const useProfileStore = create<ProfileState>()(
  devtools((set) => ({
    profile: null,
    loading: false,
    setProfile: (p) => set({ profile: p }),
    updateProfile: (updates) =>
      set((state) => ({
        profile: state.profile ? { ...state.profile, ...updates } : null,
      })),
    setLoading: (l) => set({ loading: l }),
  }))
)
