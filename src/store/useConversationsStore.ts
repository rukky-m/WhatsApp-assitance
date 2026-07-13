import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type Conversation = {
  id: string;
  name: string;
  lastMessage: string;
  unread: number;
  avatar?: string;
};

type ConversationsState = {
  conversations: Conversation[];
  selectedConversationId: string | null;
  loading: boolean;
  setConversations: (convs: Conversation[]) => void;
  selectConversation: (id: string) => void;
  setLoading: (loading: boolean) => void;
};

export const useConversationsStore = create<ConversationsState>()(
  immer((set) => ({
    conversations: [],
    selectedConversationId: null,
    loading: false,
    setConversations: (convs) =>
      set((state) => {
        state.conversations = convs;
      }),
    selectConversation: (id) =>
      set((state) => {
        state.selectedConversationId = id;
      }),
    setLoading: (loading) =>
      set((state) => {
        state.loading = loading;
      }),
  }))
);
