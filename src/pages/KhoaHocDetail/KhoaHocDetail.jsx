import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { quanLyKhoaHoc } from "../../services/quanLyKhoaHoc.service";
import { path } from "../../common/path";

const KhoaHocDetail = () => {
  const [khoaHoc, setKhoaHoc] = useState();

  const { id } = useParams();

  useEffect(() => {
    quanLyKhoaHoc
      .layThongTinKhoaHoc(id)
      .then((res) => {
        setKhoaHoc(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="container">
      <div className="mt-5">
        <Link
          className="hover:text-orange-500"
          to={`${path.danhMucKhoaHoc}?ma-danh-muc=${khoaHoc?.danhMucKhoaHoc?.maDanhMucKhoahoc}&ma-nhom=GP01`}
        >
          {khoaHoc?.danhMucKhoaHoc?.tenDanhMucKhoaHoc}
        </Link>
        <span> &gt; {khoaHoc?.biDanh}</span>
      </div>
      <h1 className="text-5xl mt-5 font-bold">{khoaHoc?.tenKhoaHoc}</h1>
      <img src={khoaHoc?.hinhAnh} alt="hinhAnh" className="w-full mt-5" />
      <p className="mt-5 text-xl">{khoaHoc?.moTa}</p>
    </div>
  );
};

export default KhoaHocDetail;
