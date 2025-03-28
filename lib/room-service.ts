import { api } from './api-client';
import { endpoints } from './api';

export interface RoomData {
  id: string;
  images: Array<{
    id: string;
    url: string;
    metadata: {
      size: number;
      uploadedAt: Date;
    };
  }>;
  address: {
    latitude: number;
    longitude: number;
    street?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  amenities: string[];
  rent: number;
  description: string;
  owner: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateRoomRequest {
  address: {
    latitude: number;
    longitude: number;
    street?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  amenities: string[];
  rent: number;
  description: string;
  specifications: string;
}

export interface RoomResponse<T = RoomData> {
  success: boolean;
  data?: T | T[];
  error?: string;
  message?: string;
  status?: number;
}

export const roomService = {
  createRoom: async (formData: FormData): Promise<RoomResponse<RoomData>> => {
    try {
      const response = await api.post<RoomData>(endpoints.rooms.create, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return {
        success: true,
        data: response.data,
        message: 'Room created successfully',
        status: response.status
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to create room',
        message: error.response?.data?.message,
        status: error.response?.status
      };
    }
  },

  getAllRooms: async (): Promise<RoomResponse<RoomData[]>> => {
    try {
      const response = await api.get<RoomData[]>(endpoints.rooms.getAll);
      return {
        success: true,
        data: response.data,
        message: 'Rooms fetched successfully',
        status: response.status
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch rooms',
        status: error.response?.status
      };
    }
  },

  getRoomById: async (id: string): Promise<RoomResponse<RoomData>> => {
    try {
      const response = await api.get<RoomData>(endpoints.rooms.getById(id));
      return {
        success: true,
        data: response.data,
        message: 'Room details fetched',
        status: response.status
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Room not found',
        status: error.response?.status
      };
    }
  }
};
