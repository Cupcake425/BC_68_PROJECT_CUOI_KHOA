import { data } from "autoprefixer";
import { http } from "./config";

export const userService = {
  updateUser: (token, data) => {
    return http.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getAllUser: (maNhom = "GP01") => {
    return http.get(`/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}`);
  },
  addUser: (token, data) => {
    return http.post(`/QuanLyNguoiDung/ThemNguoiDung`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  layDanhSachHocVienChoXacThuc: (data) => {
    return http.post("/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet", data);
  },
  layDanhSachNguoiDungChuaGhiDanh: () => {
    return http.post("/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh", {
      MaKhoaHoc: JSON.parse(localStorage.getItem("maKhoaHoc")),
    });
  },
  layDanhSachHocVienDaGhiDanh: (data) => {
    return http.post("/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc", data);
  },
  deleteUser: (id, token) => {
    return http.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  ghiDanhHocVienOnSearch: (data) => {
    return http.post("/QuanLyKhoaHoc/GhiDanhKhoaHoc", data);
  },
  cancelJoin: (data) => {
    return http.post("/QuanLyKhoaHoc/HuyGhiDanh", data);
  },
  LayDanhSachKhoaHocChoXetDuyet: (data) => {
    return http.post(`/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet`, data);
  },
  LayDanhSachKhoaHocChuaGhiDanh: (TaiKhoan, token, data) => {
    return http.post(
      `/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${TaiKhoan}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  LayDanhSachKhoaHocDaXetDuyet: (token, data) => {
    return http.post(`/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
