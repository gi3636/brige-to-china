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
