import { api } from './api-client';
import { endpoints } from './api';

export interface Room {
  id: string;
  name: string;
 
}

export interface CreateRoomRequest {
  name: string;
  
}

export const roomService = {
  getAllRooms: async (): Promise<Room[]> => {
    return await api.get<Room[]>(endpoints.rooms.getAll);
  },
  
  getRoomById: async (id: string): Promise<Room> => {
    return await api.get<Room>(endpoints.rooms.getById(id));
  },
  
  createRoom: async (data: CreateRoomRequest): Promise<Room> => {
    return await api.post<Room>(endpoints.rooms.create, data);
  },
  
  joinRoom: async (id: string): Promise<any> => {
    return await api.post<any>(endpoints.rooms.join(id));
  },
  
  leaveRoom: async (id: string): Promise<any> => {
    return await api.post<any>(endpoints.rooms.leave(id));
  }
};
