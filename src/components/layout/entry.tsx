import React, { useEffect } from 'react';
import { Button, ConfigProvider, Input, theme } from 'antd';
import enUS from 'antd/locale/en_US';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '@/components/layout/layout';
import { USER_INFO } from '@/constants';
import { updateUser } from '@/store/user/slice';
import { webSocket } from '@/socket/websocket';
import { addFriend } from '@/store/friend/slice';
import { parse } from '@/utils';
import useWsWorker from '@/hooks/useWsWorker';

// darkAlgorithm为暗色主题，defaultAlgorithm为亮色（默认）主题
// 注意这里的theme是来自于Ant Design的，而不是store
const { darkAlgorithm, defaultAlgorithm } = theme;

function Entry({ Component, pageProps }) {
  const dispatch = useDispatch();
  const { sendData } = useWsWorker();
  // 获取store中的主题配置
  const globalTheme = useSelector((state: any) => state.theme);
  // Ant Design主题变量
  const antdTheme = {
    // 亮色/暗色配置
    algorithm: globalTheme.dark ? darkAlgorithm : defaultAlgorithm,
    token: {
      colorPrimary: globalTheme.colorPrimary,
    },
  };

  useEffect(() => {
    let userInfo = localStorage.getItem(USER_INFO);
    if (userInfo) {
      // if (!webSocket.connection) {
      //   webSocket.connect();
      // }

      setTimeout(() => {
        sendData({ type: 'connect' });
      }, 1000);
      dispatch(updateUser(JSON.parse(userInfo)));
      dispatch(addFriend(parse(userInfo)));
    }
  }, []);

  const createShareWorker = () => {
    // No bundler
    const worker = new SharedWorker('wsWorker.js', 'mySharedWorker');
    worker.port.onmessage = (e) => {
      console.info('pageA收到消息', e.data);
    };
    // 或者
    worker.port.addEventListener('message', (e) => {
      console.log(e.data);
    });
    worker.port.start();
    setTimeout(() => {
      worker.port.postMessage('hello world');
    }, 500);
  };
  function sendMessage() {
    sendData({ type: 'broadcast', data: 'hello world' });
  }

  return (
    <ConfigProvider locale={enUS} theme={antdTheme}>
      <Layout>
        <Button onClick={sendMessage}> 测试</Button>
        <Component {...pageProps} />
      </Layout>
    </ConfigProvider>
  );
}

export default Entry;
