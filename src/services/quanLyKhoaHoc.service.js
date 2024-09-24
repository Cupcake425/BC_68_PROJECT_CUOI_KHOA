import { http } from "./config";

export const quanLyKhoaHoc = {
  layDanhSachKhoaHoc: (data) => {
    return http.get(
      `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${data}&MaNhom=GP01`
    );
  },
  layDanhMucKhoaHoc: () => {
    return http.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
  },
  layKhoaHocTheoTenDanhMuc: (data) => {
    return http.get(
      `/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${data}&MaNhom=GP01`
    );
  },
  layThongTinKhoaHoc: (data) => {
    return http.get(`/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${data}`);
  },
  dangKyKhoaHoc: (token, data) => {
    return http.post(`/QuanLyKhoaHoc/DangKyKhoaHoc`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  huyKhoaHoc: (token, data) => {
    return http.post(`/QuanLyKhoaHoc/HuyGhiDanh`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
