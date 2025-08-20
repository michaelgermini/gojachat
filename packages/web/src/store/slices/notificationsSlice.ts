import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from '@/types';

interface NotificationsState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

const initialState: NotificationsState = {
  notifications: [],
  loading: false,
  error: null,
};

// Async thunk to load notifications
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchAll',
  async (userId: number) => {
    const response = await fetch(`/notifications?userId=${userId}&_sort=createdAt&_order=desc`);
    const notifications = await response.json();
    return notifications;
  }
);

// Async thunk to mark a notification as read
export const markNotificationAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (notificationId: number) => {
    const response = await fetch(`/notifications/${notificationId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ read: true }),
    });
    const updatedNotification = await response.json();
    return updatedNotification;
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
    markAsRead: (state, action: PayloadAction<number>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        state.error = null;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error loading notifications';
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const updatedNotification = action.payload;
        const index = state.notifications.findIndex(n => n.id === updatedNotification.id);
        if (index !== -1) {
          state.notifications[index] = updatedNotification;
        }
      });
  },
});

export const { 
  addNotification, 
  removeNotification, 
  clearAllNotifications, 
  markAsRead 
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
