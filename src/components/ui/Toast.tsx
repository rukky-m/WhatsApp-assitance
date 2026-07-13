import { toast } from 'react-hot-toast';
import type { ToastOptions } from 'react-hot-toast';

// Simple wrapper to match the `Toast.success` style used in the app
export const Toast = {
  success: (message: string, options?: ToastOptions) => toast.success(message, options),
  error: (message: string, options?: ToastOptions) => toast.error(message, options),
  loading: (message: string, options?: ToastOptions) => toast.loading(message, options),
  // generic method – fallback to default toast
  show: (message: string, options?: ToastOptions) => toast(message, options),
};

export type ToastProps = {
  message: string;
  type?: 'success' | 'error' | 'loading' | 'default';
  options?: ToastOptions;
};
