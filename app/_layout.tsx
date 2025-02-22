import '@/global.css';

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as Network from 'expo-network';
import { AppState, Platform } from 'react-native';
import type { AppStateStatus } from 'react-native';
import { focusManager } from '@tanstack/react-query';
import {
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minutes
    },
  },
});

onlineManager.setEventListener((setOnline) => {
  const subscription = Network.addNetworkStateListener((state) => {
    setOnline(!!state.isConnected);
  });

  // Return a cleanup function
  return () => {
    subscription.remove();
  };
});

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

export default function RootLayout() {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <SafeAreaView style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              headerShown: true,
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen
              name="(auth)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="(root)" />
          </Stack>
        </SafeAreaView>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
