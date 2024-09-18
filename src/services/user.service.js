import { http } from "./config";

export const userService = {
  updateUser: (data) => {
    return http.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data, {
      headers: {
        Authorization:
          "Bearer  " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibmdvY2hhMTY3NyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkhWIiwibmJmIjoxNzI2NDc5MDI1LCJleHAiOjE3MjY0ODI2MjV9.EdNL0DvsXkFSMZs2z7-yxDnjYzRzCOpGi8rDy-HoTqs",
      },
    });
  },
};
