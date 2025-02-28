import useAppStore from '@/configs/store';
import { IUserRegister } from '@/interfaces/user-interface';
import { authApi } from '@/services/authApi';
import { useMutation } from '@tanstack/react-query';

const useSignUp = () => {
  const { setAuthenticated } = useAppStore((state) => state);

  const {
    mutate: signUpMutation,
    isPending: isSigningUp,
    error: signUpError,
  } = useMutation({
    mutationFn: (signUpData: IUserRegister) => authApi.signup(signUpData),
    onSuccess: () => {
      setAuthenticated(true);
    },
  });

  return { signUpMutation, isSigningUp, signUpError };
};

export default useSignUp;
