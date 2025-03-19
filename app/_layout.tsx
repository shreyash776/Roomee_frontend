import { Stack } from "expo-router";
import { useEffect } from "react";
import { Redirect } from "expo-router";

export default function RootLayout() {
  return (
    <>
      {/* Initial redirect to auth/signup */}
      <Redirect href="/(auth)/signup" />
      
      <Stack screenOptions={{ headerShown: false }}>
        {/* Auth Group */}
        <Stack.Screen 
          name="(auth)" 
          options={{ 
            headerShown: false,
            gestureEnabled: false 
          }} 
        />
        
        {/* Main tabs Group */}
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
            gestureEnabled: false 
          }} 
        />
      </Stack>
    </>
  );
}
