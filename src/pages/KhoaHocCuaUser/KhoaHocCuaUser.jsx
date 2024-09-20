import React, { useEffect, useState } from "react";
import { userService } from "../../services/user.service";
import { useSelector } from "react-redux";

const KhoaHocCuaUser = () => {
  const [listKhoaHoc, setListKhoaHoc] = useState([]);
  const { user } = useSelector((state) => state.authSlice);

  useEffect(() => {
    userService
      .LayDanhSachKhoaHocChoXetDuyet(user.accessToken)
      .then((res) => {
        console.log(res);
        // setListKhoaHoc(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="my-5">
      <h1 className="text-center text-3xl font-bold">
        Các khóa học đã tham gia
      </h1>
    </div>
  );
};

export default KhoaHocCuaUser;
