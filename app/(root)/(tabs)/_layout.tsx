import HeaderRight from '@/components/header/HeaderRight';
import SearchHeader from '@/components/header/SearchHeader';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#111',
          height: 75,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#d3d3d3',
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
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          header: () => <SearchHeader />,
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={26} color={color} />
          ),
        }}
      />
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
