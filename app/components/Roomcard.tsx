import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

interface RoomCardProps {
  profilePic: string;
  userName: string;
  images: string[];
  rent: string;
  specifications: string;
  address: string;
  onPress: () => void; 
}

const RoomCard: React.FC<RoomCardProps> = ({
  profilePic,
  userName,
  images,
  rent,
  specifications,
  address,
  onPress,
}) => {
  return (
    <View style={tw`bg-white rounded-lg shadow-lg mb-5`}>
      {/* Header */}
      <View style={tw`p-4`}>
        <View style={tw`flex-row items-center mb-2`}>
          <Image
            source={{ uri: profilePic }}
            style={tw`w-10 h-10 rounded-full mr-2`}
          />
          <Text style={tw`font-bold text-lg`}>{userName}</Text>
        </View>

        {/* Images */}
        <FlatList
          horizontal
          data={images}
          keyExtractor={(item, index) => `${item}-${index}`}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={tw`w-78 h-60 rounded-sm mr-2`}
              resizeMode="cover"
            />
          )}
        />

        {/* Details */}
        <Text style={tw`text-lg font-bold my-2 text-black`}>
          ${rent}/month
        </Text>
        <Text style={tw`text-gray-600 mb-1`}>{specifications}</Text>
        <Text style={{
  backgroundColor: '#D1D5DB',
  borderRadius: 16,
  paddingHorizontal: 10,
  paddingVertical: 5,
  alignSelf: 'flex-start',
  marginBottom: 10,
}}>{address}</Text>

        {/* Clickable Section */}
        <TouchableOpacity
  onPress={onPress}
  style={tw`bg-violet-600 rounded-xl w-31 flex-row items-center justify-center py-2 px-3`}
>
  <Text style={tw`text-white font-bold text-center mr-2`}>View Details</Text>
  <Ionicons name="arrow-forward-circle" size={22} color="white" />
</TouchableOpacity>
      </View>
    </View>
  );
};

export default RoomCard;
