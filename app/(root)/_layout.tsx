import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native';

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="product" options={{ headerShown: false }} />
      <Stack.Screen name="(search)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
