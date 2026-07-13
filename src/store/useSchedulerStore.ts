import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface SchedulerMessage {
  id: string
  title: string
  content: string
  scheduledAt: string // ISO date string
  recurring?: boolean
}

interface SchedulerState {
  messages: SchedulerMessage[]
  loading: boolean
  addMessage: (msg: SchedulerMessage) => void
  updateMessage: (id: string, updates: Partial<SchedulerMessage>) => void
  deleteMessage: (id: string) => void
  setLoading: (loading: boolean) => void
}

export const useSchedulerStore = create<SchedulerState>()(
  devtools((set) => ({
    messages: [],
    loading: false,
    addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
    updateMessage: (id, updates) =>
      set((state) => ({
        messages: state.messages.map((m) => (m.id === id ? { ...m, ...updates } : m)),
      })),
    deleteMessage: (id) =>
      set((state) => ({ messages: state.messages.filter((m) => m.id !== id) })),
    setLoading: (loading) => set({ loading }),
  }))
)
