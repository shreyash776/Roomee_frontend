import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import tw from "tailwind-react-native-classnames";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("(auth)/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
      <Text style={tw`text-3xl font-bold mb-4`}>Welcome to My App</Text>
      <ActivityIndicator size="large" color="#00bfff" />
    </View>
  );
}
