import React, { useEffect, useState } from "react";
import IconSearch from "../Icon/IconSearch";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "antd";
import useDebounce from "../../hooks/useDebounce";
import { path } from "../../common/path";
import { quanLyKhoaHoc } from "../../services/quanLyKhoaHoc.service";
const SearchForm = ({ className }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [checkDropdown, setCheckDropdown] = useState(false);
  const [listLessonSuggest, setListLessonSuggest] = useState([]);
  const deBounceValue = useDebounce(search, 500);
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`${path.timKiemKhoaHoc}?tenKhoaHoc=${search}`);
  };
  const handleChange = (event) => {
    setSearch(event.target.value);
    if (event.target.value) {
      setCheckDropdown(true);
    } else {
      setCheckDropdown(false);
    }
  };

  useEffect(() => {
    const clickTurnOff = (event) => {
      if (!event.target.closest("dropdown-container")) {
        setCheckDropdown(false);
      }
    };
    document.addEventListener("click", clickTurnOff);
    return () => {
      document.removeEventListener("click", clickTurnOff);
    };
  }, []);

  useEffect(() => {
    if (search) {
      quanLyKhoaHoc
        .layDanhSachKhoaHoc(search)
        .then((res) => {
          const newListLessonSuggest = res.data
            .slice(0, 4)
            .map((item, index) => {
              return {
                key: index,
                label: (
                  <Link
                    to={`${path.khoaHocDetail}/${item?.maKhoaHoc}`}
                    className="flex items-center space-x-4"
                  >
                    <img src={item?.hinhAnh} className="h-14" alt="" />
                    <div>
                      <h4>{item?.tenKhoaHoc}</h4>
                    </div>
                  </Link>
                ),
              };
            });
          setListLessonSuggest(newListLessonSuggest);
          setCheckDropdown(true);
        })
        .catch((err) => console.log(err));
    }
  }, [deBounceValue]);

  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <Dropdown
          menu={{
            items: listLessonSuggest,
          }}
          open={checkDropdown}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="pl-4 rounded border bg-white border-gray-400 flex items-center justify-between min-w-[100px] md:min-w-72 lg:min-w-96 "
          >
            <input
              type="text"
              placeholder="Search for your course ..."
              className="flex-1 focus:border-none focus:outline-none"
              onChange={handleChange}
              onFocus={() => search && setCheckDropdown(true)}
              value={search}
            />
            <button type="submit" className="p-2">
              <IconSearch size={30} color="rgb(156 163 175)" />
            </button>
          </div>
        </Dropdown>
      </form>
    </div>
  );
};

export default SearchForm;
