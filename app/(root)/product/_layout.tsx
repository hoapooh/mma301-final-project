import HeaderRight from '@/components/header/MainHeader';
import { Stack } from 'expo-router';
import React from 'react';

const ProductLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: '',
          headerRight: () => <HeaderRight />,
        }}
      />
    </Stack>
  );
};

export default ProductLayout;
