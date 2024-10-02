import React, { useEffect, useState } from "react";
import "./../../scss/pages/_Home.scss";
import { quanLyKhoaHoc } from "../../services/quanLyKhoaHoc.service";
import { Link } from "react-router-dom";
import { path } from "../../common/path";
import "./../../scss/pages/_DanhMucKhoaHocList.scss";
import Banner from "../../components/Banner/Banner";

const Home = () => {
  const item = ["java", "front", "react", "fullstack", "ui"];
  const randomItem = item[Math.floor(Math.random() * item.length)];
  const [khoaHoc, setKhoaHoc] = useState([]);
  useEffect(() => {
    quanLyKhoaHoc
      .layDanhSachKhoaHoc(randomItem)
      .then((res) => {
        setKhoaHoc(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div className="mt-5">
        <div className="my-5 c">
          <Banner />
        </div>
        <h1 className="text-center text-3xl font-bold">
          Khóa học hot nhất hiện nay
        </h1>
        <div className="listLesson">
          <div className="container">
            <div className="flex flex-wrap gap-5 justify-center items-center">
              {khoaHoc.map((item, index) => {
                return (
                  <Link
                    to={`${path.khoaHocDetail}/${item?.maKhoaHoc}`}
                    key={index}
                    className="listLesson_item border border-gray-300 rounded-lg mt-5 flex flex-col max-w-[367px] max-h-[500px]"
                  >
                    <img
                      src={item?.hinhAnh}
                      alt="item"
                      className="border border-b-gray-300 "
                      style={{
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                      }}
                    />
                    <div className="flex flex-col p-5 justify-between">
                      <div>
                        <h2 className="text-xl font-bold ">{`${item?.tenKhoaHoc} `}</h2>
                        <h2>{`Mã khóa học : ${item.maKhoaHoc}`}</h2>
                      </div>
                      <p className="font-semibold">{`Tên giảng viên: ${item?.nguoiTao?.hoTen}`}</p>
                      <p>{`Ngày tạo: ${item?.ngayTao} - lượt xem: ${item?.luotXem}`}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
