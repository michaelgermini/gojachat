// Types pour les utilisateurs
export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  lastSeen: string;
}

// Types pour les conversations
export interface Conversation {
  id: number;
  name: string;
  type: 'direct' | 'group';
  participants: number[];
  createdAt: string;
  lastMessage?: Message;
}

// Types pour les messages
export interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
  read?: boolean;
}

// Types pour les notifications
export interface Notification {
  id: number;
  userId: number;
  type: 'message' | 'mention' | 'reaction';
  title: string;
  body: string;
  data?: Record<string, any>;
  read: boolean;
  createdAt: string;
}

// Types pour l'état de l'application
export interface AppState {
  user: User | null;
  conversations: Conversation[];
  messages: Record<number, Message[]>;
  notifications: Notification[];
  currentConversation: number | null;
  loading: boolean;
  error: string | null;
}

// Types pour les actions Redux
export interface LoginAction {
  type: 'auth/login';
  payload: User;
}

export interface LogoutAction {
  type: 'auth/logout';
}

export interface SetConversationsAction {
  type: 'conversations/set';
  payload: Conversation[];
}

export interface AddMessageAction {
  type: 'messages/add';
  payload: Message;
}

export interface SetMessagesAction {
  type: 'messages/set';
  payload: { conversationId: number; messages: Message[] };
}

export interface SetCurrentConversationAction {
  type: 'conversations/setCurrent';
  payload: number | null;
}

export interface AddNotificationAction {
  type: 'notifications/add';
  payload: Notification;
}

export interface MarkNotificationReadAction {
  type: 'notifications/markRead';
  payload: number;
}

// Types pour les props des composants
export interface ChatMessageProps {
  message: Message;
  sender: User;
  isOwn: boolean;
}

export interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

export interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
}

// Types pour les hooks
export interface UseSocketReturn {
  connected: boolean;
  sendMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  joinConversation: (conversationId: number) => void;
  leaveConversation: (conversationId: number) => void;
}

// Types pour les API
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SendMessageRequest {
  conversationId: number;
  content: string;
  type: 'text' | 'image' | 'file';
}
