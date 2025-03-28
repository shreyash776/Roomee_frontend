export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ;

// Defining all API endpoints
export const endpoints = {
  auth: {
    signup: `${API_BASE_URL}/auth/signup`,
    login: `${API_BASE_URL}/auth/login`,
  },
  profile: {
    create: `${API_BASE_URL}/profile`, 
    getProfile: `${API_BASE_URL}/profile`, 
    updateProfile: `${API_BASE_URL}/profile/update`, 
  },
  rooms: {
    getAll: `${API_BASE_URL}/rooms`,
    getById: (id: string) => `${API_BASE_URL}/rooms/${id}`,
    create: `${API_BASE_URL}/rooms`,
    join: (id: string) => `${API_BASE_URL}/rooms/${id}/join`,
    leave: (id: string) => `${API_BASE_URL}/rooms/${id}/leave`,
  },
};
