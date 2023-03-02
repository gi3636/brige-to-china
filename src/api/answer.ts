import { api } from '@/api/api';

export function getAnswerList(param) {
  return {
    url: '/answer/list',
    method: 'post',
    data: param,
  };
}

export function addAnswer(param) {
  return {
    url: '/answer/add',
    method: 'post',
    data: param,
  };
}

/**
 * 采用回答
 * @param param
 */
export function useAnswer(param) {
  return {
    url: '/answer/use',
    method: 'post',
    data: param,
  };
}

/**
 * 删除回答
 * @param param
 */
export function delAnswer(param) {
  return api.post('/answer/delete', param);
}
