import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Splash screen */}
      <Stack.Screen name="splash" />
      {/* Authentication screens */}
      <Stack.Screen name="(auth)/login" />
      <Stack.Screen name="(auth)/signup" />
      {/* Tab-based navigation */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
