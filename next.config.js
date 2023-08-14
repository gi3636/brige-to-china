const withCss = require('@zeit/next-css');
const path = require('path');
//为了配置antd
module.exports = withCss({});
module.exports = {
  port: 3001,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
  experimental: {
    forceSwcTransforms: true,
  },
  swcMinify: true,
  reactStrictMode: false,
  env: {
    APP_ENV: process.env.APP_ENV,
  },
  // 配置图片域名，为了优化图片加载速度
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'img.headjia.com',
        port: '',
        // pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars1.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'dummyimage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'thumb.photo-ac.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '36.26.69.161',
        port: '9000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/**',
      },
    ],
  },
  //添加语言环境
  // i18n

  i18n: {
    // The locales you want to support in your app
    locales: ['en', 'zh'],
    // The default locale you want to be used when visiting a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'zh',
  },
  //配置sass
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')], // SCSS searches for file paths
    prependData: `@import "src/styles/global.scss";`, // include global scss variable
  },
};
