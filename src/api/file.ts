import { api } from '@/api/api';

/**
 * 文件上传
 * @param param
 */
export function uploadFile(param) {
  return {
    url: '/file/upload',
    method: 'post',
    data: param,
  };
}
