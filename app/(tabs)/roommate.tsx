import { Link } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, Text ,TouchableOpacity ,View } from 'react-native';
import tw from 'twrnc';
import UserCard from '../components/userCard'; 
import { dummyData } from '../data/dummyData'; 
import { useAuth } from "../../context/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';


const ChatScreen: React.FC = () => {
  
  const { user, isAuthenticated } = useAuth();
   //console the user name
  console.log(user?.name);
 useEffect(() => {
  const checkAsyncStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      console.log("AsyncStorage contents:", items);
    } catch (error) {
      console.error("Error reading AsyncStorage:", error);
    }
  };
  
  // Call this function where appropriate, e.g., in componentDidMount or useEffect
  checkAsyncStorage();
  }, []);

  return (
    <ScrollView 
      contentContainerStyle={tw`bg-white pt-12 px-6`} 
      showsVerticalScrollIndicator={false}
    >
       <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-4xl font-extrabold text-black mb-6`} >Welcome, {user?.name}!</Text>
          <Text style={tw`text-4xl font-extrabold text-black mb-6`} >Your ID: {user?.id}</Text>
        </View>
      {/* Heading */}
      <Text style={tw`text-4xl font-extrabold text-black mb-6`}>
        Chat with Roommates
      </Text>

      {/* Subtext */}
      <Text style={tw`text-base text-black mb-8`}>
        Connect with verified renters to discuss your housing needs and find the perfect living arrangement.
      </Text>

     <View style={tw`flex-column justify-center items-center gap-5`}>
       {/* User Cards */}
       {dummyData.map((data, index) => (
        <Link href={`/screens/user/${data.id}`}>

          <UserCard
            key={index}
            profilePic={data.profilePic}
            userName={data.userName}
            work={data.work}
            intro={data.introduction}
          />
        </Link>


))}
</View>
    </ScrollView>
  );
};

export default ChatScreen;
