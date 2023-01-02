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

  return <div>中部</div>;
}
