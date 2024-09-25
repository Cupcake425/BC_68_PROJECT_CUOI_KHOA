import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { isLoginContext, NotificationContext } from "../../App";
import { authService } from "../../services/authService.service";
import * as yup from "yup";
import { notiValidation } from "../../common/NotiValidation";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../components/InputCustom/CustomInput";
import { Skeleton } from "antd";
import { path } from "../../common/path";
import { useDispatch } from "react-redux";
import { setValueUser } from "../../redux/authSlice";
const Login = () => {
  const { handleNotification } = useContext(NotificationContext);
  const { setIsLogin, isLogin } = useContext(isLoginContext);
  const navigate = useNavigate();
  const [logInCheck, setLogInCheck] = useState(true);
  const dispatch = useDispatch();

  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: {
        taiKhoan: "",
        matKhau: "",
      },
      onSubmit: (values) => {
        console.log(values);
        authService
          .signin(values)
          .then((res) => {
            handleNotification("Sign In successfully!", "success");
            setIsLogin(true);
            setTimeout(() => {
              navigate(path.home);
            }, 2000);
            dispatch(setValueUser(res.data));
            localStorage.setItem("userData", JSON.stringify(res.data));
            localStorage.setItem(
              "accessToken",
              JSON.stringify(res.data.accessToken)
            );
          })
          .catch((err) => {
            console.log("err in sign in: ", err);
            handleNotification(err.response.data, "error");
          });
      },
      validationSchema: yup.object({
        matKhau: yup
          .string()
          .required(notiValidation.empty)
          .matches(
            /^(?=.*[A-Z])(?=.*\d).+$/,
            "Vui lòng nhập ít nhất 1 chữ cái viết hoa và 1 chữ số"
          ),

        taiKhoan: yup.string().required(notiValidation.empty),
      }),
    });

  useEffect(() => {
    console.log("Checking login status...");
    if (isLogin || localStorage.getItem("userData")) {
      setTimeout(() => {
        navigate("/"); // Redirect to homepage after 2 seconds
      }, 2000);
    } else {
      setLogInCheck(false); // Mark check as done but no redirect since not logged in
    }
  }, [isLogin, navigate]);

  if (logInCheck) return <Skeleton active />;

  return (
    <div>
      {" "}
      <div className="LogInPage">
        <div className="container">
          <div className="content h-screen pt-20">
            <div className="rightPage">
              <div className="titleForm text-center mb-6">
                <span className="text-orange-500 font-bold text-3xl mb-3 inline-block">
                  SIGN IN
                </span>
                <br />
                <span className="text-white">
                  Don't have an Account?{" "}
                  <Link to={"/sign-up"} className="underline text-blue-600">
                    Sign up
                  </Link>
                </span>
              </div>
              <div className="">
                <form action="" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-3 w-full px-3 md:w-2/3 lg:w-1/3  mx-auto">
                    <CustomInput
                      contentLabel={"Account"}
                      placeholder={"Type Your Account"}
                      name={"taiKhoan"}
                      onBlur={handleBlur}
                      touched={touched.taiKhoan}
                      error={errors.taiKhoan}
                      onChange={handleChange}
                      value={values.taiKhoan}
                    />
                    <CustomInput
                      contentLabel={"Password"}
                      placeholder={"Type Your Password"}
                      name={"matKhau"}
                      onBlur={handleBlur}
                      touched={touched.matKhau}
                      error={errors.matKhau}
                      type="password"
                      onChange={handleChange}
                      value={values.matKhau}
                    />
                  </div>
                  <div className="text-center mt-4">
                    <button
                      type="submit"
                      className="px-8 py-2 text-white bg-orange-500 btn_register rounded-md hover:bg-orange-500/80"
                      onClick={handleSubmit}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
