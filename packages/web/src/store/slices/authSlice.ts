import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, LoginRequest } from '@/types';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest) => {
    const response = await fetch('/users?email=' + credentials.email);
    const users = await response.json();
    
    if (users.length === 0) {
      throw new Error('User not found');
    }
    
    const user = users[0];
    // Simulate password verification
    if (credentials.password !== 'password') {
      throw new Error('Incorrect password');
    }
    
    return user;
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    // Simulate logout API call
    await new Promise(resolve => setTimeout(resolve, 100));
    return null;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUserStatus: (state, action: PayloadAction<{ status: User['status']; lastSeen: string }>) => {
      if (state.user) {
        state.user.status = action.payload.status;
        state.user.lastSeen = action.payload.lastSeen;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login error';
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { setUser, clearError, updateUserStatus } = authSlice.actions;
export default authSlice.reducer;
