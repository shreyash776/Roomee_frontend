import { api } from './api-client';
import { endpoints } from './api';
import { storeToken, storeUser, clearAuthData } from './auth-storage';

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserData {
  id: string;
  name: string;
  
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: UserData;
  error?: string;
  status?: number;
}

export const authService = {
  signup: async (userData: SignupRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>(endpoints.auth.signup, userData);
      
      if (response.data?.token && response.data?.user) {
        await storeToken(response.data.token);
        await storeUser(response.data.user);
        return {
          success: true,
          token: response.data.token,
          user: response.data.user
        };
      }
      
      return {
        success: false,
        error: response.error || 'Registration failed',
        status: response.status
      };
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        error: 'Network error. Please check your connection.',
        status: 500
      };
    }
  },

  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>(endpoints.auth.login, credentials);
      
      if (response.data?.token && response.data?.user) {
        await storeToken(response.data.token);
        await storeUser(response.data.user);
        return {
          success: true,
          token: response.data.token,
          user: response.data.user
        };
      }
      
      return {
        success: false,
        error: response.error || 'Login failed',
        status: response.status
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'Network error. Please check your connection.',
        status: 500
      };
    }
  },

  logout: async (): Promise<void> => {
    try {
      await clearAuthData();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
};
