import { createBrowserRouter, Outlet } from "react-router-dom";
import { path } from "../common/path";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import DanhMucKhoaHocList from "../pages/DanhMucKhoaHocList/DanhMucKhoaHocList";
import KhoaHocDetail from "../pages/KhoaHocDetail/KhoaHocDetail";
import TimKiemKhoaHoc from "../pages/TimKiemKhoaHoc/TimKiemKhoaHoc";
import UserInformation from "../pages/UserInformation/UserInformation";
import KhoaHocCuaUser from "../pages/KhoaHocCuaUser/KhoaHocCuaUser";
import AdminTemplate from "../Template/Admin/AdminTemplate";
import ListUser from "../pages/ListUser/ListUser";
import CreateUser from "../pages/CreateUser/CreateUser";
import QuanLyKhoaHoc from "../pages/QuanLyKhoaHoc/QuanLyKhoaHoc";

const useRouter = () => {
  const Layout = () => {
    return (
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: path.home,
      element: <Layout />,
      children: [
        { path: path.home, element: <Home /> },
        { path: path.login, element: <Login /> },
        { path: path.signUp, element: <SignUp /> },
        { path: path.danhMucKhoaHoc, element: <DanhMucKhoaHocList /> },
        { path: `${path.khoaHocDetail}/:id`, element: <KhoaHocDetail /> },
        { path: path.timKiemKhoaHoc, element: <TimKiemKhoaHoc /> },
        { path: path.userInfo, element: <UserInformation /> },
        { path: path.userLessonResgister, element: <KhoaHocCuaUser /> },
      ],
    },
    {
      path: path.admin,
      element: <AdminTemplate />,
      children: [
        { path: path.listUser, element: <ListUser /> },
        { path: path.quanLyKhoaHoc, element: <QuanLyKhoaHoc /> },
        { path: path.createUser, element: <CreateUser /> },
      ],
    },
  ]);
  return router;
};

export default useRouter;
