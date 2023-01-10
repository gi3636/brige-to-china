import React from 'react';
import styles from './index.module.scss';
import { Button, Dropdown, Input, MenuProps } from 'antd';
import { HeaderLogo } from '@/components/icons/HeaderLogo';
import { EarthIcon } from '@/components/icons/EarthIcon';
import useLanguage from '@/hooks/useLanguage';
import { DownIcon } from '@/components/icons/DownIcon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import SearchBar from "@/components/searchBar/searchbar";



const { Search } = Input;
function Header(props) {
  const { t, changeLanguage } = useLanguage();
  const router = useRouter();
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
  return (
    <header className={styles.header}>
      <div className={styles.centerContainer}>
        <div>
          <Image priority src='/images/header-icon.svg' width={140} height={140} alt='留华桥' />
        </div>
        <div className={styles.tabContainer}>
          {navItems.map((item) => (
            // <Link href={item.href} key={item.key}>
            //   {item.label}
            // </Link>
            <div
              key={item.key}
              onClick={() => {
                router.push(item.href);
              }}>
              {item.label}
            </div>
          ))}
        </div>
        <div className={styles.searchContainer}>
          <SearchBar/>
        </div>
        <div>
          <Button type='primary' className={styles.loginBtn}>
            {t.login}
          </Button>
        </div>
        {/*TODO: 登入后显示用户头像和操作菜单*/}
        {/*<div className={styles.navContainer}>已登录显示</div>*/}
        <div>
          <Dropdown menu={{ items }}>
            <div className={styles.languageContainer}>
              <EarthIcon width={20} height={20} color='#8590A6' />
              <span style={{ color: '#8590A6', padding: 2, marginRight: 4 }}>{t.header.language}</span>
              <DownIcon width={13} height={13} color='#8590A6'></DownIcon>
            </div>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}

export default Header;
