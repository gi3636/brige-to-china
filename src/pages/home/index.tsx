import { Button, DatePicker, Divider, theme } from 'antd';
import { useEffect, useState } from 'react';
import { authService } from '@/api';
import useLanguage from '@/hooks/useLanguage';
import styles from './index.module.scss';
import Carousel from '@/components/carousel/Carousels';
import HomeQuestion from '@/page-components/home/home-question/HomeQuestion';
import SchoolSwiper from '@/page-components/home/school-swiper/SchoolSwiper';
const { useToken } = theme;

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.firstColumn}>
          <div className={styles.carouselContainer}>
            <Carousel />
          </div>
          <HomeQuestion />
        </div>
        <div className={styles.secondColumn}>第二列</div>
      </div>
      <div className={styles.schoolIntroduction}>
        <SchoolSwiper />
      </div>
    </div>
  );
}
