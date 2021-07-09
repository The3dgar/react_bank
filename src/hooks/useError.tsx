import { useContext, useEffect } from "react";
import { Modal } from "antd";
import { AuthContext } from "../context/AuthContext";

export const useError = () => {
  const { errorMessage, removeError } = useContext(AuthContext);

  useEffect(() => {
    if (!errorMessage.length) return;
    Modal.error({
      title: errorMessage,
      onOk: removeError,
    });
  }, [errorMessage, removeError]);

  return {
    errorMessage,
    removeError,
  };
};
