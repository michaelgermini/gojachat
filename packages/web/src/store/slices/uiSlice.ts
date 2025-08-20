import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  showEmojiPicker: boolean;
  showFileUpload: boolean;
  searchQuery: string;
  selectedUsers: number[];
}

const initialState: UIState = {
  sidebarOpen: true,
  theme: 'light',
  showEmojiPicker: false,
  showFileUpload: false,
  searchQuery: '',
  selectedUsers: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleEmojiPicker: (state) => {
      state.showEmojiPicker = !state.showEmojiPicker;
    },
    setShowEmojiPicker: (state, action: PayloadAction<boolean>) => {
      state.showEmojiPicker = action.payload;
    },
    toggleFileUpload: (state) => {
      state.showFileUpload = !state.showFileUpload;
    },
    setShowFileUpload: (state, action: PayloadAction<boolean>) => {
      state.showFileUpload = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearSearchQuery: (state) => {
      state.searchQuery = '';
    },
    addSelectedUser: (state, action: PayloadAction<number>) => {
      if (!state.selectedUsers.includes(action.payload)) {
        state.selectedUsers.push(action.payload);
      }
    },
    removeSelectedUser: (state, action: PayloadAction<number>) => {
      state.selectedUsers = state.selectedUsers.filter(id => id !== action.payload);
    },
    clearSelectedUsers: (state) => {
      state.selectedUsers = [];
    },
    setSelectedUsers: (state, action: PayloadAction<number[]>) => {
      state.selectedUsers = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleTheme,
  setTheme,
  toggleEmojiPicker,
  setShowEmojiPicker,
  toggleFileUpload,
  setShowFileUpload,
  setSearchQuery,
  clearSearchQuery,
  addSelectedUser,
  removeSelectedUser,
  clearSelectedUsers,
  setSelectedUsers,
} = uiSlice.actions;

export default uiSlice.reducer;
