import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Divider } from '@/components/ui/divider';
import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';
import { ScrollView } from '@/components/ui/scroll-view';
import useAppStore from '@/configs/store';
import { Spinner } from '@/components/ui/spinner';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from '@expo/vector-icons';
import { View } from 'react-native';
import colors from 'tailwindcss/colors';

const ProfileItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <VStack className="w-full my-2">
    <Text size="sm" className="text-gray-500">
      {label}
    </Text>
    <HStack className="mt-1 items-center" space="md">
      {icon}
      <Text size="lg">{value}</Text>
    </HStack>
    <Divider className="mt-3" />
  </VStack>
);

const Account = () => {
  const { user } = useAppStore((state) => state);

  console.log(JSON.stringify(user, null, 2));

  if (!user)
    return (
      <VStack className="flex-1 justify-center items-center">
        <Spinner size="large" className="text-primary-500" />
        <Text className="mt-4" size="md">
          Loading your profile...
        </Text>
      </VStack>
    );

  // Get user initials for avatar fallback
  const getInitials = () => {
    const firstName = user.customer.first_name || '';
    const lastName = user.customer.last_name || '';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Profile Header */}
      <Box className="w-full bg-primary-500 pt-6 pb-12 items-center">
        <View className="h-24 w-24 rounded-full bg-white overflow-hidden items-center justify-center border-4 border-white shadow-md mb-3">
          {user.customer.avatar ? (
            <Image
              source={{ uri: user.customer.avatar }}
              className="h-full w-full"
              alt="Profile Picture"
            />
          ) : (
            <Text size="4xl" className="text-primary-500" bold>
              {getInitials()}
            </Text>
          )}
        </View>
        <Text size="2xl" className="text-white" bold>
          {user.customer.first_name + ' ' + user.customer.last_name}
        </Text>
        <Text size="md" className="text-white">
          {user.customer.email}
        </Text>
      </Box>

      {/* Profile Info */}
      <Box className="mx-4 p-5 bg-white rounded-xl -mt-8 shadow-sm">
        <VStack space="md">
          <Text size="xl" bold className="mb-2">
            Account Information
          </Text>

          <ProfileItem
            icon={
              <Ionicons
                name="mail-outline"
                size={20}
                className="text-primary-500"
              />
            }
            label="EMAIL ADDRESS"
            value={user.customer.email || 'Not provided'}
          />

          <ProfileItem
            icon={
              <Ionicons
                name="person-outline"
                size={20}
                className="text-primary-500"
              />
            }
            label="FULL NAME"
            value={`${user.customer.first_name || ''} ${user.customer.last_name || ''}`}
          />

          <ProfileItem
            icon={
              <Ionicons
                name="call-outline"
                size={20}
                className="text-primary-500"
              />
            }
            label="PHONE NUMBER"
            value={user.customer.phone || 'Not provided'}
          />

          <ProfileItem
            icon={
              <MaterialCommunityIcons
                name="account-check-outline"
                size={20}
                className="text-primary-500"
              />
            }
            label="ACCOUNT STATUS"
            value={
              user.customer.has_account ? 'Verified' : 'Pending verification'
            }
          />

          {user.customer.created_at && (
            <ProfileItem
              icon={
                <FontAwesome
                  name="calendar"
                  size={18}
                  className="text-primary-500"
                />
              }
              label="MEMBER SINCE"
              value={new Date(user.customer.created_at).toLocaleDateString(
                'en-US',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }
              )}
            />
          )}
        </VStack>
      </Box>

      {/* Membership Status */}
      <Box className="mx-4 mt-4 p-5 bg-white rounded-xl shadow-sm">
        <VStack>
          <Text size="xl" bold className="mb-2">
            Membership
          </Text>
          <HStack className="items-center" space="md">
            <Box className="p-2 bg-amber-100 rounded-full">
              <Ionicons name="star" size={20} color={colors.amber[500]} />
            </Box>
            <VStack>
              <Text size="lg" bold>
                Standard Member
              </Text>
              <Text size="sm" className="text-gray-500">
                You've been a member for {Math.floor(Math.random() * 12) + 1}{' '}
                months
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </Box>

      {/* Spacer for bottom padding */}
      <Box className="h-20" />
    </ScrollView>
  );
};

export default Account;
