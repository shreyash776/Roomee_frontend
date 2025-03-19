import { api } from './api-client';
import { endpoints } from './api';

export interface ProfileData {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  workTitle: string;
  schoolName: string;
  lifestyleTags: string[];
  user: string; // User ID reference
}

export interface CreateProfileRequest {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  workTitle?: string;
  schoolName?: string;
  lifestyleTags?: string[];
}

export interface ProfileResponse {
  success: boolean;
  data: ProfileData;
  message?: string;
}

export const profileService = {
  createOrUpdateProfile: async (profileData: CreateProfileRequest): Promise<ProfileResponse> => {
    return await api.post<ProfileResponse>(endpoints.profile.create, profileData);
  },
  
  getProfile: async (): Promise<ProfileResponse> => {
    return await api.get<ProfileResponse>(endpoints.profile.get);
  }
};
