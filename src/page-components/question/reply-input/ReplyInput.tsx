import React from 'react';
import Image from 'next/image';
import { Button, Input } from 'antd';
import { useSelector } from 'react-redux';
import styles from './index.module.scss';
interface IProps {
  onSend?: (text: string, clearText: () => void) => void;
  loading?: boolean;
  nickname?: string;
}

function ReplyInput({ onSend, loading, nickname }: IProps) {
  const [text, setText] = React.useState<any>('');
  const user = useSelector((state: any) => state.user);

  const handleSendComment = async () => {
    onSend && onSend(text, clearText);
  };

  const clearText = () => {
    setText('');
  };

  return (
    <div className={styles.replyContainer}>
      <Image style={{ borderRadius: '50%', marginRight: 10 }} src={user?.avatar} alt='' width={40} height={40} />
      {nickname ? (
        <div style={{ marginRight: 20 }}>
          <span style={{ color: '#8590A6', marginRight: 3 }}>回复</span>
          <span className={styles.nickname}>{nickname}</span>
        </div>
      ) : null}

      <div style={{ display: 'flex', width: nickname ? '70%' : '90%' }}>
        <Input
          placeholder='回复内容'
          value={text}
          onPressEnter={handleSendComment}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <Button type='primary' loading={loading} onClick={handleSendComment} style={{ marginLeft: 10 }}>
          回复
        </Button>
      </div>
    </div>
  );
}

export default ReplyInput;
