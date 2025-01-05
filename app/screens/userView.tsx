import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import tw from 'twrnc';
import { dummyData } from '../data/dummyData';

interface UserViewProps {
  route: {
    params: {
      id: string;
    };
  };
}

const UserView: React.FC<UserViewProps> = ({ route }) => {
  const { id } = route.params;

  // Fetch user data based on ID
  const user = dummyData.find((user) => user.id === id);

  if (!user) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <Text style={tw`text-lg font-bold text-red-500`}>User not found!</Text>
      </View>
    );
  }

  const { profilePic, userName, age, work, school, introduction, tags } = user;

  return (
    <ScrollView contentContainerStyle={tw`bg-white flex-grow px-6 py-8`}>
      {/* Profile Image */}
      <View style={tw`items-center mb-6`}>
        <Image
          source={{ uri: profilePic }}
          style={tw`w-32 h-32 rounded-full`}
          resizeMode="cover"
        />
        <Text style={tw`text-2xl font-bold mt-4`}>{userName}</Text>
        <Text style={tw`text-lg text-gray-600`}>{age} years old</Text>
      </View>

      {/* Work Section */}
      <View style={tw`mb-6`}>
        <Text style={tw`text-lg font-bold text-gray-800 mb-2`}>Work</Text>
        <Text style={tw`text-base text-gray-700`}>{work}</Text>
      </View>

      {/* School Section */}
      <View style={tw`mb-6`}>
        <Text style={tw`text-lg font-bold text-gray-800 mb-2`}>School</Text>
        <Text style={tw`text-base text-gray-700`}>{school}</Text>
      </View>

      {/* Introduction Section */}
      <View style={tw`mb-6`}>
        <Text style={tw`text-lg font-bold text-gray-800 mb-2`}>Introduction</Text>
        <Text style={tw`text-base text-gray-700`}>{introduction}</Text>
      </View>

      {/* Tags Section */}
      <View style={tw`mb-6`}>
        <Text style={tw`text-lg font-bold text-gray-800 mb-2`}>Tags</Text>
        <View style={tw`flex-row flex-wrap`}>
          {tags.map((tag, index) => (
            <View
              key={index}
              style={tw`bg-gray-200 rounded-full px-4 py-1 mr-2 mb-2`}
            >
              <Text style={tw`text-sm text-gray-700`}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default UserView;
