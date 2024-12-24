import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Import useRouter
import tw from 'twrnc';

interface BackArrowButtonProps {
  color?: string;
  size?: number;
}

const BackArrowButton: React.FC<BackArrowButtonProps> = ({
  color = 'black',
  size = 24,
}) => {
  const router = useRouter(); // Get the router object

  return (
    <TouchableOpacity
      style={tw`p-2 bg-slate-100 rounded-full w-10 mb-4`}
      onPress={() => router.back()} // Use router.back() to navigate to the previous screen
    >
      <Ionicons name="arrow-back" size={size} color={color} />
    </TouchableOpacity>
  );
};

export default BackArrowButton;
