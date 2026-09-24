import { Id, toast, ToastOptions } from 'react-toastify';
import { ReactNode } from 'react';

const defaultStyleOptions: ToastOptions = {
  position: 'top-right',
  type: 'default',
  autoClose: 4500,
  hideProgressBar: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: false,
  theme: 'dark',
};

const showToast = (message: string, options?: ToastOptions): void => {
  const toastId: Id = message;
  toast(message, {
    ...defaultStyleOptions,
    ...options,
    toastId,
  });
};

export const showToastHTML = (message: ReactNode, options?: ToastOptions): void => {
  toast(message, {
    ...defaultStyleOptions,
    ...options,
  });
};

export const showSuccessToast = (message: string, options: ToastOptions = {}): void => {
  showToast(message, { ...options, type: 'success' });
};

export const showErrorToast = (message: string, options: ToastOptions = {}): void => {
  showToast(message, { ...options, type: 'error' });
};

export const showWarningToast = (message: string, options: ToastOptions = {}): void => {
  showToast(message, { ...options, type: 'warning' });
};
