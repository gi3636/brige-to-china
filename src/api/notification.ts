import { api } from '@/api/api';

// export function getNotificationList(param) {
//   return api.post('/message/notify/list', param);
// }
export function getNotificationList(param) {
  return {
    url: '/message/notify/list',
    method: 'post',
    data: param,
  };
}

export function readNotification(param) {
  return api.post('/message/notify/read', param);
}
