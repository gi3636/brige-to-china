import React from 'react';
import styles from './index.module.scss';
import { Image } from 'antd';
import { CalendarIcon } from '@/components/icons/CalendarIcon';
import { colors } from '@/styles/colors';
import { EyeOutlined } from '@ant-design/icons';
import { formatToDateTime } from '@/utils';
import Link from 'next/link';
function NewsItem({ item }) {
  return (
    <div className={styles.newsBox}>
      <div className={styles.cover}>
        <Image
          src={item?.cover || 'https://thumb.photo-ac.com/56/564d7708097fcf9e3afc35d896da492d_t.jpeg'}
          width='100%'
          height={200}
          alt=''
        />
      </div>
      <Link
        style={{ textDecoration: 'none', color: '#000' }}
        href={{
          pathname: '/news/[id]',
          query: {
            id: item?.id,
          },
        }}
        target='_blank'>
        <div className={styles.infoBox}>
          <div className={styles.dateBox}>
            <CalendarIcon width={20} height={20} color={colors.iconDefaultColor} />
            <div className={styles.date}>{formatToDateTime(item?.createdTime)}</div>
          </div>
          <div className={styles.viewBox}>
            <EyeOutlined width={18} height={18} style={{ color: colors.iconDefaultColor }} />
            <div className={styles.count}>{item?.viewCount}</div>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.title}>{item?.title}</div>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: item.content }}></div>
          <div className={styles.comeFrom}>{`来源：${item?.comeFrom}` || '来源：微信公众号'}</div>
        </div>
      </Link>
    </div>
  );
}

export default NewsItem;
