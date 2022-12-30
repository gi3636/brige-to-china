import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '@/styles/utils.module.css';
import { Button, DatePicker, theme } from 'antd';
import { useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { authService } from '@/api';
import zh from '@/language/zh.json';
import en from '@/language/en.json';
import { useRouter } from 'next/router';
import useLanguage from '@/hooks/useLanguage';
import useLocalStorage from '@/hooks/useLocalStorage';

const { useToken } = theme;
export default function Home() {
  const { t, changeLanguage } = useLanguage();
  const { token } = useToken();

  useEffect(() => {
    authService
      .login({
        username: 'franky',
        password: '123123',
      })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
      });
  }, []);
  return (
    <Layout home>
      <Button onClick={changeLanguage}>{t.buttonText}</Button>
      <Button type='primary'>123</Button>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div></div>
      <DatePicker />
      <section className={utilStyles.headingMd} style={{ color: token.colorPrimary }}>
        <p>[Your Self Introduction]</p>
        <h1 style={{ color: token.colorText }}>Home Page</h1>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href='https://nextjs.org/learn'>our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  );
}
