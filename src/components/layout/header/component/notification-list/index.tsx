import React from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import { convertFileUrl, formatToDateTime } from '@/utils';
import { Badge, Empty, Skeleton } from 'antd';

function NotificationList({ notificationList, loading, changeReadStatus }) {
  const handleNavigate = (item) => {
    if (item?.objectType == 1) {
      window.open(`/questions/${item?.objectId}`);
    }
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

  const renderEmpty = () => {
    return (
      <div className={styles.empty}>
        <Empty description={'暂无通知'} image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );
  };
  const renderNotification =
    notificationList.length > 0
      ? notificationList?.map((item) => {
          return (
            <Badge dot={!hasRead(item)} offset={[-12, 6]} key={item?.id}>
              <div className={styles.item} onClick={handleNavigate.bind(null, item)}>
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
        })
      : renderEmpty();

  const renderSkeleton = () => {
    return (
      <>
        <div className={styles.item}>
          <Skeleton avatar paragraph={{ rows: 2 }} title={false} />
        </div>
        <div className={styles.item}>
          <Skeleton avatar paragraph={{ rows: 2 }} title={false} />
        </div>
        <div className={styles.item}>
          <Skeleton avatar paragraph={{ rows: 2 }} title={false} />
        </div>
      </>
    );
  };

  return <div className={styles.container}>{loading ? renderSkeleton() : renderNotification}</div>;
}

export default NotificationList;
