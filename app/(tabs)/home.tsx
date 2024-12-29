import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons'; 
import RoomCard from '../components/RoomCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dummyData } from '../data/dummyData';  

const HomeScreen: React.FC = () => {
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
        style={tw`w-full h-60 rounded-lg mb-10`}
        resizeMode="cover"
      />
      
      {/* Recently Posted Section */}
      <Text style={tw`text-2xl font-extrabold text-black mb-4`}>
        Recently Posted 
      </Text>

      {/* Room Cards */}
      {dummyData.map((data, index) => (
        <RoomCard
          key={index}
          profilePic={data.profilePic}
          userName={data.userName}
          images={data.images}
          rent={data.rent}
          specifications={data.specifications}
          address={data.address}
        />
      ))}
    </ScrollView>
  );
};

export default HomeScreen;
