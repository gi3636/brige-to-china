import React from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import { convertFileUrl, formatToDateTime } from '@/utils';
import { useDispatch } from 'react-redux';
import { addDialogItem } from '@/store/dialog/slice';

function DialogList({ dialogList }) {
  const dispatch = useDispatch();
  const handleClick = (item) => {
    dispatch(addDialogItem(item));
  };

  const renderDialogList = dialogList?.map((item) => {
    return (
      <div className={styles.item} key={item?.id} onClick={handleClick.bind(null, item)}>
        <div className={styles.avatar}>
          <Image src={convertFileUrl(item.toUserAvatar)} alt='' width={40} height={40} />
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            <span>{item.toUserNickname}</span>
          </div>
          <div className={styles.content}>{item?.content || '暂无消息'}</div>
          <div className={styles.date}>{formatToDateTime(item.createdTime)}</div>
        </div>
      </div>
    );
  });

  return <div className={styles.container}>{dialogList.length > 0 ? renderDialogList : <div>暂无对话</div>}</div>;
}

export default DialogList;
