import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

type RoomParams = {
  id: string;
  address: string;
  profilePic: string;
  userName: string;
  images: string;
  rent: string;
  specifications: string; 
};

const RoomDetail = () => {
  const router = useRouter();
  const { id, address, profilePic, userName, images, rent, specifications } =
    useSearchParams<RoomParams>();

  const roomImages = JSON.parse(images || '[]');
  const roomSpecifications = JSON.parse(specifications || '[]');

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center p-4 bg-violet-600`}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-white text-lg font-bold ml-4`}>Room Details</Text>
      </View>

      <ScrollView>
        {/* Image Carousel */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={tw`h-64`}
        >
          {roomImages.map((img: string, index: number) => (
            <Image
              key={index}
              source={{ uri: img }}
              style={tw`w-full h-full`}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* Room Details */}
        <View style={tw`p-4`}>
          <Text style={tw`text-xl font-bold mb-2`}>{address}</Text>
          <Text style={tw`text-gray-500 text-sm`}>Hosted by {userName}</Text>

          <View style={tw`flex-row items-center justify-between mt-4`}>
            <Text style={tw`text-lg font-bold`}>${rent} / month</Text>
            <Ionicons name="pricetag" size={24} color="green" />
          </View>

          {/* Specifications */}
          <Text style={tw`text-lg font-bold mt-4`}>Specifications:</Text>
          {roomSpecifications.map((spec: string, index: number) => (
            <Text key={index} style={tw`text-gray-700 ml-2 mt-1`}>
              - {spec}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default RoomDetail;
