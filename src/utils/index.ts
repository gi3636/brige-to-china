import dayjs from 'dayjs';
import { globalConfig } from '@/globalConfig';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
const DATE_FORMAT = 'YYYY-MM-DD ';

export function formatToDateTime(date, format = DATE_TIME_FORMAT): string {
  if (!date) {
    return '-';
  }
  return dayjs(date).format(format);
}

export function formatToDate(date, format = DATE_FORMAT): string {
  if (!date) {
    return '-';
  }
  return dayjs(date).format(format);
}

export function isLogin(): boolean {
  return !!localStorage.getItem('token');
}

/**
 * 获取url参数
 * @param name
 */
export function getQueryParam(name) {
  const urlParams = new URLSearchParams(window?.location?.search);
  return urlParams.get(name);
}

export function convertFileUrl(url) {
  if (!url) {
    return '';
  }
  if (url.startsWith('http')) {
    return url;
  }
  return `${globalConfig.fileUrl}${url}`;
}

export const dateUtil = dayjs;
