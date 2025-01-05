// import React, { useEffect, useState } from 'react';
// import { View, Text, Image } from 'react-native';
// import MapView, { Marker, Region, Callout } from 'react-native-maps';
// import * as Location from 'expo-location';
// import tw from 'twrnc';
// import { dummyData } from '../data/dummyData';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

// const CustomMarker = ({ property }) => (
//   <View>
//     <View style={tw`relative items-center`}>
//       {/* Icon container with background */}
//       <View style={tw`bg-violet-500 p-2 rounded-full border-2 border-white`}>
//         <MaterialCommunityIcons name="home" size={24} color="white" />
//       </View>
//       {/* Bottom pointer */}
//       <View style={tw`absolute -bottom-2 w-4 h-4 rotate-45 bg-violet-500`} />
//     </View>
//   </View>
// );
// const CustomCallout = ({ property }) => (
//   <View style={tw`bg-white p-4 rounded-lg min-w-[200px]`}>
//     <View style={tw`flex-row items-center`}>
//       <Image 
//         source={{ uri: property.profilePic }} 
//         style={tw`w-12 h-12 rounded-full mr-3`}
//       />
//       <View style={tw`flex-1`}>
//         <Text style={tw`font-bold text-base text-black`}>{property.userName}</Text>
//         <Text style={tw`text-sm text-gray-600`}>₹{property.rent}</Text>
//         <Text style={tw`text-xs text-gray-500 mt-1`}>{property.specifications}</Text>
//       </View>
//     </View>
//   </View>
// );

// const Maps: React.FC = () => {
//   const [location, setLocation] = useState<Region | null>(null);
//   const [selectedMarker, setSelectedMarker] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.error('Permission to access location was denied');
//         return;
//       }

//       const currentLocation = await Location.getCurrentPositionAsync({});
//       setLocation({
//         latitude: currentLocation.coords.latitude,
//         longitude: currentLocation.coords.longitude,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       });
//     })();
//   }, []);

//   return (
//     <View style={tw`flex-1`}>
//       {location && (
//         <MapView
//           style={tw`flex-1`}
//           initialRegion={location}
//           provider="google"
//           googleMapsApiKey="AIzaSyBDCOBjXnM2qViIvYzvwoMIkvf-TG-q8zw"
//         >
//           {/* Current location marker */}
//           <Marker
//             coordinate={{
//               latitude: location.latitude,
//               longitude: location.longitude,
//             }}
//             title="You are here"
//             description="Current location"
//             pinColor="blue"
//           />

//           {/* Custom markers for properties */}
//           {dummyData.map((property, index) => (
//             <Marker
//               key={index}
//               coordinate={{
//                 latitude: property.latitude,
//                 longitude: property.longitude,
//               }}
//               onPress={() => setSelectedMarker(property)}
//             >
//               <CustomMarker property={property} />
//               {selectedMarker?.userName === property.userName && (
//                 <View style={tw`absolute top-13 `}>
//                   <Text style={tw`bg-violet-500 text-white px-2 w-auto h-14  rounded-full`}>               
//                     {property.userName}
//                   </Text>
//                  </View>
//               )}
//              <Callout tooltip>
//       <CustomCallout property={property} />
//     </Callout>
//             </Marker>
//           ))}
//         </MapView>
//       )}
//     </View>
//   );
// };

// export default Maps;
