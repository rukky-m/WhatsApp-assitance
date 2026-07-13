import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface BillingInfo {
  plan: string // e.g., 'Free', 'Pro', 'Enterprise'
  usage: number // percent used of monthly quota
  limit: number // total quota (e.g., messages per month)
}

interface BillingState {
  info: BillingInfo | null
  loading: boolean
  setInfo: (info: BillingInfo) => void
  setLoading: (l: boolean) => void
}

export const useBillingStore = create<BillingState>()(
  devtools((set) => ({
    info: null,
    loading: false,
    setInfo: (info) => set({ info }),
    setLoading: (loading) => set({ loading }),
  }))
)
