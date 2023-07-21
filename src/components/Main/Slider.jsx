import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const bannerImg = {
  width: '100%',
};
const Slider = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img style={bannerImg} src="/banner-02.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className="banner">
          <img style={bannerImg} src="/banner-01.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className="banner">
          <img style={bannerImg} src="/banner-03.jpg" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
