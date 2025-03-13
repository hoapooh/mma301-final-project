import { authApi } from '@/services/authApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deletetAddressMutation,
    isPending: isDeletingAddress,
    error: deleteAddressError,
  } = useMutation({
    mutationFn: (addressId: string) => authApi.deleteAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return { deletetAddressMutation, isDeletingAddress, deleteAddressError };
};
