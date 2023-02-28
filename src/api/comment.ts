export function getCommentList(param) {
  return {
    url: '/comment/list',
    method: 'post',
    data: param,
  };
}
