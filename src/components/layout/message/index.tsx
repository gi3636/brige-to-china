import React from 'react';
import styles from './index.module.scss';
import MessageBox from '@/components/layout/message/message-box';

function Message(props) {
  return (
    <div className={styles.container}>
      <div className={styles.messageBoxList}>
        <MessageBox />
      </div>
    </div>
  );
}

export default Message;
