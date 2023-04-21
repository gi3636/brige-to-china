import { api } from '@/api/api';

/**
 * 添加会话
 * @param param
 */
export function addDialog(param) {
  return {
    url: '/message/dialog/add',
    method: 'post',
    data: param,
  };
}

/**
 * 获取对话列表
 * @param param
 */
export function getDialogList(param) {
  return api.post('/message/dialog/list', param);
}

/**
 * 获取信息列表
 * @param param
 */
export function getMessageList(param) {
  return {
    url: '/message/list',
    method: 'post',
    data: param,
  };
}
