import React from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import { EllipsisIcon } from '@/components/icons/EllipsisIcon';
import { colors } from '@/styles/colors';
import { formatToDateTime } from '@/utils';
import { LikeOutlined } from '@ant-design/icons';
import { emitter } from '@/utils/app-emitter';

function CommentItem({ item }) {
  const handleShowReply = () => {
    emitter.fire('showReplyInput', item);
  };

  return (
    <div className={styles.commentItem}>
      <div className={styles.commentHeader}>
        <Image
          style={{ borderRadius: '50%' }}
          src={item?.avatar || '/images/default-avatar.png'}
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
        <div className={styles.actionContainer}>
          <div className={styles.actionItem}>
            <LikeOutlined height={14} width={14} color={colors.iconDefaultColor} />
            <span className={styles.count}>{item?.likeCount}</span>
          </div>
          <div className={styles.reply} onClick={handleShowReply}>
            回复
          </div>
          <div className={styles.time}>{formatToDateTime(item?.updatedTime)}</div>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
