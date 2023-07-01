import React from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import { convertFileUrl, formatToDateTime } from '@/utils';
import { useDispatch } from 'react-redux';
import { addDialogItem } from '@/store/dialog/slice';
import { Badge, Empty, Skeleton, Spin } from 'antd';

function DialogList({ dialogList, loading }) {
  const dispatch = useDispatch();
  const handleClick = (item) => {
    dispatch(addDialogItem(item));
  };

  const renderEmpty = () => {
    return (
      <div className={styles.empty}>
        <Empty description={'暂无消息'} image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );
  };

  const renderDialogList =
    dialogList.length > 0
      ? dialogList?.map((item) => {
          return (
            <>
              {dialogList.length === 0 ? (
                <div className={styles.noData}>暂无消息</div>
              ) : (
                <div className={styles.item} key={item?.id} onClick={handleClick.bind(null, item)}>
                  <div className={styles.avatar}>
                    <Badge count={item.unreadCount}>
                      <Image src={convertFileUrl(item.toUserAvatar)} alt='' width={40} height={40} />
                    </Badge>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.title}>
                      <span>{item.toUserNickname}</span>
                    </div>
                    <div className={styles.content}>{item?.content || '暂无消息'}</div>
                    <div className={styles.date}>{formatToDateTime(item.createdTime)}</div>
                  </div>
                </div>
              )}
            </>
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
  return <div className={styles.container}>{loading ? renderSkeleton() : renderDialogList}</div>;
}

export default DialogList;
