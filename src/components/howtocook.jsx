import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const Cooking = () => {
  const videoRefs = useRef([]);

  useEffect(() => {
    // Play the first video by default
    if (videoRefs.current[0]) {
      videoRefs.current[0].play();
    }
  }, []);

  const handleSlideChange = (swiper) => {
    // Pause all videos
    videoRefs.current.forEach((video) => video.pause());

    // Play the current video
    const currentIndex = swiper.activeIndex;
    if (videoRefs.current[currentIndex]) {
      videoRefs.current[currentIndex].play();
    }
  };

  return (
    <div id="cooking" className="text-center">
      <div className="container ">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Hướng dẫn pha trà</h2>
          <h3>Trọn vẹn từng hương vị</h3>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="feature-img-container">
              <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation
                autoplay={{ delay: 10000, disableOnInteraction: false }}
                onSlideChange={handleSlideChange}
                className="swiper-container-feature"
              >
                <SwiperSlide>
                  <video
                    ref={(el) => (videoRefs.current[0] = el)}
                    controls
                    muted
                    style={{ height: '75%', width: '75%' }}
                  >
                    <source src="video/cocking1.mp4" type="video/mp4" />
                  </video>
                </SwiperSlide>
                <SwiperSlide>
                  <video
                    ref={(el) => (videoRefs.current[1] = el)}
                    controls
                    muted
                    style={{ height: '75%', width: '75%' }}
                  >
                    <source src="video/cocking2.mp4" type="video/mp4" />
                  </video>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
