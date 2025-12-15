import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./slider.scss";

// import required modules
import { Navigation } from "swiper/modules";

export default function Slider() {
  const natureImages = {
    set1: {
      snow: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
      jungle: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      night: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      minimal: "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
      landscape: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    },
    set2: {
      snow: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      jungle: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      night: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
      minimal: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
      landscape: "https://images.unsplash.com/photo-1431794062232-2a99a5431c6c",
    },
  };
  const returnSet = (set) => {
    return Object.entries(natureImages[set]);
  };

  const slides = returnSet("set1");

  return (
    <>
      <Swiper
        loop={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {/* {slides.map((slide, index) => (
          <SwiperSlide key={index + 1}>
            <img className="slide__image" src={slide[1]} alt={slide[0]} />
          </SwiperSlide>
        ))} */}
        <SwiperSlide>
          <div className="bg-blue-500 text-white p-12 text-center text-2xl h-full flex items-center justify-center">
            Slide 1
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-green-500 text-white p-12 text-center text-2xl h-full flex items-center justify-center">
            Slide 2
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-purple-500 text-white p-12 text-center text-2xl h-full flex items-center justify-center">
            Slide 3
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
