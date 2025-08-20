import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '@/types';

interface MessagesState {
  messages: Record<number, Message[]>;
  loading: boolean;
  error: string | null;
}

const initialState: MessagesState = {
  messages: {},
  loading: false,
  error: null,
};

// Async thunk to load messages from a conversation
export const fetchMessages = createAsyncThunk(
  'messages/fetchByConversation',
  async (conversationId: number) => {
    const response = await fetch(`/messages?conversationId=${conversationId}&_sort=timestamp&_order=asc`);
    const messages = await response.json();
    return { conversationId, messages };
  }
);

// Async thunk to send a message
export const sendMessage = createAsyncThunk(
  'messages/send',
  async (message: Omit<Message, 'id' | 'timestamp'>) => {
    const response = await fetch('/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...message,
        timestamp: new Date().toISOString(),
      }),
    });
    const newMessage = await response.json();
    return newMessage;
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      const { conversationId } = action.payload;
      if (!state.messages[conversationId]) {
        state.messages[conversationId] = [];
      }
      state.messages[conversationId].push(action.payload);
    },
    setMessages: (state, action: PayloadAction<{ conversationId: number; messages: Message[] }>) => {
      const { conversationId, messages } = action.payload;
      state.messages[conversationId] = messages;
    },
    markMessageAsRead: (state, action: PayloadAction<{ conversationId: number; messageId: number }>) => {
      const { conversationId, messageId } = action.payload;
      const message = state.messages[conversationId]?.find(m => m.id === messageId);
      if (message) {
        message.read = true;
      }
    },
    clearMessages: (state, action: PayloadAction<number>) => {
      delete state.messages[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        const { conversationId, messages } = action.payload;
        state.messages[conversationId] = messages;
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error loading messages';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const message = action.payload;
        const { conversationId } = message;
        if (!state.messages[conversationId]) {
          state.messages[conversationId] = [];
        }
        state.messages[conversationId].push(message);
      });
  },
});

export const { 
  addMessage, 
  setMessages, 
  markMessageAsRead, 
  clearMessages 
} = messagesSlice.actions;

export default messagesSlice.reducer;
