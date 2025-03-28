import { Stack } from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

// Import your context
import { AuthProvider, useAuth } from "../context/AuthContext"; 

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav(): JSX.Element {
  const { isAuthenticated, isLoading, checkAuth } = useAuth(); // Using context instead of Redux

  useEffect(() => {
    checkAuth(); // Fetch authentication status
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      )}
    </Stack>
  );
}
