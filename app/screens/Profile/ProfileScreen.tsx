import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Button } from 'react-native';
import tw from 'twrnc';

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState({
    fullName: '',
    description: '',
    minPrice: '',
    maxPrice: '',
    timeline: '',
    location: '',
    profilePic:'',
  });

  const handleInputChange = (key: string, value: string) => {
    setUser({ ...user, [key]: value });
  };

  const handleProfilePicUpload = () => {
    // Placeholder for profile picture upload logic
    setUser({ ...user, profilePic: 'https://images.pexels.com/photos/1022926/pexels-photo-1022926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' });
  };

  return (
    <View style={tw`flex-1 p-4 bg-white`}>
      <Text style={tw`text-2xl font-bold text-center mb-6`}>Profile Information</Text>
      <TouchableOpacity onPress={handleProfilePicUpload} style={tw`mb-4 self-center`}>
        {user.profilePic ? (
          <Image source={{ uri: user.profilePic }} style={tw`w-20 h-20 rounded-full`} />
        ) : (
          <View style={tw`w-20 h-20 rounded-full bg-gray-300 justify-center items-center`}>
            <Text style={tw`text-sm`}>Upload Photo</Text>
          </View>
        )}
      </TouchableOpacity>
      {/* Rest of the profile fields */}
      {/* Full Name, Description, Price Range, Timeline, Location */}
      <Button title="Save Profile" onPress={() => alert('Profile saved!')} />
    </View>
  );
};

export default ProfileScreen;
