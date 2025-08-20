import React from 'react';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { ConversationItemProps } from '@/types';
import { UserAvatar } from './UserAvatar';
import { clsx } from 'clsx';

export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isActive,
  onClick,
}) => {
  const lastMessageTime = conversation.lastMessage
    ? format(new Date(conversation.lastMessage.timestamp), 'HH:mm', {
        locale: enUS,
      })
    : '';

  return (
    <div
      onClick={onClick}
      className={clsx(
        'flex items-center gap-3 p-3 cursor-pointer rounded-lg transition-colors hover:bg-gray-50',
        isActive && 'bg-primary-50 border-l-4 border-primary-500'
      )}
    >
             <UserAvatar 
         user={{ 
           id: 0, 
           username: conversation.name, 
           email: '', 
           avatar: 'https://i.pravatar.cc/150?img=' + conversation.id,
           status: 'online' as const,
           lastSeen: ''
         }} 
         size="md" 
       />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900 truncate">
            {conversation.name}
          </h3>
          {lastMessageTime && (
            <span className="text-xs text-gray-500 flex-shrink-0">
              {lastMessageTime}
            </span>
          )}
        </div>
        
        {conversation.lastMessage && (
          <p className="text-sm text-gray-600 truncate mt-1">
            {conversation.lastMessage.content}
          </p>
        )}
        
        <div className="flex items-center gap-2 mt-1">
                     <span className="text-xs text-gray-400">
             {conversation.type === 'group' ? 'Group' : 'Direct'}
           </span>
          {conversation.participants.length > 2 && (
            <span className="text-xs text-gray-400">
              {conversation.participants.length} participants
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
