import { api } from '@/api/api';

export function getNotificationList(param) {
  return {
    url: '/message/notify/list',
    method: 'post',
    data: param,
  };
}