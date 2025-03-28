
import { api } from './api-client';
import { endpoints } from './api';
import axios from 'axios';
import { getToken } from './auth-storage';

export interface ProfileData {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  workTitle?: string;
  schoolName?: string;
  profileImage?: string;
  lifestyleTags: string[];
  user: string;
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

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: string;
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
  createProfile: async (profileData: CreateProfileRequest, profileImageUri?: string): Promise<ProfileResponse> => {
    if (profileImageUri) {
      return await uploadProfileWithImage(endpoints.profile.create, profileData, profileImageUri);
    } else {
      return await api.post<ProfileResponse>(endpoints.profile.create, profileData);
    }
  },
  
  getProfile: async (): Promise<ProfileResponse> => {
    return await api.get<ProfileResponse>(endpoints.profile.get);
  },

  updateProfile: async (profileData: UpdateProfileRequest, profileImageUri?: string): Promise<ProfileResponse> => {
    if (profileImageUri) {
      return await uploadProfileWithImage(endpoints.profile.update, profileData, profileImageUri, 'PUT');
    } else {
      return await api.put<ProfileResponse>(endpoints.profile.update, profileData);
    }
  }
};


async function uploadProfileWithImage(
  url: string, 
  profileData: any, 
  imageUri: string, 
  method: 'POST' | 'PUT' = 'POST'
): Promise<ProfileResponse> {
  try {
   
    const formData = new FormData();
    
    
    Object.keys(profileData).forEach(key => {
      if (key === 'lifestyleTags' && Array.isArray(profileData[key])) {
        formData.append(key, JSON.stringify(profileData[key]));
      } else if (profileData[key] !== undefined) {
        formData.append(key, profileData[key].toString());
      }
    });
    
    
    const filename = imageUri.split('/').pop() || 'photo.jpg';
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image/jpeg';
    
    formData.append('profileImage', {
      uri: imageUri,
      name: filename,
      type
    } as any);
    
   
    const token = await getToken();
    
  
    const response = await axios({
      method,
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': token ? `Bearer ${token}` : ''
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error uploading profile with image:', error);
    throw error;
  }
}
