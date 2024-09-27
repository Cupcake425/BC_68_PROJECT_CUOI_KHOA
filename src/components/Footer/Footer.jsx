import React, { useEffect, useState } from "react";
import "./../../scss/pages/_Footer.scss";
import { Link } from "react-router-dom";
import { path } from "../../common/path";
import { quanLyKhoaHoc } from "../../services/quanLyKhoaHoc.service";

const Footer = () => {
  const [khoaHoc, setKhoaHoc] = useState([]);
  useEffect(() => {
    quanLyKhoaHoc
      .layDanhMucKhoaHoc()
      .then((res) => {
        setKhoaHoc(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <footer className="mt-5">
      <div className="container">
        <div className="py-5">
          <div className="grid grid-cols-3 gap-5">
            <div>
              <Link to={path.home}>
                <img src="/Icon/Logo.png" alt="Logo" />
              </Link>
              <p className="font-semibold text-xl">
                Nơi đào tạo lập trình viên tốt nhất ở Việt Nam.
              </p>
            </div>
            <div className="footer_main_menu">
              <h3 className="font-bold text-xl">Danh mục khóa học</h3>
              <div className="flex flex-col ">
                {khoaHoc.map((item, index) => {
                  return (
                    <Link
                      to={`${path.danhMucKhoaHoc}?ma-danh-muc=${item.maDanhMuc}&ma-nhom=GP01`}
                      key={index}
                      className="my-1"
                    >
                      {item?.tenDanhMuc}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-xl">Liên lạc</h3>
              <p>
                <i className="fa-solid fa-location-dot me-3"></i>
                45 Nguyễn Khắc Nhu, Phường Cô Giang, Quận 1, Hồ Chí Minh
              </p>
              <p>
                <i className="fa-solid fa-phone me-3"></i>84 28 7105 9999
              </p>
              <p>
                <i className="fa-solid fa-envelope me-3"></i>
                elearning@edu.vn
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
