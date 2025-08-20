import React from 'react';
import { User } from '@/types';
import { clsx } from 'clsx';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

const statusColors = {
  online: 'bg-green-500',
  away: 'bg-yellow-500',
  offline: 'bg-gray-400',
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = 'md',
  showStatus = true,
  className,
}) => {
  return (
    <div className={clsx('relative inline-block', className)}>
      <img
        src={user.avatar}
        alt={user.username}
        className={clsx(
          'rounded-full object-cover border-2 border-gray-200',
          sizeClasses[size]
        )}
      />
      {showStatus && (
        <div
          className={clsx(
            'absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white',
            statusColors[user.status]
          )}
        />
      )}
    </div>
  );
};
