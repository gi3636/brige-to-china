import '../styles/global.css';
import 'antd/dist/reset.css';
import store from '@/store';
import { Provider } from 'react-redux';
import Entry from '@/pages/entry';
import en from '../language/en.json';
import zh from '../language/zh.json';

const messages = {
  en,
  zh,
};

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Entry Component={Component} pageProps={pageProps} />
    </Provider>
  );
}
