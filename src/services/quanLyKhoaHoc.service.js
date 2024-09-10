import { http } from "./config";

export const quanLyKhoaHoc = {
  layDanhMucKhoaHoc: () => {
    return http.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
  },
  layKhoaHocTheoTenDanhMuc: (data) => {
    return http.get(
      `/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${data}&MaNhom=GP01`
    );
  },
};
