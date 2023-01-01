import store from '@/store';
import { Provider } from 'react-redux';
import Entry from '@/pages/entry';
import Head from 'next/head';
import useLanguage from '@/hooks/useLanguage';
import 'antd/dist/reset.css';

export default function App({ Component, pageProps }) {
  const { t, changeLanguage } = useLanguage();
  return (
    <Provider store={store}>
      <Head>
        <title>{t.projectName}</title>
        <meta property='og:title' content={t.projectName} key='title' />
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='Learn how to build a personal website using Next.js' />
      </Head>
      <Entry Component={Component} pageProps={pageProps} />
    </Provider>
  );
}
