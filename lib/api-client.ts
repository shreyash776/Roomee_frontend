import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getToken, removeToken } from './auth-storage';
import NetInfo from '@react-native-community/netinfo';
import { API_BASE_URL } from './api';

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status?: number;
  success?: boolean;
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

const checkConnection = async (): Promise<void> => {
  const state = await NetInfo.fetch();
  if (!state.isConnected) {
    throw new Error('No internet connection');
  }
};

apiClient.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    await checkConnection();
    
    // Skip authorization header for auth endpoints
    if (!config.url?.includes('/auth')) {
      const token = await getToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Handle success status codes (200-299)
    return {
      ...response,
      success: true
    };
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      await removeToken();
    }
    
    // Preserve success status for 201 responses
    if (error.response?.status === 201) {
      return {
        ...error.response,
        success: true
      };
    }
    
    return Promise.reject({
      ...error,
      success: false
    });
  }
);

export const api = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.get<T>(url, config);
      return handleSuccess<T>(response);
    } catch (error) {
      return handleError<T>(error);
    }
  },

  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.post<T>(url, data, config);
      return handleSuccess<T>(response);
    } catch (error) {
      return handleError<T>(error);
    }
  },

  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.put<T>(url, data, config);
      return handleSuccess<T>(response);
    } catch (error) {
      return handleError<T>(error);
    }
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.delete<T>(url, config);
      return handleSuccess<T>(response);
    } catch (error) {
      return handleError<T>(error);
    }
  }
};

const handleSuccess = <T>(response: any): ApiResponse<T> => ({
  data: response.data,
  status: response.status,
  success: response.status >= 200 && response.status < 300
});

const handleError = <T>(error: any): ApiResponse<T> => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const serverData = error.response?.data || {};
    
    const errorMessage = serverData.message 
      || serverData.error
      || error.message
      || 'An unexpected error occurred';

    console.error('API Error:', {
      url: error.config?.url,
      status,
      message: errorMessage
    });

    return { 
      error: errorMessage,
      status,
      success: false
    };
  }

  console.error('Non-Axios error:', error);
  return { 
    error: 'Network error or unexpected failure',
    status: 500,
    success: false
  };
};
