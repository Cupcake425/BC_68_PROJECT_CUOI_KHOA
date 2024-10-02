import React, { useContext, useEffect, useState } from "react";
import "../../scss/pages/_UserInformation.scss";
import CustomInput from "../../components/InputCustom/CustomInput";
import { Select } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import { notiValidation } from "../../common/NotiValidation";
import { userService } from "../../services/user.service";
import { NotificationContext } from "../../App";
const UserInformation = () => {
  const [UserInfor, setUserInfor] = useState({
    taiKhoan: "",
    hoTen: "",
    soDT: "",
    maNhom: "",
    email: "",
    maLoaiNguoiDung: "",
    soDt: "",
  });
  const { handleNotification } = useContext(NotificationContext);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("userData"));
    if (localUser) setUserInfor(localUser);
  }, []);
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
      hoTen: "",
      soDT: "",
      maNhom: "",
      email: "",
      maLoaiNguoiDung: "",
    },
    onSubmit: (values) => {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")) || "";
      userService
        .updateUser(accessToken, values)
        .then((res) => {
          handleNotification("Update User Infor successfully!", "success");

          console.log(res);
          setIsEditing(false);
          localStorage.setItem(
            "userData",
            JSON.stringify({ ...res.data, soDT: res.data["soDt"] })
          );
          console.log("res: ", res.data);
        })
        .catch((err) => {
          console.log("err in update User infor up: ", err);
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

      soDT: yup
        .string()
        .required(notiValidation.empty)
        .matches(
          /^(0|\+84)[3|5|7|8|9][0-9]{8}$/,
          "Vui lòng nhập đúng định dạng số điện thoại"
        ),
      taiKhoan: yup.string().required(notiValidation.empty),
      maNhom: yup.string().required(notiValidation.empty),
      maLoaiNguoiDung: yup.string().required(notiValidation.empty),
    }),
  });
  console.log("out values: ", values);
  // Toggle between view and edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setValues(JSON.parse(localStorage.getItem("userData")));
  };

  // Handle input value change
  //   const handleChange = (event) => {
  //     setValue(event.target.value);
  //   };

  //   // Handle saving and turning off edit mode
  //   const handleBlur = () => {
  //     setIsEditing(false); // Exit edit mode
  //     // Here you could call an API or update state with the new value
  //     console.log("Updated Value:", value);
  //     };

  const renderUserInformation = () => {
    if (isEditing)
      return (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-8 ">
            <div className="flex justify-center items-center space-x-3">
              <div className="w-1/3">
                <span>Tài Khoản:</span>
              </div>
              <CustomInput
                name={"taiKhoan"}
                onBlur={handleBlur}
                touched={touched.taiKhoan}
                error={errors.taiKhoan}
                onChange={handleChange}
                value={values.taiKhoan}
                classWrapper={"max-w-48"}
              />
            </div>
            <div className="flex justify-center items-center space-x-3">
              <div className="w-1/3">
                <span>Email:</span>
              </div>
              <CustomInput
                name={"email"}
                onBlur={handleBlur}
                touched={touched.email}
                error={errors.email}
                onChange={handleChange}
                value={values.email}
                classWrapper={"max-w-48"}
              />
            </div>
            <div className="flex justify-center items-center space-x-3 min-h-30">
              <div className="w-1/3">
                <span>Họ và Tên:</span>
              </div>
              <CustomInput
                name={"hoTen"}
                onBlur={handleBlur}
                touched={touched.hoTen}
                error={errors.hoTen}
                onChange={handleChange}
                value={values.hoTen}
                classWrapper={"max-w-48"}
              />
            </div>
            <div className="flex justify-center items-center space-x-3 text-left">
              <div className="w-1/3">
                <span>Số điện thoại:</span>
              </div>
              <CustomInput
                name={"soDT"}
                onBlur={handleBlur}
                touched={touched.soDT}
                error={errors.soDT}
                onChange={handleChange}
                value={values.soDT}
                classWrapper={"max-w-48"}
              />
            </div>
            <div className="flex justify-center items-center space-x-3 text-left">
              <div className="w-1/3">
                <span>
                  Loại người <br /> dùng:
                </span>
              </div>
              <CustomInput
                name={"maLoaiNguoiDung"}
                onBlur={handleBlur}
                touched={touched.maLoaiNguoiDung}
                error={errors.maLoaiNguoiDung}
                onChange={handleChange}
                value={values.maLoaiNguoiDung}
                classWrapper={"max-w-48"}
              />
            </div>
            <div className="flex justify-center items-center space-x-3">
              <div className="w-1/3 ms-2">
                <span>Mã nhóm:</span>
              </div>
              <Select
                className="w-52 h-10"
                showSearch
                optionFilterProp="label"
                value={values["maNhom"]}
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
            </div>
          </div>
          <div className="text-center my-4">
            <span className="border-b-2 border-b-gray-300 w-2/3 inline-block"></span>
          </div>
          <div className="text-center mt-3">
            <button
              type="submit"
              className="px-5 py-2 rounded-md text-white bg-orange-500 hover:bg-orange-500/85"
              onClick={handleSubmit}
            >
              Xác Nhận
            </button>
          </div>
        </form>
      );
    else {
      return (
        <div className="grid grid-cols-2 gap-8 ">
          <span>
            Tài Khoản:{" "}
            <span className="font-semibold" onClick={toggleEditMode}>
              {UserInfor.taiKhoan}
            </span>
          </span>
          <span>
            Email:{" "}
            <span className="font-semibold" onClick={toggleEditMode}>
              {UserInfor.email}
            </span>{" "}
          </span>
          <span>
            Họ và Tên:{" "}
            <span className="font-semibold" onClick={toggleEditMode}>
              {UserInfor.hoTen}
            </span>
          </span>
          <span>
            Mã nhóm:{" "}
            <span className="font-semibold" onClick={toggleEditMode}>
              {UserInfor.maNhom}
            </span>
          </span>
          <span>
            Số điện thoại:{" "}
            <span className="font-semibold" onClick={toggleEditMode}>
              {UserInfor.soDT}
            </span>
          </span>
          <span>
            Mã loại người dùng:{" "}
            <span className="font-semibold" onClick={toggleEditMode}>
              {UserInfor.maLoaiNguoiDung}
            </span>
          </span>
          <span></span>
        </div>
      );
    }
  };
  return (
    <div className=" user_container h-96 mt-5">
      <div className="w-1/2 content h-full flex mx-auto flex-col justify-around items-center">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Thông tin cá nhân</h1>
        </div>
        {renderUserInformation()}
      </div>
    </div>
  );
};

export default UserInformation;
