const withCss = require('@zeit/next-css');
const path = require('path');
// const { i18n } = require('./next-i18next.config');
//为了配置antd
console.log("path.join(__dirname, 'styles')", path.join(__dirname, 'src/styles/global.scss'));
module.exports = withCss({});
module.exports = {
  experimental: {
    forceSwcTransforms: true,
  },
  swcMinify: true,
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
  //配置sass
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')], // SCSS searches for file paths
    prependData: `@import "src/styles/global.scss";`, // include global scss variable
  },
};
