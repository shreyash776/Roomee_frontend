import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { profileService } from '../../lib/profile-service';
import type { RootState } from '../store'; // Import your store type

interface ProfileState {
  profile: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  error: null,
};

// Add this to your existing async thunks
export const getProfile = createAsyncThunk(
  'profile/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileService.getProfile();
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to get profile');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Add this new reducer to clear profile state
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfile: (state) => {
      state.profile = null;
      state.isLoading = false;
      state.error = null;
    },
    resetProfileError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Add this to handle auth logout action
    builder.addCase('auth/logout', (state) => {
      state.profile = null;
      state.isLoading = false;
      state.error = null;
    });

    // Existing cases
    builder.addCase(getProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action.payload;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Add similar cases for createProfile and updateProfile
  },
});

export const { resetProfile, resetProfileError } = profileSlice.actions;
export const selectProfile = (state: RootState) => state.profile;
export default profileSlice.reducer;
