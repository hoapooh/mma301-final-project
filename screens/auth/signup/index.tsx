import React, { useState } from 'react';
import { Toast, ToastTitle, useToast } from '@/components/ui/toast';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { LinkText } from '@/components/ui/link';
import colors from 'tailwindcss/colors';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { Button, ButtonText } from '@/components/ui/button';
import { Keyboard } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Feather } from '@expo/vector-icons';
import { AuthLayout } from '../layout';
import { Link, router } from 'expo-router';
import { IUserRegister } from '@/interfaces/user-interface';
import { Spinner } from '@/components/ui/spinner';
import useSignUp from './hooks/useSignUp';

const signUpSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  name: z.string().min(1, 'Name is required'),
  password: z
    .string()
    .min(6, 'Must be at least 6 characters in length')
    .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
    .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
    .regex(new RegExp('.*\\d.*'), 'One number')
    .regex(
      new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
      'One special character'
    ),
});
type SignUpSchemaType = z.infer<typeof signUpSchema>;

const SignUpWithLeftBackground = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });
  const toast = useToast();
  const { isSigningUp, signUpError, signUpMutation } = useSignUp();

  const onSubmit = async (data: SignUpSchemaType) => {
    try {
      if (!data.email || !data.name || !data.password) {
        toast.show({
          placement: 'bottom right',
          render: ({ id }) => {
            return (
              <Toast nativeID={id} variant="solid" action="error">
                <ToastTitle>All fields are required</ToastTitle>
              </Toast>
            );
          },
        });
        return;
      }

      const signUpData: IUserRegister = {
        email: data.email,
        firstName: data.name,
        password: data.password,
      };

      signUpMutation(signUpData);

      toast.show({
        placement: 'bottom right',
        render: ({ id }) => {
          return (
            <Toast nativeID={id} variant="solid" action="success">
              <ToastTitle>
                Account created successfully! Please login.
              </ToastTitle>
            </Toast>
          );
        },
      });
      reset();
      router.replace('/(auth)/sign-in');
    } catch (error: any) {
      toast.show({
        placement: 'bottom right',
        render: ({ id }) => (
          <Toast nativeID={id} variant="solid" action="error">
            <ToastTitle>
              {error.message || 'Signup failed. Please try again.'}
            </ToastTitle>
          </Toast>
        ),
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  return (
    <VStack className="max-w-[440px] w-full" space="md">
      <VStack className="items-center" space="xs">
        <Heading size="3xl">Sign up</Heading>
        <Text bold size="lg">
          Sign up and start using{' '}
          <Text bold size="lg">
            CapyCloset
          </Text>
        </Text>
      </VStack>

      <VStack className="w-full" space="2xl">
        <VStack space="xl" className="w-full">
          {/* ==== EMAIL ==== */}
          <FormControl isInvalid={!!errors.email}>
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="email"
              defaultValue=""
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await signUpSchema.parseAsync({ email: value });
                    return true;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputField
                    className="text-sm"
                    placeholder="Email"
                    type="text"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                  />
                </Input>
              )}
            />
            {/* ==== ERROR ==== */}
            <FormControlError>
              <FormControlErrorIcon
                size="md"
                as={() => (
                  <Feather name="alert-triangle" size={18} color="#bd2929" />
                )}
              />
              <FormControlErrorText>
                {errors?.email?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* ==== NAME ==== */}
          <FormControl isInvalid={!!errors.name}>
            <FormControlLabel>
              <FormControlLabelText>Name</FormControlLabelText>
            </FormControlLabel>
            <Controller
              defaultValue=""
              name="name"
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await signUpSchema.parseAsync({
                      password: value,
                    });
                    return true;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputField
                    placeholder="Name"
                    className="text-sm"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                    type={'text'}
                  />
                </Input>
              )}
            />
            {/* ==== ERROR ==== */}
            <FormControlError>
              <FormControlErrorIcon
                size="sm"
                as={() => (
                  <Feather name="alert-triangle" size={18} color="#bd2929" />
                )}
              />
              <FormControlErrorText>
                {errors?.name?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* ==== PASSWORD ==== */}
          <FormControl isInvalid={!!errors.password}>
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Controller
              defaultValue=""
              name="password"
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await signUpSchema.parseAsync({
                      password: value,
                    });
                    return true;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputField
                    className="text-sm"
                    placeholder="Password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                    type={showPassword ? 'text' : 'password'}
                  />
                  <InputSlot onPress={handleState} style={{ paddingRight: 10 }}>
                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                  </InputSlot>
                </Input>
              )}
            />
            {/* ==== ERROR ==== */}
            <FormControlError>
              <FormControlErrorIcon
                size="sm"
                as={() => (
                  <Feather name="alert-triangle" size={18} color="#bd2929" />
                )}
              />
              <FormControlErrorText>
                {errors?.password?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        </VStack>

        {/* ==== SIGN UP BUTTON ==== */}
        <VStack className="w-full mt-7" space="lg">
          <Button className="w-full" onPress={handleSubmit(onSubmit)}>
            <ButtonText className="font-medium">
              {isSigningUp ? (
                <Spinner size={'small'} color={colors.white} />
              ) : (
                'Sign up'
              )}
            </ButtonText>
          </Button>
        </VStack>

        {/* ==== LOGIN NAVIGATION LINK ==== */}
        <HStack className="self-center" space="sm">
          <Text size="md">Already have an account?</Text>
          <Link href="/(auth)/sign-in">
            <LinkText
              className="font-medium text-primary-700 group-hover/link:text-primary-600 group-hover/pressed:text-primary-700"
              size="md"
            >
              Login
            </LinkText>
          </Link>
        </HStack>
      </VStack>
    </VStack>
  );
};

export const SignUp = () => {
  return (
    <AuthLayout>
      <SignUpWithLeftBackground />
    </AuthLayout>
  );
};
