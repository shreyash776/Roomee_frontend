import React from 'react';
import { ScrollView, Text } from 'react-native';
import tw from 'twrnc';
import UserCard from '../components/userCard'; 
import { dummyData } from '../data/dummyData'; 

const ChatScreen: React.FC = () => {
  return (
    <ScrollView 
      contentContainerStyle={tw`bg-white pt-12 px-6`} 
      showsVerticalScrollIndicator={false}
    >
      {/* Heading */}
      <Text style={tw`text-4xl font-extrabold text-black mb-6`}>
        Chat with Roommates
      </Text>

      {/* Subtext */}
      <Text style={tw`text-base text-black mb-8`}>
        Connect with verified renters to discuss your housing needs and find the perfect living arrangement.
      </Text>

      {/* User Cards */}
      {dummyData.map((data, index) => (
        <UserCard
          key={index}
          profilePic={data.profilePic}
          userName={data.userName}
          work={data.work}
          intro={data.introduction}
        />
      ))}
    </ScrollView>
  );
};

export default ChatScreen;
