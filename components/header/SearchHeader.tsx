import { Input, InputField } from '@/components/ui/input';
import React, { useState } from 'react';
import { HStack } from '@/components/ui/hstack';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { FormControl } from '../ui/form-control';
import { router } from 'expo-router';

const SearchHeader = () => {
  const nav = useNavigation();
  const [val, setVal] = useState('');
  return (
    <HStack className="w-full flex p-2 h-[55px] items-center">
      <Ionicons
        name="arrow-back"
        size={28}
        color="black"
        onPress={() => nav.goBack()}
      />
      <FormControl className="flex-1 h-full">
        <Input
          className="flex-1"
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            placeholder="Enter Text here..."
            onChangeText={(text) => setVal(text)}
            returnKeyType="search"
            onSubmitEditing={() => {
              router.navigate(`/search-result?title=${val}`);
            }}
          />
        </Input>
      </FormControl>
    </HStack>
  );
};

export default SearchHeader;
