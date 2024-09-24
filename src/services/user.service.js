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
};
