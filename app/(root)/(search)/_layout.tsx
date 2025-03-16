import SearchHeader from '@/components/header/SearchHeader';
import { Stack } from 'expo-router';
import React from 'react';

const SearchLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="search"
        options={{
          headerTitle: '',
          headerShown: true,
          headerRight: () => <SearchHeader />,
        }}
      />
    </Stack>
  );
};

export default SearchLayout;
