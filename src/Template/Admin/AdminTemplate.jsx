import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, Skeleton, Space, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { path } from "../../common/path";
const { Header, Sider, Content } = Layout;
const AdminTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items = [
    {
      key: "1",
      label: <Link to={path.adminInfor}>Xem thông tin cá nhân</Link>,
    },
    {
      key: "2",
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
  const [userInfor, setUserInfor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("userData"));
    if (localUser) {
      setUserInfor(localUser);
      setIsAdmin(true);
    } else if (!localUser) {
      setTimeout(() => navigate("/login"), 2000);
    } else if (localUser?.maLoaiNguoiDung !== "GV") {
      setTimeout(() => navigate("/"), 2000);
    }
  }, []);

  if (!isAdmin) return <Skeleton active />;
  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: <Link to={path.listUser}>Người dùng</Link>,
            },
            {
              key: "2",
              icon: <ApartmentOutlined />,
              label: (
                <Link to={"/admin/course-management"}>Quản lý khóa học</Link>
              ),
            },
            {
              key: "3",
              icon: <VideoCameraOutlined />,
              label: <Link to={path.createUser}>Thêm người dùng</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="flex justify-between"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          {userInfor ? (
            <Space direction="vertical" className="me-5">
              <Space wrap>
                <Dropdown
                  menu={{
                    items,
                  }}
                  placement="bottomRight"
                >
                  <div className="pe-8 text-orange-500 font-semibold text-xl">
                    <span className="cursor-pointer">
                      Hello {userInfor?.hoTen}
                    </span>
                  </div>
                </Dropdown>
              </Space>
            </Space>
          ) : null}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminTemplate;
