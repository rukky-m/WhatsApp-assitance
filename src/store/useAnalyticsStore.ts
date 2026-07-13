import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface AnalyticsData {
  period: string // e.g., '2023-01'
  messagesSent: number
  aiReplies: number
  responseTimeAvg: number // in seconds
}

interface AnalyticsState {
  data: AnalyticsData[]
  loading: boolean
  setData: (d: AnalyticsData[]) => void
  setLoading: (l: boolean) => void
}

export const useAnalyticsStore = create<AnalyticsState>()(
  devtools((set) => ({
    data: [],
    loading: false,
    setData: (d) => set({ data: d }),
    setLoading: (l) => set({ loading: l }),
  }))
)
