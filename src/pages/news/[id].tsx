import React from 'react';
import styles from './id.module.scss';
import { globalConfig } from '@/globalConfig';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { formatToDateTime } from '@/utils';
import { Image } from 'antd';

function NewsDetailPage({ item }) {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.cover}>
          <Image
            src={item?.cover || 'https://thumb.photo-ac.com/56/564d7708097fcf9e3afc35d896da492d_t.jpeg'}
            width='100%'
            height={400}
            alt=''
          />
        </div>
        <div className={styles.title}>{item?.title}</div>
        <div className={styles.info}>
          <div className={styles.comeFrom}>{item.comeFrom}</div>
          <div className={styles.date}>{formatToDateTime(item?.createdTime)}</div>
          <div className={styles.view}>阅读 {item.viewCount}</div>
        </div>
        <div>{item?.content}</div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const id = params?.id;
  let appEnv = process.env.APP_ENV;
  let baseUrl = appEnv === 'development' ? globalConfig.devBaseUrl : globalConfig.prodBaseUrl;
  const res = await axios(`${baseUrl}/news/detail/${id}`, {
    method: 'GET',
  });
  console.log('res', res);

  return {
    props: {
      item: res?.data?.data || {},
    },
  };
};
export default NewsDetailPage;
