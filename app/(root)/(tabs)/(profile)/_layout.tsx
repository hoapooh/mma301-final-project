import { Stack } from 'expo-router';
import React from 'react';

const ProfileLayout = () => {
  return (
    <Stack
      screenOptions={{ headerShadowVisible: false, headerTitleAlign: 'center' }}
    >
      <Stack.Screen name="index" options={{ headerTitle: 'Profile' }} />
      <Stack.Screen
        name="account"
        options={{ headerTitle: 'Account Information' }}
      />
      <Stack.Screen name="address" options={{ headerTitle: 'My Addresses' }} />
    </Stack>
  );
};

export default ProfileLayout;
