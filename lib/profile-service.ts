import { api } from './api-client';
import { endpoints } from './api';

export interface ProfileData {
  id: string;
  name: string;
  email: string;
  
}

export interface UpdateProfileRequest {
  name?: string;
  
}

export const profileService = {
  getProfile: async (): Promise<ProfileData> => {
    return await api.get<ProfileData>(endpoints.profile.getProfile);
  },
  
  updateProfile: async (data: UpdateProfileRequest): Promise<ProfileData> => {
    return await api.put<ProfileData>(endpoints.profile.updateProfile, data);
  }
};
