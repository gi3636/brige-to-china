/** @format */
import { api } from './api';
import { PostQuestionParam } from '@/types/request';

export function getQuestionList(param) {
  return api.get('/question/list/test', param);
}

export function postQuestion(param: PostQuestionParam) {
  return {
    url: '/question/add',
    method: 'post',
    data: param,
  };
}
