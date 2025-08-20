import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Conversation } from '@/types';

interface ConversationsState {
  conversations: Conversation[];
  currentConversation: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: ConversationsState = {
  conversations: [],
  currentConversation: null,
  loading: false,
  error: null,
};

// Async thunk to load conversations
export const fetchConversations = createAsyncThunk(
  'conversations/fetchAll',
  async () => {
    const response = await fetch('/conversations');
    const conversations = await response.json();
    return conversations;
  }
);

// Async thunk to create a new conversation
export const createConversation = createAsyncThunk(
  'conversations/create',
  async (conversation: Omit<Conversation, 'id' | 'createdAt'>) => {
    const response = await fetch('/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...conversation,
        createdAt: new Date().toISOString(),
      }),
    });
    const newConversation = await response.json();
    return newConversation;
  }
);

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    setCurrentConversation: (state, action: PayloadAction<number | null>) => {
      state.currentConversation = action.payload;
    },
    updateLastMessage: (state, action: PayloadAction<{ conversationId: number; message: any }>) => {
      const conversation = state.conversations.find(c => c.id === action.payload.conversationId);
      if (conversation) {
        conversation.lastMessage = action.payload.message;
      }
    },
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.unshift(action.payload);
    },
    removeConversation: (state, action: PayloadAction<number>) => {
      state.conversations = state.conversations.filter(c => c.id !== action.payload);
      if (state.currentConversation === action.payload) {
        state.currentConversation = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
        state.error = null;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error loading conversations';
      })
      .addCase(createConversation.fulfilled, (state, action) => {
        state.conversations.unshift(action.payload);
      });
  },
});

export const { 
  setCurrentConversation, 
  updateLastMessage, 
  addConversation, 
  removeConversation 
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
