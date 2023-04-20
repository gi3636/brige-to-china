import { api } from '@/api/api';

export function getNotificationList(param) {
  return api.post('/message/notify/list', param);
}
