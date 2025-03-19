import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getToken, removeToken } from './auth-storage';
import NetInfo from '@react-native-community/netinfo';
import { API_BASE_URL } from './api';


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, 
});


const checkConnection = async () => {
  const state = await NetInfo.fetch();
  if (!state.isConnected) {
    throw new Error('No internet connection');
  }
};


apiClient.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    await checkConnection();
    
    const token = await getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);


apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    
    if (error.response?.status === 401) {
      await removeToken(); 
      
    }
    
    return Promise.reject(error);
  }
);


export const api = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await apiClient.get<T>(url, config);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },
  
  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await apiClient.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },
  
  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await apiClient.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },
  
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await apiClient.delete<T>(url, config);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }
};


const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    
    const errorMessage = error.response?.data?.error || 
                         error.response?.data?.message || 
                         'An unexpected error occurred';
    
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: errorMessage
    });
  } else {
    console.error('Unexpected error:', error);
  }
};
