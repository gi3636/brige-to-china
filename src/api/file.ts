import { api } from '@/api/api';

/**
 * 获取用户详情
 * @param param
 */
export function uploadFile(param) {
  return {
    url: '/file/upload',
    method: 'post',
    data: param,
  };
}
