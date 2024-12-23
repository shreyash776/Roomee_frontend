import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const ProfileTab: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  if (!isAuthenticated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Welcome to Roomee!</Text>
        <Button title="Go to Signup" onPress={() => router.push('/(auth)/signup')} />
        <Button title="Go to Login" onPress={() => router.push('/(auth)/login')} />
      </View>
    );
  }

  return <ProfileScreen />;
};

export default ProfileTab;
