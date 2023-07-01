import React from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import { convertFileUrl, formatToDateTime } from '@/utils';
import { Badge } from 'antd';
import { readNotification } from '@/api/notification';

function NotificationList({ notificationList, loading, changeReadStatus }) {
  const handleRead = (item) => {
    if (item?.isRead) {
      return;
    }
    changeReadStatus(item.id);
    readNotification({
      id: item?.id,
    });
  };

  const convertContent = (item) => {
    // 1 是问题
    if (item?.objectType == 1) {
      return `我的问题-${item.question.title}`;
    }
    return '';
  };

  // 判断是否已读
  const hasRead = (item) => item.isRead;

  const renderNotification = notificationList?.map((item) => {
    return (
      <Badge dot={!hasRead(item)} offset={[-12, 6]} key={item?.id}>
        <div className={styles.item} onClick={handleRead.bind(null, item)}>
          <div className={styles.avatar}>
            <Image src={convertFileUrl(item.senderAvatar)} alt='' width={40} height={40} />
          </div>
          <div className={styles.right}>
            <div className={styles.title}>
              {item.senderName} {item.actionName}了 {convertContent(item)}
            </div>
            <div className={styles.date}>{formatToDateTime(item.createdTime)}</div>
          </div>
        </div>
      </Badge>
    );
  });

  return <div className={styles.container}>{renderNotification}</div>;
}

export default NotificationList;
