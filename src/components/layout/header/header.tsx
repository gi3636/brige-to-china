import React, { useState } from 'react';
import styles from './index.module.scss';
import { Avatar, Button, Dropdown, Input, MenuProps } from 'antd';
import { EarthIcon } from '@/components/icons/EarthIcon';
import useLanguage from '@/hooks/useLanguage';
import { DownIcon } from '@/components/icons/DownIcon';
import { useRouter } from 'next/router';
import Image from 'next/image';
import SearchBar from '@/components/search-bar/SearchBar';
import LoginModal from '@/components/modal/login/LoginModal';
import { colors } from '@/styles/colors';
import { useSelector } from 'react-redux';

const { Search } = Input;
function Header(props) {
  const { t, changeLanguage } = useLanguage();
  const router = useRouter();

  const user = useSelector((state: any) => state.user);

  const [isOpen, setIsOpen] = useState(false);

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

  const avatarItems: MenuProps['items'] = [
    {
      key: 'zh',
      label: <span>登出</span>,
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
          <div>
            <Dropdown menu={{ items }}>
              <div className={styles.avatarBox}>
                {/*<Avatar size={40} src={user.avatar} />*/}
                <Avatar size={45} src={'https://p4.itc.cn/images01/20210823/e8dbc692952d48e0bda94c5536006a58.jpeg'} />
              </div>
            </Dropdown>
          </div>
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
