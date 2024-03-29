import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import { CloseOutlined, MinusOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Input, message, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDialog } from '@/store/dialog/slice';
import { convertFileUrl, formatToDateTime } from '@/utils';
import { webSocket } from '@/socket/websocket';
import { createTextMsg } from '@/socket/message';
import useRequest from '@/hooks/useRequest';
import { getMessageList } from '@/api/message';
import { emitter, EmitterType } from '@/utils/app-emitter';
import useLocalStorage from '@/hooks/useLocalStorage';
import useStorageListener from '@/hooks/useStorageListener';
import { MESSAGE_LIST } from '@/constants';
import { DialogActionEnum } from '@/components/layout/header/header';

function MessageBox({ item }) {
  const [show, setShow] = useState(true);
  const [text, setText] = useState('');
  const [page, setPage] = useState(1);
  const [messageList, setMessageList] = useState([] as any[]);
  const messageBoxRef = React.useRef<HTMLDivElement>(null);
  const user = useSelector((state: any) => state.user);
  const { run, loading } = useRequest();
  const dispatch = useDispatch();
  const { listen } = useStorageListener();
  const localStorage = useLocalStorage();
  const friends = useSelector((state: any) => state.friends);

  useEffect(() => {
    //监听消息
    listen(MESSAGE_LIST, listenMessage);
    emitter.singleton(EmitterType.receiveMsg + item?.dialogId, receiveMsg);
  }, [messageList]);

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

  const updateDialogList = (message, type: DialogActionEnum) => {
    emitter.emit(EmitterType.updateDialogList, message, type);
  };

  const handleCloseBox = (item) => {
    dispatch(deleteDialog(item));
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messageBoxRef?.current) {
        messageBoxRef.current.scrollTop = messageBoxRef.current?.scrollHeight;
      }
    }, 50);
  };

  function listenMessage(e) {
    console.log('listenMessage', e);
    let newValue = e.newValue;
    if (newValue) {
      let value = JSON.parse(newValue);
      if (value[item.dialogId]) {
        setMessageList(value[item.dialogId]);
        scrollToBottom();
      }
    }
  }

  function saveMessageList(messageList) {
    setMessageList(messageList);
    let map = localStorage.getItem(MESSAGE_LIST) as any;
    if (map) {
      map = JSON.parse(map);
    } else {
      map = {};
    }
    map[item.dialogId] = messageList;
    localStorage.setItem(MESSAGE_LIST, JSON.stringify(map));
  }

  const receiveMsg = (data) => {
    let formatMsg = formatMessage(data);
    let list = [...messageList, formatMsg];
    saveMessageList(list);
    scrollToBottom();
  };

  const handleSendMsg = () => {
    if (!text) {
      message.error('请输入内容');
    }
    let msg = createTextMsg(item.toUserId, text, item.dialogId);
    webSocket.send(msg);
    let formatMsg = formatMessage(msg.chatMsg);
    let list = [...messageList, formatMsg];
    updateDialogList(formatMsg, DialogActionEnum.send);
    saveMessageList(list);
    clearText();
    scrollToBottom();
  };

  function formatMessage(chatMessage) {
    chatMessage.senderNickname = friends[chatMessage.senderId]?.nickname;
    chatMessage.senderAvatar = friends[chatMessage.senderId]?.avatar;
    chatMessage.receiverNickname = friends[chatMessage.receiverId]?.nickname;
    chatMessage.receiverAvatar = friends[chatMessage.receiverId]?.avatar;
    chatMessage.createdTime = new Date().getTime();
    return chatMessage;
  }
  const clearText = () => {
    setText('');
  };

  const isMe = (senderId) => {
    return senderId == user.id;
  };

  const renderMessage = useMemo(() => {
    return messageList?.map((item) => {
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
            scrollToBottom();
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
            <Spin tip='Loading' className={styles.spin} spinning={loading}></Spin>
            {messageList.length ? renderMessage : null}
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
