import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.module.scss';
import { Badge, Button, Dropdown, MenuProps } from 'antd';
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
import { getNotificationList, readAllNotification } from '@/api/notification';
import useRequest from '@/hooks/useRequest';
import { getDialogList } from '@/api/message';
import DialogList from '@/components/layout/header/component/dialog-list';
import { getBatchUserDetail } from '@/api/user';
import { initFriendInfo } from '@/store/friend/slice';
import { emitter, EmitterType } from '@/utils/app-emitter';
import useStorageListener from '@/hooks/useStorageListener';
import { MESSAGE_LIST, RECEIVE_MESSAGE } from '@/constants';

export enum DialogActionEnum {
  read,
  send,
  receive,
}

function Header() {
  const { t, changeLanguage } = useLanguage();
  const router = useRouter();
  const { run, loading } = useRequest();
  const { run: runNotification, loading: notificationLoading } = useRequest(null, false);
  const [notificationList, setNotificationList] = useState<any[]>([]);
  const [dialogList, setDialogList] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const { listen } = useStorageListener();
  const notificationListTotal = useRef(0);
  const dialogListTotal = useRef(0);

  const navItems = [
    // {
    //   key: 'home',
    //   label: t.header.home,
    //   href: '/home',
    // },
    {
      key: 'home',
      label: t.header.question,
      href: '/home',
    },
    {
      key: 'activity',
      label: t.header.school,
      href: '/activity',
    },
    {
      key: 'news',
      label: t.header.news,
      href: '/news',
    },
  ];

  useEffect(() => {
    emitter.singleton(EmitterType.addNotification, (data) => {
      addNotification(data);
    });
  }, [notificationList]);

  useEffect(() => {
    emitter.singleton(EmitterType.updateDialogList, (data, type) => {
      switch (type) {
        case DialogActionEnum.read:
          handleClearUnreadCount(data.dialogId);
          break;
        case DialogActionEnum.send:
          setDialogList((prevDialogList) => {
            return prevDialogList.map((item) => {
              if (item.dialogId === data.dialogId) {
                return {
                  ...item,
                  content: data.content,
                  updatedTime: data.createdTime,
                };
              }
              return item;
            });
          });
          break;
      }
    });
  }, [dialogList]);

  useEffect(() => {
    emitter.singleton(EmitterType.receiveMsg, (data) => {
      handleReceiveMessage(data);
      saveReceiveMessage(data);
    });
  }, [dialogList]);

  useEffect(() => {
    //处理别人发来的消息
    listen(RECEIVE_MESSAGE, (e: any) => {
      let newValue = JSON.parse(e?.newValue);
      handleReceiveMessage(newValue);
    });
  }, []);
  const saveReceiveMessage = (data) => {
    localStorage.setItem(RECEIVE_MESSAGE, JSON.stringify(data));
  };
  const handleReceiveMessage = (data) => {
    setDialogList((prevDialogList) => {
      return prevDialogList.map((item) => {
        if (item.dialogId === data.dialogId) {
          return {
            ...item,
            content: data.content,
            updatedTime: data.createdTime || new Date().getTime(),
            unreadCount: item.unreadCount + 1,
          };
        }
        return item;
      });
    });
  };

  const handleClearUnreadCount = (dialogId) => {
    setDialogList((prevDialogList) => {
      return prevDialogList.map((item) => {
        if (item.dialogId === dialogId) {
          return {
            ...item,
            unreadCount: 0,
          };
        }
        return item;
      });
    });
  };

  useEffect(() => {
    if (user?.id) {
      requestNotificationList(1, 5, true);
      requestDialogList(1, 5, true);
    }
  }, [user]);

  useEffect(() => {
    handleAddFriendInfo();
  }, [dialogList]);

  const handleReadAll = () => {
    const ids = notificationList?.filter((item) => !item.isRead).map((item) => item.id);
    // 如果没有未读的消息
    if (!ids?.length) {
      return;
    }
    // 更新状态
    updateNotification(ids);
    // 请求接口
    readAllNotification({
      ids,
    });
  };

  const requestNotificationList = async (currentPage, pageSize, isRefresh) => {
    if (isRefresh) {
      notificationListTotal.current = 0;
    } else {
      if (notificationList.length >= notificationListTotal.current) {
        throw new Error('没有更多数据了');
      }
    }

    let res: any = await runNotification(
      getNotificationList({
        currentPage: currentPage,
        pageSize: pageSize,
        channelType: 1,
      }),
    );
    if (res.code != 200) return;
    notificationListTotal.current = +res?.data?.total;
    let newList = res.data.list || [];
    if (isRefresh) {
      setNotificationList(newList);
    } else {
      setNotificationList([...notificationList, newList]);
    }
  };

  const requestDialogList = async (currentPage, pageSize, isRefresh) => {
    if (isRefresh) {
      dialogListTotal.current = 0;
    } else {
      if (dialogList.length >= dialogListTotal.current) {
        throw new Error('没有更多数据了');
      }
    }
    let res: any = await run(
      getDialogList({
        currentPage: currentPage,
        pageSize: pageSize,
        channelType: 1,
      }),
    );
    if (res.code != 200) return;
    dialogListTotal.current = +res?.data?.total;
    let newList = res.data.list || [];
    if (isRefresh) {
      setDialogList(newList);
    } else {
      setDialogList([...dialogList, ...newList]);
    }
  };
  const updateNotification = (ids) => {
    ids.forEach((id) => {
      notificationList.find((i) => i.id == id).isRead = true;
    });
    setNotificationList([...notificationList]);
  };

  const updateDialog = (data) => {
    console.log('data', data);
    // const index = dialogList.findIndex((item) => item.toUserId == data.toUserId);
  };

  // 获取好友信息
  const handleAddFriendInfo = () => {
    let userIds = dialogList.map((item) => item.toUserId);
    if (!userIds.length) return;
    getBatchUserDetail(userIds).then((res) => {
      dispatch(initFriendInfo(res.data));
      console.log('res', res);
    });
  };

  const changeReadStatus = (id) => {
    notificationList.find((i) => i.id == id).isRead = true;
    setNotificationList([...notificationList]);
  };

  const addNotification = (data) => {
    setNotificationList([data, ...notificationList]);
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

  const hasUnreadMessage = dialogList.some((item) => item.unreadCount > 0);
  const hasUnreadNotification = notificationList.some((item) => !item.isRead);

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
        {user.token ? (
          <div style={{ marginLeft: 30, display: 'flex', justifyContent: 'space-around' }}>
            <Dropdown
              placement='bottom'
              arrow
              trigger={['click']}
              onOpenChange={(open) => {
                // 关闭时，将所有消息标记为已读
                if (!open) {
                  handleReadAll();
                }
              }}
              dropdownRender={() => {
                return (
                  <NotificationList
                    requestNotificationList={requestNotificationList}
                    notificationList={notificationList}
                    loading={notificationLoading}
                    changeReadStatus={changeReadStatus}
                  />
                );
              }}>
              <Badge dot={hasUnreadNotification}>
                <BellOutlined style={{ fontSize: 28, color: colors.iconDefaultColor, cursor: 'pointer' }} />
              </Badge>
            </Dropdown>
            <Dropdown
              trigger={['click']}
              placement='bottom'
              arrow
              dropdownRender={() => {
                return <DialogList dialogList={dialogList} loading={loading} requestDialogList={requestDialogList} />;
              }}>
              <Badge dot={hasUnreadMessage}>
                <MessageOutlined
                  style={{ fontSize: 25, color: colors.iconDefaultColor, marginLeft: 20, cursor: 'pointer' }}
                />
              </Badge>
            </Dropdown>
          </div>
        ) : null}
        <div>
          <Dropdown menu={{ items }}>
            <div className={styles.languageContainer}>
              <EarthIcon width={20} height={20} color='#8590A6' />
              <span
                style={{
                  color: '#8590A6',
                  padding: 2,
                  marginRight: 4,
                  minWidth: 40,
                }}>
                {t.header.language}
              </span>
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
