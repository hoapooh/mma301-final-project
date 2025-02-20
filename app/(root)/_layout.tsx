import React, { useEffect } from 'react';
import { router, Stack } from 'expo-router';
import useAppStore from '@/configs/store';

const RootLayout = () => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login
      // You might want to use router.replace('/auth/signin');
      router.replace('/(auth)/sign-in');
    }
  }, [isAuthenticated]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default RootLayout;
