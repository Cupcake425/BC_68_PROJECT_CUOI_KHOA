import { RouterProvider } from "react-router-dom";
import React, { useState } from "react";
import useRouter from "./hooks/useRouter";
import { createContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
export const NotificationContext = createContext();
export const isLoginContext = createContext();
function App() {
  const [isLogin, setIsLogin] = useState();
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
    <Provider store={store}>
      <NotificationContext.Provider value={{ handleNotification }}>
        <isLoginContext.Provider value={{ isLogin, setIsLogin }}>
          <RouterProvider router={router} />
          <ToastContainer />
        </isLoginContext.Provider>
      </NotificationContext.Provider>
    </Provider>
  );
}

export default App;
