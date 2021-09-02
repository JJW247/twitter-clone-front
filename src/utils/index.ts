import { toast } from 'react-toastify';

export const toastSuccess = (message: string) => toast.success(message);
export const toastError = (error: string) => toast.error(error);
