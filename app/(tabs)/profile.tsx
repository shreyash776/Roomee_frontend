import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const ProfileTab: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();


  return <ProfileScreen />;
};

export default ProfileTab;
