import { Center } from '@/components/ui/center';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView } from 'react-native';

const Cart = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <VStack
        className="flex-1 bg-white justify-center items-center"
        space="lg"
      >
        <Ionicons name="bag-outline" size={60} color={'#8f8e94'} />
        <Text className="text-4xl font-bold text-center">
          Your bag is empty.
        </Text>

        {/* Wrap the Text inside Center to ensure it's properly aligned */}
        <Center className="w-3/4">
          <Text className="text-gray-500" style={{ textAlign: 'center' }}>
            Continue shopping in{' '}
            <Text bold size="lg">
              CapyCloset
            </Text>{' '}
            to add items to your bag.
          </Text>
        </Center>
      </VStack>
    </ScrollView>
  );
};

export default Cart;
