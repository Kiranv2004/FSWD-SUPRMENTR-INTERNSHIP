import { Toaster } from "react-hot-toast";

const ToastNotification = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2400,
        style: {
          borderRadius: "10px",
          padding: "10px 14px",
        },
      }}
    />
  );
};

export default ToastNotification;
