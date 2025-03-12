import React, { useState } from 'react';
import { VStack } from '@/components/ui/vstack';
import useAppStore from '@/configs/store';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import AddressActionSheet from '@/screens/auth/profile/components/addess-action-sheet';
import { HStack } from '@/components/ui/hstack';
import { Ionicons } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { Badge, BadgeText } from '@/components/ui/badge';

const Address = () => {
  const { user } = useAppStore((state) => state);
  const [showActionsheet, setShowActionsheet] = useState(false);
  const handleClose = () => setShowActionsheet(false);

  if (!user) return <Spinner size={'large'} color={'#000'} />;

  if (
    !user.customer.addresses?.length ||
    user.customer.addresses.length === 0
  ) {
    return (
      <>
        <VStack className="flex-1 bg-white p-4" space="md">
          <Text size="2xl" bold>
            No address found
          </Text>
          <Pressable
            className="w-full p-4 bg-black rounded-lg"
            onPress={() => setShowActionsheet(true)}
          >
            <Text className="text-white" size="2xl" bold>
              Add New Address
            </Text>
          </Pressable>
        </VStack>

        <AddressActionSheet
          showActionsheet={showActionsheet}
          handleClose={handleClose}
        />
      </>
    );
  }
  return (
    <VStack className="flex-1 p-4" space="md">
      <Text size="2xl" className="text-black">
        Address
      </Text>

      <VStack className="w-full bg-white mt-3 p-3 rounded-lg" space="md">
        {user.customer.addresses.map((address, index) => (
          <VStack key={index} space="md">
            <HStack className="w-full justify-between items-center" space="sm">
              <HStack space="sm">
                <Text size="lg" bold>
                  {address.first_name} {address.last_name}
                </Text>
                <Text>|</Text>
                <Text size="lg">{address.phone}</Text>
              </HStack>

              <Pressable
                onPress={() => {}}
                className="bg-red-100 flex items-center justify-center rounded-lg p-2"
              >
                <Ionicons
                  name="trash-outline"
                  size={16}
                  color={colors.red['400']}
                />
              </Pressable>
            </HStack>

            <HStack className="w-full" space="sm">
              <Text size="lg">{address.address_name}</Text>
            </HStack>

            {address.is_default_shipping && (
              <HStack space="sm">
                <Badge size="md" variant="solid" action="info">
                  <BadgeText>Default</BadgeText>
                </Badge>
              </HStack>
            )}
          </VStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default Address;
