import HeaderRight from '@/components/header/HeaderRight';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#111',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 5,
          height: 60,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#c3c3c3',
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="products"
        options={{
          title: 'Home',
          headerShown: true,
          headerRight: () => <HeaderRight />,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={26} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerTitleStyle: {
            display: 'none',
          },
          headerRight: () => <SearchHeader />,
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={26} color={color} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="bag"
        options={{
          title: 'Bag',
          tabBarIcon: ({ color }) => (
            <Ionicons name="bag-outline" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
