import { api } from '@/api/api';

/**
 * 获取资讯列表
 * @param param
 */
export function getNewsList(param) {
  return {
    url: '/news/list',
    method: 'post',
    data: param,
  };
}
