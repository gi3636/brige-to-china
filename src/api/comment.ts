import { api } from '@/api/api';

export function getCommentList(param) {
  return {
    url: '/comment/list',
    method: 'post',
    data: param,
  };
}

export function sendComment(param) {
  return {
    url: '/comment/add',
    method: 'post',
    data: param,
  };
}

/**
 * 评论点赞
 * @param param
 */
export function likeComment(param) {
  return api.post('/comment/like', param);
}



