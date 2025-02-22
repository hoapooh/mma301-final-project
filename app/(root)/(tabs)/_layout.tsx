import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome6, Feather, Ionicons } from '@expo/vector-icons';

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#282828',
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#d3d3d3',
      }}
    >
      <Tabs.Screen
        name="products"
        options={{
          title: 'Products',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="computer" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bag"
        options={{
          title: 'Bag',
          tabBarIcon: ({ color }) => (
            <Ionicons name="bag-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
