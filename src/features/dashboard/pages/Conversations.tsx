import React, { useEffect, useState } from 'react';
import { useConversationsStore, type Conversation } from '@/store/useConversationsStore';
import { ConversationList } from '@/components/common/ConversationList';
import { ChatMessage } from '@/components/common/ChatMessage';
import { Input, Button, Avatar } from '@/components/ui';
import { Send, Loader2, Bot, User } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

// Mock messages per conversation id
const mockMessages: Record<string, { id: string; sender: 'user' | 'ai'; content: string; timestamp: string }[]> = {
  conv1: [
    { id: 'm1', sender: 'ai', content: 'Hello! How can I help you today?', timestamp: '10:00 AM' },
    { id: 'm2', sender: 'user', content: 'I need info about my order #1234.', timestamp: '10:01 AM' },
    { id: 'm3', sender: 'ai', content: 'Sure, your order is on the way and will arrive tomorrow.', timestamp: '10:02 AM' },
  ],
  conv2: [
    { id: 'm1', sender: 'ai', content: 'Hi! Need assistance?', timestamp: '09:15 AM' },
    { id: 'm2', sender: 'user', content: 'What are your business hours?', timestamp: '09:16 AM' },
    { id: 'm3', sender: 'ai', content: 'We are open 9am‑6pm, Monday‑Friday.', timestamp: '09:17 AM' },
  ],
};

export function Conversations() {
  const {
    conversations,
    selectedConversationId,
    setConversations,
    selectConversation,
    loading,
    setLoading,
  } = useConversationsStore();
  const [messages, setMessages] = useState([] as typeof mockMessages[string]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);

  // Load mock conversations on mount
  useEffect(() => {
    setLoading(true);
    // Simulate async fetch
    const timer = setTimeout(() => {
      setConversations([
        { id: 'conv1', name: 'Lina Boutique', lastMessage: 'Your order is on the way.', unread: 0 },
        { id: 'conv2', name: 'Maya Ibrahim', lastMessage: 'We are open 9am‑6pm.', unread: 1 },
      ]);
      // Auto‑select first conversation if none selected
      if (!selectedConversationId) selectConversation('conv1');
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Load messages when conversation changes
  useEffect(() => {
    if (selectedConversationId) {
      setMessages(mockMessages[selectedConversationId] || []);
    }
  }, [selectedConversationId]);

  const handleSend = async () => {
    if (!input.trim() || !selectedConversationId) return;
    setSending(true);
    const newMsg = {
      id: uuidv4(),
      sender: 'user' as const,
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    // Simulate AI response delay
    setTimeout(() => {
      const aiMsg = {
        id: uuidv4(),
        sender: 'ai' as const,
        content: "I'm a mock AI reply to: " + newMsg.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setSending(false);
    }, 1200);
  };

  return (
    <div className="flex h-screen bg-muted/20">
      {/* Left panel – conversation list */}
      <aside className="w-64 border-r border-border bg-background overflow-y-auto">
        <ConversationList />
      </aside>

      {/* Middle panel – chat thread */}
      <main className="flex-1 flex flex-col p-4 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {sending && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Bot size={20} className="animate-pulse" />
              <span>AI is typing...</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type a message…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={sending}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={sending || !input.trim()}>
            {sending ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
          </Button>
        </div>
      </main>

      {/* Right panel – contact details placeholder */}
      <aside className="w-64 border-l border-border bg-background p-4 hidden md:block">
        {selectedConversationId ? (
          <div className="flex flex-col items-center gap-4">
            <Avatar name={conversations.find((c) => c.id === selectedConversationId)?.name || ''} size="lg" />
            <h2 className="text-xl font-semibold text-foreground">
              {conversations.find((c) => c.id === selectedConversationId)?.name}
            </h2>
            <p className="text-sm text-muted-foreground">Contact details placeholder</p>
          </div>
        ) : (
          <p className="text-muted-foreground">Select a conversation</p>
        )}
      </aside>
    </div>
  );
}
