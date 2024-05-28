// NotificationUtil.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// toast.configure();

export const showSuccessNotification = (message) => {
  toast.success(message);
};

export const showErrorNotification = (message) => {
  toast.error(message);
};
