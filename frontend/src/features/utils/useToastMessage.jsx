import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearMsg } from "../users/userSlice";
import { toast } from "react-toastify";

export const useToastMessage = (errorMsg, successMsg) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (successMsg) toast.success(successMsg);
    if (errorMsg) toast.error(errorMsg);

    if (successMsg || errorMsg) {
      const timer = setTimeout(() => {
        dispatch(clearMsg());
      }, 3000); // fixed
      return () => clearTimeout(timer); // cleanup on unmount
    }
  }, [successMsg, errorMsg, dispatch]);
};
