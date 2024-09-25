import React, { useContext, useEffect, useState } from "react";
import "./../../scss/pages/_Header.scss";
import { Link } from "react-router-dom";
import { path } from "../../common/path";
import { quanLyKhoaHoc } from "../../services/quanLyKhoaHoc.service";
import SearchForm from "../SearchForm/SearchForm";
import { isLoginContext } from "../../App";
import { Dropdown, Space } from "antd";
const Header = () => {
  const [khoaHoc, setKhoaHoc] = useState([]);
  const { isLogin } = useContext(isLoginContext);
  useEffect(() => {
    quanLyKhoaHoc
      .layDanhMucKhoaHoc()
      .then((res) => {
        setKhoaHoc(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const items = [
    {
      key: "1",
      label: <Link to={path.userInfo}>Xem thông tin cá nhân</Link>,
    },
    {
      key: "2",
      label: <Link to={path.userLessonResgister}>Khóa học của tôi</Link>,
    },
    {
      key: "3",
      label: (
        <button
          onClick={() => {
            localStorage.removeItem("userData");
            window.location.reload();
          }}
        >
          Log out
        </button>
      ),
    },
  ];
  const renderSignInSignUp = () => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (isLogin || user)
      return (
        <Space direction="vertical" className="me-5">
          <Space wrap>
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomRight"
            >
              <div className="pe-8 text-orange-500 font-semibold text-xl">
                <span className="cursor-pointer">Hello {user?.hoTen}</span>
              </div>
            </Dropdown>
          </Space>
        </Space>
      );
    else {
      return (
        <div className="header_navbar space-x-2 lg:space-x-3 xl:space-x-5">
          <Link to={path.login} className="header_login">
            Login
          </Link>
          <Link to={path.signUp} className="header_signup">
            Sign Up
          </Link>
        </div>
      );
    }
  };
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
            {renderSignInSignUp()}
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
