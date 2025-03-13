import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { router } from 'expo-router';
import React from 'react';

const NoPermission = () => {
  return (
    <VStack className="flex-1 justify-center items-center" space="md">
      <Text size="2xl" bold style={{ textAlign: 'center' }}>
        Not authenticated! Please Login to continue.
      </Text>

      <Button
        size="xl"
        variant="solid"
        action="primary"
        onPress={() => router.replace('/(auth)/sign-in')}
      >
        <ButtonText>Go To Login</ButtonText>
      </Button>
    </VStack>
  );
};

export default NoPermission;
