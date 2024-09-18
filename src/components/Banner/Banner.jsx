import React from "react";
import "../../scss/pages/_Banner.scss";
import useResponsive from "../../hooks/useResponsive";

const Banner = () => {
  const isResponsive = useResponsive({
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
  });
  return (
    <div className="banner">
      <div className="container">
        <div className="banner_bg flex justify-center items-center">
          {isResponsive.lg && (
            <h1 className="text-4xl sm:text-5xl text-center mt-5 font-bold">
              Trang web dạy e-learning tốt nhất hiện nay
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
