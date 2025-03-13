import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import useAppStore from '@/configs/store';
import { Spinner } from '@/components/ui/spinner';

const Account = () => {
  const { user } = useAppStore((state) => state);

  if (!user) return <Spinner size={'large'} color={'#000'} />;

  return (
    <VStack className="flex-1 items-center bg-white p-4" space="2xl">
      <HStack className="w-full justify-between">
        <Text size="2xl" bold>
          Email:
        </Text>
        <Text size="2xl">{user.customer.email}</Text>
      </HStack>

      <HStack className="w-full justify-between">
        <Text size="2xl" bold>
          Name:
        </Text>
        <Text size="2xl">
          {user.customer.first_name + ' ' + user.customer.last_name}
        </Text>
      </HStack>

      <HStack className="w-full justify-between">
        <Text size="2xl" bold>
          Phone:
        </Text>
        <Text size="2xl">{user.customer.phone || 'N/A'}</Text>
      </HStack>
    </VStack>
  );
};

export default Account;
