import React from 'react';
import { Avatar, Dropdown, MenuProps, Modal } from 'antd';
import styles from '@/components/layout/header/index.module.scss';
import { LogoutOutlined, PoweroffOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { userLogout } from '@/store/user/slice';

function LoginAvatar(props) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    Modal.confirm({
      title: '退出登录',
      content: '确定退出登录吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        dispatch(userLogout());
        console.log('退出登录');
      },
    });
  };
  const items: MenuProps['items'] = [
    {
      key: 'zh',
      label: (
        <div onClick={handleLogout}>
          <PoweroffOutlined />
          <span style={{ marginLeft: 5 }}>退出登录</span>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Dropdown menu={{ items }}>
        <div className={styles.avatarBox}>
          {/*<Avatar size={40} src={user.avatar} />*/}
          <Avatar size={45} src={'https://p4.itc.cn/images01/20210823/e8dbc692952d48e0bda94c5536006a58.jpeg'} />
        </div>
      </Dropdown>
    </div>
  );
}

export default LoginAvatar;
