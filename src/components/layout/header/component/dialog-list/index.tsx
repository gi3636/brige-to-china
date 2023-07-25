import React, { useRef } from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import { convertFileUrl, formatToDateTime } from '@/utils';
import { useDispatch } from 'react-redux';
import { addDialogItem } from '@/store/dialog/slice';
import { Badge, Empty, Skeleton, Spin } from 'antd';
import { emitter, EmitterType } from '@/utils/app-emitter';
import { DialogActionEnum } from '@/components/layout/header/header';
import useStorageListener from '@/hooks/useStorageListener';
import { MESSAGE_LIST } from '@/constants';

function DialogList({ dialogList, loading, requestDialogList }) {
  const dispatch = useDispatch();
  const scrollRef = React.useRef(null) as any;
  const state = useRef({
    currentPage: 1,
    pageSize: 5,
    lock: false,
  });

  const handleClick = (item) => {
    dispatch(addDialogItem(item));
    emitter.emit(EmitterType.updateDialogList, item, DialogActionEnum.read);
  };

  const onScrollHandle = async () => {
    if (state.current.lock) return;
    const scrollTop = scrollRef.current.scrollTop;
    const clientHeight = scrollRef.current.clientHeight;
    const scrollHeight = scrollRef.current.scrollHeight;
    const isBottom = scrollTop + clientHeight === scrollHeight;
    try {
      if (isBottom && !state.current.lock) {
        state.current.lock = true;
        state.current.currentPage += 1;
        await requestDialogList(state.current.currentPage, state.current.pageSize);
      }
    } catch (error) {
      state.current.currentPage -= 1;
    } finally {
      state.current.lock = false;
    }
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
                    <div className={styles.date}>{formatToDateTime(item.updatedTime)}</div>
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
      </>
    );
  };
  return (
    <div ref={scrollRef} className={styles.container} onScrollCapture={onScrollHandle}>
      {renderDialogList}
      {loading ? renderSkeleton() : null}
    </div>
  );
}

export default DialogList;
