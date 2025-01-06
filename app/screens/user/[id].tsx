
import React from 'react';
import { View, Text, Image, ScrollView, Touchable, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useRouter } from 'expo-router';  
import { dummyData } from '../../data/dummyData';
import { useLocalSearchParams } from 'expo-router';
import BackArrowButton from '@/app/components/BackArrowButton';
const UserView: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const user = dummyData.find((user) => String(user.id) === String(id))

  if (!user) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <Text style={tw`text-lg font-bold text-red-500`}>User not found!</Text>
      </View>
    );
  }

  const { profilePic, userName, age, work, school, introduction, tags } = user;

  return (
    <ScrollView contentContainerStyle={tw`bg-white flex-grow px-6 py-8 `}>
      <BackArrowButton />
      <View style={tw`mb-2 `}>
        <Image
          source={{ uri: profilePic }}
          style={tw`w-30 h-30 rounded-full`}
          resizeMode="cover"
        />
       
      </View>

      
      <View style={tw`mb-6`}>
      <Text style={tw`text-2xl font-bold mt-3`}>{userName}</Text>
      <Text style={tw`text-lg text-gray-900`}>Age: {age}</Text>
      </View>
      <View style={tw`mb-6`}>
      
        <Text style={tw`text-xl font-bold text-gray-400 mb-2`}>Work</Text>
        <Text style={tw`text-base text-black`}>{work}</Text>
      </View>

      
      <View style={tw`mb-6`}>
        <Text style={tw`text-xl font-bold text-gray-400 mb-2`}>School</Text>
        <Text style={tw`text-base text-black`}>{school}</Text>
      </View>

     
      <View style={tw`mb-6`}>
        <Text style={tw`text-xl font-bold text-gray-400 mb-2`}>Introduction</Text>
        <Text style={tw`text-base text-black`}>{introduction}</Text>
      </View>

     
      <View style={tw`mb-6`}>
        <Text style={tw`text-xl font-bold text-gray-400 mb-2`}>Tags</Text>
        <View style={tw`flex-row flex-wrap`}>
          {tags.map((tag, index) => (
            <View
              key={index}
              style={tw`bg-indigo-300 rounded-full px-4 border border-indigo-400 py-1 mr-2 mb-2`}
            >
              <Text style={tw`text-sm text-indigo-600`}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={tw`  w-full  bottom-0 flex-row justify-center items-center`}>
        <TouchableOpacity style={tw`  mt-12  bg-indigo-400 w-full h-12 rounded-lg flex-row  px-4 items-center justify-center  mb-6`}>
       <Text style={tw`text-lg text-white font-bold `}>Start a chat</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserView;
