import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity ,Animated } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons'; 
import RoomCard from '../components/RoomCard';
import { SafeAreaView } from 'react-native-safe-area-context';

import { dummyData } from '../data/dummyData';  
import { useRouter } from 'expo-router';

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const recentRooms = dummyData.slice(0, 5);
  
  const scale = new Animated.Value(1);

  useEffect(() => {
    const pulseAnimation = Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.06,
        duration: 800,
        useNativeDriver: true
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      })
    ]);

    Animated.loop(pulseAnimation).start();
  }, []);

  return (
    <ScrollView 
      contentContainerStyle={tw`bg-white pt-12 px-4`} 
      showsVerticalScrollIndicator={false}
    >
      {/* Heading */}
      <Text style={tw`text-4xl font-extrabold text-black mb-4`}>
        Join Millions of Verified Renters
      </Text>

      {/* Subtext */}
      <Text style={tw`text-base text-black mb-6`}>
        Roomee connects you to other verified renters in your area that are looking for roommates and posting rooms you can't find anywhere else. Stop stressing and let us help you find a better place to live!
      </Text>

      {/* Images */}
      <Image
        source={require('../../assets/images/home.png')}
        style={tw`w-full h-60 rounded-lg mb-10`}
        resizeMode="cover"
      />
      
      {/* Post Room Button */}
      <TouchableOpacity onPress={() => router.push('/screens/PostRoom')}>
      <Animated.View 
        style={[
          tw`bg-black rounded-xl w-38 flex-row shadow-xl mb-3 items-center justify-center py-2 px-3`,
          {
            transform: [{ scale }]
          }
        ]}
      >
        <Ionicons name="add-circle-outline" size={24} color="white" style={tw`mr-2`} />
        <Text style={tw`text-white font-bold text-lg`}>Post Room</Text>
      </Animated.View>
    </TouchableOpacity>

      {/* Recently Posted Section */}
      <Text style={tw`text-2xl font-extrabold text-black mb-4`}>
        Recently Posted 
      </Text>

      {/* Room Cards - Only showing top 5 */}
      {recentRooms.map((data, index) => (
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
