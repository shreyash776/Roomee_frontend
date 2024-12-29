import React, { useEffect, useState } from 'react';
import { View,Text } from 'react-native';
// import MapView, { Marker, Region } from 'react-native-maps';
// import * as Location from 'expo-location';
import tw from 'twrnc';
// import { GOOGLE_MAPS_API_KEY } from "@env";

const Maps: React.FC = () => {
//   const [location, setLocation] = useState<Region | null>(null);

//   useEffect(() => {
//     (async () => {
//       // Request location permissions
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.error('Permission to access location was denied');
//         return;
//       }

//       // Get the current location
//       const currentLocation = await Location.getCurrentPositionAsync({});
//       setLocation({
//         latitude: currentLocation.coords.latitude,
//         longitude: currentLocation.coords.longitude,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       });
//     })();
//   }, []);

  return (
    <View style={tw`flex-1`}>
      {/* {location && (
        <MapView
          style={tw`flex-1`}
          initialRegion={location}
          provider="google" 
          googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="You are here"
            description="Current location"
          />
        </MapView>
      )} */}
      <Text>hello welcome to the map page</Text>
    </View>
  );
};

export default Maps;
