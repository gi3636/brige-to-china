import utilStyles from '@/styles/utils.module.css';
import { Button, DatePicker, theme } from 'antd';
import { useEffect } from 'react';
import { authService } from '@/api';
import useLanguage from '@/hooks/useLanguage';

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
        localStorage.setItem('token', res?.data?.token);
      });
  }, []);

  const handleChangeTheme = () => {
    document.getElementsByTagName('body')[0].style.setProperty('--primary-color', 'green');
  };
  return (
    <div>
      <h1 className='title'>
        <a href='#' onClick={handleChangeTheme}>
          1231232
        </a>
      </h1>
      <Button onClick={changeLanguage}>{t.buttonText}</Button>
      <Button type='primary'>123</Button>
      <DatePicker />
      <section className={utilStyles.headingMd} style={{ color: token.colorPrimary }}>
        <p>[Your Self Introduction]</p>
        <h1 style={{ color: token.colorText }}>Home Page</h1>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href='https://nextjs.org/learn'>our Next.js tutorial</a>.)
        </p>
      </section>
    </div>
  );
}
