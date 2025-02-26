import React from 'react';
import { Stack } from 'expo-router';
import MainHeader from '@/components/header/MainHeader';

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          header: () => <MainHeader />,
        }}
      />
    </Stack>
  );
};

export default RootLayout;
