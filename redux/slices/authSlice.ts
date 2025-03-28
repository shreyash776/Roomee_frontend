import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '../../lib/auth-service';
import { getToken, storeToken, removeToken, storeUser, getUser, removeUser } from '../../lib/auth-storage';
import { persistor } from '../store'; 
import { CommonActions } from '@react-navigation/native';
import { router } from 'expo-router';

// Types
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async thunks
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData: { name: string; email: string; password: string }, { rejectWithValue, dispatch }) => {
    try {
      // Clear previous session before new signup
      await dispatch(logout());
      
      const response = await authService.signup(userData);
      if (response.success) {
        await storeToken(response.token);
        await storeUser(response.user);
        return response;
      }
      return rejectWithValue(response.error || 'Signup failed');
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Signup failed';
      return rejectWithValue(errorMessage);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      if (response.success) {
        await storeToken(response.token);
        await storeUser(response.user);
        return response;
      }
      return rejectWithValue(response.error || 'Login failed');
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Login failed';
      return rejectWithValue(errorMessage);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  try {
    // Clear all auth-related storage
    await removeToken();
    await removeUser();
    
    // Reset Redux Persist storage
    await persistor.flush();
    await persistor.purge();
    
    // Reset navigation state
    router.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: '/(auth)/signup' }],
      })
    );
    
    return null;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
});

export const checkAuth = createAsyncThunk('auth/check', async (_, { dispatch }) => {
  try {
    const token = await getToken();
    const user = await getUser();
    
    if (!token || !user) {
      await dispatch(logout());
      return null;
    }
    
    // Add token validation API call here if needed
    return { token, user };
  } catch (error) {
    await dispatch(logout());
    return null;
  }
});

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthError: (state) => {
      state.error = null;
    },
    // Add manual state reset for edge cases
    resetAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
      })

      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
        } else {
          state.isAuthenticated = false;
        }
      });
  },
});

export const { resetAuthError, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
