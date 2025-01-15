import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Image,
  Platform 
} from 'react-native';
import tw from 'twrnc';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import * as Location from 'expo-location';

interface AmenityItem {
  name: string;
  icon: string;
  iconFamily: 'Ionicons' | 'MaterialCommunityIcons' | 'FontAwesome5';
  selected: boolean;
}

const PostRoom: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [rent, setRent] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [specifications, setSpecifications] = useState('');
  const [amenities, setAmenities] = useState<AmenityItem[]>([
    { name: 'WiFi', icon: 'wifi', iconFamily: 'Ionicons', selected: false },
    { name: 'Washing Machine', icon: 'washing-machine', iconFamily: 'MaterialCommunityIcons', selected: false },
    { name: 'AC', icon: 'air-conditioner', iconFamily: 'MaterialCommunityIcons', selected: false },
    { name: 'TV', icon: 'tv', iconFamily: 'Ionicons', selected: false },
    { name: 'Fridge', icon: 'fridge-outline', iconFamily: 'MaterialCommunityIcons', selected: false },
    { name: 'Parking', icon: 'car', iconFamily: 'FontAwesome5', selected: false },
    { name: 'Security', icon: 'security', iconFamily: 'MaterialCommunityIcons', selected: false },
    { name: 'Gym', icon: 'dumbbell', iconFamily: 'FontAwesome5', selected: false },
  ]);

  const pickImages = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map(asset => asset.uri);
      setImages([...images, ...selectedImages]);
    }
  };

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    if (address[0]) {
      const formattedAddress = `${address[0].street}, ${address[0].city}, ${address[0].region}`;
      setAddress(formattedAddress);
    }
  };

  const toggleAmenity = (index: number) => {
    const newAmenities = [...amenities];
    newAmenities[index].selected = !newAmenities[index].selected;
    setAmenities(newAmenities);
  };

  const renderAmenityIcon = (amenity: AmenityItem) => {
    switch (amenity.iconFamily) {
      case 'Ionicons':
        return <Ionicons name={amenity.icon as any} size={24} color={amenity.selected ? 'white' : '#8B5CF6'} />;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name={amenity.icon as any} size={24} color={amenity.selected ? 'white' : '#8B5CF6'} />;
      case 'FontAwesome5':
        return <FontAwesome5 name={amenity.icon as any} size={24} color={amenity.selected ? 'white' : '#8B5CF6'} />;
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
      {/* Images Section */}
      <View style={tw`mb-6`}>
        <Text style={tw`text-lg font-bold mb-2`}>Room Images</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            onPress={pickImages}
            style={tw`w-20 h-20 bg-gray-200 rounded-lg mr-2 items-center justify-center`}
          >
            <Ionicons name="add" size={30} color="gray" />
          </TouchableOpacity>
          {images.map((uri, index) => (
            <Image 
              key={index}
              source={{ uri }}
              style={tw`w-20 h-20 rounded-lg mr-2`}
            />
          ))}
        </ScrollView>
      </View>

      {/* Rent Section */}
      <View style={tw`mb-6`}>
        <Text style={tw`text-lg font-bold mb-2`}>Monthly Rent</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-lg p-3`}
          placeholder="Enter monthly rent"
          keyboardType="numeric"
          value={rent}
          onChangeText={setRent}
        />
      </View>

      {/* Description Section */}
      <View style={tw`mb-6`}>
        <Text style={tw`text-lg font-bold mb-2`}>Description</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-lg p-3 h-32`}
          placeholder="Describe your room"
          multiline
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />
      </View>

      {/* Address Section */}
      <View style={tw`mb-6`}>
        <Text style={tw`text-lg font-bold mb-2`}>Address</Text>
        <View style={tw`flex-row`}>
          <TextInput
            style={tw`flex-1 border border-gray-300 rounded-lg p-3 mr-2`}
            placeholder="Enter address"
            value={address}
            onChangeText={setAddress}
          />
          <TouchableOpacity 
            onPress={getCurrentLocation}
            style={tw`bg-violet-400 rounded-lg p-3`}
          >
            <Ionicons name="location" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Specifications Section */}
      <View style={tw`mb-6`}>
        <Text style={tw`text-lg font-bold mb-2`}>Specifications</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-lg p-3`}
          placeholder="e.g., 2 BHK, 1000 sq ft"
          value={specifications}
          onChangeText={setSpecifications}
        />
      </View>

      {/* Amenities Section */}
      <View style={tw`mb-6`}>
        <Text style={tw`text-lg font-bold mb-2`}>Amenities</Text>
        <View style={tw`flex-row flex-wrap`}>
          {amenities.map((amenity, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleAmenity(index)}
              style={[
                tw`flex-row items-center p-3 rounded-lg mr-2 mb-2`,
                amenity.selected ? tw`bg-violet-600` : tw`bg-violet-100`
              ]}
            >
              {renderAmenityIcon(amenity)}
              <Text style={[
                tw`ml-2`,
                amenity.selected ? tw`text-white` : tw`text-violet-600`
              ]}>
                {amenity.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity 
        style={tw`bg-violet-600 rounded-lg p-4 items-center mb-6`}
        onPress={() => {
          // Handle form submission
        }}
      >
        <Text style={tw`text-white font-bold text-lg`}>Post Room</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PostRoom;
