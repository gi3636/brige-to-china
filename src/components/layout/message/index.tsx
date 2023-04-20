import React from 'react';
import styles from './index.module.scss';
import MessageBox from '@/components/layout/message/message-box';
import { useSelector } from 'react-redux';

function Message(props) {
  const dialogList = useSelector((state: any) => state.dialog);

  const renderDialogList = dialogList?.map((item) => {
    return <MessageBox item={item} key={item.id} />;
  });
  return (
    <div className={styles.container}>
      <div className={styles.messageBoxList}>{renderDialogList}</div>
    </div>
  );
}

export default Message;
