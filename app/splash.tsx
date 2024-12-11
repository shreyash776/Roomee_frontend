import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import tw from "twrnc";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/(auth)/login"); // Updated route
    }, 2000); // Display splash for 2 seconds
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
      <Text style={tw`text-2xl font-bold text-gray-800`}>Welcome to MyApp</Text>
      <ActivityIndicator size="large" style={tw`mt-4`} />
    </View>
  );
}
