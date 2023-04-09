import { api } from '@/api/api';

/**
 * 获取用户详情
 * @param param
 */
export function getUserDetail(param) {
  return {
    url: '/user/getDetail',
    method: 'post',
    data: param,
  };
}

/**
 * 编辑用户
 * @param param
 */
export function editUserInfo(param) {
  return {
    url: '/user/edit',
    method: 'post',
    data: param,
  };
}
