import styles from './layout.module.css';
import Header from '@/components/layout/header/header';
import Main from '@/components/layout/main/main';
import React from 'react';
import Footer from '@/components/layout/footer/footer';
import { Html } from 'next/document';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
