import { View, Text } from 'react-native';
import React from 'react';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Button, ButtonText } from '@/components/ui/button';

const DetailBottomNav = () => {
  return (
    <Box className="bg-white absolute bottom-0 w-full left-0 right-0 p-2 h-[90px] justify-center flex">
      <HStack className="justify-between items-center h-full">
        <Text>DetailBottomNav</Text>
        <Button>
          <ButtonText>Thêm vào giỏ hàng</ButtonText>
        </Button>
      </HStack>
    </Box>
  );
};

export default DetailBottomNav;
