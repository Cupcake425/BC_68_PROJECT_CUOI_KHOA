import { http } from "./config";

export const quanLyKhoaHoc = {
  layDanhSachKhoaHocOnAdmin: (maNhom) => {
    return http.get(`/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${maNhom}`);
  },
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
  dangKyKhoaHoc: (data, token) => {
    return http.post(`/QuanLyKhoaHoc/DangKyKhoaHoc`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  huyKhoaHoc: (data) => {
    return http.post(`/QuanLyKhoaHoc/HuyGhiDanh`, data);
  },
  ghiDanhKhoaHoc: (data) => {
    return http.post(`/QuanLyKhoaHoc/GhiDanhKhoaHoc`, data);
  },
  removeCourse: (MaKhoaHoc) => {
    return http.delete(`/QuanLyKhoaHoc/XoaKhoaHoc?maKhoaHoc=${MaKhoaHoc}`);
  },
  updateCourseInformation: (data) => {
    return http.put("/QuanLyKhoaHoc/CapNhatKhoaHoc", data);
  },
  addCourse: (data) => {
    return http.post("/QuanLyKhoaHoc/ThemKhoaHoc", data);
  },
  layMaDanhMucKhoaHoc: () => {
    return http.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
  },
};
