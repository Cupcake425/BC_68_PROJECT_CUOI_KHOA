import { http } from "./config";

export const authService = {
  signup: (data) => {
    return http.post("/QuanLyNguoiDung/DangKy", data);
  },
  signin: (data) => {
    return http.post("/QuanLyNguoiDung/DangNhap", data);
  },
};
