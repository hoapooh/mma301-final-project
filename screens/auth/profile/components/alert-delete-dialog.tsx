import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
} from '@/components/ui/alert-dialog';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Toast, ToastTitle, useToast } from '@/components/ui/toast';
import { useDeleteAddress } from '../hooks/useDeleteAddress';
import { Spinner } from '@/components/ui/spinner';
import { Box } from '@/components/ui/box';
import { Icon, TrashIcon } from '@/components/ui/icon';

interface AlertDeleteDialogProps {
  showAlertDialog: boolean;
  handleClose: () => void;
  address: string;
}

const AlertDeleteDialog: React.FC<AlertDeleteDialogProps> = ({
  showAlertDialog,
  handleClose,
  address, // This is the address id
}) => {
  const toast = useToast();
  const { deletetAddressMutation, isDeletingAddress } = useDeleteAddress();

  const handleDeleteAddress = () => {
    deletetAddressMutation(address);

    toast.show({
      placement: 'bottom',
      containerStyle: {
        marginBottom: 60,
      },
      render: ({ id }) => (
        <Toast nativeID={id} variant="solid" action="success">
          <ToastTitle>Address deleted successfully!</ToastTitle>
        </Toast>
      ),
    });
  };

  return (
    <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
      <AlertDialogBackdrop />
      <AlertDialogContent className="w-[80%] gap-3 items-center">
        <Box className="rounded-full size-14 p-4 bg-red-100 items-center justify-center shrink-0">
          <Icon as={TrashIcon} size="lg" className="stroke-error-500" />
        </Box>
        <AlertDialogHeader>
          <Heading
            className="text-typography-950 font-semibold text-center"
            size="md"
          >
            Delete Address?
          </Heading>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text size="sm" style={{ textAlign: 'center' }}>
            Deleting the address will remove it permanently and cannot be
            undone. Please confirm if you want to proceed.
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button size="sm" onPress={handleDeleteAddress} action="negative">
            <ButtonText>
              {isDeletingAddress ? (
                <Spinner size={'small'} color={'#fff'} />
              ) : (
                'Delete'
              )}
            </ButtonText>
          </Button>
          <Button
            variant="outline"
            action="primary"
            onPress={handleClose}
            size="sm"
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDeleteDialog;
