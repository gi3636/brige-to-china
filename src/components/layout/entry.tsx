import React, { useEffect } from 'react';
import { Button, ConfigProvider, Input, theme } from 'antd';
import enUS from 'antd/locale/en_US';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '@/components/layout/layout';
import { USER_INFO } from '@/constants';
import { updateUser, userLogout } from '@/store/user/slice';
import { webSocket } from '@/socket/websocket';
import { addFriend } from '@/store/friend/slice';
import { parse } from '@/utils';
import useStorageListener from '@/hooks/useStorageListener';

// darkAlgorithm为暗色主题，defaultAlgorithm为亮色（默认）主题
// 注意这里的theme是来自于Ant Design的，而不是store
const { darkAlgorithm, defaultAlgorithm } = theme;

function Entry({ Component, pageProps }) {
  const dispatch = useDispatch();
  const { listen } = useStorageListener();
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

  // 监听localStorage.为了让其他页面能够监听到
  function listenUserInfo(e) {
    let newValue = e.newValue;
    switch (e.key) {
      case USER_INFO:
        if (newValue) {
          setTimeout(() => {
            dispatch(updateUser(JSON.parse(e.newValue) || {}));
          }, 500);
        } else {
          dispatch(userLogout());
        }
        break;
    }
    // 如果是删除操作
    if (!newValue) {
      //关闭websocket
      webSocket.close();
    } else {
      // 如果是添加操作
      // 如果websocket未连接，则连接
      if (!webSocket.connection) {
        webSocket.connect();
      }
    }
    console.log('listenUserInfo', e);
  }

  useEffect(() => {
    // new StorageListener().listen();
    listen(listenUserInfo);
    let userInfo = localStorage.getItem(USER_INFO);
    if (userInfo) {
      if (!webSocket.connection) {
        webSocket.connect();
      }
      dispatch(updateUser(JSON.parse(userInfo)));
      dispatch(addFriend(parse(userInfo)));
    }
  }, []);

  return (
    <ConfigProvider locale={enUS} theme={antdTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ConfigProvider>
  );
}

export default Entry;
