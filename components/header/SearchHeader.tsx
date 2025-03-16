import { HStack } from '@/components/ui/hstack';
import { Input, InputField } from '@/components/ui/input';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { FormControl } from '../ui/form-control';

const SearchHeader: React.FC = () => {
  const { q } = useLocalSearchParams();

  const [val, setVal] = useState(q ?? '');

  return (
    <HStack className="w-[90%] py-2 ">
      <TouchableOpacity className="w-full flex h-[50px] items-center justify-end">
        <FormControl className="w-full h-full">
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
                router.navigate(`/search-result?q=${val}`);
              }}
            />
          </Input>
        </FormControl>
      </TouchableOpacity>
    </HStack>
  );
};

export default SearchHeader;
