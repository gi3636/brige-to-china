import React, { LegacyRef, useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import { CloseOutlined, MinusOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDialog } from '@/store/dialog/slice';
import { convertFileUrl, formatToDateTime } from '@/utils';
import { webSocket } from '@/socket/websocket';
import { createTextMsg } from '@/socket/message';
import useRequest from '@/hooks/useRequest';
import { getMessageList } from '@/api/message';

function MessageBox({ item }) {
  const [show, setShow] = useState(true);
  const [text, setText] = useState('');
  const [page, setPage] = useState(1);
  const [messageList, setMessageList] = useState([] as any[]);
  const messageBoxRef = React.useRef<HTMLDivElement>(null);
  const user = useSelector((state: any) => state.user);
  const { run, loading } = useRequest();
  const dispatch = useDispatch();

  const handleCloseBox = (item) => {
    dispatch(deleteDialog(item));
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messageBoxRef?.current) {
        messageBoxRef.current.scrollTop = messageBoxRef.current?.scrollHeight;
      }
    });
  };

  useEffect(() => {
    loadMessage();
  }, [page]);

  const loadMessage = async () => {
    const res = await run(getMessageList({ dialogId: item.dialogId, currentPage: page, pageSize: 10 }));
    if (res.code != 200) {
      return;
    }
    setMessageList(res.data.list || []);
    scrollToBottom();
  };

  const handleSendMsg = () => {
    if (!text) {
      message.error('请输入内容');
    }
    let msg = createTextMsg(item.toUserId, text, item.dialogId);
    let list = [...messageList, msg];
    setMessageList(list);
    webSocket.send(msg);
    clearText();
  };
  const clearText = () => {
    setText('');
  };

  const isMe = (senderId) => {
    return senderId == user.id;
  };

  const renderMessage = useMemo(() => {
    return messageList.map((item) => {
      return (
        <div className={styles.messageItem} key={item.msgId}>
          <div className={styles.date}>{formatToDateTime(item.createdTime)}</div>
          <div className={styles.message} style={{ flexDirection: isMe(item.senderId) ? 'row-reverse' : 'row' }}>
            <div className={styles.avatar}>
              <Image src={convertFileUrl(item.senderAvatar)} alt='' width={34} height={34} />
            </div>
            <div className={styles.content}>{item.content}</div>
          </div>
        </div>
      );
    });
  }, [messageList]);

  return (
    <div className={styles.messageBox} style={{ height: show ? 450 : 45, cursor: show ? 'default' : 'pointer' }}>
      <div
        className={styles.header}
        onClick={() => {
          if (!show) {
            setShow(true);
          }
        }}>
        <div className={styles.avatar}>
          <Image src={convertFileUrl(item.toUserAvatar)} alt='' width={34} height={34} />
        </div>
        <div className={styles.name}>{item.toUserNickname}</div>
        <div className={styles.actionBox}>
          {show ? (
            <MinusOutlined
              style={{ color: 'white' }}
              onClick={() => {
                console.log('点击');
                setShow(false);
              }}
            />
          ) : null}
          <CloseOutlined style={{ color: 'white' }} onClick={handleCloseBox.bind(null, item)} />
        </div>
      </div>
      {show ? (
        <>
          <div className={styles.main} ref={messageBoxRef}>
            {renderMessage}
          </div>
          <div className={styles.input}>
            <Input
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMsg();
                }
              }}
              placeholder='请输入内容'
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <Button type='link' shape='circle' icon={<SendOutlined />} onClick={handleSendMsg} />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default MessageBox;