import React from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import { EllipsisIcon } from '@/components/icons/EllipsisIcon';
import { colors } from '@/styles/colors';
import { formatToDateTime } from '@/utils';

function CommentItem({ item }) {
  return (
    <div className={styles.commentItem}>
      <div className={styles.commentHeader}>
        <Image
          style={{ borderRadius: '50%' }}
          src='http://img.headjia.com/2022/0528205227134881.jpg'
          alt=''
          width={40}
          height={40}
        />
        <div className={styles.name}>{item?.nickname}</div>
        <div className={styles.toolBtn}>
          <EllipsisIcon width={23} height={23} color={colors.iconDefaultColor} />
        </div>
      </div>
      <div className={styles.commentBody}>
        <div className={styles.commentContent}>{item?.content}</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className={styles.time}>{formatToDateTime(item?.updatedTime)}</div>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
