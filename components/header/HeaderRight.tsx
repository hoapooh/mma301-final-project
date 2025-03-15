import { HStack } from '@/components/ui/hstack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
const HeaderRight = () => {
  return (
    <View>
      <HStack space="sm" className="w-full items-center  ">
        <Link href="/search">
          <Ionicons name="search" size={24} color="black" />
        </Link>
        <Link href="/cart">
          <Ionicons name="cart-outline" size={24} color="black" />
        </Link>
      </HStack>
    </View>
  );
};

export default HeaderRight;
