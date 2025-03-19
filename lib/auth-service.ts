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

export interface AuthResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  error?: string;
}

// Auth service functions
export const authService = {
  signup: async (userData: SignupRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(endpoints.auth.signup, userData);
    
    if (response.success && response.token) {
      await storeToken(response.token);
      await storeUser(response.user);
    }
    
    return response;
  },
  
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(endpoints.auth.login, credentials);
    
    if (response.success && response.token) {
      await storeToken(response.token);
      await storeUser(response.user);
    }
    
    return response;
  },
  
  logout: async (): Promise<void> => {
    await clearAuthData();
  }
};
