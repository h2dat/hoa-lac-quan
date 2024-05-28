import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export const Header = (props) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 500);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 500);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header id="header">
      {!isSmallScreen && (
        <div className="intro">
          <div className="container">
            <div className="col-md-8 col-md-offset-2 intro-text">
              <a
                href="#products"
                className="btn btn-custom btn-lg page-scroll"
                style={{ marginTop: "100px" }}
              >
                Order now
              </a>
            </div>
          </div>
        </div>
      )}
      {isSmallScreen && (
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          slidesPerView={1}
          spaceBetween={10}
          className="swiper-container"
        >
          <SwiperSlide><img src="img/doc1.jpg" alt="1" /></SwiperSlide>
          <SwiperSlide><img src="img/doc2.jpg" alt="2" /></SwiperSlide>
          <SwiperSlide><img src="img/doc3.jpg" alt="3" /></SwiperSlide>
          <SwiperSlide><img src="img/doc4.jpg" alt="4" /></SwiperSlide>
        </Swiper>
      )}
    </header>
  );
};
