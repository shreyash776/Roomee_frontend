import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Stack = createNativeStackNavigator();

const ProfileTab: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer independent>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} onAuth={() => setIsAuthenticated(true)} />}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="Profile" component={ProfileScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ProfileTab;
