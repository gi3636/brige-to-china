import styles from './layout.module.css';
import Header from '@/components/Layout/Header/header';
import Main from '@/components/Layout/Main/main';
import React from 'react';
import Footer from '@/components/Layout/Footer/footer';
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
