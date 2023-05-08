import React from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
function Footer(props) {
  return (
    <footer className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.nav}>
          <Link href={''}>关于我们</Link>
          <Link href={''}>用户协议</Link>
          <Link href={''}>用户隐私政策</Link>
          <Link href={''}>商务合作</Link>
        </div>
        <div className={styles.copyright}>copyright@留华桥</div>
      </div>
    </footer>
  );
}

export default Footer;
