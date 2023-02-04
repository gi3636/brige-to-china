import React from 'react';
import { Modal, Tabs, TabsProps } from 'antd';
import styles from './index.module.scss';
import LoginBody from '@/components/modal/login/component/login-body/LoginBody';
interface Props {
  isOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}
function LoginModal({ isOpen, handleOk, handleCancel }: Props) {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `登录`,
      children: <LoginBody isLogin={true} />,
    },
    {
      key: '2',
      label: `注册`,
      children: <LoginBody isLogin={false} />,
    },
  ];
  return (
    <Modal open={isOpen} onOk={handleOk} onCancel={handleCancel} width={800} footer={null} className={styles.modal}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <img src='/images/login-right-bg.png' alt='login' width='100%' height='100%' />
        </div>
        <div className={styles.rightContainer}>
          <Tabs size='large' defaultActiveKey='1' items={items} onChange={onChange} />
        </div>
      </div>
    </Modal>
  );
}

export default LoginModal;
