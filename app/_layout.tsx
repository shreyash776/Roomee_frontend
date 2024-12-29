import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Main tabs for the application */}
      <Stack.Screen name="(tabs)" />

      {/* Authentication screens */}
      <Stack.Screen name="(auth)" options={{ headerShown: true }} />

      {/* Maps screen */}
      {/* <Stack.Screen name="/maps" options={{ headerShown: true, title: "Map View" }} /> */}
    </Stack>
  );
}
