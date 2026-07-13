import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface Contact {
  id: string
  name: string
  email: string
  phone?: string
}

interface ContactsState {
  contacts: Contact[]
  loading: boolean
  addContact: (c: Contact) => void
  updateContact: (id: string, updates: Partial<Contact>) => void
  deleteContact: (id: string) => void
  setLoading: (l: boolean) => void
}

export const useContactsStore = create<ContactsState>()(
  devtools((set) => ({
    contacts: [],
    loading: false,
    addContact: (c) => set((s) => ({ contacts: [...s.contacts, c] })),
    updateContact: (id, updates) =>
      set((s) => ({
        contacts: s.contacts.map((c) => (c.id === id ? { ...c, ...updates } : c)),
      })),
    deleteContact: (id) =>
      set((s) => ({ contacts: s.contacts.filter((c) => c.id !== id) })),
    setLoading: (l) => set({ loading: l }),
  }))
)
