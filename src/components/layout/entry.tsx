import React from 'react';
import { ConfigProvider, theme } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import { useSelector } from 'react-redux';
import Layout from '@/components/layout/layout';

// darkAlgorithm为暗色主题，defaultAlgorithm为亮色（默认）主题
// 注意这里的theme是来自于Ant Design的，而不是store
const { darkAlgorithm, defaultAlgorithm } = theme;

function Entry({ Component, pageProps }) {
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

  return (
    <ConfigProvider locale={enUS} theme={antdTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ConfigProvider>
  );
}

export default Entry;
