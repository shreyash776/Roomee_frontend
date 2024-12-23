import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Main tabs for the application */}
      <Stack.Screen name="(tabs)" />
      
      {/* Authentication screens */}
      <Stack.Screen name="screens/Auth/login" />
      <Stack.Screen name="screens/Auth/signup" />
    </Stack>
  );
}
