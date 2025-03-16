import { useToast, Toast, ToastTitle } from '@/components/ui/toast';
import { authApi } from '@/services/authApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IAddress {
  first_name: string;
  last_name: string;
  phone: string;
  address_name: string;
}

export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  const {
    mutate: createAddressMutation,
    isPending: isCreatingAddress,
    error: CreatingAddressError,
  } = useMutation({
    mutationFn: (data: IAddress) => authApi.createAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return { createAddressMutation, isCreatingAddress, CreatingAddressError };
};
