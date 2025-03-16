import SearchHeader from '@/components/header/SearchHeader';
import { Stack } from 'expo-router';
import React from 'react';

const SearchLayout = () => {
  return (
    <Stack screenOptions={{ headerTitle: 'Cart' }}>
      <Stack.Screen name="cart" />
    </Stack>
  );
};

export default SearchLayout;
