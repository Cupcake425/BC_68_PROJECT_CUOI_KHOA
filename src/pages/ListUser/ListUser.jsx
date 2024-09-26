import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Modal, Select, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NotificationContext } from "../../App";
import "../../scss/pages/_ListUser.scss";
import { userService } from "../../services/user.service";
import CustomInput from "../../components/InputCustom/CustomInput";
import { quanLyKhoaHoc } from "../../services/quanLyKhoaHoc.service";

const ListUser = () => {
  const [listUser, setListUser] = useState([]);
  const [listUserGhiDanh, setListUserGhiDanh] = useState([]);
  const [selectedGhiDanh, setSelectedGhiDanh] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [listKhoaHocChoXacThuc, setListKhoaHocChoXacThuc] = useState([]);
  const [listKhoaHocDaXacThuc, setListKhoaHocDaXacThuc] = useState([]);
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
  const [isModalGhiDanhOpen, setIsModalGhiDanhOpen] = useState(false);
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
  const showModalGhiDanh = () => {
    setIsModalGhiDanhOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleOkGhiDanh = () => {
    setIsModalGhiDanhOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancelGhiDanh = () => {
    setIsModalGhiDanhOpen(false);
  };
  const handleChangeSelect = (value) => {
    setSelectedGhiDanh(value);
  };
  const listUserGhiDanhOption = () => {
    return listUserGhiDanh.map((item) => {
      return {
        value: item.maKhoaHoc,
        label: item.tenKhoaHoc,
      };
    });
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
  const handleCancelLesson = (maKhoaHoc) => {
    const userData = {
      maKhoaHoc: maKhoaHoc,
      taiKhoan: selectedUser,
    };
    quanLyKhoaHoc
      .huyKhoaHoc(user?.accessToken, userData)
      .then((res) => {
        handleNotification(res.data, "success");
        //Force refetch data để render lại trang theo listKhoaHoc mới
        setListKhoaHocChoXacThuc((prevList) =>
          prevList.filter((course) => course.maKhoaHoc !== maKhoaHoc)
        );
      })
      .catch((err) => {
        handleNotification(err.response.data, "error");
      });
  };
  const handleGhiDanh = () => {
    const registrationData = {
      taiKhoan: selectedUser,
      maKhoaHoc: selectedGhiDanh,
    };
    quanLyKhoaHoc
      .dangKyKhoaHoc(user?.accessToken, registrationData)
      .then(() => {
        handleNotification("Đăng ký khóa học thành công!", "success");
      })
      .catch((err) => {
        handleNotification(err.message, "error");
      });
  };
  const handleConfirmGhiDanh = (maKhoaHoc) => {
    const registrationData = {
      taiKhoan: selectedUser,
      maKhoaHoc: maKhoaHoc,
    };
    quanLyKhoaHoc
      .ghiDanhKhoaHoc(user?.accessToken, registrationData)
      .then((res) => {
        handleNotification(res.data, "success");
        //Force refetch data để render lại trang theo listKhoaHoc mới
        setListKhoaHocChoXacThuc((prevList) =>
          prevList.filter((course) => course.maKhoaHoc !== maKhoaHoc)
        );
      })
      .catch((err) => handleNotification(err.response, "error"));
  };
  const handleChangeValue = (event) => {
    const { name, value } = event.target;
    setUserValue({ ...userValue, [name]: value });
  };

  useEffect(() => {
    getAllUserAPI();
  }, []);

  useEffect(() => {
    const userTaiKhoan = {
      taiKhoan: selectedUser,
    };
    userService
      .LayDanhSachKhoaHocChoXetDuyet(user?.accessToken, userTaiKhoan)
      .then((res) => {
        setListKhoaHocChoXacThuc(res.data);
      })
      .catch((err) => console.log(err));
  }, [selectedUser, listKhoaHocChoXacThuc]);

  useEffect(() => {
    const userTaiKhoan = {
      taiKhoan: selectedUser,
    };
    userService
      .LayDanhSachKhoaHocDaXetDuyet(user?.accessToken, userTaiKhoan)
      .then((res) => {
        setListKhoaHocDaXacThuc(res.data);
      })
      .catch((err) => console.log(err));
  }, [selectedUser, listKhoaHocDaXacThuc]);

  const columnsDanhSachDaXetDuyet = [
    {
      title: "Mã khóa học",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
    },
    {
      title: "Tên khóa học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
    },
    {
      title: "Thao Tác",
      key: "action",
      render: (_, record) => {
        return (
          <Space size={"small"} className="space-x-1">
            <button
              onClick={() => {
                handleCancelLesson(record.maKhoaHoc);
              }}
              className="bg-red-500 text-white py-1 lg:px-3 px-2 text-xs lg:text-base rounded hover:bg-red-500/90 duration-300"
            >
              Hủy
            </button>
          </Space>
        );
      },
    },
  ];
  const columnsDanhSachChoXetDuyet = [
    {
      title: "Mã khóa học",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
    },
    {
      title: "Tên khóa học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
    },
    {
      title: "Thao Tác",
      key: "action",
      render: (_, record) => {
        return (
          <Space size={"small"} className="space-x-1">
            <button
              onClick={() => {
                handleConfirmGhiDanh(record.maKhoaHoc);
              }}
              className="bg-yellow-500 text-white py-1 lg:px-3 px-2 text-xs lg:text-base rounded hover:bg-yellow-500/90 duration-300"
            >
              Xác thực
            </button>
            <button
              onClick={() => {
                handleCancelLesson(record.maKhoaHoc);
              }}
              className="bg-red-500 text-white py-1 lg:px-3 px-2 text-xs lg:text-base rounded hover:bg-red-500/90 duration-300"
            >
              Hủy
            </button>
          </Space>
        );
      },
    },
  ];
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
      title: "Thao tác",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle" className="space-x-1 lg:space-x-2">
            <button
              onClick={() =>
                userService
                  .deleteUser(record.taiKhoan, user.accessToken)
                  .then((res) => {
                    handleNotification(res.data, "success");
                    getAllUserAPI();
                  })
                  .catch((err) => {
                    handleNotification(err.response.data, "error");
                  })
              }
              className="bg-red-500 text-white py-2 lg:px-5 px-2 text-sm lg:text-base rounded hover:bg-red-500/90 duration-300"
            >
              Xóa
            </button>
            <button
              onClick={() => {
                showModal(record);
                console.log(record);
              }}
              className="bg-yellow-500 text-white py-2 lg:px-5 px-2 text-sm lg:text-base rounded hover:bg-yellow-500/90 duration-300"
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
                  value={userValue.taiKhoan}
                  disabled={true}
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
            <button
              onClick={() => {
                setSelectedUser(record.taiKhoan);
                showModalGhiDanh();
                userService
                  .LayDanhSachKhoaHocChuaGhiDanh(
                    record.taiKhoan,
                    user.accessToken,
                    record.taiKhoan
                  )
                  .then((res) => {
                    setListUserGhiDanh(res.data);
                  })
                  .catch((err) => console.log(err));
              }}
              className="bg-green-500 text-white py-2 lg:px-5 text-sm lg:text-base px-2 rounded hover:bg-green-500/90 duration-300"
            >
              Ghi danh
            </button>
            <Modal
              title="Quản lý ghi danh học sinh"
              open={isModalGhiDanhOpen}
              onOk={handleOkGhiDanh}
              onCancel={handleCancelGhiDanh}
              footer={[]}
            >
              <div className="my-2">
                <h3 className="font-semibold">Chọn khóa học</h3>
                <div className="flex gap-5">
                  <Select
                    defaultValue="Chọn khóa học ghi danh"
                    style={{
                      width: 300,
                    }}
                    options={listUserGhiDanhOption()}
                    onChange={handleChangeSelect}
                  />
                  <Button
                    onClick={() => {
                      handleGhiDanh();
                    }}
                  >
                    Ghi Danh
                  </Button>
                </div>
                <hr className="w-full my-3" />
                <h3 className="font-semibold">Khóa học chờ xác thực</h3>
                <div>
                  <Table
                    columns={columnsDanhSachChoXetDuyet}
                    dataSource={listKhoaHocChoXacThuc}
                    pagination={{
                      pageSize: 2,
                    }}
                  />
                </div>
                <hr className="w-full my-3" />
                <h3 className="font-semibold">Khóa học đã xác thực</h3>
                <div>
                  <Table
                    columns={columnsDanhSachDaXetDuyet}
                    dataSource={listKhoaHocDaXacThuc}
                    pagination={{
                      pageSize: 2,
                    }}
                  />
                </div>
              </div>
            </Modal>
          </Space>
        );
      },
    },
  ];
  return <Table columns={columns} dataSource={listUser} />;
};
export default ListUser;
