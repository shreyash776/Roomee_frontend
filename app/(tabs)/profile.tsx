import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const HomeScreen: React.FC = () => {
  return (
    <View style={tw`flex-1 justify-center items-center bg-white`}>
      <Text style={tw`text-lg font-bold`}>profile Screen</Text>
    </View>
  );
};

export default HomeScreen;
