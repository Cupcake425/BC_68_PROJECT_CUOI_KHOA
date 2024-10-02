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
      .then(() => {
        handleNotification("Đăng ký khóa học thành công!", "success");
      })
      .catch((err) => {
        handleNotification(err.message, "error");
      });
  };
  return (
    <div className="listLesson">
      <div className="container">
        <div className="flex flex-wrap gap-5 justify-center items-center">
          {listLesson.map((item, index) => {
            return (
              <>
                <div
                  key={index}
                  className="listLesson_item border border-gray-300 rounded-lg mt-5 flex flex-col max-w-[367px] max-h-[550px]"
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
                    {user && (
                      <button
                        className="hover:bg-blue-200 border border-solid w-full mt-2"
                        onClick={() => {
                          handleResisterLesson(item.maKhoaHoc);
                        }}
                      >
                        Đăng ký
                      </button>
                    )}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DanhMucKhoaHocList;
