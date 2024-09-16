import { RouterProvider } from "react-router-dom";
import React from "react";
import useRouter from "./hooks/useRouter";
import { createContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const NotificationContext = createContext();
function App() {
  const handleNotification = (message, type) => {
    return toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
      hideProgressBar: false,
    });
  };
  const router = useRouter();
  return (
    <NotificationContext.Provider value={{ handleNotification }}>
      <RouterProvider router={router} />
      <ToastContainer />
    </NotificationContext.Provider>
  );
}

export default App;
