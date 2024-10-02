import React, { useContext } from "react";
import CustomInput from "../../components/InputCustom/CustomInput";
import { useFormik } from "formik";
import { notiValidation } from "../../common/NotiValidation";
import * as yup from "yup";
import { NotificationContext } from "../../App";
import { Select } from "antd";
import { userService } from "../../services/user.service";
import { useSelector } from "react-redux";
const CreateUser = () => {
  const { handleNotification } = useContext(NotificationContext);
  const { user } = useSelector((state) => state.authSlice);
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      maLoaiNguoiDung: "string",
      maNhom: "",
      email: "",
    },
    onSubmit: (values) => {
      console.log(values);
      userService
        .addUser(user.accessToken, values)
        .then(() => {
          handleNotification("Account created successfully!", "success");
        })
        .catch(() => {
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
      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          <CustomInput
            contentLabel={"Tài khoản"}
            name={"taiKhoan"}
            onBlur={handleBlur}
            touched={touched.taiKhoan}
            error={errors.taiKhoan}
            onChange={handleChange}
            value={values.taiKhoan}
          />
          <CustomInput
            contentLabel={"Mật khẩu"}
            name={"matKhau"}
            onBlur={handleBlur}
            touched={touched.matKhau}
            error={errors.matKhau}
            type="password"
            onChange={handleChange}
            value={values.matKhau}
          />
          <CustomInput
            contentLabel={"Tên"}
            name={"hoTen"}
            onBlur={handleBlur}
            touched={touched.hoTen}
            error={errors.hoTen}
            onChange={handleChange}
            value={values.hoTen}
          />
          <CustomInput
            contentLabel={"Số điện thoại"}
            name={"soDT"}
            onBlur={handleBlur}
            touched={touched.soDT}
            error={errors.soDT}
            onChange={handleChange}
            value={values.soDT}
          />
          <div>
            <label className="block mb-2 text-sm font-medium ">Mã nhóm</label>
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
          <div>
            <label className="block mb-2 text-sm font-medium ">Chức vụ</label>
            <Select
              className="w-full h-10"
              showSearch
              placeholder="Select a person"
              optionFilterProp="label"
              onChange={(value) => setFieldValue("maLoaiNguoiDung", value)}
              options={[
                {
                  value: "GV",
                  label: "Giáo viên",
                },
                {
                  value: "HV",
                  label: "Học viên",
                },
              ]}
            />
            {errors.maNhom && touched.maNhom ? (
              <span className="text-red-500">{errors.maNhom}</span>
            ) : null}
          </div>
          <CustomInput
            contentLabel={"Email"}
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
            Tạo tài khoản
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
