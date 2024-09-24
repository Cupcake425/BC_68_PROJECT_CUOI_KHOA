import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Modal, Select, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NotificationContext } from "../../App";
import "../../scss/pages/_ListUser.scss";
import { userService } from "../../services/user.service";
import CustomInput from "../../components/InputCustom/CustomInput";

const ListUser = () => {
  const [listUser, setListUser] = useState([]);
  const [userValue, setUserValue] = useState({
    taiKhoan: "string",
    matKhau: "string",
    hoTen: "string",
    soDt: "string",
    maLoaiNguoiDung: "string",
    maNhom: "string",
    email: "string",
  });
  const { user } = useSelector((state) => state.authSlice);

  const { handleNotification = () => {} } = useContext(NotificationContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (record) => {
    setUserValue({
      taiKhoan: record.taiKhoan,
      matKhau: record.matKhau,
      hoTen: record.hoTen,
      soDt: record.soDt,
      maLoaiNguoiDung: record.maLoaiNguoiDung,
      maNhom: record.maNhom,
      email: record.email,
    });
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getAllUserAPI = () => {
    userService
      .getAllUser()
      .then((res) => {
        setListUser(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleSubmitFormCreateUser = (event) => {
    event.preventDefault();
    userService
      .updateUser(user.accessToken, userValue)
      .then(() => {
        handleNotification("Update thành công", "success");
        getAllUserAPI();
      })
      .catch((err) => {
        handleNotification(err.response.data, "error");
      });
  };
  const handleChangeValue = (event) => {
    const { name, value } = event.target;
    setUserValue({ ...userValue, [name]: value });
  };

  useEffect(() => {
    getAllUserAPI();
  }, []);
  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
      responsive: ["lg"],
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      key: "soDt",
      responsive: ["xl"],
    },
    {
      title: "Chức vụ",
      dataIndex: "maLoaiNguoiDung",
      render: (text) => (
        <Tag color={text == "GV" ? "geekblue-inverse" : "lime-inverse"}>
          {text}
        </Tag>
      ),
      responsive: ["xl"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle" className="space-x-3">
            <button
              onClick={() =>
                userService
                  .deleteUser(record.taiKhoan, user.accessToken)
                  .then((res) => {
                    console.log(res);
                    handleNotification(res.data, "success");
                    getAllUserAPI();
                  })
                  .catch((err) => {
                    console.log(err);
                    handleNotification(err.response.data, "error");
                  })
              }
              className="bg-red-500 text-white py-2 px-5 rounded hover:bg-red-500/90 duration-300"
            >
              Xóa
            </button>
            <button
              onClick={() => showModal(record)}
              className="bg-yellow-500 text-white py-2 px-5 rounded hover:bg-yellow-500/90 duration-300"
            >
              Sửa
            </button>
            <Modal
              title="Update user profile"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[]}
            >
              <form onSubmit={handleSubmitFormCreateUser} className="space-y-3">
                <CustomInput
                  contentLabel="Tài khoản"
                  onChange={handleChangeValue}
                  name="taiKhoan"
                  value={record.taiKhoan}
                />
                <CustomInput
                  contentLabel="Mật khẩu"
                  onChange={handleChangeValue}
                  name="matKhau"
                  value={userValue.matKhau}
                />
                <CustomInput
                  contentLabel="Họ tên"
                  onChange={handleChangeValue}
                  name="hoTen"
                  value={userValue.hoTen}
                />
                <CustomInput
                  contentLabel="Số điện thoại"
                  onChange={handleChangeValue}
                  name="soDt"
                  value={userValue.soDt}
                />
                <CustomInput
                  contentLabel="Email"
                  onChange={handleChangeValue}
                  name="email"
                  value={userValue.email}
                />
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Chức vụ
                  </label>
                  <select
                    name="maLoaiNguoiDung"
                    value={userValue.maLoaiNguoiDung}
                    onChange={handleChangeValue}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    <option value="GV">Giáo viên</option>
                    <option value="HV">Học viên</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Mã nhóm
                  </label>
                  <select
                    name="maNhom"
                    value={userValue.maNhom}
                    onChange={handleChangeValue}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    <option value="GP01">GP01</option>
                    <option value="GP02">GP02</option>
                    <option value="GP03">GP03</option>
                    <option value="GP04">GP04</option>
                    <option value="GP05">GP05</option>
                  </select>
                </div>
                <div>
                  <button
                    className="px-5 py-2 bg-black text-white rounded"
                    type="submit"
                  >
                    Update người dùng
                  </button>
                </div>
              </form>
            </Modal>
          </Space>
        );
      },
    },
  ];
  return <Table columns={columns} dataSource={listUser} />;
};
export default ListUser;
