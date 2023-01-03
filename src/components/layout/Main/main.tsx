import React from 'react';
import styles from './index.module.scss';
function Main({ children }) {
  return <main className={styles.container}>{children}</main>;
}

export default Main;
