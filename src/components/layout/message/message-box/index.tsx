import React, { useState } from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import { CloseOutlined, MinusOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteDialog } from '@/store/dialog/slice';
import { convertFileUrl } from '@/utils';

function MessageBox({ item }) {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const handleCloseBox = (item) => {
    dispatch(deleteDialog(item));
  };

  console.log('item', item);
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
          <div className={styles.main}>
            <div className={styles.messageItem}>
              <div className={styles.date}>2021-05-28 20:52:21</div>
              <div className={styles.message}>
                <div className={styles.avatar}>
                  <Image src='http://img.headjia.com/2022/0528205227134881.jpg' alt='' width={34} height={34} />
                </div>
                <div className={styles.content}>
                  测试微服务恶妇哇哦发我哦发违法我饿福娃额发范围发哇发我范围发我1231232内容
                </div>
              </div>
            </div>
            <div className={styles.messageItem}>
              <div className={styles.date}>2021-05-28 20:52:21</div>
              <div className={styles.message} style={{ flexDirection: 'row-reverse' }}>
                <div className={styles.avatar}>
                  <Image src='http://img.headjia.com/2022/0528205227134881.jpg' alt='' width={34} height={34} />
                </div>
                <div className={styles.content}>
                  测试微服务恶妇哇哦发我哦发违法我饿福娃额发范围发哇发我范围发我1231232内容
                </div>
              </div>
            </div>
          </div>
          <div className={styles.input}>
            <Input placeholder='请输入内容' />
            <Button type='link' shape='circle' icon={<SendOutlined />} />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default MessageBox;
