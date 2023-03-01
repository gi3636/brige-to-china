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
