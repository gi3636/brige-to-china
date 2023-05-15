import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Badge, Button, Dropdown, Input, MenuProps } from 'antd';
import { EarthIcon } from '@/components/icons/EarthIcon';
import useLanguage from '@/hooks/useLanguage';
import { DownIcon } from '@/components/icons/DownIcon';
import { useRouter } from 'next/router';
import Image from 'next/image';
import SearchBar from '@/components/search-bar/SearchBar';
import LoginModal from '@/components/modal/login/LoginModal';
import { colors } from '@/styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import LoginAvatar from '@/components/layout/header/component/login-avatar/LoginAvatar';
import { BellOutlined, MessageOutlined } from '@ant-design/icons';
import NotificationList from '@/components/layout/header/component/notification-list';
import { getNotificationList } from '@/api/notification';
import useRequest from '@/hooks/useRequest';
import { getDialogList } from '@/api/message';
import DialogList from '@/components/layout/header/component/dialog-list';
import { getBatchUserDetail } from '@/api/user';
import { initFriendInfo } from '@/store/friend/slice';

function Header() {
  const { t, changeLanguage } = useLanguage();
  const router = useRouter();
  const { run, loading } = useRequest();
  const { run: runNotification, loading: notificationLoading } = useRequest();
  const [notificationList, setNotificationList] = useState<any[]>([]);
  const [dialogList, setDialogList] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    runNotification(
      getNotificationList({
        currentPage: 1,
        pageSize: 10,
        channelType: 1,
      }),
    ).then((res) => {
      if (res.code != 200) return;
      setNotificationList(res?.data?.list);
    });

    run(
      getDialogList({
        currentPage: 1,
        pageSize: 10,
        channelType: 1,
      }),
    ).then((res) => {
      console.log('res', res);
      if (res.code != 200) return;
      setDialogList(res?.data?.list);
    });
  }, []);

  useEffect(() => {
    handleAddFriendInfo();
  }, [dialogList]);
  const handleAddFriendInfo = () => {
    let userIds = dialogList.map((item) => item.toUserId);
    if (!userIds.length) return;
    getBatchUserDetail(userIds).then((res) => {
      dispatch(initFriendInfo(res.data));
      console.log('res', res);
    });
  };
  const showModal = () => {
    setIsOpen(true);
  };

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const items: MenuProps['items'] = [
    {
      key: 'zh',
      label: <span>中文</span>,
      onClick: () => changeLanguage('zh'),
    },
    {
      key: 'en',
      label: <span>English</span>,
      onClick: () => changeLanguage('en'),
    },
  ];

  const navItems = [
    {
      key: 'home',
      label: t.header.home,
      href: '/home',
    },
    {
      key: 'questions',
      label: t.header.question,
      href: '/questions',
    },
    {
      key: 'activity',
      label: t.header.activity,
      href: '/activity',
    },
    {
      key: 'news',
      label: t.header.news,
      href: '/news',
    },
  ];

  const hasUnreadMessage = dialogList.some((item) => item.unreadCount > 0);
  const hasUnreadNotification = notificationList.some((item) => item.isRead != 0);

  return (
    <header className={styles.header}>
      <div className={styles.centerContainer}>
        <div>
          <Image priority src='/images/header-icon.svg' width={140} height={140} alt='留华桥' />
        </div>
        <div className={styles.tabContainer}>
          {navItems.map((item) => (
            <div
              style={{
                color: router.pathname === item.href ? colors.primaryColor : '#8590A6',
                borderBottom: router.pathname === item.href ? `2px solid ${colors.primaryColor}` : 'none',
              }}
              key={item.key}
              onClick={() => {
                router.push(item.href);
              }}>
              {item.label}
            </div>
          ))}
        </div>

        {/*TODO: 登入后显示用户头像和操作菜单*/}
        {/*<div className={styles.navContainer}>已登录显示</div>*/}
        <div className={styles.searchContainer}>
          <SearchBar />
        </div>
        <div style={{ marginLeft: 30, display: 'flex', justifyContent: 'space-around' }}>
          <Dropdown
            placement='bottom'
            arrow
            dropdownRender={() => {
              return <NotificationList notificationList={notificationList} loading={notificationLoading} />;
            }}>
            <Badge dot={hasUnreadNotification}>
              <BellOutlined style={{ fontSize: 28, color: colors.iconDefaultColor }} />
            </Badge>
          </Dropdown>
          <Dropdown
            placement='bottom'
            arrow
            dropdownRender={() => {
              return <DialogList dialogList={dialogList} loading={loading} />;
            }}>
            <Badge dot={hasUnreadMessage}>
              <MessageOutlined style={{ fontSize: 25, color: colors.iconDefaultColor, marginLeft: 20 }} />
            </Badge>
          </Dropdown>
        </div>
        <div>
          <Dropdown menu={{ items }}>
            <div className={styles.languageContainer}>
              <EarthIcon width={20} height={20} color='#8590A6' />
              <span style={{ color: '#8590A6', padding: 2, marginRight: 4, minWidth: 40 }}>{t.header.language}</span>
              <DownIcon width={13} height={13} color='#8590A6'></DownIcon>
            </div>
          </Dropdown>
        </div>

        {user?.token ? (
          <LoginAvatar />
        ) : (
          <div>
            <Button type='primary' className={styles.loginBtn} onClick={showModal}>
              {t.login}
            </Button>
          </div>
        )}
      </div>
      <LoginModal isOpen={isOpen} handleOk={handleOk} handleCancel={handleCancel} />
    </header>
  );
}

export default Header;
