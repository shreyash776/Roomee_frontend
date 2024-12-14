import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import tw from 'twrnc';
import RoomCard from '../components/RoomCard';
import { SafeAreaView } from 'react-native-safe-area-context';
const HomeScreen: React.FC = () => {
  const dummyData = {
    profilePic: 'https://images.pexels.com/photos/247851/pexels-photo-247851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    userName: 'John Doe',
    images: [
      'https://images.pexels.com/photos/247851/pexels-photo-247851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/247851/pexels-photo-247851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/247851/pexels-photo-247851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    rent: '1200',
    specifications: 'Private Room • Three-Bedroom • Apartment',
    address: '123, Elm Street, Springfield',
  };
  return (
   
     <ScrollView 
      contentContainerStyle={tw`bg-white pt-12 px-6`} 
      showsVerticalScrollIndicator={false}
    >
      {/* Heading */}
      <Text style={tw`text-4xl font-extrabold text-black mb-4`}>
        Join Millions of Verified Renters
      </Text>

      {/* Subtext */}
      <Text style={tw`text-base text-black mb-6`}>
        Roomi connects you to other verified renters in your area that are looking for roommates and posting rooms you can't find anywhere else. Stop stressing and let us help you find a better place to live!
      </Text>

      {/* Images */}
      <Image
        source={require('../../assets/images/home.png')}
        style={tw`w-full h-60 rounded-lg mb-6`}
        resizeMode="cover"
      />
      
      <Text style={tw`text-2xl font-extrabold text-black mb-4  `}>Recently Posted </Text>
       <RoomCard
          profilePic={dummyData.profilePic}
          userName={dummyData.userName}
          images={dummyData.images}
          rent={dummyData.rent}
          specifications={dummyData.specifications}
          address={dummyData.address}
        />
    </ScrollView>
   
  );
};

export default HomeScreen;