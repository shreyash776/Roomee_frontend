import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import tw from 'twrnc';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { roomService } from '../../lib/room-service';

interface AmenityItem {
  name: string;
  icon: string;
  iconFamily: 'Ionicons' | 'MaterialCommunityIcons' | 'FontAwesome5';
  selected: boolean;
}

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
}

const PostRoom: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [rent, setRent] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState<LocationData | null>(null);
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickImages = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Please allow access to your photo library to select images.');
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
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please enable location services to use this feature');
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });

      const { latitude, longitude } = position.coords;
      
      const addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (addressResponse[0]) {
        const formattedAddress = `${addressResponse[0].street || ''}, ${addressResponse[0].city || ''}, ${addressResponse[0].region || ''}`;
        
        setLocation({
          latitude,
          longitude,
          address: formattedAddress
        });
        setAddress(formattedAddress);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to get location. Please try again.');
    }
  };

  const toggleAmenity = (index: number) => {
    setAmenities(prevAmenities => 
      prevAmenities.map((amenity, i) => 
        i === index ? { ...amenity, selected: !amenity.selected } : amenity
      )
    );
  };

  const renderAmenityIcon = (amenity: AmenityItem) => {
    const IconComponent = 
      amenity.iconFamily === 'Ionicons' ? Ionicons :
      amenity.iconFamily === 'MaterialCommunityIcons' ? MaterialCommunityIcons :
      FontAwesome5;
    
    return <IconComponent name={amenity.icon as any} size={24} color={amenity.selected ? 'white' : '#8B5CF6'} />;
  };

  const handleSubmit = async () => {
    if (images.length === 0 || !rent || !description || !location || !specifications) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!location?.latitude || !location?.longitude) {
      Alert.alert('Error', 'Please set location using the location button');
      return;
    }
  
    const formData = new FormData();
  
    // Add images
    images.forEach((uri, index) => {
      formData.append('images', {
        uri,
        type: 'image/jpeg',
        name: `image_${index}.jpg`
      } as any);
    });
  
    // Add coordinates directly to form data
    formData.append('latitude', location.latitude.toString());
    formData.append('longitude', location.longitude.toString());
  
    // Add other fields
    formData.append('address', JSON.stringify({
      street: address,
      city: '', // Add actual values from reverse geocoding
      state: '',
      zipCode: '',
      country: ''
    }));
    
    formData.append('amenities', JSON.stringify(
      amenities.filter(a => a.selected).map(a => a.name)
    ));
    formData.append('rent', rent);
    formData.append('description', description);
    formData.append('specifications', specifications);

    setIsSubmitting(true);
    try {
      const response = await roomService.createRoom(formData);
      if (response.success) {
        Alert.alert('Success', 'Room posted successfully!');
        // Reset form
        setImages([]);
        setRent('');
        setDescription('');
        setAddress('');
        setLocation(null);
        setSpecifications('');
        setAmenities(amenities.map(a => ({ ...a, selected: false })));
      } else {
        Alert.alert('Error', response.error || 'Failed to post room');
      }
    } catch (error) {
      console.error('Error posting room:', error);
      Alert.alert('Error', 'An unexpected error occurred while posting the room');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
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

      <View style={tw`mb-6`}>
        <Text style={tw`text-lg font-bold mb-2`}>Address</Text>
        <View style={tw`flex-row`}>
          <TextInput
            style={tw`flex-1 border border-gray-300 rounded-lg p-3 mr-2`}
            placeholder="Enter address"
            value={address}
            onChangeText={(text) => {
              setAddress(text);
              setLocation(null);
            }}
          />
          <TouchableOpacity 
            onPress={getCurrentLocation}
            style={tw`bg-violet-400 rounded-lg p-3`}
          >
            <Ionicons name="location" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {location && (
          <Text style={tw`text-gray-500 mt-1 text-sm`}>
            Coordinates: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
          </Text>
        )}
      </View>

      <View style={tw`mb-6`}>
        <Text style={tw`text-lg font-bold mb-2`}>Specifications</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-lg p-3`}
          placeholder="e.g., 2 BHK, 1000 sq ft"
          value={specifications}
          onChangeText={setSpecifications}
        />
      </View>

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

      <TouchableOpacity 
        style={tw`bg-violet-600 rounded-lg p-4 items-center mb-6 ${isSubmitting ? 'opacity-50' : ''}`}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={tw`text-white font-bold text-lg`}>Post Room</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PostRoom;
