import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Button, FlatList } from 'react-native';
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
    <View style={tw`flex-1 p-4 bg-white`}>
       {/* Back Arrow */}
       <BackArrowButton onPress={() => alert('Go back')} />
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

      {/* User Information */}
      <View>
        {/* First Name and Last Name */}
        <View style={tw`flex-row justify-between mb-4`}>
          <TextInput
            placeholder="First Name"
            style={tw`border border-gray-300 rounded p-2 w-[48%]`}
            value={user.firstName}
            onChangeText={(text) => handleInputChange('firstName', text)}
          />
          <TextInput
            placeholder="Last Name"
            style={tw`border border-gray-300 rounded p-2 w-[48%]`}
            value={user.lastName}
            onChangeText={(text) => handleInputChange('lastName', text)}
          />
        </View>

        {/* Gender and DOB */}
        <View style={tw`flex-row justify-between mb-4`}>
          <TextInput
            placeholder="Gender"
            style={tw`border border-gray-300 rounded p-2 w-[48%]`}
            value={user.gender}
            onChangeText={(text) => handleInputChange('gender', text)}
          />
          <TextInput
            placeholder="DOB (YYYY-MM-DD)"
            style={tw`border border-gray-300 rounded p-2 w-[48%]`}
            value={user.dob}
            onChangeText={(text) => handleInputChange('dob', text)}
          />
        </View>

        {/* Occupation */}
        <TextInput
          placeholder="Occupation"
          style={tw`border border-gray-300 rounded p-2 mb-4`}
          value={user.occupation}
          onChangeText={(text) => handleInputChange('occupation', text)}
        />

        {/* Lifestyle Tags */}
        <Text style={tw`text-lg font-bold mb-2`}>Lifestyle:</Text>
        <View style={tw`flex-row items-center mb-4`}>
          <TextInput
            placeholder="Add a tag (e.g., Party Lover)"
            style={tw`border border-gray-300 rounded p-2 flex-1`}
            value={tagInput}
            onChangeText={setTagInput}
            onSubmitEditing={handleAddTag}
          />
          <TouchableOpacity
            onPress={handleAddTag}
            style={tw`ml-2 bg-blue-500 p-2 rounded`}>
            <Text style={tw`text-white`}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Display Tags */}
        <FlatList
          data={user.lifestyleTags}
          keyExtractor={(item, index) => `${item}-${index}`}
          horizontal
          renderItem={({ item }) => (
            <View style={tw`flex-row items-center bg-gray-200 rounded-full px-3 py-1 mr-2`}>
              <Text style={tw`mr-2`}>{item}</Text>
              <TouchableOpacity onPress={() => handleRemoveTag(item)}>
                <Ionicons name="close-circle" size={20} color="red" />
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={tw`flex-row`}
        />
      </View>

      {/* Save Button */}
      <Button title="Save Profile" onPress={() => alert('Profile saved!')} />
    </View>
  );
};

export default ProfileScreen;
