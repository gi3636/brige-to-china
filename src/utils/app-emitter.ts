/** @format */

import { Emitter } from './emitter';

export enum EmitterType {
  logout,
  updateAnswerList,
  updateCommentList,
  searchQuestion,
  receiveMsg,
  addNotification,
}
class AppEmitter extends Emitter {
  type = EmitterType;
}

export const emitter = new AppEmitter();
