import { useCallback, useState } from 'react';

export interface ConfirmationDialogProps {
  title: string;
  content: string;
  actionId?: string;
}

export const useConfirmationDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState<ConfirmationDialogProps>({
    title: '',
    content: '',
  });
  const [onConfirmCallback, setOnConfirmCallback] = useState<(() => void) | null>(null);

  const requestConfirm = useCallback((props: ConfirmationDialogProps, onConfirm: () => void) => {
    setDialogProps(props);
    setOnConfirmCallback(() => onConfirm);
    setIsOpen(true);
  }, []);

  const handleConfirm = useCallback(() => {
    onConfirmCallback?.();
    setIsOpen(false);
  }, [onConfirmCallback]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, dialogProps, requestConfirm, handleConfirm, handleClose };
};
