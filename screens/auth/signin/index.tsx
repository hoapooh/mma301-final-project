import React, { useCallback, useState } from 'react';
import { Toast, ToastTitle, useToast } from '@/components/ui/toast';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { LinkText } from '@/components/ui/link';
import { Link } from '@/components/ui/link';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '@/components/ui/checkbox';
import {
  ArrowLeftIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  Icon,
} from '@/components/ui/icon';
import { Button, ButtonText, ButtonIcon } from '@/components/ui/button';
import { Keyboard } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Feather from '@expo/vector-icons/Feather';
import { GoogleIcon } from './assets/icon/google';
import { Pressable } from '@/components/ui/pressable';
import { AuthLayout } from '../layout';
import { router } from 'expo-router';
import useAppStore from '@/configs/store';
import { IUserLogin } from '@/interfaces/user-interface';
import useAuthSlice from '@/features/Auth/authSlice';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required'),
  rememberme: z.boolean().optional(),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

const LoginWithLeftBackground = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberme: false,
    },
  });

  const toast = useToast();
  const [validated, setValidated] = useState({
    emailValid: true,
    passwordValid: true,
  });
  const login = useAuthSlice(useCallback((state) => state.login, []));
  const isLoading = useAuthSlice(useCallback((state) => state.isLoading, []));

  const onSubmit = useCallback(
    async (data: LoginSchemaType) => {
      try {
        const loginData: IUserLogin = {
          email: data.email,
          password: data.password,
        };

        await login(loginData);

        toast.show({
          placement: 'bottom',
          containerStyle: {
            marginBottom: 60,
          },
          render: ({ id }) => (
            <Toast nativeID={id} variant="solid" action="success">
              <ToastTitle>Logged in successfully!</ToastTitle>
            </Toast>
          ),
        });

        reset();
        router.replace('/(root)/(tabs)/products');
      } catch (error: any) {
        setValidated({ emailValid: false, passwordValid: false });
        toast.show({
          placement: 'bottom right',
          render: ({ id }) => (
            <Toast nativeID={id} variant="solid" action="error">
              <ToastTitle>
                {error.message || 'Login failed. Please try again.'}
              </ToastTitle>
            </Toast>
          ),
        });
      }
    },
    [login, toast, reset]
  );

  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => !showState);
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  return (
    <VStack className="max-w-[440px] w-full" space="md">
      <VStack className="items-center" space="xs">
        <Heading size="3xl">Log in</Heading>
        <Text>
          Welcome to{' '}
          <Text bold size="lg">
            CapyCloset
          </Text>
        </Text>
      </VStack>

      <VStack className="w-full" space="xl">
        <VStack space="xl" className="w-full">
          <FormControl
            isInvalid={!!errors?.email || !validated.emailValid}
            className="w-full"
          >
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Controller
              defaultValue=""
              name="email"
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await loginSchema.parseAsync({ email: value });
                    return true;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputField
                    placeholder="Enter email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon
                as={() => (
                  <Feather name="alert-triangle" size={24} color="black" />
                )}
              />
              <FormControlErrorText>
                {errors?.email?.message ||
                  (!validated.emailValid && 'Email ID not found')}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl
            isInvalid={!!errors.password || !validated.passwordValid}
            className="w-full"
          >
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
                    await loginSchema.parseAsync({ password: value });
                    return true;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputField
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                  />
                  <InputSlot onPress={handleState} style={{ paddingRight: 10 }}>
                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                  </InputSlot>
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon
                as={() => (
                  <Feather name="alert-triangle" size={24} color="black" />
                )}
              />
              <FormControlErrorText>
                {errors?.password?.message ||
                  (!validated.passwordValid && 'Password was incorrect')}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        </VStack>

        <VStack className="w-full" space="lg">
          <Button
            className="w-full"
            onPress={handleSubmit(onSubmit)}
            isDisabled={isLoading}
          >
            <ButtonText className="font-medium">
              {isLoading ? 'Logging in...' : 'Log in'}
            </ButtonText>
          </Button>
        </VStack>

        <HStack className="self-center" space="sm">
          <Text size="md">Don't have an account?</Text>
          <Link href="/auth/signup">
            <LinkText
              className="font-medium text-primary-700 group-hover/link:text-primary-600  group-hover/pressed:text-primary-700"
              size="md"
            >
              Sign up
            </LinkText>
          </Link>
        </HStack>
      </VStack>
    </VStack>
  );
};

export const SignIn = () => {
  return (
    <AuthLayout>
      <LoginWithLeftBackground />
    </AuthLayout>
  );
};
