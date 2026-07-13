import { Avatar } from '@/components/ui';
import { cn } from '@/utils/cn';

export type ChatMessageProps = {
  message: {
    id: string;
    sender: 'user' | 'ai';
    content: string;
    timestamp: string;
  };
};

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.sender === 'user';
  return (
    <div className={cn('flex items-start gap-2', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && <Avatar name="AI" size="sm" className="flex-shrink-0" />}
      <div
        className={cn(
          'rounded-lg p-2 text-sm max-w-xs break-words',
          isUser ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
        )}
      >
        <p>{message.content}</p>
        <span className="block text-xs text-muted-foreground text-right mt-1">{message.timestamp}</span>
      </div>
      {isUser && <Avatar name="You" size="sm" className="flex-shrink-0" />}
    </div>
  );
};
