import React, { useContext, useEffect, useState } from "react";
import { userService } from "../../services/user.service";
import { useSelector } from "react-redux";
import { quanLyKhoaHoc } from "../../services/quanLyKhoaHoc.service";
import { Link } from "react-router-dom";
import { path } from "../../common/path";
import "../../scss/pages/_KhoaHocCuaUser.scss";
import { NotificationContext } from "../../App";

const KhoaHocCuaUser = () => {
  const [maKhoaHocList, setMaKhoaHocList] = useState([]);
  const [listKhoaHoc, setListKhoaHoc] = useState([]);
  const { handleNotification } = useContext(NotificationContext);
  const { user } = useSelector((state) => state.authSlice);
  const handleCancelLesson = (maKhoaHoc) => {
    const userData = {
      maKhoaHoc: maKhoaHoc,
      taiKhoan: user?.taiKhoan,
    };
    quanLyKhoaHoc
      .huyKhoaHoc(user?.accessToken, userData)
      .then((res) => {
        handleNotification(res.data, "success");
        //Force refetch data để render lại trang theo listKhoaHoc mới
        setListKhoaHoc((prevList) =>
          prevList.filter((course) => course.maKhoaHoc !== maKhoaHoc)
        );
      })
      .catch((err) => {
        handleNotification(err.response.data, "error");
      });
  };

  useEffect(() => {
    const userTaiKhoan = {
      taiKhoan: user?.taiKhoan,
    };
    userService
      .LayDanhSachKhoaHocChoXetDuyet(user?.accessToken, userTaiKhoan)
      .then((res) => {
        setMaKhoaHocList(res?.data);
      })
      .catch((err) => console.log(err));
  }, [user]);

  useEffect(() => {
    const callApiDetail = async () => {
      try {
        // Trên Swagger có file maKhoaHoc: "" làm crash không load được nên cần phải filter ra
        const filterMaKhoaHocList = maKhoaHocList.filter(
          (item) => item.maKhoaHoc
        );
        const promise = filterMaKhoaHocList?.map((item) => {
          return quanLyKhoaHoc.layThongTinKhoaHoc(item.maKhoaHoc);
        });
        const result = await Promise?.all(promise);
        const listKhoaHocData = result?.map((item) => {
          return item.data;
        });
        setListKhoaHoc(listKhoaHocData);
      } catch (err) {
        console.log(err);
      }
    };
    callApiDetail();
  }, [maKhoaHocList]);

  return (
    <div className="my-5 user_khoa_hoc">
      <div className="container">
        <h1 className="text-center text-3xl font-bold">
          Các khóa học đã tham gia
        </h1>
        {maKhoaHocList.length == 0 ? (
          <div className="h-screen">
            <p>Bạn chưa đăng ký khóa học nào hết</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-5 justify-center items-center">
            {listKhoaHoc?.map((item, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="user_khoa_hoc_item border border-gray-300 rounded-lg mt-5 flex flex-col max-w-[367px] max-h-[550px]"
                  >
                    <Link to={`${path.khoaHocDetail}/${item?.maKhoaHoc}`}>
                      <img
                        src={item?.hinhAnh}
                        alt="item"
                        className="border border-b-gray-300"
                        style={{
                          borderTopLeftRadius: 8,
                          borderTopRightRadius: 8,
                        }}
                      />
                    </Link>

                    <div className="flex flex-col p-5 justify-between">
                      <div>
                        <h2 className="text-xl font-bold">{`${item?.tenKhoaHoc} `}</h2>
                        <h2>{`Mã khóa học : ${item.maKhoaHoc}`}</h2>
                      </div>
                      <p className="font-semibold">{`Tên giảng viên: ${item?.nguoiTao?.hoTen}`}</p>
                      <p>{`Ngày tạo: ${item?.ngayTao} - lượt xem: ${item?.luotXem}`}</p>
                      <button
                        className="hover:bg-red-500 border border-solid w-full mt-2"
                        onClick={() => {
                          handleCancelLesson(item.maKhoaHoc);
                        }}
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default KhoaHocCuaUser;
