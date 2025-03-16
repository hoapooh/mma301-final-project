import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import {
  IProductOption,
  IProductVariant,
} from '@/interfaces/product-interface';
import { TouchableOpacity } from 'react-native';

export const ProductOption: React.FC<{
  content: string;
  isSelected?: boolean;
  onPress: () => void;
}> = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      className={`p-2 ${props.isSelected ? 'border-blue-500 border-2' : 'border-gray-300 border'} w-[100px] rounded-md `}
    >
      <Text
        className={`text-black ${props.isSelected ? 'font-semibold' : 'font-normal'}`}
      >
        {props.content}
      </Text>
    </TouchableOpacity>
  );
};

export const OptionSection: React.FC<{
  data: IProductOption[] | [];
  selectedID: string | null | undefined;
  handleSelect: (id: string) => void;
}> = (props) => {
  if (!props.data) {
    return null;
  }

  return (
    <Box>
      {props.data.map((o) => {
        return (
          <HStack key={o.id} space="md">
            {o.values.map((v, i) => {
              return (
                <ProductOption
                  key={v.id}
                  content={v.value}
                  isSelected={props.selectedID === v.id}
                  onPress={() => props.handleSelect(v.id)}
                />
              );
            })}
          </HStack>
        );
      })}
    </Box>
  );
};

export const VariantSection: React.FC<{
  data: IProductVariant[] | [];
  selectedID: string | null | undefined;
  optionID: string | null | undefined;
  handleSelect: (id: string) => void;
}> = (props) => {
  if (!props.data) {
    return null;
  }

  return (
    <HStack space="md">
      {props.data
        .filter((i) =>
          i.options.some((i) => {
            return i.id === props.optionID;
          })
        )
        .map((o) => {
          return (
            <ProductOption
              key={o.id}
              content={o.title}
              isSelected={props.selectedID === o.id}
              onPress={() => props.handleSelect(o.id)}
            />
          );
        })}
    </HStack>
  );
};
