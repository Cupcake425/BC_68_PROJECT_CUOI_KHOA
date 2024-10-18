import React, { useContext, useEffect, useState } from "react";
import CustomInput from "../../components/InputCustom/CustomInput";
import { Modal, Select, Space, Table } from "antd";
import useDebounce from "../../hooks/useDebounce";
import axios from "axios";
import { quanLyKhoaHoc } from "../../services/quanLyKhoaHoc.service";
import { NotificationContext } from "../../App";
import moment from "moment";
import { userService } from "../../services/user.service";
const QuanLyKhoaHoc = () => {
  const [valueInput, setValueInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foundCourse, setFoundCourse] = useState([]);
  const { handleNotification } = useContext(NotificationContext);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [courseCategoryCode, setCourseCategoryCourse] = useState([]);
  const [isGhiDanhOpenModal, setIsGhiOpenModal] = useState(false);
  const [verifiedStudent, setVerifiedStudent] = useState([]);
  const [notVerifiedStudent, setNotVerifiedStudent] = useState([]);
  const [danhSachHocVienChuaDuocGhiDanh, setDanhSachHocVienChuaDuocGhiDanh] =
    useState([]);
  const [taiKhoanOnSearch, setTaiKhoanOnSearch] = useState("");

  const columnsDanhSachDaXetDuyet = [
    {
      title: "STT",
      dataIndex: "stt", // Không bắt buộc
      key: "stt",
      render: (text, record, index) => index + 1, // Hiển thị số thứ tự
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Họ và tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Thao Tác",
      key: "action",
      render: (_, record) => {
        return (
          <Space size={"small"} className="space-x-1">
            <button
              onClick={() => {
                handleRemoveHocVienDaGhiDanh(record);
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
      title: "STT",
      dataIndex: "stt", // Không bắt buộc
      key: "stt",
      render: (text, record, index) => index + 1, // Hiển thị số thứ tự
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Họ và tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Thao Tác",
      key: "action",
      render: (_, record) => {
        return (
          <Space size={"small"} className="space-x-1">
            <button
              onClick={() => {
                handleCancelJoin(record);
              }}
              className="bg-red-500 text-white py-1 lg:px-3 px-2 text-xs lg:text-base rounded hover:bg-red-500/90 duration-300"
            >
              Hủy
            </button>
            <button
              className="bg-green-500 px-3 py-2 text-white rounded-md"
              onClick={() => handleGhiDanh(record)}
            >
              Xác thực
            </button>
          </Space>
        );
      },
    },
  ];
  const [course, setCourse] = useState({
    maKhoaHoc: "",
    tenKhoaHoc: "",
    moTa: "",
    luotXem: 0,
    danhGia: 0,
    hinhAnh: "",
    maNhom: "",
    ngayTao: "",
    maDanhMucKhoaHoc: [],
    taiKhoanNguoiTao: "",
  });
  const [newCourse, setNewCourse] = useState({
    maKhoaHoc: "",
    tenKhoaHoc: "",
    moTa: "",
    luotXem: 0,
    danhGia: 0,
    hinhAnh: "",
    maNhom: "",
    ngayTao: "",
    maDanhMucKhoaHoc: [],
    taiKhoanNguoiTao: "",
    biDanh: "",
  });
  console.log("newCourse: ", newCourse);
  console.log("course: ", course);
  const columns = [
    {
      title: "Mã khóa học",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
    },
    {
      title: "Tên khóa học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
      responsive: ["md"],
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      responsive: ["lg"],
      render: (_, record) => {
        return <img src={record.hinhAnh} alt="NULL" className="w-20" />;
      },
    },
    {
      title: "Lượt xem",
      dataIndex: "luotXem",
      key: "luotXem",
      responsive: ["xl"],
    },
    {
      title: "Người tạo",
      dataIndex: ["nguoiTao", "hoTen"],
      key: "hoTen",
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
                quanLyKhoaHoc
                  .removeCourse(record.maKhoaHoc)
                  .then((res) => {
                    handleNotification(res.data, "success");
                    getAllKhoaHoc();
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
                console.log(record);
                quanLyKhoaHoc
                  .layDanhMucKhoaHoc()
                  .then((res) => {
                    console.log(
                      "reponse in get danh muc khoa hoc: ",
                      res.data,
                      record
                    );
                    setCourseCategoryCourse(res.data);
                    setCourse({
                      maKhoaHoc: record.maKhoaHoc,
                      tenKhoaHoc: record.tenKhoaHoc,
                      moTa: record.moTa,
                      luotXem: record.luotXem,
                      danhGia: record.danhGia,
                      hinhAnh: record.hinhAnh,
                      maNhom: record.maNhom,
                      ngayTao: record.ngayTao,
                      maDanhMucKhoaHoc: record.danhMucKhoaHoc.maDanhMucKhoahoc,
                      taiKhoanNguoiTao: record.nguoiTao.taiKhoan,
                    });
                    setIsModalOpen(true);
                  })
                  .catch((err) => {
                    console.log("error in lay danh muc khoa hoc: ", err);
                  });
              }}
              className="bg-yellow-500 text-white py-2 lg:px-5 px-2 text-sm lg:text-base rounded hover:bg-yellow-500/90 duration-300"
            >
              Sửa
            </button>

            <button
              onClick={() => {
                localStorage.setItem(
                  "maKhoaHoc",
                  JSON.stringify(record.maKhoaHoc)
                );
                console.log("maKhoahoc: ", record.maKhoaHoc);

                Promise.all([
                  userService.layDanhSachHocVienChoXacThuc({
                    MaKhoaHoc: record.maKhoaHoc,
                  }),
                  userService.layDanhSachHocVienDaGhiDanh({
                    MaKhoaHoc: record.maKhoaHoc,
                  }),
                  userService.layDanhSachNguoiDungChuaGhiDanh(),
                ])
                  .then(([notVerified, verified, listSearchNotVerified]) => {
                    console.log(
                      "ket qua cua ds ghi danh và chua ghi danh: ",
                      verified,
                      notVerified,
                      listSearchNotVerified.data
                    );
                    const SearchedStudent = listSearchNotVerified.data.map(
                      (item, index) => {
                        return {
                          key: index,
                          label: item.hoTen,
                          value: item.taiKhoan,
                        };
                      }
                    );
                    setVerifiedStudent(verified.data);
                    setNotVerifiedStudent(notVerified.data);
                    setDanhSachHocVienChuaDuocGhiDanh(SearchedStudent);
                    setIsGhiOpenModal(true);
                  })
                  .catch((err) => {
                    console.log(
                      "err in get ds ghi danh và chưa ghi danh: ",
                      err
                    );
                  });
              }}
              className="bg-green-500 text-white py-2 lg:px-5 text-sm lg:text-base px-2 rounded hover:bg-green-500/90 duration-300"
            >
              Ghi danh
            </button>
          </Space>
        );
      },
    },
  ];
  const debounce = useDebounce(valueInput, 500);
  const [listKhoaHoc, setListKhoaHoc] = useState([]);

  useEffect(() => {
    const FindCourse = async () => {
      try {
        const { data } = await axios.get(
          `http://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${valueInput}&MaNhom=GP01`
        );
        console.log("response in get alll khoa hoc: ", data);
        setFoundCourse(data);
      } catch (error) {
        console.log("error in get khoa hoc list in quan ly khoa hoc: ", error);
      }
    };
    if (valueInput) FindCourse();
  }, [debounce]);

  const getAllKhoaHoc = async () => {
    quanLyKhoaHoc
      .layDanhSachKhoaHoc("")
      .then((res) => {
        console.log("response in get all khoa hoc: ", res);
        setListKhoaHoc(res.data);
      })
      .catch((err) => {
        console.log("error in get all khoa hoc: ", err);
      });
  };

  useEffect(() => {
    getAllKhoaHoc();
  }, []);

  const handleGhiDanh = (record) => {
    quanLyKhoaHoc
      .ghiDanhKhoaHoc({
        maKhoaHoc: JSON.parse(localStorage.getItem("maKhoaHoc")),
        taiKhoan: record.taiKhoan,
      })
      .then((res) => {
        console.log("res in handleGhiDanh: ", res);
        const newDanhSachHocVienChoXacThuc = notVerifiedStudent.filter(
          (item) => item.taiKhoan !== record.taiKhoan
        );
        setNotVerifiedStudent(newDanhSachHocVienChoXacThuc);
        setVerifiedStudent((prev) => [...prev, record]);
        handleNotification(res.data, "success");
      })
      .catch((err) => {
        console.log("err in handleGhiDanh: ", err);
      });
  };
  const handelChange = (e) => {
    setValueInput(e.target.value);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelGhiDanh = () => {
    setIsGhiOpenModal(false);
  };

  const handleCancelAdd = () => {
    setIsAddModalOpen(false);
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    const currentTime = new Date().toISOString();
    const formatTime = moment(currentTime).format("dd/MM/yyyy");
    console.log("time: ", formatTime);
    const finalCourseVersion = { ...newCourse, ngayTao: formatTime };
    quanLyKhoaHoc
      .addCourse(finalCourseVersion)
      .then((res) => {
        console.log("response in add khoa hoc: ", res);
        setNewCourse({
          maKhoaHoc: "",
          tenKhoaHoc: "",
          moTa: "",
          luotXem: 0,
          danhGia: 0,
          hinhAnh: "",
          maNhom: "",
          ngayTao: "",
          maDanhMucKhoaHoc: "",
          taiKhoanNguoiTao: "",
          biDanh: "",
        });

        getAllKhoaHoc();
        setIsAddModalOpen(false);
      })
      .catch((err) => {
        console.log("error in add khoa hoc: ", err);
      });
  };

  const handleChangeCourseAttribute = (e) => {
    let { name, value } = e.target;
    if (name === "hinhAnh") {
      value = e.target.files[0].name;
      console.log("tên file hình ảnh: ", value);
    }
    setCourse((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleChangeNewCourseAttribute = (e) => {
    let { name, value } = e.target;
    if (name === "hinhAnh") {
      value = e.target.files[0].name;
      console.log("tên file hình ảnh: ", value);
    }
    setNewCourse((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleUpdateCourse = (e) => {
    e.preventDefault();
    quanLyKhoaHoc
      .updateCourseInformation(course)
      .then((res) => {
        console.log("response in update course: ", res);
        setIsModalOpen(false);
        getAllKhoaHoc();
      })
      .catch((err) => {
        console.log("error in update course: ", err);
      });
  };

  const renderMaDanhMucKhoaHoc = () => {
    return courseCategoryCode.map((item) => {
      return <option value={item.maDanhMuc}>{item.tenDanhMuc}</option>;
    });
  };

  const handleCancelJoin = (record) => {
    const localMaKhoaHoc = JSON.parse(localStorage.getItem("maKhoaHoc"));
    const data = { maKhoaHoc: localMaKhoaHoc, taiKhoan: record.taiKhoan };
    console.log("data out: ", localMaKhoaHoc);
    userService
      .cancelJoin(data)
      .then((res) => {
        console.log("response in cancel đăng ký: ", res);
        setNotVerifiedStudent((prev) => {
          return notVerifiedStudent.filter(
            (item) => item.taiKhoan !== record.taiKhoan
          );
        });
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  console.log("tai khoan on search: ", taiKhoanOnSearch);
  const handleGhiDanhOnSearch = () => {
    const data = {
      maKhoaHoc: JSON.parse(localStorage.getItem("maKhoaHoc")),
      taiKhoan: taiKhoanOnSearch,
    };
    console.log("data in handle ghi danh: ", data);
    userService
      .ghiDanhHocVienOnSearch(data)
      .then((res) => {
        handleNotification(res.data, "success");
        console.log("response in ghi danh hoc vien on search: ", res);
        setTaiKhoanOnSearch("");
        userService
          .layDanhSachHocVienDaGhiDanh({
            MaKhoaHoc: JSON.parse(localStorage.getItem("maKhoaHoc")),
          })
          .then((res) => {
            console.log(
              "response in lay danh sach hoc vien da ghi danh torng handleGhiDanh: ",
              res
            );
            setVerifiedStudent(res.data);
          })
          .catch((err) => {
            console.log(
              "error in lay danh sach hojc vien da ghi danh torng handleghidanh: ",
              err
            );
          });
        //   setVerifiedStudent((prev) => {
        //       return {...prev,}
        //   })
      })
      .catch((err) => {
        handleNotification(res.response.data.message, "error");
        console.log("err in ghi danh hoc vien on search: ", err);
      });
  };

  const handleRemoveHocVienDaGhiDanh = (record) => {
    userService
      .cancelJoin({
        maKhoaHoc: JSON.parse(localStorage.getItem("maKhoaHoc")),
        taiKhoan: record.taiKhoan,
      })
      .then((res) => {
        console.log("res in huy ghi danh: ", res);
        handleNotification(res.data, "success");
        const newList = verifiedStudent.filter((item) => {
          return item.taiKhoan !== record.taiKhoan;
        });
        console.log("newList: ", newList);
        setVerifiedStudent(newList);
      })
      .catch((err) => {
        handleNotification(err.response.data.message, "error");
        console.log("err in huy ghi danh: ", err);
      });
  };
  console.log("course: ", course);

  return (
    <div>
      <div>
        <button
          className="px-3 py-2 bg-green-500 text-white rounded-sm"
          onClick={() => setIsAddModalOpen(true)}
        >
          + ADD Course
        </button>
      </div>
      <div className="my-6">
        <form action="" className="flex items-center">
          <CustomInput
            placeholder={"Nhập vào tài khoản hoặc họ tên người dùng"}
            classWrapper="w-2/3 me-3"
            onChange={handelChange}
          />
        </form>
      </div>
      <Table
        columns={columns}
        dataSource={valueInput === "" ? listKhoaHoc : foundCourse}
      />
      {/* ghi danh modal */}
      <Modal
        title="Chọn người dùng"
        open={isGhiDanhOpenModal}
        onCancel={handleCancelGhiDanh}
        footer={[]}
      >
        <div className="my-2">
          <h3 className="font-semibold">Chọn khóa học</h3>
          <div className="flex gap-5 items-center">
            <Select
              defaultValue="Search tên người dùng"
              style={{
                width: 300,
              }}
              //   value={taiKhoanOnSearch}
              options={danhSachHocVienChuaDuocGhiDanh}
              onChange={(value) => {
                console.log("value in select: ", value);
                setTaiKhoanOnSearch(value);
              }}
            />
            <button
              className="rounded-lg px-3 py-2 bg-green-500 text-white"
              onClick={() => {
                handleGhiDanhOnSearch();
              }}
            >
              Ghi danh
            </button>
          </div>
          <hr className="w-full my-3" />
          <h3 className="font-semibold">Học viên chờ xác thực</h3>
          <div>
            <Table
              columns={columnsDanhSachChoXetDuyet}
              dataSource={notVerifiedStudent}
              pagination={{
                pageSize: 2,
              }}
            />
          </div>
          <hr className="w-full my-3" />
          <h3 className="font-semibold">Học viên đã tham gia lớp học</h3>
          <div>
            <Table
              columns={columnsDanhSachDaXetDuyet}
              dataSource={verifiedStudent}
              pagination={{
                pageSize: 2,
              }}
            />
          </div>
        </div>
      </Modal>

      {/* update modal */}
      <Modal
        title="Update course information"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
      >
        <form className=" grid grid-cols-2 gap-2" onSubmit={handleUpdateCourse}>
          <CustomInput
            contentLabel="Mã khóa học"
            onChange={handleChangeCourseAttribute}
            name="maKhoaHoc"
            value={course.maKhoaHoc}
          />
          <CustomInput
            contentLabel="Tên khóa học"
            onChange={handleChangeCourseAttribute}
            name="tenKhoaHoc"
            value={course.tenKhoaHoc}
          />
          <CustomInput
            contentLabel="Mô tả"
            onChange={handleChangeCourseAttribute}
            name="moTa"
            value={course.moTa}
          />
          <CustomInput
            contentLabel="Lượt xem"
            onChange={handleChangeCourseAttribute}
            name="luotXem"
            value={course.luotXem}
          />
          <CustomInput
            contentLabel="Đánh giá"
            onChange={handleChangeCourseAttribute}
            name="danhGia"
            value={course.danhGia}
          />

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Mã danh mục khóa học
            </label>
            <select
              name="maDanhMucKhoaHoc"
              value={course.maDanhMucKhoaHoc}
              onChange={handleChangeCourseAttribute}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value={""}>Chọn mã danh mục khóa học</option>
              {renderMaDanhMucKhoaHoc()}
            </select>
          </div>
          <CustomInput
            contentLabel="Tài khoản người tạo"
            onChange={handleChangeCourseAttribute}
            name="taiKhoanNguoiTao"
            value={course.taiKhoanNguoiTao}
          />
          <CustomInput
            contentLabel="Ảnh khóa học"
            onChange={handleChangeCourseAttribute}
            name="hinhAnh"
            type="file"
          />

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Mã nhóm
            </label>
            <select
              name="maNhom"
              value={course.maNhom}
              onChange={handleChangeCourseAttribute}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value="">Chọn mã nhóm</option>
              <option value="GP01">GP01</option>
              <option value="GP02">GP02</option>
              <option value="GP03">GP03</option>
              <option value="GP04">GP04</option>
              <option value="GP05">GP05</option>
            </select>
          </div>
          <div className="flex items-end justify-center">
            <button
              className="px-5 py-2 bg-black text-white rounded"
              type="submit"
            >
              Update thông tin khóa học
            </button>
          </div>
        </form>
      </Modal>

      {/* add Modal */}
      <Modal
        title="Add Course"
        open={isAddModalOpen}
        onCancel={handleCancelAdd}
        footer={[]}
      >
        <form className=" grid grid-cols-2 gap-2" onSubmit={handleAddCourse}>
          <CustomInput
            contentLabel="Mã khóa học"
            onChange={handleChangeNewCourseAttribute}
            name="maKhoaHoc"
            value={newCourse.maKhoaHoc}
          />
          <CustomInput
            contentLabel="Bí danh"
            onChange={handleChangeNewCourseAttribute}
            name="biDanh"
            value={newCourse.biDanh}
          />
          <CustomInput
            contentLabel="Tên khóa học"
            onChange={handleChangeNewCourseAttribute}
            name="tenKhoaHoc"
            value={newCourse.tenKhoaHoc}
          />
          <CustomInput
            contentLabel="Mô tả"
            onChange={handleChangeNewCourseAttribute}
            name="moTa"
            value={newCourse.moTa}
          />
          <CustomInput
            contentLabel="Lượt xem"
            onChange={handleChangeNewCourseAttribute}
            name="luotXem"
            value={newCourse.luotXem}
          />
          <CustomInput
            contentLabel="Đánh giá"
            onChange={handleChangeNewCourseAttribute}
            name="danhGia"
            value={newCourse.danhGia}
          />

          <CustomInput
            contentLabel="Tài khoản người tạo"
            onChange={handleChangeNewCourseAttribute}
            name="taiKhoanNguoiTao"
            value={newCourse.taiKhoanNguoiTao}
          />
          <CustomInput
            contentLabel="Ảnh khóa học"
            onChange={handleChangeNewCourseAttribute}
            name="hinhAnh"
            type="file"
          />

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Mã danh mục khóa học
            </label>
            <select
              name="maDanhMucKhoaHoc"
              value={newCourse.maDanhMucKhoaHoc}
              onChange={handleChangeNewCourseAttribute}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value="">Chọn mã danh mục khóa học</option>{" "}
              {/* Giá trị mặc định */}
              {renderMaDanhMucKhoaHoc()}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Mã nhóm
            </label>
            <select
              name="maNhom"
              value={newCourse.maNhom}
              onChange={handleChangeNewCourseAttribute}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value="">Chọn mã nhóm</option> {/* Giá trị mặc định */}
              <option value="GP01">GP01</option>
              <option value="GP02">GP02</option>
              <option value="GP03">GP03</option>
              <option value="GP04">GP04</option>
              <option value="GP05">GP05</option>
            </select>
          </div>
          <div className="col-span-2">
            <div className="flex items-end justify-center">
              <button
                className="px-5 py-2 bg-black text-white rounded"
                type="submit"
              >
                Complete Adding Course
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default QuanLyKhoaHoc;
