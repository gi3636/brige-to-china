import React from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import { convertFileUrl, formatToDateTime } from '@/utils';

function NotificationList({ notificationList }) {
  const convertContent = (item) => {
    // 1 是问题
    if (item?.objectType == 1) {
      return `我的问题-${item.question.title}`;
    }
    return '';
  };
  const renderNotification = notificationList?.map((item) => {
    return (
      <div className={styles.item} key={item?.id}>
        <div className={styles.avatar}>
          <Image src={convertFileUrl(item.senderAvatar)} alt='' width={40} height={40} />
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            <span>{item.senderName}</span> {item.actionName}了 {convertContent(item)}
          </div>
          <div className={styles.date}>{formatToDateTime(item.createdTime)}</div>
        </div>
      </div>
    );
  });

  return <div className={styles.container}>{renderNotification}</div>;
}

export default NotificationList;
