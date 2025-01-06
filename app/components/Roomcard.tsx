import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';
import tw from 'twrnc';



interface RoomCardProps {
  profilePic: string;
  userName: string;
  images: string[];
  rent: string;
  specifications: string;
  address: string;
}

const RoomCard: React.FC<RoomCardProps> = ({
  profilePic,
  userName,
  images,
  rent,
  specifications,
  address
}) => {
  return (
    <View style={tw`bg-white rounded-lg shadow-lg mb-5`}>
     
      <View style={tw`p-4`}>
        <View style={tw`flex-row items-center mb-2`}>
          <Image
            source={{ uri: profilePic }}
            style={tw`w-10 h-10 rounded-full mr-2`}
          />
          <Text style={tw`font-bold`}>{userName}</Text>
        </View>
        <FlatList
        horizontal
        data={images}
        keyExtractor={(item, index) => `${item}-${index}`}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={tw`w-78 h-60 rounded-sm mr-1`}
          />
        )}
      />
        <Text style={tw`text-lg font-bold my-1`}>${rent}/month</Text>
        <Text style={tw`text-gray-600 mb-1`}>{specifications}</Text>
        <Text style={tw`text-gray-500`}>{address}</Text>
      </View>
    </View>
  );
};

export default RoomCard;
