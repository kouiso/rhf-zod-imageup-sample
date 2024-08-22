import React from "react";
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SlideContent: React.FC = () => {
  const swiperSlide = useSwiperSlide();
  return (
    <div>
      <p>{swiperSlide.isActive ? "Active Slide" : "Inactive Slide"}</p>
      <img src="https://via.placeholder.com/600x400" alt="Slide" />
    </div>
  );
};

const SlideNextButton: React.FC = () => {
  const swiper = useSwiper();
  return <button onClick={() => swiper.slideNext()}>Next Slide</button>;
};

export const SwipePage: React.FC = () => {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <SlideContent />
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent />
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent />
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent />
        </SwiperSlide>
      </Swiper>
      <SlideNextButton />
    </div>
  );
};
