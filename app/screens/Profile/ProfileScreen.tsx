import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Button, FlatList ,ScrollView } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import BackArrowButton from '../../components/BackArrowButton'; 
import * as ImagePicker from 'expo-image-picker';


const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    occupation: '',
    profilePic: '',
    lifestyleTags: [] as string[],
  });

  const [tagInput, setTagInput] = useState('');

  const handleInputChange = (key: string, value: string) => {
    setUser({ ...user, [key]: value });
  };

  const handleProfilePicUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUser({ ...user, profilePic: result.assets[0].uri });
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !user.lifestyleTags.includes(tagInput.trim())) {
      setUser((prev) => ({
        ...prev,
        lifestyleTags: [...prev.lifestyleTags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setUser((prev) => ({
      ...prev,
      lifestyleTags: prev.lifestyleTags.filter((t) => t !== tag),
    }));
  };

  return (
   <ScrollView>
     <View style={tw`flex-1 p-4 bg-white mb-10`}>
      {/* Back Arrow */}
      <BackArrowButton />
      {/* Profile Header */}
      <View style={tw`flex-row items-center mb-6`}>
        <TouchableOpacity onPress={handleProfilePicUpload} style={tw`mr-4`}>
          {user.profilePic ? (
            <Image source={{ uri: user.profilePic }} style={tw`w-20 h-20 rounded-full`} />
          ) : (
            <View style={tw`w-20 h-20 rounded-full bg-gray-300 justify-center items-center`}>
              <Text style={tw`text-sm`}>Upload Photo</Text>
            </View>
          )}
        </TouchableOpacity>
        <View>
          <Text style={tw`text-xl font-bold`}>{`${user.firstName} ${user.lastName}`.trim() || 'Your Name'}</Text>
          <TouchableOpacity onPress={() => alert('Edit Profile')}>
            <Text style={tw`text-sm text-blue-500`}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Basic Info Section */}
      <View style={tw`p-4 bg-white shadow-lg rounded-lg mb-4`}>
        <Text style={tw`text-lg font-bold mb-4`}>BASIC INFO:</Text>

        {/* First Name and Last Name */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-gray-700 mb-1`}>First Name</Text>
          <TextInput
            style={tw` border border-gray-400 rounded p-2`}
            value={user.firstName}
            onChangeText={(text) => handleInputChange('firstName', text)}
          />
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-gray-700 mb-1`}>Last Name</Text>
          <TextInput
            style={tw` border border-gray-400 rounded p-2`}
            value={user.lastName}
            onChangeText={(text) => handleInputChange('lastName', text)}
          />
        </View>

        {/* Gender and DOB */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-gray-700 mb-1`}>Gender</Text>
          <TextInput
            style={tw` border border-gray-400 rounded p-2`}
            value={user.gender}
            onChangeText={(text) => handleInputChange('gender', text)}
          />
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-gray-700 mb-1`}>DOB (YYYY-MM-DD)</Text>
          <TextInput
            style={tw` border border-gray-400 rounded p-2`}
            value={user.dob}
            onChangeText={(text) => handleInputChange('dob', text)}
          />
        </View>

        {/* Occupation */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-gray-700 mb-1`}>Occupation</Text>
          <TextInput
            style={tw` border border-gray-400 rounded p-2`}
            value={user.occupation}
            onChangeText={(text) => handleInputChange('occupation', text)}
          />
        </View>
      </View>

      {/* Lifestyle Tags Section */}
      <Text style={tw`text-lg font-bold mb-2`}>Lifestyle:</Text>

      <FlatList
        data={user.lifestyleTags}
        keyExtractor={(item, index) => `${item}-${index}`}
        horizontal
        contentContainerStyle={tw`mb-4 flex-row`}
        renderItem={({ item }) => (
          <View style={tw`flex-row items-center bg-gray-100 border border-gray-400 rounded-full px-3 py-1 mr-2`}>
            <Text style={tw`mr-2 text-gray-700`}>{item}</Text>
            <TouchableOpacity onPress={() => handleRemoveTag(item)} style={tw`bg-gray-300 rounded-full p-1`}>
              <Ionicons name="close" size={16} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={tw`flex-row items-center mb-4`}>
        <TextInput
          placeholder="Add a tag (e.g., Party Lover)"
          style={tw`bg-gray-100 border border-gray-400 rounded p-2 flex-1`}
          value={tagInput}
          onChangeText={setTagInput}
          onSubmitEditing={handleAddTag}
        />
        <TouchableOpacity onPress={handleAddTag} style={tw`ml-2 bg-violet-500 p-2 rounded`}>
          <Text style={tw`text-white `}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Save Button */}
     <View style={tw`flex-row justify-center items-center w-full`}>
     <TouchableOpacity
        style={tw`bg-violet-500 py-2 w-[70%] rounded-xl flex-row text-center justify-center items-center`}
        onPress={() => console.log('Save button pressed')}
    >
        <Text style={tw`text-center text-white text-lg`}>Save</Text>
    </TouchableOpacity>
     </View>

    </View>
   </ScrollView>
  );
};

export default ProfileScreen;
