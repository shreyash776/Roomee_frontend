import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import tw from "tailwind-react-native-classnames";

export default function SignupScreen() {
  const router = useRouter();

  return (
    <View style={tw`flex-1 justify-center bg-white px-6`}>
      <Text style={tw`text-4xl font-bold text-center mb-6`}>Sign Up</Text>
      <TextInput
        placeholder="Name"
        style={tw`border border-gray-300 p-4 rounded mb-4`}
      />
      <TextInput
        placeholder="Email"
        style={tw`border border-gray-300 p-4 rounded mb-4`}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={tw`border border-gray-300 p-4 rounded mb-6`}
      />
      <TouchableOpacity
        onPress={() => router.replace("/explore")}
        style={tw`bg-blue-500 p-4 rounded`}
      >
        <Text style={tw`text-white text-center text-lg`}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={tw`text-center text-gray-600 mt-4`}>
        Already have an account?{" "}
        <Text
          style={tw`text-blue-500`}
          onPress={() => router.push("/(auth)/login")}
        >
          Login
        </Text>
      </Text>
    </View>
  );
}
