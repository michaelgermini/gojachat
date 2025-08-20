import React from 'react';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { ChatMessageProps } from '@/types';
import { UserAvatar } from './UserAvatar';
import { clsx } from 'clsx';

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  sender,
  isOwn,
}) => {
  const messageTime = format(new Date(message.timestamp), 'HH:mm', {
    locale: enUS,
  });

  return (
    <div
      className={clsx(
        'flex gap-3 mb-4 animate-fade-in',
        isOwn && 'flex-row-reverse'
      )}
    >
      <UserAvatar user={sender} size="sm" className="flex-shrink-0" />
      
      <div
        className={clsx(
          'flex flex-col max-w-xs lg:max-w-md',
          isOwn && 'items-end'
        )}
      >
        <div
          className={clsx(
            'px-4 py-2 rounded-lg break-words',
            isOwn
              ? 'bg-primary-500 text-white rounded-br-md'
              : 'bg-gray-100 text-gray-900 rounded-bl-md'
          )}
        >
          <p className="text-sm">{message.content}</p>
        </div>
        
        <div
          className={clsx(
            'flex items-center gap-2 mt-1 text-xs text-gray-500',
            isOwn && 'flex-row-reverse'
          )}
        >
          <span>{sender.username}</span>
          <span>•</span>
          <span>{messageTime}</span>
          {isOwn && (
            <>
              <span>•</span>
              <span className={clsx(message.read ? 'text-blue-500' : 'text-gray-400')}>
                {message.read ? '✓✓' : '✓'}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
