import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';

const RootLayout = () => {
  const userQuery = useCurrentUser();

  useEffect(() => {}, [userQuery]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="product" options={{ headerShown: false }} />
      <Stack.Screen name="(search)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
