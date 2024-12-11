import { Tabs } from 'expo-router';
import React from 'react';
import { TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import tw from 'twrnc';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';

const TabLayout: React.FC = () => {
  interface TabBarButtonProps {
    children: React.ReactNode;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
  }

  const TabBarButton: React.FC<TabBarButtonProps> = ({ children, onPress }) => (
    <TouchableOpacity
      style={tw`-top-7 justify-center items-center bg-violet-600 w-18 h-18 rounded-full shadow-lg shadow-black`}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );

  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: tw.color('text-violet-600'),
      tabBarInactiveTintColor: tw.color('text-gray-500'),
      headerShown: false,
      tabBarStyle: tw`bg-white border-t-0 elevation-2 h-18 px-6 pb-4 rounded-t-xl absolute bottom-4 left-4 right-4`,
      tabBarItemStyle: tw`rounded-xl`, // Ensures rounded corners
      tabBarActiveBackgroundColor: tw.color('bg-violet-100'), // Active background color
      tabBarLabelStyle: tw`text-xs`,
    }}
    initialRouteName="home"
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarLabelStyle: tw`text-xs`,
          tabBarActiveBackgroundColor: tw.color('bg-violet-100'),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <Feather
              name="search"
              size={24}
              color={color}
            />
          ),
          tabBarLabelStyle: tw`text-xs`,
          tabBarActiveBackgroundColor: tw.color('bg-violet-100'),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'chatbubble' : 'chatbubble-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarLabelStyle: tw`text-xs`,
          tabBarActiveBackgroundColor: tw.color('bg-violet-100'),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarLabelStyle: tw`text-xs`,
          tabBarActiveBackgroundColor: tw.color('bg-violet-100'),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
