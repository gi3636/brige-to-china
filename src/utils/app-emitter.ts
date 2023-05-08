/** @format */

import { Emitter } from './emitter';

export enum EmitterType {
  logout,
  updateAnswerList,
  updateCommentList,
  searchQuestion,
  receiveMsg,
}
class AppEmitter extends Emitter {
  type = EmitterType;
}

export const emitter = new AppEmitter();
