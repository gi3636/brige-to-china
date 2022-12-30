const withCss = require('@zeit/next-css');
// const { i18n } = require('./next-i18next.config');
//为了配置antd
module.exports = withCss({});

module.exports = {
  experimental: {
    forceSwcTransforms: true,
  },
  reactStrictMode: true,
  env: {
    APP_ENV: process.env.APP_ENV,
  },
  // 配置图片域名，为了优化图片加载速度
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        // pathname: '/account123/**',
      },
    ],
  },
  //添加语言环境
  // i18n,
  i18n: {
    // The locales you want to support in your app
    locales: ['en', 'zh'],
    // The default locale you want to be used when visiting a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'zh',
  },
};
