import React from 'react';

import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from '@/components/ui/actionsheet';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { FontAwesome5, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { Button, ButtonText } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Keyboard } from 'react-native';
import { useCreateAddress } from '../hooks/useCreateAddress';
import { Toast, ToastTitle, useToast } from '@/components/ui/toast';

interface AddressActionSheetProps {
  showActionsheet: boolean;
  handleClose: () => void;
}

const addressSchema = z.object({
  first_name: z.string().min(1, 'First Name is required'),
  last_name: z.string().min(1, 'Last Name is required'),
  phone: z.string().min(6, 'Phone number must be at least 6 characters long'),
  address_name: z.string(),
});

type AddressSchemaType = z.infer<typeof addressSchema>;

const AddressActionSheet: React.FC<AddressActionSheetProps> = ({
  showActionsheet,
  handleClose,
}) => {
  const { CreatingAddressError, createAddressMutation, isCreatingAddress } =
    useCreateAddress();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressSchemaType>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      phone: '',
      address_name: '',
    },
  });

  const toast = useToast();

  const onSubmit = async (data: AddressSchemaType) => {
    try {
      createAddressMutation(data);

      toast.show({
        placement: 'bottom',
        containerStyle: {
          marginBottom: 60,
        },
        render: ({ id }) => (
          <Toast nativeID={id} variant="solid" action="success">
            <ToastTitle>Address created successfully!</ToastTitle>
          </Toast>
        ),
      });

      console.log(data);

      reset();
      handleClose();
    } catch (error: any) {
      console.log('Error creating address:', error.message);
    }
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  return (
    <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <VStack className="w-full pt-2" space="md">
          {/* First Name */}
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>First Name</FormControlLabelText>
            </FormControlLabel>
            <Controller
              defaultValue=""
              name="first_name"
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await addressSchema.parseAsync({ first_name: value });
                    return true;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputSlot>
                    <InputIcon
                      as={() => (
                        <Ionicons
                          name="person"
                          size={22}
                          color="black"
                          className="ml-2"
                        />
                      )}
                    />
                  </InputSlot>
                  <InputField
                    type={'text'}
                    placeholder="Enter first name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                  />
                </Input>
              )}
            />
          </FormControl>

          {/* Last Name */}
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Last Name</FormControlLabelText>
            </FormControlLabel>
            <Controller
              defaultValue=""
              name="last_name"
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await addressSchema.parseAsync({ last_name: value }); // updated to validate 'last_name' field
                    return true;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputSlot>
                    <InputIcon
                      as={() => (
                        <Ionicons
                          name="person"
                          size={22}
                          color="black"
                          className="ml-2"
                        />
                      )}
                    />
                  </InputSlot>
                  <InputField
                    type={'text'}
                    placeholder="Enter last name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                  />
                </Input>
              )}
            />
          </FormControl>

          {/* Phone Number */}
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Last Name</FormControlLabelText>
            </FormControlLabel>
            <Controller
              defaultValue=""
              name="phone"
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await addressSchema.parseAsync({ phone: value }); // updated to validate 'phone' field
                    return true;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputSlot>
                    <InputIcon
                      as={() => (
                        <FontAwesome6
                          name="phone"
                          size={22}
                          color="black"
                          className="ml-2"
                        />
                      )}
                    />
                  </InputSlot>
                  <InputField
                    type={'text'}
                    keyboardType="phone-pad"
                    placeholder="Enter phone number"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                  />
                </Input>
              )}
            />
          </FormControl>

          {/* address_name */}
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>City</FormControlLabelText>
            </FormControlLabel>
            <Controller
              defaultValue=""
              name="address_name"
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await addressSchema.parseAsync({ address_name: value }); // updated to validate 'last_name' field
                    return true;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputSlot>
                    <InputIcon
                      as={() => (
                        <FontAwesome5
                          name="city"
                          size={18}
                          color="black"
                          className="ml-2"
                        />
                      )}
                    />
                  </InputSlot>
                  <InputField
                    type={'text'}
                    keyboardType="default" // updated keyboard type for city input
                    placeholder="Enter Address Name" // updated placeholder text
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                  />
                </Input>
              )}
            />
          </FormControl>
        </VStack>

        <VStack className="w-full mt-4">
          <Button onPress={handleSubmit(onSubmit)} disabled={isCreatingAddress}>
            <ButtonText className="flex-1">
              {isCreatingAddress ? 'Creating...' : 'Create Address'}
            </ButtonText>
          </Button>
        </VStack>
      </ActionsheetContent>
    </Actionsheet>
  );
};

export default AddressActionSheet;
