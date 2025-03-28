// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import reducers properly
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import roomReducer from './slices/roomSlice';

// Combine reducers FIRST
const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  room: roomReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // Use combined reducer

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);
