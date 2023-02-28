import React from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import { EllipsisIcon } from '@/components/icons/EllipsisIcon';
import { colors } from '@/styles/colors';

function CommentItem(props) {
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
        <div className={styles.name}>名字</div>
        <div className={styles.toolBtn}>
          <EllipsisIcon width={23} height={23} color={colors.iconDefaultColor} />
        </div>
      </div>
      <div className={styles.commentBody}>
        <div className={styles.commentContent}>请问可以分享一下留学经验吗？</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className={styles.time}>2022-12-18 13:46</div>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
