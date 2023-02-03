import React, { useEffect, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './index.module.scss';
import { Navigation } from 'swiper';

const SchoolSwiper: React.FunctionComponent = () => {
  const schoolList = [
    { name: '武汉大学', img: 'whu.png' },
    { name: '人民大学', img: 'rmu.png' },
    { name: '清华大学', img: 'thu.png' },
    { name: '北京大学', img: 'pku.png' },
    { name: '北京航空航天大学', img: 'bhu.png' },
  ];

  const renderSchoolList = useMemo(() => {
    return schoolList.map((item, index) => (
      <SwiperSlide key={index}>
        <div className={styles.schoolItem}>
          <img src={`/school-logo/${item?.img}`} alt='' width={150} height={150} />
          <div className={styles.schoolName}>{item.name}</div>
        </div>
      </SwiperSlide>
    ));
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--swiper-theme-color', 'black');
    document.documentElement.style.setProperty('--swiper-navigation-size', '30px');
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <img src='/icon/school.png' width={40} height={30} alt='' style={{ paddingRight: 10 }} />
        <div className={styles.tittle}>中国大学介绍</div>
      </div>
      <Swiper
        slidesPerView={4}
        loop={true}
        speed={300}
        modules={[Navigation]}
        navigation
        pagination={{
          clickable: true,
        }}
        className={styles.swiper}>
        {renderSchoolList}
      </Swiper>
      <div className={styles.button}>查看更多</div>
    </div>
  );
};

export default SchoolSwiper;
