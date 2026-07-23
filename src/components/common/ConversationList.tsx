import React from 'react';

import { Avatar } from '@/components/ui';
import { useConversationsStore, type Conversation } from '@/store/useConversationsStore';
import clsx from 'clsx';

export function ConversationList() {
  const { conversations, selectedConversationId, selectConversation, loading } = useConversationsStore();

  if (loading) {
    return <div className="p-4 text-muted-foreground">Loading conversations…</div>;
  }

  return (
    <div className="h-full overflow-y-auto">
      {conversations.map((conv: Conversation) => {
        const isActive = conv.id === selectedConversationId;
        return (
          <button
            key={conv.id}
            onClick={() => selectConversation(conv.id)}
            className={clsx(
              'flex w-full items-center gap-3 p-3 rounded-lg transition-colors hover:bg-muted',
              isActive ? 'bg-primary/10' : ''
            )}
          >
            <Avatar name={conv.name} size="sm" className="shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{conv.name}</p>
              <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
            </div>
            {conv.unread > 0 && (
              <div className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-medium text-emerald-foreground">
                {conv.unread}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
