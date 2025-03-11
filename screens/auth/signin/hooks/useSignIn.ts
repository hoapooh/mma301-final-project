import useAppStore from '@/configs/store';
import { IUserLogin } from '@/interfaces/user-interface';
import { authApi } from '@/services/authApi';
import { useMutation } from '@tanstack/react-query';

const useSignIn = () => {
  const { setAuthenticated } = useAppStore((state) => state);

  const {
    mutate: signInMutation,
    isPending: isSigningIn,
    error: signInError,
  } = useMutation({
    mutationFn: (signInData: IUserLogin) => authApi.login(signInData),
    onSuccess: () => {
      setAuthenticated(true);
    },
  });

  return { signInMutation, isSigningIn, signInError };
};

export default useSignIn;
