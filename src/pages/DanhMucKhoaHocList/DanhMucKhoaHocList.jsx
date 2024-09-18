import React, { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { quanLyKhoaHoc } from "../../services/quanLyKhoaHoc.service";
import "./../../scss/pages/_DanhMucKhoaHocList.scss";
import { path } from "../../common/path";
import { useSelector } from "react-redux";
import { NotificationContext } from "../../App";

const DanhMucKhoaHocList = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [listLesson, setListLesson] = useState([]);
  let maDanhMuc = searchParam.get("ma-danh-muc");
  const { user } = useSelector((state) => state.authSlice);
  console.log(user);
  const { handleNotification } = useContext(NotificationContext);
  useEffect(() => {
    quanLyKhoaHoc
      .layKhoaHocTheoTenDanhMuc(maDanhMuc)
      .then((res) => {
        setListLesson(res.data);
      })
      .catch((err) => console.log(err));
  }, [maDanhMuc]);
  const handleResisterLesson = (maKhoaHoc) => {
    const registrationData = {
      taiKhoan: user?.taiKhoan,
      maKhoaHoc: maKhoaHoc,
    };
    quanLyKhoaHoc
      .dangKyKhoaHoc(user?.accessToken, registrationData)
      .then((res) => {
        console.log(res);
        handleNotification("Đăng ký khóa học thành công!", "success");
      })
      .catch((err) => {
        console.log(err);
        handleNotification(err.message, "error");
      });
  };
  return (
    <div className="listLesson">
      <div className="container">
        <div className="grid grid-cols-4 gap-5">
          {listLesson.map((item, index) => {
            return (
              <div>
                <Link
                  to={`${path.khoaHocDetail}/${item?.maKhoaHoc}`}
                  key={index}
                  className="listLesson_item border border-gray-300 rounded-lg mt-5 flex flex-col"
                >
                  <img
                    src={item?.hinhAnh}
                    alt="item"
                    className="border border-b-gray-300"
                    style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                  />
                  <div className="flex flex-col p-5 justify-between">
                    <div>
                      <h2 className="text-xl font-bold">{`${item?.tenKhoaHoc} `}</h2>
                      <h2>{`Mã khóa học : ${item.maKhoaHoc}`}</h2>
                    </div>
                    <p className="font-semibold">{`Tên giảng viên: ${item?.nguoiTao?.hoTen}`}</p>
                    <p>{`Ngày tạo: ${item?.ngayTao} - lượt xem: ${item?.luotXem}`}</p>
                  </div>
                </Link>
                <button
                  className="hover:bg-green-500 border border-solid w-full"
                  onClick={() => {
                    handleResisterLesson(item.maKhoaHoc);
                  }}
                >
                  Đăng ký
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DanhMucKhoaHocList;
