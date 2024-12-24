import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

interface BackArrowButtonProps {
  onPress: () => void;
  color?: string;
  size?: number;
}

const BackArrowButton: React.FC<BackArrowButtonProps> = ({
  onPress,
  color = 'black',
  size = 24,
}) => {
  return (
    <TouchableOpacity style={tw`p-2`} onPress={onPress}>
      <Ionicons name="arrow-back" size={size} color={color} />
    </TouchableOpacity>
  );
};

export default BackArrowButton;
