import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';

import 'swiper/swiper.min.css';

import styles from './Slider.module.scss';
import { SliderProps } from './types';

SwiperCore.use([Navigation, Pagination]);

const Slider: FC<SliderProps> = ({ sliderList }) => {
  return (
    <Swiper
      slidesPerView={1}
      pagination={{
        clickable: true,
      }}
      navigation
      loop
    >
      {sliderList.map((item, index) => (
        <SwiperSlide key={index.toString()}>
          <img className={styles.img} src={item} alt="hotel-card" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export { Slider };
