import React from 'react';
import useAppStore from '@/configs/store';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { router } from 'expo-router';
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';
import CapyCloset from '@/assets/images/capy-closet.jpg';
import NoPermission from './components/no-permission';
import { Toast, ToastTitle, useToast } from '@/components/ui/toast';
import ProfileOption from './components/profile-option';
import { profileOptions } from './data/data';

const Profile = () => {
  const { isAuthenticated, user, logout } = useAppStore((state) => state);
  const toast = useToast();

  if (!isAuthenticated || !user) {
    return <NoPermission />;
  }

  const handleLogout = () => {
    logout();
    router.push('/(root)/(tabs)/products');
    toast.show({
      placement: 'bottom',
      containerStyle: {
        marginBottom: 60,
      },
      render: ({ id }) => (
        <Toast nativeID={id} variant="solid" action="success">
          <ToastTitle>Logged out successfully!</ToastTitle>
        </Toast>
      ),
    });
  };

  console.log(JSON.stringify(user, null, 2));

  return (
    <VStack className="flex-1 items-center bg-white" space="2xl">
      <VStack className="items-center" space="md">
        <Avatar size="2xl">
          <AvatarFallbackText>{user.customer.first_name}</AvatarFallbackText>
          <AvatarImage source={CapyCloset} />
          <AvatarBadge />
        </Avatar>
        <Text size="2xl" style={{ color: 'black' }}>
          Welcome{' '}
          <Text bold size="2xl">
            {user.customer.email}
          </Text>
        </Text>
      </VStack>

      <VStack className="w-full px-4" space="md">
        {profileOptions.map((option, index) => (
          <ProfileOption
            key={index}
            icon={option.icon}
            title={option.title}
            onPress={option.onPress}
          />
        ))}
      </VStack>

      <VStack space="md" className="mt-4 w-full px-4">
        <Button size="xl" onPress={handleLogout}>
          <ButtonText>Log Out</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
};

export default Profile;
