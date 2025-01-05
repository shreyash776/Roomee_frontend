import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'twrnc';

interface UserCardProps {
  profilePic: string;
  userName: string;
  work: string;
  intro: string;
}

const UserCard: React.FC<UserCardProps> = ({ profilePic, userName, work, intro }) => {
  return (
    <View style={tw`bg-white rounded-lg shadow-lg p-5 mb-4 w-80 mx-auto`}>
      {/* Profile Image */}
      <Image
        source={{ uri: profilePic }}
        style={tw`w-20 h-20 rounded-full mx-auto mb-4`}
      />

      {/* Name */}
      <Text style={tw`text-xl font-bold text-center mb-2`}>{userName}</Text>

      {/* Work */}
      <Text style={tw`text-sm text-gray-700 text-center mb-2`}>{work}</Text>

      {/* Intro */}
      <Text style={tw`text-sm text-gray-500 text-center`}>{intro}</Text>
    </View>
  );
};

export default UserCard;
