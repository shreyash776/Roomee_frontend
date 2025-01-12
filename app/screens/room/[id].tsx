import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import tw from 'twrnc';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { dummyData } from '../../data/dummyData';
import BackArrowButton from '@/app/components/BackArrowButton';

const RoomView: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { width } = Dimensions.get('window'); 
  const room = dummyData.find((room) => String(room.id) === String(id));

  if (!room) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <Text style={tw`text-lg font-bold text-red-500`}>Room not found!</Text>
      </View>
    );
  }
  const { images, address, rent, specifications, profilePic, userName } = room;
  console.log(images)

  return (
    <ScrollView contentContainerStyle={tw`bg-white flex-grow px-2 py-3`}>
     
      <BackArrowButton />

     
     <View style={tw`h-80 w-full px-2 `}>
     <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={tw` w-full `}>
          
          {images.map((img, index) => (
              
              <Image
            key={index} 
            source={{ uri: img }}
            style={[
              tw`h-80 mr-2`,
              { width }, 
            ]}
            resizeMode="cover" 
          />
        ))}
           
          
      
        </ScrollView>
     </View>
      

      
      <View style={tw`px-4 mt-4`}>
        <Text style={tw`text-2xl font-bold mb-2`}>{address}</Text>
        <Text style={tw`text-lg text-gray-600 mb-4`}>Hosted by {userName}</Text>
        <Text style={tw`text-xl font-bold text-green-600 mb-4`}>${rent} / month</Text>

        
        <Text style={tw`text-lg font-bold text-gray-800 mb-2`}>Specifications:</Text>
        {specifications ? (
          <Text style={tw`text-gray-700 ml-2`}>{specifications}</Text> 
        ) : (
          <Text style={tw`text-gray-500 ml-2`}>No specifications provided.</Text>
        )}
      </View>

     
      <View style={tw`mt-8`}>
        <TouchableOpacity
          style={tw`bg-violet-500 w-full py-3 rounded-lg items-center`}
          onPress={() => alert('Contact feature coming soon!')}
        >
          <Text style={tw`text-white font-bold text-lg`}>Contact Host</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RoomView;
