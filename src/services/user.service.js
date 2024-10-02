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
  deleteUser: (id, token) => {
    return http.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  LayDanhSachKhoaHocChoXetDuyet: (token, data) => {
    return http.post(`/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
