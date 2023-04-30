import React from 'react';
import styles from './index.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import HotZone from '@/page-components/news/hot-zone';
import NormalZone from '@/page-components/news/normal-zone';

function NewsPage(props) {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <HotZone />
        <NormalZone />
      </div>
    </div>
  );
}

export default NewsPage;
