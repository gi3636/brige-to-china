import { colors } from '@/styles/colors';

/**
 * 全局配置
 */
export const globalConfig = {
  // 项目名称
  projectName: '留华桥',
  // 初始主题（localStorage未设定的情况）
  initTheme: {
    // 初始为亮色主题
    dark: false,
    // 初始主题色
    // 与customColorPrimary数组中的某个值对应
    // null表示默认使用Ant Design默认主题色或customColorPrimary第一种主题色方案
    colorPrimary: colors.primaryColor,
  },
  // 供用户选择的主题色，如不提供该功能，则设为空数组
  customColorPrimary: ['#1677ff', '#f5222d', '#fa8c16', '#722ed1', '#13c2c2', '#52c41a'],
  // localStorage用户主题信息标识
  SESSION_LOGIN_THEME: 'userTheme',
  // localStorage用户登录信息标识
  SESSION_LOGIN_INFO: 'userLoginInfo',
  uploadUrl: '',
  downloadUrl: 'https://video.sakuraoy.top/',
  devBaseUrl: 'http://127.0.0.1:9999',
  prodBaseUrl: 'https://122.51.230.111:10000',
  devWsUrl: 'ws://127.0.0.1:9500/ws',
  prodWsUrl: 'ws://122.51.230.111:9500/ws',
  fileUrl: 'http://localhost:9000/',
};
