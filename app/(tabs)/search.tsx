import React, { useState } from 'react';
import { View, TextInput, ScrollView, Text } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons'; 
import RoomCard from '../components/RoomCard'; 
import { dummyData } from '../data/dummyData'; 
const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [filteredRooms, setFilteredRooms] = useState(dummyData); 
  const handleSearch = (text) => {
    setQuery(text);

    if (text.length >= 1) {
      const filtered = dummyData.filter((room) =>
        room.address.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredRooms(filtered);
    } else {
      setFilteredRooms(dummyData); // Show all rooms if query is empty
    }
  };

  return (
    <View style={tw`flex-1 bg-gray-100 p-4`}>
      {/* Search Bar */}
      <View style={tw`flex-row items-center bg-white px-4 py-2 rounded-full shadow-lg mb-8 mt-4`}>
        <Ionicons name="search" size={24} color="violet-400" style={tw`mr-3 text-violet-600`} />
        <TextInput
          style={tw`flex-1`}
          placeholder="Search location..."
          value={query}
          onChangeText={handleSearch}
        />
      </View>

      {/* Results */}
      <ScrollView>
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room, index) => (
            <RoomCard
              key={index}
              profilePic={room.profilePic}
              userName={room.userName}
              images={room.images}
              rent={room.rent}
              specifications={room.specifications}
              address={room.address}
            />
          ))
        ) : (
          <Text style={tw`text-center text-gray-500 mt-4`}>
            No results found.
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
