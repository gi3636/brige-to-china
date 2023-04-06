import React from 'react';
import styles from './id.module.scss';
import Image from 'next/image';
import { Avatar, Button } from 'antd';

function UserDetailPage() {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <div className={styles.coverBox}>
            <Image
              style={{ borderRadius: '10px 10px 0 0' }}
              src='https://thumb.photo-ac.com/56/564d7708097fcf9e3afc35d896da492d_t.jpeg'
              alt=''
              width={1200}
              height={200}
            />
          </div>
          <div className={styles.userDetailBox}>
            <div>
              <div className={styles.username}>用户名</div>
              <div className={styles.description}>个人简介：12312312</div>
              <div className={styles.tag}>标签</div>
            </div>
            <div className={styles.follow}>关注 78</div>
            <div className={styles.fans}>粉丝 11</div>
            <div className={styles.editBtn}>编辑个人资料</div>
          </div>
          <div className={styles.userAvatar}>
            {/*<Avatar size={100} src='https://thumb.photo-ac.com/56/564d7708097fcf9e3afc35d896da492d_t.jpeg' />*/}
            <Image
              style={{ borderRadius: '50%' }}
              src='https://avatars1.githubusercontent.com/112312'
              alt=''
              width={150}
              height={150}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailPage;
