import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { quanLyKhoaHoc } from "../../services/quanLyKhoaHoc.service";
import "./../../scss/pages/_DanhMucKhoaHocList.scss";
import { path } from "../../common/path";

const DanhMucKhoaHocList = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [listLesson, setListLesson] = useState([]);
  let maDanhMuc = searchParam.get("ma-danh-muc");
  useEffect(() => {
    quanLyKhoaHoc
      .layKhoaHocTheoTenDanhMuc(maDanhMuc)
      .then((res) => {
        setListLesson(res.data);
      })
      .catch((err) => console.log(err));
  }, [maDanhMuc]);
  return (
    <div className="listLesson">
      <div className="container">
        <div className="grid grid-cols-4 gap-5">
          {listLesson.map((item, index) => {
            return (
              <Link
                to={`${path.khoaHocDetail}/${item?.maKhoaHoc}`}
                key={index}
                className="listLesson_item border border-gray-300 rounded-lg mt-5 flex flex-col"
              >
                <img
                  src={item?.hinhAnh}
                  alt="item"
                  className="border border-b-gray-300"
                />
                <div className="flex flex-col p-5 justify-between">
                  <div>
                    <h2 className="text-xl font-bold">{`${item?.tenKhoaHoc} `}</h2>
                    <h2>{`Mã khóa học : ${item.maKhoaHoc}`}</h2>
                  </div>
                  <p className="my-2 max-h-24 overflow-hidden text-ellipsis">
                    {item?.moTa}
                  </p>
                  <p className="font-semibold">{`Tên giảng viên: ${item?.nguoiTao?.hoTen}`}</p>
                  <p>{`Ngày tạo: ${item?.ngayTao} - lượt xem: ${item?.luotXem}`}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DanhMucKhoaHocList;
