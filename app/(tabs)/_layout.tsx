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
      tabBarActiveTintColor: tw.color('indigo-600'),
      tabBarInactiveTintColor: tw.color('text-gray-500'),
      headerShown: false,
      tabBarStyle: tw` bg-white border-1 border-color-black elevation-z h-15   rounded-3xl  bottom-4 w-11/13.5  shadow-lg   mx-auto self-center `,
      tabBarItemStyle: tw` border-0 rounded-xl`, // Ensures rounded corners
      // tabBarActiveBackgroundColor: tw.color('bg-violet-100'), // Active background color 
      tabBarLabelStyle: tw`text-xs`,
    }} 
    initialRouteName="home"
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null, // This hides the tab
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'HOME',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={20}
              color={color}
            />
          ),
          tabBarLabelStyle: tw`text-xs rounded-2xl`,
          // tabBarActiveBackgroundColor: tw.color('bg-violet-100'),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'ROOMS',
          tabBarIcon: ({ color, focused }) => (
            <Feather
              name="search"
              size={24}
              color={color}
            />
          ),
          tabBarLabelStyle: tw`text-xs`,
          // tabBarActiveBackgroundColor: tw.color('bg-violet-100'),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: 'ROOMMATE',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'chatbubble' : 'chatbubble-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarLabelStyle: tw`text-xs`,
          // tabBarActiveBackgroundColor: tw.color('bg-violet-100'),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFILE',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarLabelStyle: tw`text-xs`,
          
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
