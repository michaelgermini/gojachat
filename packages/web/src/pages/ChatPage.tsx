import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useSocket } from '@/hooks/useSocket';
import { fetchConversations, setCurrentConversation } from '@/store/slices/conversationsSlice';
import { fetchMessages, sendMessage } from '@/store/slices/messagesSlice';
import { logoutUser } from '@/store/slices/authSlice';
import { toggleSidebar } from '@/store/slices/uiSlice';
import { ConversationItem } from '@/components/ConversationItem';
import { ChatMessage } from '@/components/ChatMessage';
import { UserAvatar } from '@/components/UserAvatar';
import { 
  Bars3Icon, 
  PaperAirplaneIcon, 
  PlusIcon,
  MagnifyingGlassIcon,
  BellIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

export const ChatPage: React.FC = () => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { conversations, currentConversation } = useAppSelector((state) => state.conversations);
  const { messages } = useAppSelector((state) => state.messages);
  const { sidebarOpen } = useAppSelector((state) => state.ui);
  const { connected, sendMessage: sendSocketMessage, joinConversation, leaveConversation } = useSocket();

  // Load conversations on mount
  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  // Join current conversation
  useEffect(() => {
    if (currentConversation && connected) {
      joinConversation(currentConversation);
      dispatch(fetchMessages(currentConversation));
    }
    
    return () => {
      if (currentConversation && connected) {
        leaveConversation(currentConversation);
      }
    };
  }, [currentConversation, connected, dispatch, joinConversation, leaveConversation]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentConversation]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentConversation || !user) return;

    const messageData = {
      conversationId: currentConversation,
      senderId: user.id,
      content: newMessage.trim(),
      type: 'text' as const,
    };

    try {
      await dispatch(sendMessage(messageData)).unwrap();
      sendSocketMessage(messageData);
      setNewMessage('');
         } catch (error) {
       console.error('Error sending message:', error);
     }
  };

  const handleConversationSelect = (conversationId: number) => {
    dispatch(setCurrentConversation(conversationId));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const currentMessages = currentConversation ? messages[currentConversation] || [] : [];
  const currentConversationData = conversations.find(c => c.id === currentConversation);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col`}>
        {sidebarOpen && (
          <>
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900">GojaChat</h1>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                    <PlusIcon className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                    <MagnifyingGlassIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* User info */}
            {user && (
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <UserAvatar user={user} size="md" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{user.username}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                      <BellIcon className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                      <Cog6ToothIcon className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <ArrowRightOnRectangleIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Conversations list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {conversations.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  isActive={conversation.id === currentConversation}
                  onClick={() => handleConversationSelect(conversation.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg lg:hidden"
            >
              <Bars3Icon className="w-5 h-5" />
            </button>
            
            {currentConversationData ? (
              <>
                                 <UserAvatar 
                   user={{ 
                     id: 0, 
                     username: currentConversationData.name, 
                     email: '', 
                     avatar: 'https://i.pravatar.cc/150?img=' + currentConversationData.id,
                     status: 'online' as const,
                     lastSeen: ''
                   }} 
                   size="md" 
                 />
                <div>
                  <h2 className="font-medium text-gray-900">{currentConversationData.name}</h2>
                                     <p className="text-sm text-gray-500">
                     {currentConversationData.type === 'group' ? 'Group' : 'Private message'}
                   </p>
                </div>
              </>
            ) : (
              <div>
                                 <h2 className="font-medium text-gray-900">Select a conversation</h2>
                 <p className="text-sm text-gray-500">Choose a conversation to start chatting</p>
              </div>
            )}
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4">
          {currentConversation ? (
            <div className="space-y-4">
              {currentMessages.map((message) => {
                                 const sender = user?.id === message.senderId ? user : {
                   id: message.senderId,
                   username: `User ${message.senderId}`,
                   email: '',
                   avatar: `https://i.pravatar.cc/150?img=${message.senderId}`,
                   status: 'online' as const,
                   lastSeen: ''
                 };
                
                return (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    sender={sender}
                    isOwn={user?.id === message.senderId}
                  />
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PaperAirplaneIcon className="w-8 h-8 text-gray-400" />
                </div>
                                 <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
                 <p className="text-gray-500">Select a conversation in the sidebar to start chatting</p>
              </div>
            </div>
          )}
        </div>

        {/* Message input */}
        {currentConversation && (
          <div className="bg-white border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                                 placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
