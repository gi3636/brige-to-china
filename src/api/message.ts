import { api } from '@/api/api';

/**
 * 添加会话
 * @param param
 */
export function addDialog(param) {
  return api.post('/message/dialog/add', param);
}

/**
 * 获取对话列表
 * @param param
 */
export function getDialogList(param) {
  return api.post('/message/dialog/list', param);
}
