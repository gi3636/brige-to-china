import React from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import MetalImage from '../../../../public/images/medal.png';
import { formatToDateTime } from '@/utils';

function BestAnswerItem({ item }) {
  console.log('item', item);
  return (
    <div className={styles.bestAnswerItem}>
      <Image className={styles.bg} src={MetalImage} width={40} height={40} alt={''} />
      <div className={styles.bestTag}>【最佳答案】【置顶】</div>
      <div className={styles.bestAnswerContainer}>
        <div className={styles.bestAnswerHeader}>
          <div className={styles.avatar}>
            <Image src={item?.avatar} alt='' width={40} height={40} />
          </div>
          <div className={styles.author}>{item?.nickname || '测试'}</div>
          <div className={styles.date}>{formatToDateTime(item?.createdTime)}</div>
        </div>
        <div className={styles.content}>{item?.content}</div>
      </div>
    </div>
  );
}

export default BestAnswerItem;
