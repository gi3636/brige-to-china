/** @format */
import { api } from './api';

export function getQuestionList(param) {
  return api.get('/question/list/test', param);
}
