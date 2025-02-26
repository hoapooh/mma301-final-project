import { HStack } from '@/components/ui/hstack';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { View } from 'react-native';
const HeaderRight = () => {
  return (
    <View>
      <HStack space="sm" className="w-full items-center h-[70px] p-2 bg-white">
        <Ionicons name="search" size={24} color="black" />
        <Ionicons name="cart-outline" size={30} color="black" />
      </HStack>
    </View>
  );
};

export default HeaderRight;
