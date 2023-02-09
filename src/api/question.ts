/** @format */
import { api } from './api';

export function getQuestionList(param) {
  return api.post('/question/list', param);
}
