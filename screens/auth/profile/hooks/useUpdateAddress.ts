import { IAddressUpdate } from '@/interfaces/user-interface';
import { authApi } from '@/services/authApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  const {
    mutate: updateAddressMutation,
    isPending: isUpdatingAddress,
    error: UpdatingAddressError,
  } = useMutation({
    mutationFn: async ({
      addressId,
      addressData,
    }: {
      addressId: string;
      addressData: IAddressUpdate;
    }) => authApi.updateAddress(addressId, addressData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return { updateAddressMutation, isUpdatingAddress, UpdatingAddressError };
};
