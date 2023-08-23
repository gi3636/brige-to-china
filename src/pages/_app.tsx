import store from '@/store';
import { Provider } from 'react-redux';
import Entry from '@/components/layout/entry';
import Head from 'next/head';
import useLanguage from '@/hooks/useLanguage';
import 'antd/dist/reset.css';
import '@/styles/customize.css';
export default function App({ Component, pageProps }) {
  const { t, changeLanguage } = useLanguage();
  return (
    <Provider store={store}>
      <Head>
        <title>{t.projectName}</title>
        <meta property='og:title' content={t.projectName} key='title' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        {/*让https 可以访问http*/}
        <meta httpEquiv='Content-Security-Policy' content='upgrade-insecure-requests' />
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='Learn how to build a personal website using Next.js' />
      </Head>
      <Entry Component={Component} pageProps={pageProps} />
    </Provider>
  );
}
