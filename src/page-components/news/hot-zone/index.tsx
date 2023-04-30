import React, { useEffect, useState } from 'react';
import { Image, Skeleton } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import NewsItem from '@/page-components/news/news-item';
import useRequest from '@/hooks/useRequest';
import styles from './index.module.scss';
import { getNewsList } from '@/api/news';
function HotZone(props) {
  const { run, loading } = useRequest();
  const [page, setPage] = useState(1);
  const [newsList, setNewsList] = useState([]);
  useEffect(() => {
    loadNewsList();
  }, [page]);

  const loadNewsList = () => {
    run(getNewsList({ currentPage: page, type: 3, pageSize: 10 })).then((res) => {
      if (res?.code != 200) {
        return;
      }
      setNewsList(res?.data?.list || []);
    });
  };

  const renderNewsList = () => {
    return newsList.map((item, index) => {
      return (
        <SwiperSlide className={styles.swiperItem} key={index}>
          <NewsItem item={item} />
        </SwiperSlide>
      );
    });
  };

  return (
    <div className={styles.hotZone}>
      <div className={styles.hotTitle}>
        <Image src='/images/hot.svg' width={48} height={36} alt='' style={{ paddingRight: 10 }} />
        {/*<FireIcon width={20} height={20} color='#F3972B' />*/}
        热点资讯
      </div>
      {loading ? (
        <div style={{ display: 'flex', gap: 20, padding: 20 }}>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </div>
      ) : (
        <Swiper
          className={styles.swiper}
          spaceBetween={20}
          speed={300}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={3}
          navigation
          loop
          autoplay={{ delay: 3000 }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}>
          {renderNewsList()}
        </Swiper>
      )}
    </div>
  );
}

export default HotZone;
