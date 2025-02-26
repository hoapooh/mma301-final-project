import { View, Text } from 'react-native';
import React from 'react';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import Ionicons from '@expo/vector-icons/Ionicons';
const MainHeader = () => {
  return (
    <View>
      <HStack space="sm" className="w-full items-center h-[70px] p-2 bg-white">
        <Input
          className="w-[90%]"
          variant="outline"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputSlot className="pl-3">
            <InputIcon
              as={() => <Ionicons name="search" size={24} color="black" />}
            />
          </InputSlot>
          <InputField placeholder="Search" />
        </Input>
        <Ionicons name="cart-outline" size={30} color="black" />
      </HStack>
    </View>
  );
};

export default MainHeader;
