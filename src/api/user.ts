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

/**
 * 获取用户详情
 * @param param
 */
export function getUserAction(param) {
  return {
    url: '/user/userAction/list',
    method: 'post',
    data: param,
  };
}

/**
 * 获取多个用户详情
 * @param param
 */
export function getBatchUserDetail(param) {
  return api.post('/user/getBatchUserInfo', param);
}
