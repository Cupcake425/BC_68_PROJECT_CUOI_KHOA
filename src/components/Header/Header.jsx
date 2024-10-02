import React, { useContext, useEffect, useRef, useState } from "react";
import "./../../scss/pages/_Header.scss";
import { Link } from "react-router-dom";
import { path } from "../../common/path";
import { quanLyKhoaHoc } from "../../services/quanLyKhoaHoc.service";
import SearchForm from "../SearchForm/SearchForm";
import { isLoginContext } from "../../App";
import { Dropdown, Space } from "antd";
import useResponsive from "../../hooks/useResponsive";
const Header = () => {
  const [khoaHoc, setKhoaHoc] = useState([]);
  const { isLogin } = useContext(isLoginContext);
  const isResponsive = useResponsive({
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
  });
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    quanLyKhoaHoc
      .layDanhMucKhoaHoc()
      .then((res) => {
        setKhoaHoc(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        let sideBar = document.querySelector(".sidebar_wrapper");
        sideBar.style.display = "none";
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
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
            localStorage.removeItem("accessToken");
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
              {isResponsive.lg && (
                <>
                  <button
                    ref={buttonRef}
                    onClick={() => {
                      let sideBar = document.querySelector(".sidebar_wrapper");

                      sideBar.style.display = "block";
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="19"
                      viewBox="0 0 23 19"
                    >
                      <rect
                        y="16"
                        width="23"
                        height="3"
                        rx="1.5"
                        fill="#555"
                      ></rect>
                      <rect width="23" height="3" rx="1.5" fill="#555"></rect>
                      <rect
                        y="8"
                        width="23"
                        height="3"
                        rx="1.5"
                        fill="#555"
                      ></rect>
                    </svg>
                  </button>
                  <div
                    className="sidebar_wrapper self-start"
                    style={{ display: "none" }}
                  >
                    <div
                      ref={sidebarRef}
                      className="sidebar fixed top-0 left-0 h-full !m-0 space-y-4"
                    >
                      <SearchForm />
                      <div
                        className={` flex flex-col mt-1 container space-y-4 `}
                      >
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
                    <div className="sidebar_overlay"></div>
                  </div>
                </>
              )}
              <Link to={path.home}>
                <img src="/Icon/Logo.png" alt="Logo" />
              </Link>
              {!isResponsive.lg && <SearchForm />}
            </div>
            {renderSignInSignUp()}
          </div>
        </div>
      </div>
      {!isResponsive.lg && (
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
      )}
    </header>
  );
};

export default Header;
