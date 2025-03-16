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
import { useDeleteAddress } from '@/screens/auth/profile/hooks/useDeleteAddress';
import { Toast, ToastTitle, useToast } from '@/components/ui/toast';
import AlertDeleteDialog from '@/screens/auth/profile/components/alert-delete-dialog';
import { IAddress } from '@/interfaces/user-interface';

const Address = () => {
  const { user } = useAppStore((state) => state);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showActionsheet, setShowActionsheet] = useState(false);

  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);

  const handleCloseActionSheet = () => {
    setShowActionsheet(false);
    setSelectedAddress(null);
  };
  const handleCloseAlertDialog = () => setShowAlertDialog(false);

  if (!user) return <Spinner size={'large'} color={'#000'} />;

  return (
    <>
      {!user.customer.addresses?.length ||
      user.customer.addresses.length === 0 ? (
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
      ) : (
        <VStack className="flex-1 p-4" space="lg">
          <Text size="2xl" className="text-black font-semibold">
            Address
          </Text>

          <VStack className="w-full bg-white p-3 rounded-lg" space="md">
            {user.customer.addresses.map((address, index) => (
              <VStack key={index} space="md">
                <HStack
                  className="w-full justify-between items-center"
                  space="sm"
                >
                  <HStack space="sm">
                    <Text size="lg" bold>
                      {address.first_name} {address.last_name}
                    </Text>
                    <Text>|</Text>
                    <Text size="lg">{address.phone}</Text>
                  </HStack>

                  <HStack space="sm">
                    <Pressable
                      onPress={() => {
                        setShowActionsheet(true);
                        setSelectedAddress(address);
                      }}
                      className="bg-sky-100 flex items-center justify-center rounded-lg p-2"
                    >
                      <Ionicons
                        name="create-outline"
                        size={16}
                        color={colors.sky['500']}
                      />
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        setShowAlertDialog(true);
                        setSelectedAddressId(address.id);
                      }}
                      className="bg-red-100 flex items-center justify-center rounded-lg p-2"
                    >
                      <Ionicons
                        name="trash-outline"
                        size={16}
                        color={colors.red['400']}
                      />
                    </Pressable>
                  </HStack>
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

          <Pressable
            className="w-full p-4 bg-black rounded-lg"
            onPress={() => setShowActionsheet(true)}
          >
            <Text className="text-white" size="md" bold>
              Add More Address
            </Text>
          </Pressable>
        </VStack>
      )}

      <AddressActionSheet
        showActionsheet={showActionsheet}
        handleClose={handleCloseActionSheet}
        selectedAddress={selectedAddress}
      />

      <AlertDeleteDialog
        showAlertDialog={showAlertDialog}
        address={selectedAddressId}
        handleClose={handleCloseAlertDialog}
      />
    </>
  );
};

export default Address;
