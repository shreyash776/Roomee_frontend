import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import tw from 'twrnc';

const HomeScreen: React.FC = () => {
  return (
    <ScrollView 
      contentContainerStyle={tw` pt-12 px-6 h-auto`} 
      showsVerticalScrollIndicator={false}
      
    >
      {/* Heading */}
      <Text style={tw`text-4xl font-extrabold text-black mb-4`}>
        Join Millions of Verified Renters
      </Text>

      {/* Subtext */}
      <Text style={tw`text-base font-medium text-black mb-6`}>
        Roomi connects you to other verified renters in your area that are looking for roommates and posting rooms you can't find anywhere else. Stop stressing and let us help you find a better place to live!
      </Text>

      {/* Images */}
      <View style={tw`shadow-lg rounded-lg mb-6`}>
      <Image
        source={require('../../assets/images/home.png')}
        style={tw`w-full h-60 rounded-lg`}
        resizeMode="cover"
      />
    </View>
      <Image
        source={require('../../assets/images/home.png')}
        style={tw`w-full h-60 rounded-lg mb-6`}
        resizeMode="cover"
      />
    </ScrollView>
  );
};

export default HomeScreen;
