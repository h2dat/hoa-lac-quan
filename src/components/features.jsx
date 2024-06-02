import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const Features = (props) => {


  return (
    <div id="features" className="text-center">
      <div className="container ">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Best Seller</h2>
          <h3>Đón Tết Nhâm Thìn ở Boston</h3>
        </div>
        <div className="row">
          {props.data ? (
            <div className="col-md-12">
              <div className="feature-img-container">
                <Swiper
                  modules={[Pagination, Navigation, Autoplay]}
                  spaceBetween={50}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  navigation
                  autoplay={{ delay: 10000, disableOnInteraction: false }}
                  className="swiper-container-feature"
                >
                  {props.data.map((item, index) => (
                    <SwiperSlide key={index}>
                      <img
                        className="feature-img"
                        src={item.src}
                        alt={item.title}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </div>
  );
};
