import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const HomeScreen: React.FC = () => {
  return (
    <View style={tw`flex-1 bg-white pt-12 px-6`}>
      {/* Heading */}
      <Text style={tw`text-4xl font-extrabold text-black mb-4`}>
        Join Millions of Verified Renters
      </Text>
      
      {/* Subtext */}
      <Text style={tw`text-base text-black`}>
        Roomi connects you to other verified renters in your area that are looking for roommates and posting rooms you can't find anywhere else. Stop stressing and let us help you find a better place to live!
      </Text>
    </View>
  );
};

export default HomeScreen;
