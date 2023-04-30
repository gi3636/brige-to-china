import React, { useEffect, useState } from 'react';
import styles from '@/pages/news/index.module.scss';
import { Segmented, Skeleton } from 'antd';
import NewsItem from '@/page-components/news/news-item';
import useRequest from '@/hooks/useRequest';
import { SwiperSlide } from 'swiper/react';
import { getNewsList } from '@/api/news';

function NormalZone(props) {
  const { run, loading } = useRequest();
  const [type, setType] = useState(2);
  const [page, setPage] = useState(1);
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    loadNewsList();
  }, [page, type]);

  const loadNewsList = () => {
    run(getNewsList({ currentPage: page, type: type, pageSize: 10 })).then((res) => {
      console.log('res', res);
      if (res?.code != 200) {
        return;
      }
      setNewsList(res?.data?.list || []);
    });
  };

  const renderNewsList = () => {
    return newsList.map((item, index) => {
      return <NewsItem item={item} key={index} />;
    });
  };

  return (
    <div className={styles.normalZone}>
      <div className={styles.title}>资讯列表</div>
      <div className={styles.navigation}>
        <Segmented
          value={type}
          size={'large'}
          onChange={(value) => {
            setType(+value);
          }}
          options={[
            {
              label: '最新',
              value: 2,
            },
            {
              label: '热门',
              value: 1,
            },
          ]}
        />
      </div>
      {loading ? (
        <div style={{ display: 'flex', gap: 20, padding: 20 }}>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </div>
      ) : (
        <div className={styles.newsList}>{renderNewsList()}</div>
      )}
    </div>
  );
}

export default NormalZone;
