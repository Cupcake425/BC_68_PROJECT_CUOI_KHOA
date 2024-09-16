import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../components/InputCustom/CustomInput";
import "../../scss/pages/_SignUp.scss";
import { useFormik } from "formik";
import { authService } from "../../services/authService.service";
import { notiValidation } from "../../common/NotiValidation";
import * as yup from "yup";
import { NotificationContext } from "../../App";
import { Select } from "antd";
const SignUp = () => {
  const { handleNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      maNhom: "",
      email: "",
    },
    onSubmit: (values) => {
      console.log(values);
      authService
        .signup(values)
        .then((res) => {
          handleNotification("Account created successfully!", "success");

          setTimeout(() => {
            navigate("/login");
          }, 2000);
          console.log(res);
        })
        .catch((err) => {
          console.log("err in sign up: ", err);
          handleNotification(err.response.data, "error");
        });
    },
    validationSchema: yup.object({
      hoTen: yup
        .string()
        .required(notiValidation.empty)
        .matches(/^[A-Za-zÀ-ỹà-ỹ\s]+$/, "Vui lòng nhập tên không chứa số"),
      email: yup
        .string()
        .required(notiValidation.empty)
        .email(notiValidation.email),
      matKhau: yup
        .string()
        .required(notiValidation.empty)
        .matches(
          /^(?=.*[A-Z])(?=.*\d).+$/,
          "Vui lòng nhập ít nhất 1 chữ cái viết hoa và 1 chữ số"
        ),
      soDT: yup
        .string()
        .required(notiValidation.empty)
        .matches(
          /^(0|\+84)[3|5|7|8|9][0-9]{8}$/,
          "Vui lòng nhập đúng định dạng số điện thoại"
        ),
      taiKhoan: yup.string().required(notiValidation.empty),
      maNhom: yup.string().required(notiValidation.empty),
    }),
  });
  return (
    <div>
      <div className="LogInPage h-screen">
        <div className="container h-full">
          <div className="content flex justify-around items-center h-full">
            <div className="leftPage text-center">
              <div className="title text-center">
                <span className="text-3xl font-bold mb-3 inline-block">
                  UEL E-LEARNING
                </span>
                <br />
                <span className="font-semibold text-semibold text-2xl">
                  Looks like you're new here!
                </span>
              </div>
              <span className="text-xl">
                Join our group in few <br /> minutes! Sign up with your <br />{" "}
                details to get started
              </span>
            </div>
            <div className="rightPagebg-white w-1/3">
              <div className="titleForm text-center mb-6">
                <span className="text-orange-500 font-bold text-3xl mb-3 inline-block">
                  Create an Account
                </span>
                <br />
                <span className="text-white">
                  Already have an Account?{" "}
                  <Link to={"/login"} className="underline text-blue-600">
                    Sign in
                  </Link>
                </span>
              </div>
              <div>
                <form action="" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-3">
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
                    <CustomInput
                      contentLabel={"Name"}
                      placeholder={"Type Your Name"}
                      name={"hoTen"}
                      onBlur={handleBlur}
                      touched={touched.hoTen}
                      error={errors.hoTen}
                      onChange={handleChange}
                      value={values.hoTen}
                    />
                    <CustomInput
                      contentLabel={"Phone Number"}
                      placeholder={"Type Your Phone Number"}
                      name={"soDT"}
                      onBlur={handleBlur}
                      touched={touched.soDT}
                      error={errors.soDT}
                      onChange={handleChange}
                      value={values.soDT}
                    />
                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">
                        Team Code
                      </label>
                      <Select
                        className="w-full h-10"
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="label"
                        onChange={(value) => setFieldValue("maNhom", value)}
                        options={[
                          {
                            value: "GP01",
                            label: "GP01",
                          },
                          {
                            value: "GP02",
                            label: "GP02",
                          },
                          {
                            value: "GP03",
                            label: "GP03",
                          },
                          {
                            value: "GP04",
                            label: "GP04",
                          },
                          {
                            value: "GP05",
                            label: "GP05",
                          },
                        ]}
                      />
                      {errors.maNhom && touched.maNhom ? (
                        <span className="text-red-500">{errors.maNhom}</span>
                      ) : null}
                    </div>
                    <CustomInput
                      contentLabel={"Email"}
                      placeholder={"Type Your Email"}
                      name={"email"}
                      onBlur={handleBlur}
                      touched={touched.email}
                      error={errors.email}
                      onChange={handleChange}
                      value={values.email}
                    />
                  </div>
                  <div className="text-center mt-4">
                    <button
                      type="submit"
                      className="px-8 py-2 text-white bg-orange-500 btn_register rounded-md hover:bg-orange-500/80"
                      onClick={handleSubmit}
                    >
                      Sign Up
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

export default SignUp;
