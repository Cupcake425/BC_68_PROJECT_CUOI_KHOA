import React, { useEffect, useState } from "react";
import "./../../scss/pages/_Header.scss";
import { Link } from "react-router-dom";
import { path } from "../../common/path";
import { quanLyKhoaHoc } from "../../services/quanLyKhoaHoc.service";
import SearchForm from "../SearchForm/SearchForm";
const Header = () => {
  const [khoaHoc, setKhoaHoc] = useState([]);
  console.log(khoaHoc);
  useEffect(() => {
    quanLyKhoaHoc
      .layDanhMucKhoaHoc()
      .then((res) => {
        setKhoaHoc(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <header className="sticky top-0 z-40">
      <div className="header_top">
        <div className="container">
          <div className="header_content flex items-center justify-between">
            <div className="header_logo flex items-center gap-3">
              <Link to={path.home}>
                <img src="/Icon/Logo.png" alt="Logo" />
              </Link>
              <SearchForm />
            </div>
            <div className="header_navbar space-x-2 lg:space-x-3 xl:space-x-5">
              <Link to={path.login} className="header_login">
                Login
              </Link>
              <Link to={path.signUp} className="header_signup">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="header_bottom">
        <hr className="w-full border-black mb-2" />
        <div className="container">
          <div className="flex items-center justify-between">
            {khoaHoc.map((item, index) => {
              return (
                <Link
                  to={`${path.danhMucKhoaHoc}?ma-danh-muc=${item.maDanhMuc}&ma-nhom=GP01`}
                  key={index}
                >
                  {item?.tenDanhMuc}
                </Link>
              );
            })}
          </div>
        </div>
        <hr className="w-full border-black mt-2" />
      </div>
    </header>
  );
};

export default Header;
