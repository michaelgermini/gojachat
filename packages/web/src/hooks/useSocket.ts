import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addMessage } from '@/store/slices/messagesSlice';
import { addNotification } from '@/store/slices/notificationsSlice';
import { updateLastMessage } from '@/store/slices/conversationsSlice';
import { Message, Notification } from '@/types';

export const useSocket = () => {
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const dispatch = useDispatch();

  // Initialize socket connection
  useEffect(() => {
    socketRef.current = io('http://localhost:3001', {
      transports: ['websocket', 'polling'],
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('Socket connected');
      setConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      setConnected(false);
    });

    socket.on('newMessage', (message: Message) => {
      console.log('New message received:', message);
      dispatch(addMessage(message));
      dispatch(updateLastMessage({ 
        conversationId: message.conversationId, 
        message 
      }));
    });

    socket.on('newNotification', (notification: Notification) => {
      console.log('New notification received:', notification);
      dispatch(addNotification(notification));
    });

    socket.on('userStatusChange', (data: { userId: number; status: string; lastSeen: string }) => {
      console.log('User status change:', data);
      // Here we could dispatch an action to update the status
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [dispatch]);

  // Function to send a message
  const sendMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    if (socketRef.current && connected) {
      socketRef.current.emit('sendMessage', message);
    }
  }, [connected]);

  // Function to join a conversation
  const joinConversation = useCallback((conversationId: number) => {
    if (socketRef.current && connected) {
      socketRef.current.emit('joinConversation', { conversationId });
    }
  }, [connected]);

  // Function to leave a conversation
  const leaveConversation = useCallback((conversationId: number) => {
    if (socketRef.current && connected) {
      socketRef.current.emit('leaveConversation', { conversationId });
    }
  }, [connected]);

  // Function to update user status
  const updateUserStatus = useCallback((status: 'online' | 'away' | 'offline') => {
    if (socketRef.current && connected) {
      socketRef.current.emit('updateStatus', { status });
    }
  }, [connected]);

  return {
    connected,
    sendMessage,
    joinConversation,
    leaveConversation,
    updateUserStatus,
  };
};
