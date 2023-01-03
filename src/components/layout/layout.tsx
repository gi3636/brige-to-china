import styles from './layout.module.css';
import Header from '@/components/layout/Header/header';
import Main from '@/components/layout/Main/main';
import React from 'react';
import Footer from '@/components/layout/Footer/footer';
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
