import { toast } from "react-toastify";

export const notify = {
  info: (msg) => toast.info(msg),
  success: (msg) => toast.success(msg),
  warning: (msg) => toast.warning(msg),
  error: (msg) => toast.error(msg),
};